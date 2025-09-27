import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: white;
  padding: 40px 20px;
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
  max-width: 800px;
  margin: 60px auto 0;
  padding: 40px;
  border: 1px solid black;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  font-weight: normal;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: normal;
`;

const Text = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

function PrivacyPolicy() {
  return (
    <Container>
      <Logo to="/">pixelbooth</Logo>
      
      <ContentContainer>
        <Title>privacy policy</Title>
        
        <Section>
          <SectionTitle>Data Collection</SectionTitle>
          <Text>
            pixelbooth does not collect or store any personal information. All photos 
            are processed locally in your browser and are never uploaded to any server.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Photo Storage</SectionTitle>
          <Text>
            Photos taken during your session are temporarily stored in your browser's 
            memory and are automatically deleted when you close the tab or navigate away.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Camera Access</SectionTitle>
          <Text>
            The application requires camera access to function. This access is only used 
            for taking photos and is not used for any other purpose. You can revoke 
            camera access at any time through your browser settings.
          </Text>
        </Section>
      </ContentContainer>
    </Container>
  );
}

export default PrivacyPolicy; 