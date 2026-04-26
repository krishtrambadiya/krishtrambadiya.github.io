import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertCircle, FileDown, ArrowRight } from 'lucide-react';

const ContactCard = ({ icon: Icon, label, value, href, isEmail }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = (e) => {
    if (isEmail) {
      e.preventDefault();
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.a
      href={href}
      target={isEmail ? "" : "_blank"}
      rel="noreferrer"
      onClick={handleClick}
      className="contact-card"
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      style={s_contactCard}
    >
      <div className="contact-card-indicator" />
      <div style={s_cardContent}>
        <div style={s_iconWrap}>
          <Icon size={20} color="var(--accent-orange)" />
        </div>
        <div style={s_cardText}>
          <div style={s_cardLabel}>{label}</div>
          <div style={s_cardValue}>{value}</div>
        </div>
        <div className="card-action">
          {copied ? <span style={{color: '#22c55e', fontSize: '0.8rem', fontWeight: 'bold'}}>Copied! ✓</span> : <ArrowRight size={16} className="card-arrow" />}
        </div>
      </div>
    </motion.a>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle, sending, success, error
  const [formError, setFormError] = useState('');
  const contactFormEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormState('sending');

    if (!contactFormEndpoint) {
      setFormState('error');
      setFormError('Contact form is not configured. Please set VITE_CONTACT_FORM_ENDPOINT.');
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setFormState('success');
      form.reset();
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormState('error');
      setFormError('Something went wrong while sending your message. Please try again.');
    }
  };

  return (
    <section style={s_section} id="contact">
      {/* Background Ambience */}
      <div style={s_bgDots} />
      <div style={s_bgGlowLeft} />
      <div style={s_gutterLine} />

      <div style={s_container}>
        
        {/* LEFT COLUMN */}
        <div style={s_leftCol}>
          <div style={s_headerBlock}>
            {/* Staggered text */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h2 
                initial={{ y: 100 }} whileInView={{ y: 0 }} viewport={{ once:true }} transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} 
                style={s_headline}
              >
                Let's Build
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2 
                initial={{ y: 100 }} whileInView={{ y: 0 }} viewport={{ once:true }} transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }} 
                style={{ ...s_headline, color: 'var(--accent-orange)' }}
              >
                Something.
              </motion.h2>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.2 }}
              style={s_subtext}
            >
              Open to full-time roles, freelance projects, and interesting collaborations. Let's talk.
            </motion.p>
          </div>

          <div style={s_cardsContainer}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }} transition={{ delay: 0.3 }}>
              <ContactCard icon={Mail} label="EMAIL" value="krishpatel3300@gmail.com" href="mailto:krishpatel3300@gmail.com" isEmail={true} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }} transition={{ delay: 0.38 }}>
              <ContactCard icon={Linkedin} label="LINKEDIN" value="krish-trambadiya" href="https://linkedin.com/in/krish-trambadiya-bb3064281" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }} transition={{ delay: 0.46 }}>
              <ContactCard icon={Github} label="GITHUB" value="krish-patel-33" href="https://github.com/krish-patel-33" />
            </motion.div>
          </div>

          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once:true }} transition={{ delay: 0.6 }}
            style={s_availabilityWrap}
          >
            <div style={s_sonarAnchor}>
              <div style={s_sonarDot} />
              <div className="sonar-ring ripple-1" />
              <div className="sonar-ring ripple-2" />
            </div>
            <span style={s_availabilityText}>Available for opportunities</span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (FORM) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }} transition={{ type: 'spring', damping: 20, delay: 0.3 }}
          style={s_rightCol}
        >
          <div className={`form-panel ${formState === 'error' ? 'error-shake' : ''}`}>
            
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={s_successScreen}
                >
                  <div className="success-svg-wrap">
                    <svg viewBox="0 0 50 50" className="check-svg">
                      <circle cx="25" cy="25" r="23" fill="none" className="check-circle" />
                      <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className="check-path" />
                    </svg>
                  </div>
                  <h3 style={{fontSize: '2rem', color:'var(--text-light)', marginTop:'20px'}}>Message Sent.</h3>
                  <p style={{color:'var(--text-muted)'}}>I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit} 
                  style={s_form}
                >
                  <h3 style={s_formTitle}>Send a Message</h3>
                  
                  <div className="input-group">
                    <input type="text" id="name" name="name" placeholder=" " required disabled={formState==='sending'} />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  
                  <div className="input-group">
                    <input type="email" id="email" name="email" placeholder=" " required disabled={formState==='sending'} />
                    <label htmlFor="email">Your Email</label>
                  </div>
                  
                  <div className="input-group">
                    <select id="subject" name="subject" required disabled={formState==='sending'} defaultValue="">
                      <option value="" disabled hidden></option>
                      <option value="job">Job Opportunity</option>
                      <option value="freelance">Freelance Project</option>
                      <option value="hello">Just Saying Hi</option>
                      <option value="collab">Collaboration</option>
                    </select>
                    <label htmlFor="subject">Subject</label>
                  </div>
                  
                  <div className="input-group">
                    <textarea id="message" name="message" rows="5" placeholder=" " required disabled={formState==='sending'}></textarea>
                    <label htmlFor="message">Your Message</label>
                  </div>

                  <motion.button 
                    whileHover={formState === 'idle' ? { scale: 1.02, filter: 'brightness(1.1)' } : {}}
                    whileTap={formState === 'idle' ? { scale: 0.97 } : {}}
                    className={`submit-btn ${formState}`}
                    disabled={formState !== 'idle'}
                  >
                    {formState === 'idle' && <>Send Message <Send size={18} /></>}
                    {formState === 'sending' && <><span className="spinner"></span> Sending...</>}
                  </motion.button>
                  
                  {formState === 'error' && (
                    <div style={s_errorText}><AlertCircle size={14}/> {formError || 'Something went wrong. Try emailing directly.'}</div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

          </div>

          {/* Social Row Beneath Form */}
          <div style={s_socialRow}>
            <a href="https://linkedin.com/in/krish-trambadiya-bb3064281" target="_blank" rel="noreferrer" className="social-icon-btn"><Linkedin size={20} /></a>
            <a href="https://github.com/krish-patel-33" target="_blank" rel="noreferrer" className="social-icon-btn"><Github size={20} /></a>
            <a href="mailto:krishpatel3300@gmail.com" className="social-icon-btn"><Mail size={20} /></a>
            <a href="/Resume_Krish_Trambadiya.pdf" download target="_blank" rel="noreferrer" className="social-icon-btn"><FileDown size={20} /></a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

/* --- STYLES --- */
const s_section = {
  padding: '120px 0',
  width: '100vw',
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
  opacity: 0.3,
  pointerEvents: 'none',
  zIndex: 0,
};

const s_bgGlowLeft = {
  position: 'absolute',
  bottom: '-10%',
  left: '-10%',
  width: '800px',
  height: '800px',
  background: 'radial-gradient(circle, rgba(232, 76, 30, 0.08) 0%, transparent 60%)',
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
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 60px 0 80px',
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '80px',
  flexWrap: 'wrap', // handles mobile stack implicitly if combined with media queries
};

const s_leftCol = {
  flex: '1 1 40%',
  display: 'flex',
  flexDirection: 'column',
  gap: '50px',
};

const s_headerBlock = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
};

const s_headline = {
  fontSize: 'clamp(4rem, 6vw, 5.5rem)',
  fontWeight: 900,
  lineHeight: '1',
  letterSpacing: '-2px',
  color: 'var(--text-light)',
};

const s_subtext = {
  fontSize: '1rem',
  color: 'var(--text-muted)',
  lineHeight: '1.6',
  marginTop: '20px',
  maxWidth: '90%',
  scrollMarginTop: '140px', // Leaves a comfortable gap from the top when anchor-linked
};

const s_cardsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const s_contactCard = {
  position: 'relative',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  padding: '20px 24px',
  display: 'block',
  textDecoration: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
};

const s_cardContent = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  position: 'relative',
  zIndex: 2,
};

