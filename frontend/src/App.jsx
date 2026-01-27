import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Facebook, Instagram } from 'lucide-react';
import './App.css';
import profileImg from './assets/Profile.png';
import homeBg from './assets/Home2.jpg';
// import aboutBg from './assets/About.jpg';
import projectBg from './assets/Project.jpg';
import contactBg from './assets/Contacts.jpg';

import MouseParticles from './MouseParticles';
import SakuraParticles from './SakuraParticles';
import GlitchText from './GlitchText';


function App() {
  const [activeSection, setActiveSection] = useState('home');

  // References
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const navRefs = useRef([]);

  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Projects' },
    { id: 'contact', label: 'Contacts' },
  ];

  // Navbar bubble animation
  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.id === activeSection);
    const currentEl = navRefs.current[activeIndex];

    if (currentEl) {
      setBubbleStyle({
        left: currentEl.offsetLeft,
        width: currentEl.offsetWidth,
        opacity: 1
      });
    }
  }, [activeSection]);

  const handleHover = (index) => {
    const currentEl = navRefs.current[index];
    if (currentEl) {
      setBubbleStyle({
        left: currentEl.offsetLeft,
        width: currentEl.offsetWidth,
        opacity: 1
      });
    }
  };

  const handleMouseLeave = () => {
    const activeIndex = navLinks.findIndex(link => link.id === activeSection);
    const currentEl = navRefs.current[activeIndex];

    if (currentEl) {
      setBubbleStyle({
        left: currentEl.offsetLeft,
        width: currentEl.offsetWidth,
        opacity: 1
      });
    }
  };

  // Project Data
  const projects = [
    { id: 1, title: "SPARTA", category: "Web Dev (MERN)", description: "Sports Planning and Resource Tracking App.", image: "/Sparta.png", demoLink: "https://sparta-deployed.vercel.app/", repoLink: "https://github.com/ListlessWinter/SPARTA-DEPLOYED" },
    { id: 2, title: "PIMS", category: "Web Dev (MERN)", description: "Pharmacy Inventory Management System.", image: "https://placehold.co/600x400/222/3b82f6?text=PIMS", demoLink: "https://pims-d-f.vercel.app/", repoLink: "https://github.com/ListlessWinter/PIMS_D" },
    { id: 3, title: "IMSU", category: "Web Dev (JS/HTML/Css)", description: "Intramurals Management System for Universities", image: "/IMSU.png", demoLink: "https://vyv-imsu.vercel.app/", repoLink: "https://github.com/ListlessWinter/VYV-IMSU" },
    { id: 4, title: "Simple Calculator", category: "Frontend (JS/HTML/CSS)", description: "A functional calculator web application built with vanilla JavaScript.", image: "https://placehold.co/600x400/222/3b82f6?text=Calculator", demoLink: "https://sparta-live-demo.com", repoLink: "https://github.com/ListlessWinter/sparta" },
    { id: 5, title: "YUMHUNT", category: "Mobile App (Flutter & Dart)", description: "A Food mobile App specifically made for ADNU.", image: "/YumHunt.png", demoLink: "https://sparta-live-demo.com", repoLink: "https://github.com/ListlessWinter/YumHuntFileZero" },
    { id: 6, title: "ADNU-ECO", category: "Web Dev (Django/HTML/CSS)", description: "Ecommerce website built for the ADNU community.", image: "/ADNUeco.png", demoLink: "https://sparta-live-demo.com", repoLink: "https://github.com/ListlessWinter/ADNU-E-Commerce" },
    { id: 7, title: "Swiftly thread", category: "Web Dev(JS/HTML/CSS)", description: "A fan Taylor Swift tribute page.", image: "/Taylor.png", demoLink: "https://taylornation.web.app/?fbclid=IwY2xjawO_8DtleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEe7JaBY6l-HhPPy6mro6sc2jfriLcSYUNgppwOTdZHUDtIfhDgOLZAjbMaAoQ_aem_BdoBuaxpd3xbzqaejOBasg", repoLink: "https://github.com/ListlessWinter/TaylorNation" },
    { id: 8, title: "Chargeee!!!", category: "Text-Based Game (C Language)", description: "Text and turn-based game created using C with client and server side implementation.", image: "https://placehold.co/600x400/222/3b82f6?text=Chargeee", demoLink: "https://sparta-live-demo.com", repoLink: "https://github.com/ListlessWinter/OperatingSystems" },
  ];

  // Spliting the Projects
  const featuredProjects = projects.slice(0, 3);
  const otherProjects = projects.slice(3);

  // Background Transition
  useEffect(() => {
    const sections = [
      { id: 'home', ref: homeRef },
      { id: 'about', ref: aboutRef },
      { id: 'work', ref: workRef },
      { id: 'contact', ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visible = sections.find((s) => s.ref.current === entry.target);
            if (visible) {
              setActiveSection(visible.id);
            }
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Text Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          } else {
            entry.target.classList.remove('animate-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
     {/* Cool shitz */}
      <MouseParticles />
      <SakuraParticles />

      <div className="bg-container">
        {/* Home BgImage */}
        <img
          src={homeBg}
          className={`bg-image ${activeSection === 'home' ? 'visible' : ''}`}
          alt="Home Background"
        />

        {/* About BgImage */}
        <img
          src={homeBg}
          className={`bg-image ${activeSection === 'about' ? 'visible' : ''}`}
          alt="About Background"
        />

        {/* Project BgImage */}
        <img
          src={projectBg}
          className={`bg-image ${activeSection === 'work' ? 'visible' : ''}`}
          alt="Work Background"
        />

        {/* Contact BgImage */}
        <img
          src={contactBg}
          className={`bg-image ${activeSection === 'contact' ? 'visible' : ''}`}
          alt="Contact Background"
        />
      </div>

      {/* Navbar */}
      <nav className='navbar'>
        <div className="container navbar-content font-brush">
          <a href="#home" className="logo font-brush"><GlitchText 
              text="Vincent Dolera" 
              jpText="ヴィンセント・ドレラ" 
              style={{ minWidth: '220px' }} // Keeps navbar from jumping width
            />
          </a>

          <div className="nav-links" onMouseLeave={handleMouseLeave}>

            <div className="nav-bubble" style={bubbleStyle} />
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                ref={el => navRefs.current[index] = el}
                className={`nav-item ${activeSection === link.id ? 'active-text' : ''}`}
                onMouseEnter={() => handleHover(index)}
                onClick={() => setActiveSection(link.id)}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Home */}
      <header className="section" ref={homeRef} id="home">
  <div className="container grid-2">
    <div className="animate-on-scroll fade-up">
      
      {/* 1. Tagline Glitch */}
      <div style={{ marginBottom: '15px', display: 'inline-block' }}>
        <span className="tag font-brush">
          <GlitchText text="Welcome to my portfolio" jpText="ポートフォリオへようこそ" />
        </span>
      </div>

      {/* 2. Main Heading Glitch */}
      <h1 className="hero-heading font-brush">
        <GlitchText text="Hi, I'm Vincent Dolera." jpText="こんにちは、ヴィンセントです。" /> 
        <br /> 
        <GlitchText text="BS Information Technology." jpText="情報工学の学生。" />
      </h1>

      {/* 3. Button Glitch */}
      <a href="#contact" className="btn font-brush">
         <GlitchText text="Get in Touch" jpText="お問い合わせ" />
      </a>

    </div>
    
    <div style={{ display: 'flex', justifyContent: 'center', transitionDelay: '200ms' }} className="animate-on-scroll fade-up">
      <img src={profileImg} alt="Vincent Dolera" className="hero-image" />
    </div>
  </div>
</header>

      {/* About */}
      <section className="section" ref={aboutRef} id="about">
        <div className="container">
          <h2 className="section-title animate-on-scroll fade-up font-brush">About Me</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* Bio Paragraph */}
            <p
              className="animate-on-scroll fade-up font-brush"
              style={{ fontSize: '1.2rem', color: '#d1d5db', marginBottom: '30px', lineHeight: '1.8', textAlign: 'center' }}
            >
              I'm an IT student who enjoys turning ideas into reality through coding. I am responsible and motivated with experience in both
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}> front-end</span> and
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}> back-end</span> development.
              I stay passionate about coding, problem-solving, and continuously learning new technologies. I like to keep things simple and clean
              by writing a clean and well structured code.
            </p>

            {/* Education & Hobbies */}
            <div className="about-grid">
              <div className="about-column animate-on-scroll slide-from-left font-brush">
                <h3>Education:</h3>
                <ul className="info-list font-brush">
                  <li>
                    <strong>High School:</strong> La Consolacion College of Daet (2014 - 2019)
                  </li>
                  <li>
                    <strong>College:</strong> Ateneo De Naga University (2022 - Present)
                  </li>
                </ul>
              </div>

              <div className="about-column animate-on-scroll slide-from-right font-brush">
                <h3>Hobbies:</h3>
                <ul className="info-list font-brush">
                  <li>🎮 Playing Video Games</li>
                  <li>🤖 Building Plastic Model Kits </li>
                  <li>📚 Reading Manga and Novels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-section animate-on-scroll fade-up font-brush">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Technologies</h3>

          <div className="scroller font-brush">
            <div className="scroller-inner font-brush">
              {[
                "React.js", "Node.js", "JavaScript", "HTML", "CSS",
                "C Language", "C++", "Java", "Dart", "Flutter", "SQL", "Git"
              ].map((skill, index) => (
                <div className="tech-item font-brush" key={index}>
                  {skill}
                </div>
              ))}

              {[
                "React.js", "Node.js", "JavaScript", "HTML", "CSS",
                "C Language", "C++", "Java", "Dart", "Flutter", "SQL", "Git"
              ].map((skill, index) => (
                <div className="tech-item font-brush" key={`duplicate-${index}`}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Projects */}
     <section id="work" className="section" ref={workRef}>
        <div className="container">
          <h2 className="section-title font-brush">Latest Work</h2>

          {/* Latest Projects */}
          <div className="featured-list font-brush">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`featured-row ${index % 2 === 1 ? 'reverse' : ''} animate-on-scroll fade-up`}
              >
                <div className="featured-image-container">
                  {project.demoLink ? (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'block', width: '100%', height: '100%' }} 
                    >
                      <img src={project.image} alt={project.title} className="featured-image" />
                    </a>
                  ) : (
                    <img src={project.image} alt={project.title} className="featured-image" />
                  )}
                </div>
                
                <div className="featured-content">
                  <span className="tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn">
                      <Github size={18} style={{ marginRight: '8px' }}/> View Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <h3 className="section-title font-brush" style={{ fontSize: '1.5rem', marginTop: '80px' }}>More Projects</h3>
          <div className="grid-3 font-brush">
            {otherProjects.map((project, index) => (
              <div key={project.id} className="card fire-border animate-on-scroll fade-up"
                style={{ transitionDelay: `${index * 100}ms` }}>
                
                {project.demoLink ? (
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                     <img src={project.image} alt={project.title} className="card-image" />
                  </a>
                ) : (
                  <img src={project.image} alt={project.title} className="card-image" />
                )}

                <div className="card-content">
                  <span className="tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="card-actions">
      
                    {project.repoLink ? (
                      <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                        View Code <Github size={16} style={{ marginLeft: '5px' }}/>
                      </a>
                    ) : (
                      <span className="project-link" style={{ opacity: 0.5 }}>Private Repo</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <footer id="contact" className="section footer-section" ref={contactRef}>
        <div className="container footer-content font-brush">
          <h2 className="footer-title">Let's turn ideas into reality.</h2>
          <p className="footer-desc">Have a project in mind? Let's build something amazing.</p>
          <a href="mailto:vincentdolera25@gmail.com" className="btn">Say Hello</a>
          <div className="social-icons">
            <a href="https://github.com/ListlessWinter" target="_blank" rel="noopener noreferrer"><Github color="#a1a1aa" /></a>
            <a href="mailto:vincentdolera25@gmail.com"><Mail color="#a1a1aa" /></a>
            <a href="https://www.facebook.com/biboy.dolera" target="_blank" rel="noopener noreferrer"><Facebook color="#a1a1aa" /></a>
            <a href="https://www.instagram.com/memer.fluff/" target="_blank" rel="noopener noreferrer"><Instagram color="#a1a1aa" /></a>
          </div>
          <p className="copyright">© 2025 Vincent Dolera. Built with React.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;