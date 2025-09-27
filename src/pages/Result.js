import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import DonationPopup from '../components/DonationPopup';

const Container = styled.div`
  min-height: 100vh;
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
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

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 80px auto 0;
  display: flex;
  gap: 80px;
  align-items: flex-start;
  padding: 0 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    gap: 40px;
  }
`;

const PhotoStrip = styled.div`
  flex: 0 0 300px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid black;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 400px;
    flex: none;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
`;

const InfoPanel = styled.div`
  flex: 1;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 1024px) {
    width: 100%;
    text-align: center;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 8px 20px;
  font-size: 0.9rem;
  background: white;
  border: 1px solid black;
  border-radius: 20px;
  color: black;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const DownloadButton = styled(Button)`
  background: transparent;
  color: #ff69b4;
  border: 1px solid #ff69b4;
  font-weight: normal;
  padding: 8px 25px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 20px;

  &:hover {
    background: transparent;
    transform: scale(1.05);
  }
`;

const Watermark = styled.div`
  text-align: center;
  padding: 10px 0;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${props => props.dark ? 'white' : 'black'};
  opacity: 0.5;
`;

const DateText = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: ${props => props.dark ? 'white' : 'black'};
  margin-top: 10px;
`;

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { photos = [], frameColor, addDate } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const sampleImage = require('../imgs/sample1.jpg');

  const isDarkColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness < 128;
  };

  const downloadPhoto = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set dimensions with extra space at the bottom
    const width = 1200;
    const height = width * 2.5; // Adjusted height for more space
    canvas.width = width;
    canvas.height = height;

    // Fill with frame color
    ctx.fillStyle = frameColor || '#ffd1dc';
    ctx.fillRect(0, 0, width, height);

    // Load and draw each photo
    let loadedPhotos = 0;
    photos.forEach((photoSrc, index) => {
      const img = new Image();
      img.onload = () => {
        const padding = 50;
        const photoWidth = width - (padding * 2);
        const photoHeight = img.height * (photoWidth / img.width); // Maintain original aspect ratio

        ctx.drawImage(
          img,
          padding,
          padding + (index * (photoHeight + padding)),
          photoWidth,
          photoHeight
        );

        loadedPhotos++;

        if (loadedPhotos === photos.length) {
          // Add date with larger font if selected
          if (addDate) {
            ctx.font = 'bold 36px Arial';
            ctx.fillStyle = isDarkColor(frameColor) ? 'white' : 'black';
            ctx.textAlign = 'center';
            const date = new Date().toLocaleDateString();
            ctx.fillText(date, width / 2, height - 80); // Centered position
          }

          // Add watermark
          ctx.font = 'bold 24px Arial';
          ctx.fillStyle = isDarkColor(frameColor) ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
          ctx.textAlign = 'center';
          ctx.fillText('pixelbooth', width / 2, height - 40); // Centered position

          // Create download with maximum quality
          const link = document.createElement('a');
          link.download = 'pixelbooth-photos.jpg';
          link.href = canvas.toDataURL('image/jpeg', 1.0);
          link.click();
        }
      };
      img.src = photoSrc;
    });
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Container>
      <Logo to="/">pixelbooth</Logo>
      
      <ContentContainer>
        <PhotoStrip>
          <Photo src={sampleImage} alt="Sample" />
        </PhotoStrip>

        <InfoPanel>
          <Title>all done!</Title>
          
          <Instructions>
            <Text>
              Your photos are ready! Click the download button below to save your memories.
            </Text>
            <Text>
              Want to take more? Start another session!
            </Text>
          </Instructions>

          <ButtonContainer>
            <DownloadButton onClick={downloadPhoto}>
              Download
            </DownloadButton>
            <Button onClick={() => navigate('/')}>
              Take More Photos
            </Button>
            <Button onClick={togglePopup}>
              Donate
            </Button>
          </ButtonContainer>
        </InfoPanel>
      </ContentContainer>

      {showPopup && <DonationPopup togglePopup={togglePopup} />}
    </Container>
  );
}

export default Result; 