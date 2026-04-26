import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import { Terminal, Lightbulb, Workflow, Cpu, Layers } from 'lucide-react';

/* --- DATA --- */
const statsData = [
  { value: 2, suffix: '+', label: 'PRODUCTION PROJECTS', sub: 'Deployed full-stack apps' },
  { value: 3, suffix: 'mo', label: 'INDUSTRY EXP', sub: 'Azrio Tech' },
  { value: 10, suffix: '+', label: 'REST APIs BUILT', sub: 'across production apps' },
  { value: 8.38, suffix: '', decimals: 2, label: 'CGPA', sub: 'BSc IT · CHARUSAT' }
];

const techStack = {
  frontend: [
    { name: 'React.js', percent: 90 },
    { name: 'Next.js', percent: 80 },
    { name: 'TypeScript', percent: 75 },
    { name: 'Tailwind CSS', percent: 95 },
    { name: 'Three.js', percent: 60 }
  ],
  backend: [
    { name: 'Node.js', percent: 90 },
    { name: 'Express.js', percent: 88 },
    { name: 'REST APIs', percent: 92 },
    { name: 'JWT Auth', percent: 88 }
  ],
  database: [
    { name: 'MongoDB', percent: 90 },
    { name: 'Mongoose', percent: 88 },
    { name: 'PostgreSQL', percent: 65 },
    { name: 'Prisma ORM', percent: 75 },
    { name: 'Redis', percent: 55 }
  ],
  tools: [
    { name: 'Git', percent: 95 },
    { name: 'Docker', percent: 65 },
    { name: 'Postman', percent: 88 },
    { name: 'Vercel', percent: 92 },
    { name: 'VS Code', percent: 98 }
  ]
};

const learningPills = ['AWS', 'GraphQL', 'React Native', 'Microservices', 'Socket.io'];
const marqueeLogos = ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'TypeScript', 'Three.js', 'Tailwind', 'Docker', 'Git', 'Prisma', 'Vercel', 'Postman', 'JWT', 'Google Gemini', 'Recharts', 'Mongoose'];

/* --- SUB COMPONENTS --- */

// 1. Interactive 3D Stat Card
const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    // Calculate rotation (-6 to 6 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    
    // Calculate glare percentage
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", stiffness: 200, damping: 15, delay: 0.1 + (index * 0.08) 
      }}
      style={{ perspective: 1000, height: '100%' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05, zIndex: 10, borderColor: 'var(--accent-orange)' }}
        animate={{ 
          rotateX: rotate.x, 
          rotateY: rotate.y,
        }}
        transition={{ type: 'tween', duration: 0.1, ease: 'linear' }}
        style={s_statCard}
      >
        {/* Specular Glare Layer */}
        <div 
          style={{
            ...s_cardGlare,
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 90, 31, 1) 0%, transparent 60%)`
          }} 
        />
        
        <div style={s_statNumber}>
          <CountUp 
            end={stat.value} 
            decimals={stat.decimals || 0} 
            duration={2.5} 
            enableScrollSpy 
            scrollSpyOnce
          />
          <span style={s_statSuffix}>{stat.suffix}</span>
        </div>
        <div style={s_statLabel}>{stat.label}</div>
        <div style={s_statSub}>{stat.sub}</div>
      </motion.div>
    </motion.div>
  );
};

// 2. Skill Bar with flowing spark
const SkillBar = ({ item, index }) => {
  return (
    <div style={s_skillContainer}>
      <div style={s_skillHeader}>
        <span style={s_skillName}>{item.name}</span>
        <span style={s_skillPercent}>{item.percent}%</span>
      </div>
      <div style={s_barTrack}>
        <motion.div 
          initial={{ width: '0%' }}
          whileInView={{ width: `${item.percent}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 + (index * 0.06) }}
          style={s_barFill}
          className="skill-bar-fill"
        >
          {/* Edge Spark */}
          <div style={s_barSpark} />
        </motion.div>
      </div>
    </div>
  );
};

