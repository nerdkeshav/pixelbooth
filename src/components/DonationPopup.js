import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border: 2px solid #ff69b4;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 400px;
  width: calc(100% - 40px);
  text-align: center;

  @media (max-width: 480px) {
    padding: 20px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    
    @media (max-width: 480px) {
      font-size: 1.3rem;
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: #ff69b4;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    top: 5px;
    right: 5px;
  }
`;

const DonationLink = styled.a`
  display: inline-block;
  padding: 10px 25px;
  background: transparent;
  border: 2px solid #ff69b4;
  border-radius: 25px;
  color: #ff69b4;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #ff69b4;
    color: white;
  }

  @media (max-width: 480px) {
    padding: 8px 20px;
  }
`;

const DonationPopup = ({ togglePopup }) => (
  <>
    <Overlay onClick={togglePopup} />
    <PopupContainer>
      <CloseButton onClick={togglePopup}>&times;</CloseButton>
      <h2>Thank you for your support!</h2>
      <p>
        This site is free to use. If you like it and want to keep it running, please consider donating.
      </p>
      <DonationLink href="https://www.paypal.com/paypalme/nerdkeshav" target="_blank" rel="noopener noreferrer">
        PayPal 
      </DonationLink>
    </PopupContainer>
  </>
);

export default DonationPopup; 