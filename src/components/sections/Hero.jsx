import React, { useRef, useState, useEffect } from 'react';
import HeroHeadline from '../scene/HeroHeadline';
import Scene3D from '../scene/Scene3D';

const Hero = () => {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;
    const handleMouseMove = (e) => {
      if (scrolled) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10; // ±5 degrees
      const y = (e.clientY / innerHeight - 0.5) * -10;
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, scrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="hero-root"
      style={{
        ...heroStyle,
        transform: !isMobile && scrolled ? 'rotateX(10deg) translateZ(-500px) scale(0.9)' : 'none',
        opacity: !isMobile && scrolled ? 0.5 : 1,
      }}
    >
      {/* Decorative vertical lines on far left */}
      <div style={decorativeLineContainerStyle} className="hero-decor">
        <div style={verticalLineStyle}></div>
        <div style={tickContainerStyle}>
          <div style={tickStyle}><span>// REACT</span></div>
          <div style={tickStyle}><span>// NODE</span></div>
          <div style={tickStyle}><span>// MONGO</span></div>
          <div style={tickStyle}><span>// NEXT</span></div>
        </div>
      </div>

      <div style={contentGridStyle} className="hero-content-grid">
        <HeroHeadline />
        {!isMobile ? <Scene3D tilt={tilt} scrolled={scrolled} /> : null}
      </div>
    </div>
  );
};

const heroStyle = {
  height: '100vh',
  width: '100%',
  display: 'flex',
  position: 'relative',
  padding: '0 60px',
  transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s',
  transformStyle: 'preserve-3d',
  overflow: 'hidden',
};

const decorativeLineContainerStyle = {
  position: 'absolute',
  left: '40px',
  top: '30%',
  height: '40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const verticalLineStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '1px',
  background: 'var(--glass-border)',
};

const tickContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  paddingLeft: '1px',
};

const tickStyle = {
  position: 'relative',
  width: '12px',
  height: '1px',
  background: 'var(--glass-border)',
  display: 'flex',
  alignItems: 'center',
  '& span': {
    position: 'absolute',
    left: '20px',
    fontSize: '0.6rem',
    color: 'var(--text-muted)',
    letterSpacing: '2px',
    whiteSpace: 'nowrap',
    fontFamily: 'monospace',
  }
};

// Simple global CSS addition for the tick child spans since inline pseudos aren't standard
const css = `
.tick-container > div > span {
  position: absolute;
  left: 20px;
  font-size: 0.6rem;
  color: var(--text-muted);
  letter-spacing: 2px;
  white-space: nowrap;
  font-family: monospace;
}
@media (max-width: 900px) {
  .hero-root {
    min-height: 100vh;
    height: auto !important;
    padding: 92px 16px 24px !important;
    overflow: visible !important;
  }
  .hero-decor {
    display: none !important;
  }
  .hero-content-grid {
    grid-template-columns: 1fr !important;
    gap: 20px;
    padding-left: 0 !important;
    align-items: start !important;
  }
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

const contentGridStyle = {
  display: 'grid',
  gridTemplateColumns: '40% 1fr',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  paddingLeft: '100px', // Increased to clear side ticks
};

export default Hero;