/* --- MAIN COMPONENT --- */
const Metrics = () => {
  return (
    <section style={s_section} id="metrics" className="metrics-section">
      {/* Background Dot Grid */}
      <div style={s_bgDots} />
      {/* Background Radial Glow */}
      <div style={s_bgGlow} />
      {/* Vertical Gutter Line */}
      <div style={s_gutterLine} />

      <div style={s_container} className="metrics-container">
        
        {/* ROW 1: Entry Sequence */}
        <div style={s_headerBlock}>
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={s_headline}
          >
            Metrics of<br />Execution.
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={s_terminalContainer}
            className="metrics-terminal"
          >
            <span style={{ color: '#E06C75' }}>&gt;</span> npm run build... <span style={{ color: '#98C379' }}>✓ compiled in 1.2s</span>
            <span className="terminal-cursor">_</span>
          </motion.div>
        </div>

        {/* ROW 2: Stats Row */}
        <div style={s_statsGrid} className="metrics-stats-grid">
          {statsData.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* ROW 3: Tech Stack Grid */}
        <div style={s_techStackWrapper} className="metrics-tech-grid">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once:true }} transition={{ delay: 0.5 }}>
            <h4 style={s_techColTitle}><Cpu size={16} /> FRONTEND</h4>
            {techStack.frontend.map((item, i) => <SkillBar key={item.name} item={item} index={i}/>)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once:true }} transition={{ delay: 0.6 }}>
            <h4 style={s_techColTitle}><Terminal size={16} /> BACKEND</h4>
            {techStack.backend.map((item, i) => <SkillBar key={item.name} item={item} index={i}/>)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once:true }} transition={{ delay: 0.7 }}>
            <h4 style={s_techColTitle}><Layers size={16} /> DATABASE</h4>
            {techStack.database.map((item, i) => <SkillBar key={item.name} item={item} index={i}/>)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once:true }} transition={{ delay: 0.8 }}>
            <h4 style={s_techColTitle}><Workflow size={16} /> TOOLS</h4>
            {techStack.tools.map((item, i) => <SkillBar key={item.name} item={item} index={i}/>)}
          </motion.div>
        </div>

        {/* ROW 4: Currently Learning */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 20, delay: 0.8 }}
          style={s_learningStrip}
          className="metrics-learning-strip"
        >
          <div style={s_learningLabel}><Lightbulb size={20} color="var(--accent-orange)" /> Currently Exploring:</div>
          <div style={s_pillContainer}>
            {learningPills.map((pill, i) => (
              <motion.div 
                key={pill} 
                className="learning-pill"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5, delay: 1 + (i * 0.1) }}
                style={s_pillWrap}
              >
                <div className="pill-inner">
                  <div className="pill-front">{pill}</div>
                  <div className="pill-back">Learning in progress...</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ROW 5: Tech Logo Marquee */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          style={s_marqueeContainer}
        >
          <div className="marquee-track">
            {marqueeLogos.concat(marqueeLogos).map((logo, i) => (
              <div key={i} className="marquee-item">
                {logo}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

/* --- STYLES --- */
const s_section = {
  padding: '100px 0',
  width: '100%',
  backgroundColor: 'var(--bg-dark)',
  position: 'relative',
  zIndex: 10,
  overflow: 'hidden',
};

const s_bgDots = {
  position: 'absolute',
  inset: 0,
  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
  opacity: 0.3, // "at 3% opacity" equivalent for visual balance
  pointerEvents: 'none',
  zIndex: 0,
};

const s_bgGlow = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60vw',
  height: '600px',
  background: 'radial-gradient(circle, rgba(255,90,31,0.05) 0%, transparent 60%)',
  pointerEvents: 'none',
  zIndex: 0,
};

const s_gutterLine = {
  position: 'absolute',
  left: '40px',
  top: 0,
  bottom: 0,
  width: '1px',
  background: 'linear-gradient(to bottom, transparent, var(--glass-border) 10%, var(--glass-border) 90%, transparent)',
  zIndex: 1,
};

const s_container = {
  maxWidth: '1300px',
  margin: '0 auto',
  padding: '0 60px 0 80px',
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: '80px',
};

const s_headerBlock = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const s_headline = {
  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
  fontWeight: 800,
  lineHeight: '1.05',
  letterSpacing: '-1.5px',
  color: 'var(--text-light)',
};

const s_terminalContainer = {
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid var(--glass-border)',
  borderRadius: '4px',
  padding: '12px 20px',
  fontFamily: 'monospace',
  fontSize: '0.85rem',
  color: '#A09E9C',
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const s_statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  width: '100%',
};

const s_statCard = {
  background: 'var(--bg-dark)',
  border: '1px solid var(--glass-border)',
  borderRadius: '8px',
  padding: '32px 24px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  transformStyle: 'preserve-3d',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
};

const s_cardGlare = {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 1,
  transition: 'opacity 0.2s',
};

const s_statNumber = {
  fontSize: '3.5rem',
  fontWeight: 900,
  lineHeight: '1',
  color: 'var(--text-light)',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'baseline',
  position: 'relative',
  zIndex: 2,
};

const s_statSuffix = {
  fontSize: '2rem',
  color: 'var(--accent-orange)',
};

const s_statLabel = {
  fontSize: '0.75rem',
  color: 'var(--accent-orange)',
  fontWeight: 700,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  position: 'relative',
  zIndex: 2,
};

const s_statSub = {
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  marginTop: '4px',
  position: 'relative',
  zIndex: 2,
};

const s_techStackWrapper = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '60px',
};

const s_techColTitle = {
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  letterSpacing: '2px',
  marginBottom: '24px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  borderBottom: '1px solid var(--glass-border)',
  paddingBottom: '12px',
};

const s_skillContainer = {
  marginBottom: '20px',
  cursor: 'default',
};

const s_skillHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
  fontSize: '0.85rem',
};

const s_skillName = {
  color: 'var(--text-light)',
  fontWeight: 600,
};

const s_skillPercent = {
  color: 'var(--text-muted)',
  fontFamily: 'monospace',
  transition: 'color 0.3s',
};

const s_barTrack = {
  width: '100%',
  height: '4px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '2px',
  position: 'relative',
  overflow: 'hidden',
};

const s_barFill = {
  height: '100%',
  background: 'var(--accent-orange)',
  borderRadius: '2px',
  position: 'relative',
};

const s_barSpark = {
  position: 'absolute',
  right: '0',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '4px',
  height: '8px',
  background: '#fff',
  boxShadow: '0 0 10px 2px var(--accent-orange)',
  borderRadius: '2px',
};

const s_learningStrip = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--glass-border)',
  borderLeft: '4px solid var(--accent-orange)',
  borderRadius: '8px',
  padding: '24px 32px',
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
};

