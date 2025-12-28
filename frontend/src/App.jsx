import React, { useState, useEffect, useRef } from 'react';
// Note: If you created the SocialIcons.jsx file from the previous step, import from there.
// If not, keep importing from 'lucide-react' but ignore the warnings.
import { Github, Linkedin, Mail, ExternalLink, Facebook, Instagram } from 'lucide-react';
import './App.css';

// IMPORT YOUR IMAGE HERE
// (Ensure Profile.png is actually inside src/assets/)
import profileImg from './assets/Profile.png'; 

function App() {

  const [bgColor, setBgColor] = useState('#0f0f0f');

  // Refs for Scroll Detection
  const homeRef = useRef(null);
  const aboutRef = useRef(null); // New Ref for About Section
  const workRef = useRef(null);
  const contactRef = useRef(null);

  // Project Data
  const projects = [
    {
      id: 1,
      title: "YUMHUNT",
      category: "Mobile App (Flutter & Dart)",
      description: "A Food mobile App specifically made for ADNU.",
      image: "https://placehold.co/600x400/222/3b82f6?text=YumHunt"
    },
    {
      id: 2,
      title: "ADNU-ECO",
      category: "Web Dev (Django/HTML/CSS)",
      description: "Ecommerce website built for the ADNU community.",
      image: "https://placehold.co/600x400/222/3b82f6?text=ADNU-ECO"
    },
    {
      id: 3,
      title: "Chargeee!!!",
      category: "Game Dev (C Language)",
      description: "Text and turn-based game created using C with client and server side implementation.",
      image: "https://placehold.co/600x400/222/3b82f6?text=Chargeee"
    },
    {
      id: 4,
      title: "Simple Calculator",
      category: "Frontend (JS/HTML/CSS)",
      description: "A functional calculator web application built with vanilla JavaScript.",
      image: "https://placehold.co/600x400/222/3b82f6?text=Calculator"
    }
  ];

  useEffect(() => {
    // 1. Define colors for 4 sections now
    const sectionColors = [
      { ref: homeRef, color: '#0f0f0f' },   // Home: Deep Black
      { ref: aboutRef, color: '#18181b' },  // About: Zinc Gray (Slightly lighter)
      { ref: workRef, color: '#111827' },   // Work: Dark Blue/Gray
      { ref: contactRef, color: '#2a0a0a' },// Contact: Deep Red/Brown
    ];

    // 2. Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeSection = sectionColors.find((s) => s.ref.current === entry.target);
            if (activeSection) {
              setBgColor(activeSection.color);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // 3. Observe all refs
    sectionColors.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className='background-transition' style={{ backgroundColor: bgColor }} />

      {/* Navigation */}
      <nav className="container navbar">
        <a href="#home" className="logo">Vincent D.</a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#contact">Contacts</a>
        </div>
      </nav>

      {/* 1. HOME SECTION (Intro + Photo) */}
      <header className="section" ref={homeRef} id="home">
        <div className="container grid-2">
          <div>
            <span className="tag" style={{ marginBottom: '15px', display: 'inline-block' }}>
              Welcome to my portfolio
            </span>
            <h1 className="hero-heading">Hi, I'm Vincent Dolera. <br /> BS Information Technology.</h1>
            <a href="#contact" className="btn">Get in Touch</a>
          </div>
          
          {/* Image Section */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={profileImg} 
              alt="Vincent Dolera"
              className="hero-image"
            />
          </div>
        </div>
      </header>

      {/* 2. ABOUT SECTION (Bio & Details) */}
      <section className="section" ref={aboutRef} id="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: '#d1d5db', marginBottom: '30px', lineHeight: '1.8' }}>
              I am a responsible and motivated IT Student with experience in both 
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}> front-end</span> and 
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}> back-end</span> development. 
              Passionate about coding, problem-solving, and continuously learning new technologies.
            </p>

            {/* Optional: Interest Tags based on your CV */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <span className="tag" style={{ color: '#fff', borderColor: '#555' }}>🎮 Video Games</span>
              <span className="tag" style={{ color: '#fff', borderColor: '#555' }}>🤖 Model Kits</span>
              <span className="tag" style={{ color: '#fff', borderColor: '#555' }}>📚 Reading Novels</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section id="work" className="section" ref={workRef}>
        <div className="container">
          <h2 className="section-title">Projects</h2>

          <div className="grid-3">
            {projects.map((project) => (
              <div key={project.id} className="card fire-border">
                <img src={project.image} alt={project.title} className="card-image" />
                <div className="card-content">
                  <span className="tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="card-actions">
                    <a href="#" className="project-link">
                      View Project <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACTS SECTION */}
      <footer id="contact" className="section footer-section" ref={contactRef}>
        <div className="container footer-content">
          <h2 className="footer-title">Let's work together.</h2>
          <p className="footer-desc">
            Have a project in mind? Let's build something amazing.
          </p>
          <a href="mailto:vincentdolera25@gmail.com" className="btn">Say Hello</a>

          <div className="social-icons">
            <a href="https://github.com/ListlessWinter" target="_blank" rel="noopener noreferrer">
              <Github color="#a1a1aa" />
            </a>
            <a href="mailto:vincentdolera25@gmail.com">
              <Mail color="#a1a1aa" />
            </a>
            <a href="https://www.facebook.com/biboy.dolera" target="_blank" rel="noopener noreferrer">
              <Facebook color="#a1a1aa" />
            </a>
            <a href="https://www.instagram.com/memer.fluff/" target="_blank" rel="noopener noreferrer">
              <Instagram color="#a1a1aa" />
            </a>
          </div>
          <p className="copyright">
            © 2025 Vincent Dolera. Built with React.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;