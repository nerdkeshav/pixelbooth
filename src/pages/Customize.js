import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  padding: 40px;
  justify-content: center;
  align-items: center;
  gap: 80px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 20px;
    gap: 40px;
  }
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

const PhotoStrip = styled.div`
  width: 300px;
  padding: 20px;
  background: ${props => props.frameColor};
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: ${props => props.frameColor === '#ffffff' ? '1px solid black' : 'none'};

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 400px;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Watermark = styled.div`
  text-align: center;
  padding: 10px 0;
  font-size: 0.8rem;
  color: ${props => props.dark ? 'white' : 'black'};
  opacity: 0.5;
`;

const CustomizePanel = styled.div`
  max-width: 400px;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: normal;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected || props.color === '#ffffff' ? 'black' : 'transparent'};
  background: ${props => props.color};
  cursor: pointer;
  padding: 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  font-size: 1rem;
  color: #333;

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #333;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    background: white;

    &:checked {
      background: #333;
      
      &:after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 14px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &:hover {
      border-color: #000;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
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

const colors = [
  { id: 'pink', value: '#ffd1dc' },
  { id: 'blue', value: '#add8e6' },
  { id: 'yellow', value: '#fffacd' },
  { id: 'green', value: '#90ee90' },
  { id: 'purple', value: '#e6e6fa' },
  { id: 'beige', value: '#f5f5dc' },
  { id: 'maroon', value: '#800000' },
  { id: 'white', value: '#ffffff' },
  { id: 'black', value: '#000000' }
];

function Customize() {
  const navigate = useNavigate();
  const location = useLocation();
  const { photos } = location.state || { photos: [] };
  
  const [frameColor, setFrameColor] = useState('#ffffff');
  const [addDate, setAddDate] = useState(false);

  const handleRetake = () => {
    navigate('/canvas');
  };

  const handleNext = () => {
    navigate('/result', { 
      state: { 
        photos,
        frameColor,
        addDate,
      }
    });
  };

  const isDarkColor = (color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness < 128;
  };

  return (
    <Container>
      <Logo to="/">pixelbooth</Logo>

      <PhotoStrip frameColor={frameColor}>
        {photos.map((photo, index) => (
          <Photo key={index} src={photo} alt={`Photo ${index + 1}`} />
        ))}
        <Watermark dark={isDarkColor(frameColor)}>
          pixelbooth
        </Watermark>
      </PhotoStrip>

      <CustomizePanel>
        <Title>customize your photo</Title>

        <Section>
          <SectionTitle>frame:</SectionTitle>
          <ColorGrid>
            {colors.map(color => (
              <ColorButton
                key={color.id}
                color={color.value}
                selected={frameColor === color.value}
                onClick={() => setFrameColor(color.value)}
              />
            ))}
          </ColorGrid>

          <CheckboxLabel>
            <input
              type="checkbox"
              checked={addDate}
              onChange={(e) => setAddDate(e.target.checked)}
            />
            add date
          </CheckboxLabel>
        </Section>

        <ButtonContainer>
          <Button onClick={handleRetake}>RETAKE</Button>
          <Button onClick={handleNext}>NEXT</Button>
        </ButtonContainer>
      </CustomizePanel>
    </Container>
  );
}

export default Customize; 