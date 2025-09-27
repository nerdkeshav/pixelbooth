import React, { useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Webcam from 'react-webcam';

const Container = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Logo = styled(Link)`
  position: fixed;
  top: 20px;
  left: 20px;
  text-decoration: none;
  color: black;
  font-size: 1.4rem;
  font-weight: normal;
  text-transform: lowercase;
`;

const MainView = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    aspect-ratio: 4/3;
  }

  video {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: cover;
    border-radius: 12px;

    @media (max-width: 1024px) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const PhotoCounter = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 10;
`;

const CountdownOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8rem;
  color: black;
  z-index: 10;
`;

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;

  @media (max-width: 768px) {
    bottom: 20px;
    gap: 10px;
  }
`;

const FilterButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? 'black' : 'transparent'};
  background: ${props => props.color || 'white'};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Button = styled.button`
  padding: 8px 20px;
  border-radius: 20px;
  border: 1px solid black;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const PreviewContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;

  @media (max-width: 1024px) {
    position: static;
    transform: none;
    width: 100%;
    max-width: 800px;
    flex-direction: row;
    margin: 20px auto;
    padding: 0 20px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 33.33%;
  }
`;

const IconButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.flipped ? 'scaleX(-1)' : 'none'};
  }
`;

const HelperText = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const FlipButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
`;

const StartButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StartButton = styled.button`
  padding: 15px 30px;
  border-radius: 30px;
  border: 2px solid #000;
  background: white;
  color: black;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: #f8f8f8;
  }

  &:hover:before {
    transform: translate(-50%, -50%) scale(1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const FiltersSection = styled.div`
  margin-top: 40px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

function Canvas() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [isMirrored, setIsMirrored] = useState(true);
  const maxPhotos = 3;

  const filters = [
    { id: 'none', color: '#1a1a1a', label: '○', name: 'Normal' },
    { id: 'grayscale', color: '#666', label: '●', name: 'B&W' },
    { id: 'sepia', color: '#b87a52', label: '●', name: 'Sepia' },
    { id: 'vintage', color: '#a8c0ff', label: '●', name: 'Vintage' },
    { id: 'warm', color: '#ff9966', label: '●', name: 'Warm' },
    { id: 'cool', color: '#66ccff', label: '●', name: 'Cool' },
    { id: 'dramatic', color: '#4a4a4a', label: '●', name: 'Drama' },
    { id: 'fade', color: '#e6e6e6', label: '●', name: 'Fade' }
  ];

  const getVideoConstraints = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      return {
        width: { ideal: 1280 },
        height: { ideal: 960 },
        facingMode: "user",
        mirror: isMirrored
      };
    }
    
    return {
      width: 1920,
      height: 1440,
      facingMode: "user",
      mirror: isMirrored
    };
  };

  const handleCameraError = (error) => {
    console.error('Camera error:', error);
    alert('Unable to access camera. Please make sure you have granted camera permissions and try again.');
  };

  const getComputedFilterStyle = () => {
    switch (selectedFilter) {
      case 'grayscale':
        return 'grayscale(100%)';
      case 'sepia':
        return 'sepia(80%)';
      case 'vintage':
        return 'sepia(50%) contrast(85%) brightness(110%) saturate(75%)';
      case 'warm':
        return 'saturate(110%) sepia(30%) hue-rotate(-10deg)';
      case 'cool':
        return 'saturate(110%) hue-rotate(10deg) brightness(105%)';
      case 'dramatic':
        return 'contrast(140%) brightness(110%)';
      case 'fade':
        return 'brightness(110%) saturate(60%)';
      default:
        return 'none';
    }
  };

  const capture = useCallback(() => {
    const webcamElement = webcamRef.current?.video;
    if (webcamElement) {
      const canvas = document.createElement('canvas');
      const aspectRatio = 4/3;
      canvas.width = 1920;
      canvas.height = canvas.width / aspectRatio;
      
      const context = canvas.getContext('2d');
      
      // Calculate dimensions to maintain aspect ratio
      const videoAspectRatio = webcamElement.videoWidth / webcamElement.videoHeight;
      let sourceWidth = webcamElement.videoWidth;
      let sourceHeight = webcamElement.videoHeight;
      let sourceX = 0;
      let sourceY = 0;
      
      if (videoAspectRatio > aspectRatio) {
        sourceWidth = webcamElement.videoHeight * aspectRatio;
        sourceX = (webcamElement.videoWidth - sourceWidth) / 2;
      } else {
        sourceHeight = webcamElement.videoWidth / aspectRatio;
        sourceY = (webcamElement.videoHeight - sourceHeight) / 2;
      }
      
      // Handle mirroring in the capture
      if (isMirrored) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }
      
      // Draw the image maintaining aspect ratio
      context.drawImage(
        webcamElement,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height
      );

      // Reset transform
      if (isMirrored) {
        context.setTransform(1, 0, 0, 1, 0, 0);
      }

      // Create a temporary canvas for filter application
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempContext = tempCanvas.getContext('2d');

      // Apply CSS filters using a temporary canvas
      tempContext.filter = getComputedFilterStyle();
      tempContext.drawImage(canvas, 0, 0);

      // Get high quality image from the filtered canvas
      const photo = tempCanvas.toDataURL('image/jpeg', 1.0);
      
      setPhotos(prev => {
        const newPhotos = [...prev, photo];
        if (newPhotos.length >= maxPhotos) {
          setIsCapturing(false);
        }
        return newPhotos;
      });
    }
  }, [maxPhotos, selectedFilter, isMirrored]);

  const startSession = useCallback(() => {
    if (isCapturing) return;
    setIsCapturing(true);
    setPhotos([]);

    const takePhoto = (photoCount = 0) => {
      if (photoCount >= maxPhotos) {
        setIsCapturing(false);
        return;
      }

      let count = 3;
      const countdownInterval = setInterval(() => {
        if (count > 0) {
          setCountdown(count);
          count--;
        } else {
          clearInterval(countdownInterval);
          setCountdown(null);
          capture();
          
          if (photoCount < maxPhotos - 1) {
            setTimeout(() => takePhoto(photoCount + 1), 500);
          }
        }
      }, 1000);
    };

    takePhoto(0);
  }, [isCapturing, capture]);

  const handleRetake = () => {
    setPhotos([]);
    setIsCapturing(false);
    setCountdown(null);
  };

  const handleDone = () => {
    navigate('/customize', { state: { photos } });
  };

  const getFilterStyle = () => ({
    filter: getComputedFilterStyle(),
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: isMirrored ? 'scaleX(-1)' : 'none'
  });

  return (
    <Container>
      <Logo to="/">pixelbooth</Logo>
      
      <MainView>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={getVideoConstraints()}
          onUserMediaError={handleCameraError}
          style={getFilterStyle()}
        />
        <PhotoCounter>
          {photos.length} / {maxPhotos}
        </PhotoCounter>
        {countdown !== null && (
          <CountdownOverlay>{countdown}</CountdownOverlay>
        )}
        <FlipButtonContainer>
          <IconButton 
            onClick={() => setIsMirrored(!isMirrored)}
            flipped={isMirrored}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3L5 7L9 11M15 3L19 7L15 11M7 7H17" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
        </FlipButtonContainer>
      </MainView>

      {photos.length === 0 && !isCapturing && (
        <StartButtonContainer>
          <StartButton onClick={startSession}>
            Start Photo Session
          </StartButton>
        </StartButtonContainer>
      )}

      {photos.length > 0 && (
        <PreviewContainer>
          {photos.map((photo, index) => (
            <PreviewImage key={index} src={photo} alt={`Preview ${index + 1}`} />
          ))}
        </PreviewContainer>
      )}

      {!isCapturing && photos.length === 0 && (
        <FiltersSection>
          <HelperText>Try different filters below:</HelperText>
          <FilterContainer>
            {filters.map(filter => (
              <div key={filter.id} style={{ textAlign: 'center' }}>
                <FilterButton
                  color={filter.color}
                  selected={selectedFilter === filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  title={filter.name}
                >
                  {filter.label}
                </FilterButton>
                <div style={{ fontSize: '0.7rem', marginTop: '4px' }}>
                  {filter.name}
                </div>
              </div>
            ))}
          </FilterContainer>
        </FiltersSection>
      )}

      <ControlsContainer>
        {!isCapturing && photos.length === maxPhotos && (
          <>
            <Button onClick={handleRetake}>Retake</Button>
            <Button onClick={handleDone}>DONE</Button>
          </>
        )}
      </ControlsContainer>
    </Container>
  );
}

export default Canvas; 