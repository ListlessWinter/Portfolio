import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Facebook, Instagram } from 'lucide-react';
import './App.css';

import homeBg from './assets/Home2.jpg';
// import aboutBg from './assets/About.jpg';
import projectBg from './assets/Project.jpg';
import contactBg from './assets/Contacts.jpg';
import sakuraBranchImg from './assets/sakura_branch.png';

import MouseParticles from './MouseParticles';
import SakuraParticles from './SakuraParticles';
import GlitchText from './GlitchText';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';

import catHome from './assets/cat_home.png';
import catAbout from './assets/cat_about.png';
import catWork from './assets/cat_work.png';
import catContact from './assets/cat_contact.png';

const catImages = {
  home: catHome,
  about: catAbout,
  work: catWork,
  contact: catContact,
};

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contacts' },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // References
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const leftBranchRef = useRef(null);
  const rightBranchRef = useRef(null);

  const navRefs = useRef([]);

  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Always start at the top on page refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

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
    if (isLoading) return;

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
  }, [isLoading]);

  // Branch Scroll Logic
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (workRef.current && leftBranchRef.current && rightBranchRef.current) {
            const workTop = workRef.current.getBoundingClientRect().top;

            // Keep branches fixed until work section hits the top of viewport
            let offsetY = 0;
            if (workTop < 0) {
              offsetY = workTop;
            }

            leftBranchRef.current.style.transform = `translate(-50%, -10%) translateY(${offsetY}px)`;
            rightBranchRef.current.style.transform = `scaleX(-1) translate(-50%, -10%) translateY(${offsetY}px)`;
          }

          // Calculate overall scroll progress for the navbar cat
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}

      {/* Background Container for Sections */}
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

        {/* Global Dark Gradient Overlay for better contrast */}
        <div className="bg-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className='navbar'>
        <div className="navbar-bg"></div>
        <div className="container navbar-content font-brush">
          <a href="#home" className="logo font-brush">
            Vincent Dolera
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
      <Hero ref={homeRef} />

      {/* About */}
      <section className="section" ref={aboutRef} id="about">
        <div className="container">
          <h2 className="section-title animate-on-scroll fade-up font-brush">About Me</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>

            {/* Bio Paragraph */}
            <p
              className="animate-on-scroll fade-up font-brush"
              style={{ fontSize: '1.2rem', color: '#d1d5db', marginBottom: '40px', lineHeight: '1.8', textAlign: 'center' }}
            >
              Motivated Information Technology graduate from Ateneo de Naga University with professional internship experience. Passionate about Fullstack Web and Mobile Development, with hands-on expertise in the MERN stack, Next.js, and Expo. Proficient in AI-driven development, using prompt engineering to speed up coding workflows, debug efficiently, and optimize logic. Adept at combining AI tools with modern frameworks and eager to continue building scalable, user-centric applications and expanding my technical skill set.
            </p>

            {/* Education & Hobbies */}
            <div className="about-grid" style={{ marginBottom: '40px' }}>
              <div className="about-column animate-on-scroll slide-from-left font-brush">
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px', borderBottom: '2px solid rgba(255, 0, 193, 0.5)', paddingBottom: '10px' }}>Education</h3>
                <ul className="info-list font-brush">
                  <li>
                    <strong>College:</strong> Bachelor of Science in Information Technology <br />Ateneo De Naga University (2022 - 2026)
                  </li>
                  <li style={{ marginTop: '15px' }}>
                    <strong>High School:</strong> La Consolacion College of Daet (2014 - 2020)
                  </li>
                </ul>
              </div>

              <div className="about-column animate-on-scroll slide-from-right font-brush">
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px', borderBottom: '2px solid rgba(255, 0, 193, 0.5)', paddingBottom: '10px' }}>Hobbies</h3>
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
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Frontend, Backend & AI Skills</h3>
          <div className="scroller font-brush" style={{ marginBottom: '30px' }}>
            <div className="scroller-inner font-brush">
              {[
                "Prompt Engineering", "AI-Assisted Dev", "React.js", "Next.js", "Expo", "React Native", "Flutter", "HTML", "CSS", "Figma", "Node.js", "Express.js", "Supabase", "SQL", "MongoDB", "Django", "JWT"
              ].map((skill, index) => (
                <div className="tech-item font-brush" key={index}>
                  {skill}
                </div>
              ))}
              {[
                "Prompt Engineering", "AI-Assisted Dev", "React.js", "Next.js", "Expo", "React Native", "Flutter", "HTML", "CSS", "Figma", "Node.js", "Express.js", "Supabase", "SQL", "MongoDB", "Django", "JWT"
              ].map((skill, index) => (
                <div className="tech-item font-brush" key={`duplicate-${index}`}>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Programming Languages</h3>
          <div className="scroller font-brush">
            <div className="scroller-inner-reverse font-brush">
              {[
                "JavaScript", "Java", "C", "C++", "Dart", "HTML", "CSS", "SQL"
              ].map((skill, index) => (
                <div className="tech-item font-brush" key={index}>
                  {skill}
                </div>
              ))}
              {[
                "JavaScript", "Java", "C", "C++", "Dart", "HTML", "CSS", "SQL"
              ].map((skill, index) => (
                <div className="tech-item font-brush" key={`duplicate-${index}`}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section">
        <div className="container">
          <h2 className="section-title animate-on-scroll fade-up font-brush">Experience</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="experience-section animate-on-scroll fade-up font-brush" style={{ marginBottom: '40px' }}>
              <div className="experience-item" style={{ marginBottom: '30px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ color: '#3b82f6', fontSize: '1.4rem', marginBottom: '5px' }}>UI/UX & Fullstack Web/Mobile Developer Intern</h4>
                <p style={{ color: '#a1a1aa', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '15px' }}>Bald Puppies Solutions Inc. | January 2026 – April 2026</p>
                <ul className="info-list font-brush" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Completed 486 hours of internship, developing and styling responsive frontend interfaces for web applications using React, Next.js, and CSS.</li>
                  <li>Built mobile applications using Expo and React Native. Transforming Figma UI designs into functional components.</li>
                  <li>Integrated backend services and APIs using Supabase and JWT, implementing secure user authentication, role management, and database connections.</li>
                  <li>Utilized AI tools to accelerate development processes, troubleshoot code, and enhance overall productivity.</li>
                </ul>
              </div>

              <div className="experience-item" style={{ marginBottom: '20px', textAlign: 'left', background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #ff00c1' }}>
                <h4 style={{ color: '#ff00c1', fontSize: '1.4rem', marginBottom: '5px' }}>AI Training Presentor</h4>

                <p style={{ color: '#a1a1aa', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '10px', marginTop: '15px' }}>Resource Speaker | Parochial School | February 2026</p>
                <ul className="info-list font-brush" style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
                  <li>Conducted an AI training seminar for school teachers, educating them on the practical applications and integration of artificial intelligence tools in their workflows.</li>
                </ul>

                <p style={{ color: '#a1a1aa', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '10px' }}>Resource Speaker | FJC RAELS FOOD SERVICE | March 2026</p>
                <ul className="info-list font-brush" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Served as a resource speaker on Artificial Intelligence, presenting on its practical applications and utility.</li>
                </ul>
              </div>
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
                      <Github size={18} style={{ marginRight: '8px' }} /> View Code
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
                        View Code <Github size={16} style={{ marginLeft: '5px' }} />
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

      {/* Sakura Branches (Global overlay on top of everything) */}
      <div className="sakura-wrapper branch-left visible" ref={leftBranchRef} style={{ transform: 'translate(-50%, -10%)' }}>
        <img src={sakuraBranchImg} alt="Sakura Branch" className="sakura-branch" />
      </div>
      <div className="sakura-wrapper branch-right visible" ref={rightBranchRef} style={{ transform: 'scaleX(-1) translate(-50%, -10%)' }}>
        <img src={sakuraBranchImg} alt="Sakura Branch" className="sakura-branch" />
      </div>

      {/* Foreground Sakura Particles */}
      <SakuraParticles zIndex={50} />
    </div>
  );
}

export default App;