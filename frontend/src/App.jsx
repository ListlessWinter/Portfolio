import { useState, useEffect, useRef } from 'react';
import './App.css';

import homeBg from './assets/Home2.jpg';
import projectBg from './assets/Project.jpg';
import contactBg from './assets/Contacts.jpg';

import SakuraParticles from './SakuraParticles';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SpiritBranches from './components/SpiritBranches';
import BackToTop from './components/BackToTop';

// Which background image each section shows
const backgrounds = [
  { src: homeBg, sections: ['home', 'about', 'experience'] },
  { src: projectBg, sections: ['work'] },
  { src: contactBg, sections: ['contact'] },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isReady, setIsReady] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  // Always start at the top on page refresh
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Track the section crossing the middle of the viewport
  useEffect(() => {
    const sections = [
      { id: 'home', ref: homeRef },
      { id: 'about', ref: aboutRef },
      { id: 'experience', ref: experienceRef },
      { id: 'work', ref: workRef },
      { id: 'contact', ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const visible = sections.find((s) => s.ref.current === entry.target);
          if (visible) setActiveSection(visible.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });
    return () => observer.disconnect();
  }, []);

  // Reveal-on-scroll (plays once per element)
  useEffect(() => {
    if (!isReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isReady]);

  // Page scroll progress as a CSS variable (navbar line + back-to-top ring), no re-renders
  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      document.documentElement.style.setProperty('--scroll', progress.toFixed(4));
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={`App ${isReady ? 'is-ready' : 'is-loading'}`}>
      <LoadingScreen onLoadingComplete={() => setIsReady(true)} />

      {/* Background layer: images crossfade per section */}
      <div className="bg-container" aria-hidden="true">
        {backgrounds.map((bg) => (
          <img
            key={bg.src}
            src={bg.src}
            alt=""
            className={`bg-image ${bg.sections.includes(activeSection) ? 'visible' : ''}`}
          />
        ))}
        <div className="bg-overlay" />
      </div>

      {/* Petals behind the content */}
      <SakuraParticles />

      <Navbar activeSection={activeSection} />

      <main>
        <Hero ref={homeRef} ready={isReady} />
        <About ref={aboutRef} />
        <Experience ref={experienceRef} />
        <Projects ref={workRef} />
      </main>

      <Contact ref={contactRef} />

      {/* Sakura branches that become will-o'-wisps at the Projects section */}
      <SpiritBranches triggerRef={workRef} />

      {/* Foreground petals */}
      <SakuraParticles zIndex={50} />

      <div className="grain" aria-hidden="true" />
      <BackToTop />
    </div>
  );
}

export default App;
