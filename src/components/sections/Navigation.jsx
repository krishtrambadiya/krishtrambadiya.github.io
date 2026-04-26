import React from 'react';

const Navigation = () => {
  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const section = document.getElementById(targetId);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${targetId}`);
  };

  return (
    <nav style={navStyle} className="site-nav">
      <div style={brandContainerStyle} className="site-nav-brand">
        <div style={badgeStyle}>
          <span style={dotStyle}></span> SYSTEM ONLINE
        </div>
        {/* <h1 style={brandStyle}>
          <span style={{ color: '#E84C1E', marginRight: '8px' }}>●</span>
          KRISH TRAMBADIYA
        </h1> */}
      </div>
      <div style={linksContainerStyle} className="site-nav-links">
        <a href="#experience" className="nav-link" style={linkStyle} onClick={(event) => handleNavClick(event, 'experience')}>EXPERIENCE</a>
        <a href="#metrics" className="nav-link" style={linkStyle} onClick={(event) => handleNavClick(event, 'metrics')}>TECH STACK</a>
        <a href="#work" className="nav-link" style={linkStyle} onClick={(event) => handleNavClick(event, 'work')}>WORK</a>
        <a href="/Resume_Krish_Trambadiya.pdf" className="nav-resume" download target="_blank" rel="noreferrer" style={resumeButtonStyle}>RESUME</a>
      </div>
    </nav>
  );
};

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  padding: '40px 60px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  zIndex: 100,
};

const brandContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const badgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.75rem',
  letterSpacing: '2px',
  color: 'var(--text-muted)',
  fontFamily: 'monospace',
};

const dotStyle = {
  width: '6px',
  height: '6px',
  backgroundColor: '#22c55e',
  borderRadius: '50%',
  boxShadow: '0 0 10px #22c55e',
  animation: 'pulse 2s infinite',
};

const brandStyle = {
  fontSize: '1.8rem',
  fontWeight: 900,
  letterSpacing: '0.12em',
  color: '#FFFFFF',
  textShadow: '0 4px 15px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.8), 0 0 30px rgba(232,76,30,0.3)',
};

const linksContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
};

const linkStyle = {
  color: 'var(--text-light)',
  textDecoration: 'none',
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '1px',
  transition: 'color 0.3s',
};

const resumeButtonStyle = {
  textDecoration: 'none',
  background: 'transparent',
  border: '2px solid var(--accent-orange)',
  color: 'var(--accent-orange)',
  padding: '10px 24px',
  fontSize: '0.85rem',
  fontWeight: 700,
  letterSpacing: '1px',
  cursor: 'pointer',
  borderRadius: '2px',
  transition: 'all 0.3s',
};

// Add keyframes inline or in css
const navAnimations = `
@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}
.nav-link {
  transition: all 0.3s ease !important;
  position: relative;
  display: inline-block;
}
.nav-link:hover {
  color: #E84C1E !important;
  transform: translateY(-2px);
}
.nav-resume {
  transition: all 0.3s ease !important;
}
.nav-resume:hover {
  background: rgba(232, 76, 30, 0.1) !important;
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(232, 76, 30, 0.3);
}
@media (max-width: 900px) {
  .site-nav {
    padding: 18px 16px !important;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start !important;
  }
  .site-nav-links {
    width: 100%;
    gap: 12px !important;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .nav-link, .nav-resume {
    font-size: 0.75rem !important;
    letter-spacing: 0.6px !important;
  }
  .nav-resume {
    padding: 8px 14px !important;
  }
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${navAnimations}</style>`);

export default Navigation;
