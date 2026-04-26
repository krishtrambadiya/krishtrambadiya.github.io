import React, { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import HolographicElements from './HolographicElements';
import ParticleField from './ParticleField';
import LightingAndAtmosphere from './LightingAndAtmosphere';

const Scene3D = ({ tilt, scrolled }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Snap-in assembly animation trigger
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={sceneContainerStyle} className="hero-scene">
      {/* Background radial primary glow */}
      <LightingAndAtmosphere />
      
      {/* Parallax elements Container */}
      <div 
        style={{
          ...parallaxContainerStyle,
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
        }}
        className="hero-parallax-container"
      >
        <ParticleField />
        
        <div style={assemblyWrapperStyle(loaded)}>
          {/* Main floating 3D Window */}
          <CodeEditor />
          {/* Elements floating from the editor into Z space */}
          <HolographicElements tilt={tilt} />
        </div>
      </div>
      
      {/* Depth fog overlay (behind headline) */}
      <div style={fogStyle}></div>

      {/* Compile Status Widget */}
      <div style={{...statusWidgetStyle, opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)'}} className="hero-status-widget">
        <div style={statusDotStyle}></div>
        COMPILE STATUS: OK
      </div>


    </div>
  );
};

const sceneContainerStyle = {
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  perspective: '1400px', // Creates the deep 3D space
  zIndex: 1,
};

const parallaxContainerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.1s ease-out', // Smooth parallax transition
};

const assemblyWrapperStyle = (loaded) => ({
  position: 'relative',
  transformStyle: 'preserve-3d',
  transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
  transform: loaded ? 'scale(1) translateZ(0)' : 'scale(0.8) translateZ(-200px)',
  opacity: loaded ? 1 : 0,
});

const fogStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  background: 'radial-gradient(circle at 60% 50%, transparent 20%, var(--bg-dark) 100%)',
  zIndex: 5,
};

const statusWidgetStyle = {
  position: 'absolute',
  bottom: '40px',
  right: '40px',
  background: 'var(--glass-bg)',
  border: '1px solid var(--glass-border)',
  backdropFilter: 'blur(10px)',
  padding: '12px 20px',
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '0.7rem',
  letterSpacing: '1px',
  fontFamily: 'monospace',
  color: 'var(--text-muted)',
  transition: 'all 0.5s 0.8s', // Delayed fade in
  zIndex: 10,
};

const statusDotStyle = {
  width: '8px',
  height: '8px',
  backgroundColor: '#22c55e',
  borderRadius: '50%',
  boxShadow: '0 0 10px #22c55e',
};

const statWidgetStyle = {
  position: 'absolute',
  top: '120px',
  right: '40px',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  background: 'rgba(20, 20, 20, 0.9)',
  border: '1px solid var(--accent-orange)',
  padding: '16px 20px',
  borderRadius: '8px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  backdropFilter: 'blur(10px)',
  transition: 'opacity 0.8s 0.5s',
  zIndex: 10,
};

const reactWrapStyle = {
  width: '46px',
  height: '46px',
  borderRadius: '50%',
  border: '1px solid var(--accent-orange)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const reactLogoContainerStyle = {
  width: '32px',
  height: '32px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: 'spin 8s linear infinite',
};

const reactCoreStyle = {
  width: '6px',
  height: '6px',
  backgroundColor: '#61DAFB',
  borderRadius: '50%',
  boxShadow: '0 0 8px #61DAFB',
};

const reactEllipseStyle = {
  position: 'absolute',
  width: '100%',
  height: '35%',
  border: '1px solid #61DAFB',
  borderRadius: '50%',
  boxShadow: 'inset 0 0 5px rgba(97,218,251,0.2), 0 0 5px rgba(97,218,251,0.2)',
};

const statNumberStyle = {
  fontSize: '2rem',
  fontWeight: 900,
  color: 'var(--text-light)',
  lineHeight: '1',
  letterSpacing: '1px',
};

const statLabelStyle = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  letterSpacing: '2px',
  fontWeight: 700,
  marginTop: '4px'
};

const styles = `
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
`;

// Inject keyframes safely
if (typeof document !== 'undefined' && !document.getElementById('scene-animations')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'scene-animations';
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

export default Scene3D;
