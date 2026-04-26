import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle} className="footer-section">
      <div style={containerStyle}>
        
        {/* Massive CTA */}
        <h2 style={headlineStyle}>
          Let's Build<br />
          <span style={{ color: 'var(--accent-orange)' }}>Something.</span>
        </h2>

        {/* Links */}
        <div style={linksContainerStyle}>
          <a href="https://www.linkedin.com/in/krish-trambadiya-bb3064281/" target="_blank" rel="noreferrer" style={linkStyle}>LINKEDIN</a>
          <a href="https://github.com/krish-patel-33" target="_blank" rel="noreferrer" style={linkStyle}>GITHUB</a>
          <a href="mailto:krishpatel3300@gmail.com" style={linkStyle}>EMAIL</a>
          <a href="/Resume_Krish_Trambadiya.pdf" download target="_blank" rel="noreferrer" style={linkStyle}>RESUME</a>
        </div>

        {/* Branding */}
        <h3 style={brandStyle}>KRISH T.</h3>

        {/* Copyright */}
        <div style={copyrightStyle}>
          © 2024 KRISH TRAMBADIYA. ARCHITECTING DIGITAL EXCELLENCE.
        </div>

      </div>
    </footer>
  );
};

const footerStyle = {
  padding: '120px 20px 60px',
  width: '100%',
  backgroundColor: 'var(--bg-dark)',
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  maxWidth: '800px',
  width: '100%',
};

const headlineStyle = {
  fontSize: 'clamp(4rem, 10vw, 8rem)',
  fontWeight: 900,
  lineHeight: '1.05',
  letterSpacing: '-2px',
  marginBottom: '80px',
};

const linksContainerStyle = {
  display: 'flex',
  gap: '40px',
  marginBottom: '80px',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const linkStyle = {
  color: 'var(--text-muted)',
  textDecoration: 'none',
  fontSize: '0.85rem',
  fontWeight: 700,
  letterSpacing: '2px',
  transition: 'color 0.3s',
};

const brandStyle = {
  fontSize: '2.5rem',
  fontWeight: 900,
  letterSpacing: '-1px',
  color: 'var(--text-light)',
  marginBottom: '30px',
};

const copyrightStyle = {
  fontSize: '0.65rem',
  color: 'var(--text-muted)',
  letterSpacing: '2px',
  fontWeight: 600,
  paddingTop: '30px',
  borderTop: '1px solid var(--glass-border)',
  width: '100%',
};

const css = `
  footer a:hover {
    color: var(--accent-orange) !important;
  }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

export default Footer;
