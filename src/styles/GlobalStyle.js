import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled(Link)`
  position: fixed;
  top: 20px;
  left: 20px;
  text-decoration: none;
  color: black;
  font-size: 1.4rem;
  font-weight: normal;
  text-transform: lowercase;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 4px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    top: 15px;
    left: 15px;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    font-size: 16px;
    @media (max-width: 1024px) {
      font-size: 15px;
    }
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    overflow-x: hidden;
    touch-action: manipulation;
    position: fixed;
    width: 100%;
    height: 100%;
  }

  #root {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  button {
    font-family: inherit;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    
    &:focus {
      outline: none;
    }
  }

  input {
    font-family: inherit;
    -webkit-appearance: none;
    border-radius: 0;
    
    &:focus {
      outline: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  @media (hover: none) {
    button:hover {
      transform: none !important;
    }
  }

  @supports (-webkit-touch-callout: none) {
    body {
      min-height: -webkit-fill-available;
    }
  }
`;

export default GlobalStyle; 