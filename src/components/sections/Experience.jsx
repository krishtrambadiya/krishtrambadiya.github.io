import React from 'react';

const Experience = () => {
  return (
    <section style={sectionStyle} id="experience" className="experience-section">
      <div style={containerStyle} className="experience-container">
        
        {/* Experience Column */}
        <div style={colStyle}>
          <h3 style={colHeadingStyle}>Experience</h3>
          
          <div style={timelineContainerStyle}>
            {/* Timeline Line */}
            <div style={timelineLineStyle}></div>
            
            {/* Item 1 */}
            <div style={timelineItemStyle}>
              <div style={{...dotStyle, background: 'var(--accent-orange)', boxShadow: '0 0 10px var(--accent-orange)'}}></div>
              <div style={{...dateStyle, color: 'var(--accent-orange)'}}>2023 - PRESENT</div>
              <h4 style={roleStyle}>Web Developer Intern</h4>
              <div style={companyStyle}>@ Azrio Tech</div>
              <p style={descStyle}>
                Architected REST APIs, implemented secure JWT authentication, and developed responsive user interfaces using the MERN stack.
              </p>
              <div style={tagsContainerStyle}>
                <span style={tagStyle}>JWT</span>
                <span style={tagStyle}>REST API</span>
                <span style={tagStyle}>MONGODB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education Column */}
        <div style={colStyle}>
          <h3 style={colHeadingStyle}>Education</h3>
          
          <div style={timelineContainerStyle}>
            {/* Timeline Line */}
            <div style={timelineLineStyle}></div>
            
            {/* Item 1 */}
            <div style={timelineItemStyle}>
              <div style={dotStyle}></div>
              <div style={dateStyle}>CURRENT</div>
              <h4 style={roleStyle}>MCA</h4>
              <div style={companyStyle}>@ CHARUSAT</div>
              <p style={descStyle}>
                Master of Computer Applications. Focus on advanced software engineering and system architecture.
              </p>
            </div>

            {/* Item 2 */}
            <div style={timelineItemStyle}>
              <div style={dotStyle}></div>
              <div style={dateStyle}>COMPLETED</div>
              <h4 style={roleStyle}>BSc IT</h4>
              <p style={descStyle}>
                Bachelor of Science in Information Technology.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const sectionStyle = {
  padding: '60px',
  width: '100%',
  backgroundColor: 'var(--bg-dark)',
  position: 'relative',
  zIndex: 10,
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '100px',
  alignItems: 'start',
};

const colStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const colHeadingStyle = {
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: '40px',
  color: 'var(--text-light)',
};

const timelineContainerStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '50px',
};

const timelineLineStyle = {
  position: 'absolute',
  left: '4px',
  top: '8px',
  bottom: 0,
  width: '1px',
  background: 'var(--glass-border)',
};

const timelineItemStyle = {
  position: 'relative',
  paddingLeft: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const dotStyle = {
  position: 'absolute',
  left: 0,
  top: '6px',
  width: '9px',
  height: '9px',
  borderRadius: '50%',
  background: '#555', // Default gray dot
};

const dateStyle = {
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '1px',
  color: 'var(--text-muted)',
};

const roleStyle = {
  fontSize: '1.1rem',
  fontWeight: 700,
  color: 'var(--text-light)',
  marginTop: '4px',
};

const companyStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  marginBottom: '8px',
};

const descStyle = {
  fontSize: '0.9rem',
  color: 'var(--text-muted)',
  lineHeight: '1.6',
  fontWeight: 300,
  maxWidth: '90%',
};

const tagsContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '12px',
};

const tagStyle = {
  fontSize: '0.65rem',
  border: '1px solid var(--glass-border)',
  padding: '6px 12px',
  borderRadius: '2px',
  color: 'var(--text-muted)',
  letterSpacing: '1px',
};

export default Experience;
