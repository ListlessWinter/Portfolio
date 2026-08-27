import React, { useState, useRef } from 'react';
import GlitchText from '../GlitchText';
import profileImg from '../assets/gradphoto.jpg';
import cvFile from '../assets/Vincent_Dolera_CV.pdf';
import resumeFile from '../assets/Vincent_Dolera_Resume.pdf';

const Hero = React.forwardRef((props, ref) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: '' });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-15 to 15 degrees)
    const rotateY = -1 * ((rect.width / 2 - x) / 15);
    const rotateX = ((rect.height / 2 - y) / 15);
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    
    // Calculate glare position
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    
    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0, background: 'none' });
  };

  return (
    <header className="section hero-section" ref={ref} id="home">
      <div className="container grid-2">
        <div className="animate-on-scroll fade-up hero-content">
          <div style={{ marginBottom: '15px', display: 'inline-block' }}>
            <span className="tag font-brush">
              Welcome to my portfolio
            </span>
          </div>

          <h1 className="hero-heading font-brush">
            <GlitchText text="Hi, I'm Vincent Dolera." jpText="こんにちは、ヴィンセントです。" /> 
            <br /> 
            <GlitchText text="UI/UX & Fullstack Developer." jpText="UI/UX & フルスタック開発者。" />
          </h1>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '20px' }}>
            <a href="#contact" className="btn font-brush">
              Get in Touch
            </a>
            <a href={resumeFile} download="Vincent_Dolera_Resume.pdf" className="btn font-brush" style={{ background: 'rgba(0, 255, 249, 0.1)' }}>
              Resume
            </a>
            <a href={cvFile} download="Vincent_Dolera_CV.pdf" className="btn font-brush" style={{ background: 'rgba(255, 0, 193, 0.1)' }}>
              CV
            </a>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', transitionDelay: '200ms' }} className="animate-on-scroll fade-up">
          <div 
            className="hero-image-3d-wrapper"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              transform: transformStyle || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', 
              transition: transformStyle.includes('rotateX(0deg)') ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out' 
            }}
          >
            <div className="card-back"></div>
            <div className="main-img-wrapper">
              <img src={profileImg} alt="Vincent Dolera" className="hero-image" />
              <div className="glare" style={{ ...glareStyle, transition: glareStyle.opacity === 0 ? 'opacity 0.5s ease' : 'none' }}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Hero;
