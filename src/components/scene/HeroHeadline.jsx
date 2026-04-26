import React, { useEffect, useState } from 'react';
import { ArrowRight, Code } from 'lucide-react';

const HeroHeadline = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headlineStyle}>
        <div style={{ ...getStaggerStyle(loaded, 0), color: 'var(--accent-orange)' }}>Krish Trambadiya</div>
        <div style={getStaggerStyle(loaded, 1)}>Web Developer.</div>
      </h1>
      
      <p style={{...subtextStyle, ...getStaggerStyle(loaded, 3)}}>
        MERN Stack Developer architecting scalable, high-performance web applications.
      </p>

      <div style={{...buttonsContainerStyle, ...getStaggerStyle(loaded, 4)}}>
        <a href="#contact-intro" className="hero-btn" style={primaryButtonStyle}>
          Let's Connect <ArrowRight size={18} />
        </a>
        <a href="https://github.com/krish-patel-33" className="hero-btn-secondary" target="_blank" rel="noreferrer" style={secondaryButtonStyle}>
          View GitHub <Code size={18} />
        </a>
      </div>
    </div>
  );
};

const getStaggerStyle = (loaded, index) => ({
  opacity: loaded ? 1 : 0,
  transform: loaded ? 'translateY(0)' : 'translateY(40px)',
  filter: loaded ? 'blur(0)' : 'blur(10px)',
  transition: `all 0.8s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.1}s`,
});

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  zIndex: 10,
};

const headlineStyle = {
  fontSize: 'clamp(2.5rem, 5vw, 4rem)', // Reduced to allow top brand name to breathe
  fontWeight: 900,
  lineHeight: '1.05',
  letterSpacing: '-1px',
  display: 'flex',
  flexDirection: 'column',
};

const subtextStyle = {
  fontSize: '1.2rem',
  color: 'var(--text-muted)',
  maxWidth: '80%',
  lineHeight: '1.6',
  fontWeight: 300,
  letterSpacing: '0.5px',
};

const buttonsContainerStyle = {
  display: 'flex',
  gap: '20px',
  marginTop: '10px',
};

const primaryButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: 'var(--accent-orange)',
  color: '#fff',
  border: 'none',
  padding: '16px 32px',
  fontSize: '1rem',
  fontWeight: 700,
  borderRadius: '2px',
  cursor: 'pointer',
  transition: 'all 0.3s',
  boxShadow: '0 10px 30px rgba(255, 90, 31, 0.3)',
};

const secondaryButtonStyle = {
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: 'transparent',
  color: 'var(--text-light)',
  border: '1px solid var(--glass-border)',
  padding: '16px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: '2px',
  cursor: 'pointer',
  transition: 'all 0.3s',
};

// Add raw CSS for button hovers since style objects don't support pseudo-classes simply
const css = `
  .hero-btn { text-decoration: none; }
  .hero-btn:hover { 
    transform: translateY(-3px); 
    box-shadow: 0 15px 40px rgba(232, 76, 30, 0.4) !important; 
    filter: brightness(1.1); 
  }
  .hero-btn:active { transform: translateY(0); }
  
  .hero-btn-secondary:hover { 
    transform: translateY(-3px); 
    background: rgba(255, 255, 255, 0.05) !important; 
    border-color: rgba(255, 255, 255, 0.2) !important; 
  }
  .hero-btn-secondary:active { transform: translateY(0); }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

export default HeroHeadline;
