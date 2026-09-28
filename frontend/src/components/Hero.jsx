import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import GlitchText from '../GlitchText';
import profileImg from '../assets/gradphoto.jpg';
import cvFile from '../assets/Vincent_Dolera_CV.pdf';
import resumeFile from '../assets/Vincent_Dolera_Resume.pdf';
import { useMagnetic } from '../hooks/useInteractions';

const Hero = React.forwardRef(({ ready }, ref) => {
  const cardRef = useRef(null);
  const ctaRef = useMagnetic(0.35);

  // Tilt + glare driven by CSS variables so mouse movement doesn't re-render React
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--rx', `${(rect.height / 2 - y) / 15}deg`);
    card.style.setProperty('--ry', `${-(rect.width / 2 - x) / 15}deg`);
    card.style.setProperty('--gx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--gy', `${(y / rect.height) * 100}%`);
    card.classList.add('is-tilting');
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.classList.remove('is-tilting');
  };

  return (
    <header className={`section hero-section ${ready ? 'is-ready' : ''}`} ref={ref} id="home">
      <span className="hero-vertical font-brush" aria-hidden="true">フルスタック開発者</span>

      <div className="container hero-grid">
        <div className="hero-content">
          <span className="tag font-brush hero-in" style={{ '--d': 0 }}>
            ようこそ · Welcome to my portfolio
          </span>

          <h1 className="hero-heading font-brush">
            <span className="hero-line hero-in" style={{ '--d': 1 }}>
              <GlitchText text="Hi, I'm Vincent Dolera." jpText="こんにちは、ヴィンセントです。" />
            </span>
            <span className="hero-line hero-line-accent hero-in" style={{ '--d': 2 }}>
              <GlitchText text="UI/UX & Fullstack Developer." jpText="UI/UX & フルスタック開発者。" />
            </span>
          </h1>

          <p className="hero-hint font-brush hero-in" style={{ '--d': 3 }}>
            <span className="hint-dot" aria-hidden="true" />
            <span className="hint-hover">Hover</span>
            <span className="hint-tap">Tap</span>
            &nbsp;the heading to translate · 翻訳
          </p>

          <p className="hero-sub font-brush hero-in" style={{ '--d': 4 }}>
            IT graduate from Ateneo de Naga University, building web and mobile experiences
            with React, Next.js and Expo.
          </p>

          <div className="hero-actions hero-in" style={{ '--d': 5 }}>
            <a href="#contact" className="btn btn-primary font-brush" ref={ctaRef}>
              Get in Touch
            </a>
            <a href={resumeFile} download="Vincent_Dolera_Resume.pdf" className="btn btn-cyan font-brush">
              <Download size={16} aria-hidden="true" /> Resume
            </a>
            <a href={cvFile} download="Vincent_Dolera_CV.pdf" className="btn btn-magenta font-brush">
              <Download size={16} aria-hidden="true" /> CV
            </a>
          </div>
        </div>

        <div className="hero-visual hero-in" style={{ '--d': 2 }}>
          <div
            className="hero-image-3d-wrapper"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="card-back" />
            <div className="main-img-wrapper">
              <img src={profileImg} alt="Vincent Dolera" className="hero-image" />
              <div className="glare" />
            </div>
            <span className="hero-badge font-brush">
              <span className="hanko hanko-sm" aria-hidden="true">卒</span>
              BSIT · Class of 2026
            </span>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue font-brush hero-in" style={{ '--d': 6 }} aria-label="Scroll to About">
        <span>Scroll · スクロール</span>
        <span className="cue-line" aria-hidden="true" />
      </a>
    </header>
  );
});

export default Hero;
