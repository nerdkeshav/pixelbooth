import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import GlobalStyle from './styles/GlobalStyle';
import Home from './pages/Home';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Welcome from './pages/Welcome';
import Customize from './pages/Customize';
import Canvas from './pages/Canvas';
import Result from './pages/Result';

const theme = {
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#ff69b4',
    text: '#000000',
    background: 'radial-gradient(circle, rgba(255,192,203,0.5) 0%, rgba(255,255,255,1) 100%)',
    pink: '#ffd1dc',
  },
  fonts: {
    main: "'Helvetica Neue', sans-serif",
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
      <Analytics />
    </ThemeProvider>
  );
}

export default App; 