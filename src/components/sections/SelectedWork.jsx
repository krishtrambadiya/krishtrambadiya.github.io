import React from 'react';

const SelectedWork = () => {
  return (
    <section style={sectionStyle} id="work" className="work-section">
      <div style={containerStyle} className="work-container">
        
        <h3 style={sectionHeadingStyle}>Selected Work</h3>
        
        <div style={projectsGridStyle} className="work-grid">
          
          {/* Project 1 */}
          <div style={projectCardStyle} className="project-card">
            <div style={imageWrapperStyle}>
              <img src="/virtue_view_portfolio.png" alt="Virtue_View" style={imageStyle} />
            </div>
            
            <div style={projectContentStyle}>
              <h4 style={projectTitleStyle}>Virtue_View</h4>
              <p style={projectDescStyle}>
                Real Estate platform with 3D virtual tours and Role-Based Access Control.
              </p>
              <div style={tagsContainerStyle}>
                <span style={tagStyle}>REACT</span>
                <span style={tagStyle}>NODE.JS</span>
                <span style={tagStyle}>MONGODB</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div style={{...projectCardStyle, marginTop: '80px'}} className="project-card project-card-offset">
            <div style={imageWrapperStyle}>
              <img src="/welthos_portfolio.png" alt="Welthos" style={imageStyle} />
            </div>
            
            <div style={projectContentStyle}>
              <h4 style={projectTitleStyle}>Welthos</h4>
              <p style={projectDescStyle}>
                AI-powered finance application featuring Gemini AI integration and interactive charts.
              </p>
              <div style={tagsContainerStyle}>
                <span style={tagStyle}>NEXT.JS</span>
                <span style={tagStyle}>PRISMA</span>
                <span style={tagStyle}>GEMINI AI</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

const sectionStyle = {
  padding: '120px 60px',
  width: '100%',
  backgroundColor: 'var(--bg-dark)',
  position: 'relative',
  zIndex: 10,
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const sectionHeadingStyle = {
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: '60px',
  color: 'var(--text-light)',
};

const projectsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  alignItems: 'start',
};

const projectCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.01)',
  border: '1px solid var(--glass-border)',
  transition: 'transform 0.4s ease',
  cursor: 'pointer',
};

const imageWrapperStyle = {
  width: '100%',
  height: '300px',
  overflow: 'hidden',
  background: 'var(--editor-bg)',
  borderBottom: '1px solid var(--glass-border)',
};

const placeholderImageStyle = {
  width: '100%',
  height: '100%',
  background: 'linear-gradient(45deg, #1A1A1A, #2A2A2A)',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const projectContentStyle = {
  padding: '40px 30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const projectTitleStyle = {
  fontSize: '1.4rem',
  fontWeight: 800,
  color: 'var(--text-light)',
};

const projectDescStyle = {
  fontSize: '1rem',
  color: 'var(--text-muted)',
  lineHeight: '1.6',
  fontWeight: 300,
};

const tagsContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
  flexWrap: 'wrap',
};

const tagStyle = {
  fontSize: '0.65rem',
  border: '1px solid var(--glass-border)',
  padding: '6px 14px',
  borderRadius: '2px',
  color: 'var(--text-muted)',
  letterSpacing: '1px',
};

const css = `
  .project-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.03);
  }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

export default SelectedWork;
