import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Facebook, Instagram } from 'lucide-react';
import './App.css';
import profileImg from './assets/Profile.png';
import homeBg from './assets/Home2.jpg';
// import aboutBg from './assets/About.jpg';
import projectBg from './assets/Project.jpg';
import contactBg from './assets/Contacts.jpg';
function App() {
  const [activeSection, setActiveSection] = useState('home');

  // References
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  // Project Data
  const projects = [
    { id: 1, title: "YUMHUNT", category: "Mobile App (Flutter & Dart)", description: "A Food mobile App specifically made for ADNU.", image: "https://placehold.co/600x400/222/3b82f6?text=YumHunt" },
    { id: 2, title: "ADNU-ECO", category: "Web Dev (Django/HTML/CSS)", description: "Ecommerce website built for the ADNU community.", image: "https://placehold.co/600x400/222/3b82f6?text=ADNU-ECO" },
    { id: 3, title: "Chargeee!!!", category: "Game Dev (C Language)", description: "Text and turn-based game created using C with client and server side implementation.", image: "https://placehold.co/600x400/222/3b82f6?text=Chargeee" },
    { id: 4, title: "Simple Calculator", category: "Frontend (JS/HTML/CSS)", description: "A functional calculator web application built with vanilla JavaScript.", image: "https://placehold.co/600x400/222/3b82f6?text=Calculator" },
    { id: 5, title: "SPARTA", category: "Frontend (JS/HTML/CSS)", description: "Sports Planning and Resource Tracking App.", image: "https://placehold.co/600x400/222/3b82f6?text=SPARTA" },
    { id: 6, title: "PIMS", category: "System (JS/HTML/CSS)", description: "Pharmacy Inventory Management System.", image: "https://placehold.co/600x400/222/3b82f6?text=PIMS" },
    { id: 7, title: "Intramurals System", category: "System (JS/HTML/CSS)", description: "Management System for Universities.", image: "https://placehold.co/600x400/222/3b82f6?text=IMS" },
    { id: 8, title: "Taylor Swift Fan Page", category: "Frontend (JS/HTML/CSS)", description: "A fan tribute page.", image: "https://placehold.co/600x400/222/3b82f6?text=Taylor+Swift" },
  ];

  // Spliting the Projects
  const featuredProjects = projects.slice(0, 3);
  const otherProjects = projects.slice(3);

  // Background Transition
  useEffect(() => {
    const sections = [
      { id: 'home', ref: homeRef },
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
     <div className="bg-container">
        {/* Home Image */}
        <img 
          src={homeBg} 
          className={`bg-image ${activeSection === 'home' ? 'visible' : ''}`}
          alt="Home Background" 
        />
        
        {/* Project Image */}
        <img 
          src={projectBg} 
          className={`bg-image ${activeSection === 'work' ? 'visible' : ''}`}
          alt="Work Background" 
        />

        {/* Contact Image */}
        <img 
          src={contactBg} 
          className={`bg-image ${activeSection === 'contact' ? 'visible' : ''}`}
          alt="Contact Background" 
        />
      </div>

      <nav className='navbar'>
        <div className="container navbar-content">
          <a href="#home" className="logo">Vincent Dolera</a>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#work">Projects</a>
            <a href="#contact">Contacts</a>
          </div>
        </div>
      </nav>

      {/* Home */}
      <header className="section" ref={homeRef} id="home">
        <div className="container grid-2">
          <div className="animate-on-scroll fade-up">
            <span className="tag" style={{ marginBottom: '15px', display: 'inline-block' }}>
              Welcome to my portfolio
            </span>
            <h1 className="hero-heading">Hi, I'm Vincent Dolera. <br /> BS Information Technology.</h1>
            <a href="#contact" className="btn">Get in Touch</a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', transitionDelay: '200ms' }} className="animate-on-scroll fade-up">
            <img src={profileImg} alt="Vincent Dolera" className="hero-image" />
          </div>
        </div>
      </header>

      {/* About */}
      <section className="section" ref={aboutRef} id="about">
        <div className="container">
          <h2 className="section-title animate-on-scroll fade-up">About Me</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* Bio Paragraph - Fades Up */}
            <p 
              className="animate-on-scroll fade-up" 
              style={{ fontSize: '1.2rem', color: '#d1d5db', marginBottom: '30px', lineHeight: '1.8', textAlign: 'center' }}
            >
              I'm an IT student who enjoys turning ideas into reality through coding. I am responsible and motivated with experience in both
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}> front-end</span> and
              <span style={{ color: '#3b82f6', fontWeight: 'bold' }}> back-end</span> development.
              I stay passionate about coding, problem-solving, and continuously learning new technologies. I like to keep things simple and clean
              by writing a clean and well structured code.
            </p>

            {/* Education & Hobbies (Existing Animations) */}
            <div className="about-grid">
              <div className="about-column animate-on-scroll slide-from-left">
                <h3>Education:</h3>
                <ul className="info-list">
                  <li>
                    <strong>Elementary:</strong> Sunny Garden School for Kids (2008 - 2013)
                  </li>
                  <li>
                    <strong>High School:</strong> La Consolacion College of Daet (2014 - 2019)
                  </li>
                </ul>
              </div>

              <div className="about-column animate-on-scroll slide-from-right">
                <h3>Hobbies:</h3>
                <ul className="info-list">
                  <li>🎮 Playing Video Games</li>
                  <li>🤖 Building Plastic Model Kits </li>
                  <li>📚 Reading Manga and Novels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Section - Fades Up */}
        <div className="tech-section animate-on-scroll fade-up">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Technologies</h3>

          <div className="scroller">
            <div className="scroller-inner">
              {[
                "React.js", "Node.js", "JavaScript", "HTML", "CSS",
                "C Language", "C++", "Java", "Dart", "Flutter", "SQL", "Git"
              ].map((skill, index) => (
                <div className="tech-item" key={index}>
                  {skill}
                </div>
              ))}

              {[
                "React.js", "Node.js", "JavaScript", "HTML", "CSS",
                "C Language", "C++", "Java", "Dart", "Flutter", "SQL", "Git"
              ].map((skill, index) => (
                <div className="tech-item" key={`duplicate-${index}`}>
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
          <h2 className="section-title">Latest Work</h2>

          {/* Latest Projects */}
          <div className="featured-list">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`featured-row ${index % 2 === 1 ? 'reverse' : ''} animate-on-scroll fade-up`}
              >
                <div className="featured-image-container">
                  <img src={project.image} alt={project.title} className="featured-image" />
                </div>
                <div className="featured-content">
                  <span className="tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href="#" className="btn">View Case Study</a>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <h3 className="section-title" style={{ fontSize: '1.5rem', marginTop: '80px' }}>More Projects</h3>
          <div className="grid-3">
            {otherProjects.map((project, index) => (
              <div key={project.id} className="card fire-border animate-on-scroll fade-up"
              style={{ transitionDelay: `${index * 100}ms` }}>
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

      {/* Contacts */}
      <footer id="contact" className="section footer-section" ref={contactRef}>
        <div className="container footer-content">
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