const s_learningLabel = {
  color: 'var(--text-light)',
  fontWeight: 700,
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  whiteSpace: 'nowrap',
};

const s_pillContainer = {
  display: 'flex',
  gap: '16px',
  flexWrap: 'wrap',
};

const s_pillWrap = {
  perspective: 1000,
  width: '140px',
  height: '36px',
};

const s_marqueeContainer = {
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  padding: '20px 0',
  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
};

/* --- INLINE CSS OVERRIDES FOR COMPLEX INTERACTIONS --- */
const styleOverrides = `
  .terminal-cursor {
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .skill-bar-fill {
    transition: filter 0.3s;
  }
  .skill-container:hover .skill-bar-fill {
    filter: brightness(1.5);
    box-shadow: 0 0 15px rgba(255,90,31,0.5);
  }
  .skill-container:hover span:last-child { /* Targets percent text */
    color: var(--text-light) !important;
    transform: scale(1.1);
  }

  .pill-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    position: relative;
    cursor: pointer;
  }
  .learning-pill:hover .pill-inner {
    transform: rotateX(180deg);
  }
  .pill-front, .pill-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  .pill-front {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--glass-border);
    color: var(--text-muted);
  }
  .pill-back {
    background: rgba(255,90,31,0.1);
    border: 1px solid var(--accent-orange);
    color: var(--accent-orange);
    transform: rotateX(180deg);
    font-size: 0.7rem;
    text-align: center;
  }
  .pill-front::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 10px rgba(255,255,255,0);
    animation: gentle-pulse 3s infinite alternate;
  }
  @keyframes gentle-pulse {
    0% { box-shadow: 0 0 5px rgba(255,255,255,0); }
    100% { box-shadow: 0 0 15px rgba(255,255,255,0.1); }
  }

  .marquee-track {
    display: flex;
    gap: 40px;
    width: max-content;
    animation: scroll-left 40s linear infinite;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-item {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-muted);
    transition: all 0.3s ease;
    cursor: default;
    display: flex;
    align-items: center;
  }
  .marquee-item:hover {
    color: var(--accent-orange);
    transform: scale(1.2);
    text-shadow: 0 0 15px rgba(255,90,31,0.4);
  }
  
  /* Staggering the continuous pulse so they don't look uniform */
  .learning-pill:nth-child(1) .pill-front::after { animation-delay: 0s; }
  .learning-pill:nth-child(2) .pill-front::after { animation-delay: 0.6s; }
  .learning-pill:nth-child(3) .pill-front::after { animation-delay: 1.2s; }
  .learning-pill:nth-child(4) .pill-front::after { animation-delay: 1.8s; }
  .learning-pill:nth-child(5) .pill-front::after { animation-delay: 2.4s; }
`;
document.head.insertAdjacentHTML('beforeend', `<style>${styleOverrides}</style>`);

export default Metrics;
