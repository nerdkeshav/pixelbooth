import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin: 10px 0;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 24px;
  opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.8;
  font-size: 0.9rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>pixelbooth</h3>
          <p>Creating lasting memories at your special events</p>
          <SocialLinks>
            <SocialIcon href="#" target="_blank">FB</SocialIcon>
            <SocialIcon href="#" target="_blank">IG</SocialIcon>
            <SocialIcon href="#" target="_blank">TW</SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/gallery">Gallery</FooterLink>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <p>Email: info@pixelbooth.com</p>
          <p>Phone: (123) 456-7890</p>
          <p>Address: 123 Photo Street, City, State 12345</p>
        </FooterSection>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} pixelbooth. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer; 