const s_iconWrap = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const s_cardText = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const s_cardLabel = {
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  letterSpacing: '2px',
  fontWeight: 700,
};

const s_cardValue = {
  fontSize: '1rem',
  color: 'var(--text-light)',
  fontWeight: 600,
};

const s_availabilityWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  background: 'rgba(34, 197, 94, 0.05)',
  padding: '12px 24px',
  borderRadius: '40px',
  border: '1px solid rgba(34, 197, 94, 0.2)',
  width: 'fit-content',
  animation: 'float 6s ease-in-out infinite',
};

const s_sonarAnchor = {
  position: 'relative',
  width: '10px',
  height: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const s_sonarDot = {
  width: '8px',
  height: '8px',
  backgroundColor: '#22c55e',
  borderRadius: '50%',
  position: 'relative',
  zIndex: 3,
};

const s_availabilityText = {
  color: '#22c55e',
  fontWeight: 600,
  fontSize: '0.85rem',
};

const s_rightCol = {
  flex: '1 1 50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
};

const s_form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0px', // Handled by .input-group margin
};

const s_formTitle = {
  fontSize: '1.5rem',
  color: 'var(--text-light)',
  marginBottom: '30px',
};

const s_successScreen = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '400px',
  textAlign: 'center',
};

const s_errorText = {
  color: '#ef4444',
  fontSize: '0.85rem',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '16px',
  justifyContent: 'center',
};

