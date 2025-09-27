import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

const ImageGrid = styled.div`
  flex: 0 0 300px;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 400px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
`;

const WelcomeContent = styled.div`
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

const DownloadLink = styled.a`
  color: #ff69b4;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
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

const StartButton = styled(Button)`
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

function Welcome() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Container>
      <Logo to="/">pixelbooth</Logo>
      
      <ContentContainer>
        <ImageGrid>
          <Image src={require('../imgs/sample1.jpg')} alt="Sample 1" />
        </ImageGrid>

        <WelcomeContent>
          <Title>welcome!</Title>
          
          <Instructions>
            <Text>
              You have 3 seconds for each shot— retakes!
            </Text>
            <Text>
              This photobooth captures 3 pictures in a row, so strike your best pose
              and have fun!
            </Text>
            <Text>
              After the session, {' '}
              <DownloadLink href="">download your digital copy</DownloadLink>
              {' '} to keep the memories alive!
            </Text>
          </Instructions>

          <ButtonContainer>
            <StartButton onClick={() => navigate('/canvas')}>
              Start
            </StartButton>
            <Button onClick={togglePopup}>
              Donate
            </Button>
          </ButtonContainer>
        </WelcomeContent>
      </ContentContainer>

      {showPopup && <DonationPopup togglePopup={togglePopup} />}
    </Container>
  );
}

export default Welcome; 