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

const Text = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

function About() {
  return (
    <Container>
      <Logo to="/">pixelbooth</Logo>
      
      <ContentContainer>
        <Title>about</Title>
        <Text>
          pixelbooth is a free, open-source DIY pixelbooth solution created by 
          keshavpandey. This project aims to make photo booth experiences accessible 
          to everyone without any costs or subscriptions.
        </Text>
        <Text>
          The application is designed to be simple and intuitive, allowing anyone to 
          create memorable photo moments without the need for expensive equipment or 
          complicated setup.
        </Text>
        <Text>
          Built with modern web technologies, pixelbooth runs entirely in your browser, 
          ensuring your photos remain private and are never uploaded to any server.
        </Text>
      </ContentContainer>
    </Container>
  );
}

export default About; 