const s_socialRow = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '10px',
};

/* --- INJECTED CSS OVERRIDES --- */
const styleOverrides = `
  @media (max-width: 900px) {
    .contact-container { flex-direction: column !important; }
    .contact-left, .contact-right { flex: 1 1 100% !important; min-width: 100%; }
  }

  .form-panel {
    background: rgba(26, 16, 8, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 12px;
    padding: 40px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }

  /* Contact Card Interactions */
  .contact-card-indicator {
    position: absolute;
    left: 0;
    top: -100%;
    width: 3px;
    height: 100%;
    background: var(--accent-orange);
    transition: top 0.3s ease;
  }
  .contact-card:hover .contact-card-indicator {
    top: 0;
  }
  .card-action {
    display: flex;
    align-items: center;
    color: var(--text-muted);
    transition: color 0.3s;
  }
  .card-arrow {
    transition: transform 0.3s, color 0.3s;
  }
  .contact-card:hover .card-action { color: var(--accent-orange); }
  .contact-card:hover .card-arrow { transform: translateX(4px); }

  /* Sonar Ripple */
  .sonar-ring {
    position: absolute;
    width: 24px;
    height: 24px;
    border: 1px solid #22c55e;
    border-radius: 50%;
    opacity: 0;
    z-index: 1;
  }
  .ripple-1 { animation: sonarEffect 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
  .ripple-2 { animation: sonarEffect 2s cubic-bezier(0, 0, 0.2, 1) infinite 1s; }
  @keyframes sonarEffect {
    0% { transform: scale(0.3); opacity: 0.8; }
    80% { transform: scale(2); opacity: 0; }
    100% { transform: scale(2.5); opacity: 0; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  /* Input Fields */
  .input-group {
    position: relative;
    margin-bottom: 24px;
    width: 100%;
  }
  .input-group input, .input-group textarea, .input-group select {
    width: 100%;
    background: #1a1008;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 16px 16px;
    color: white;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .input-group select {
    appearance: none;
    color: white;
  }
  /* Remove default blue background for autofill on webkit */
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 50px #1a1008 inset;
    -webkit-text-fill-color: white;
  }

  .input-group label {
    position: absolute;
    left: 16px;
    top: 16px;
    color: var(--text-muted);
    transition: all 0.2s ease-out;
    pointer-events: none;
    background: transparent;
  }

  .input-group input:focus, .input-group textarea:focus, .input-group select:focus {
    border-color: var(--accent-orange);
  }

  .input-group input:focus + label,
  .input-group input:not(:placeholder-shown) + label,
  .input-group textarea:focus + label,
  .input-group textarea:not(:placeholder-shown) + label,
  .input-group select:focus + label,
  .input-group select:valid + label {
    top: -10px;
    left: 12px;
    font-size: 0.75rem;
    background: #1a1008;
    padding: 0 4px;
    color: var(--accent-orange);
    font-weight: 600;
  }

  /* Submit Button */
  .submit-btn {
    width: 100%;
    padding: 16px;
    background: var(--accent-orange);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.3s;
  }
  .submit-btn.sending {
    background: transparent !important;
    border: 1px solid var(--accent-orange);
    color: var(--accent-orange);
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--accent-orange);
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin { 100% { transform: rotate(360deg); } }

  /* Form Error Shake */
  .error-shake {
    animation: horizontal-shaking 0.4s;
    border-color: rgba(239, 68, 68, 0.5) !important;
  }
  @keyframes horizontal-shaking {
    0% { transform: translateX(0) }
    25% { transform: translateX(5px) }
    50% { transform: translateX(-5px) }
    75% { transform: translateX(5px) }
    100% { transform: translateX(0) }
  }

  /* Success SVG Animation */
  .check-circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke: #22c55e;
    stroke-miterlimit: 10;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .check-path {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    stroke-width: 3;
    stroke: #22c55e;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
  }
  @keyframes stroke {
    100% { stroke-dashoffset: 0; }
  }

  /* Bottom Social Row */
  .social-icon-btn {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .social-icon-btn:hover {
    background: var(--accent-orange);
    border-color: var(--accent-orange);
    color: white;
    transform: scale(1.1);
  }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${styleOverrides}</style>`);

export default Contact;
