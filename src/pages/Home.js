import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import DonationPopup from '../components/DonationPopup';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const PulsingBlob = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  background: rgb(255, 182, 193);
  border-radius: 50%;
  filter: blur(80px);
  animation: ${pulse} 4s ease-in-out infinite;
  z-index: 0;
  pointer-events: none;

  &:before {
    content: '';
    position: absolute;
    top: -20%;
    left: -20%;
    right: -20%;
    bottom: -20%;
    background: rgb(255, 192, 203);
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.8;
    animation: ${pulse} 4s ease-in-out infinite;
    animation-delay: -2s;
  }
`;

const Bubble = styled.div`
  position: absolute;
  background: rgba(255, 192, 203, 0.2);
  border: 2px solid rgba(255, 192, 203, 0.25);
  border-radius: 50%;
  pointer-events: none;
  animation: ${float} ${props => props.duration || '6s'} ease-in-out infinite;
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
  backdrop-filter: blur(2px);
`;

const Nav = styled.nav`
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 40px;
  position: relative;
  z-index: 2;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  text-transform: lowercase;
  position: relative;
  font-size: 0.9rem;
  opacity: 0.8;
  cursor: pointer;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #ff69b4;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  position: relative;
  z-index: 1;
  margin-top: -5%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
`;

const Est = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: normal;
  margin: 0;
  text-transform: lowercase;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -8px;
    left: 0;
    background: linear-gradient(90deg, transparent, #ff69b4, transparent);
  }
`;

const Year = styled.span`
  font-size: 1rem;
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  margin: 20px 0 40px;
  line-height: 1.6;
  max-width: 600px;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
`;

const StartButton = styled.button`
  background: white;
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  position: relative;
  color: black;
  box-shadow: 0 2px 10px rgba(255, 192, 203, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 192, 203, 0.4);
  }
`;

const CircleIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1.5px solid #ff69b4;
  border-radius: 50%;
  transition: transform 0.3s ease;

  ${StartButton}:hover & {
    transform: scale(1.1);
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  position: relative;
  z-index: 1;
  background: transparent;
  color: rgba(0, 0, 0, 0.7);
`;

function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Container>
      <PulsingBlob />
      <Nav>
        <NavLink to="/">home</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/privacy-policy">privacy policy</NavLink>
      </Nav>

      <MainContent>
        <Title>
          <Est>Est</Est>
          <Logo>pixelbooth</Logo>
          <Year>2025</Year>
        </Title>

        <Tagline>
          Capture the moment, cherish the magic,<br />
          relive the love
        </Tagline>

        <ButtonContainer>
          <StartButton onClick={() => navigate('/welcome')}>
            START <CircleIcon />
          </StartButton>
          <StartButton onClick={togglePopup}>
            DONATE
          </StartButton>
        </ButtonContainer>
      </MainContent>

      {showPopup && <DonationPopup togglePopup={togglePopup} />}

      <Footer>
        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          made by keshavpandey :^
        </p>
        <p>© 2025 Keshav Pandey. All Rights Reserved.</p>
      </Footer>
    </Container>
  );
}

export default Home; 