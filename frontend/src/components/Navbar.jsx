import React, { useState, useEffect, useRef } from 'react';
import GlitchText from '../GlitchText';
import catHome from '../assets/cat_home.png';
import catAbout from '../assets/cat_about.png';
import catWork from '../assets/cat_work.png';
import catContact from '../assets/cat_contact.png';

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

const Navbar = ({ activeSection, setActiveSection }) => {
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRefs = useRef([]);


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

  return (
    <nav className='navbar'>
      <div className="container navbar-content">
        <a href="#home" className="logo">
          Vincent Dolera
        </a>

        <div className="nav-links font-brush" onMouseLeave={handleMouseLeave}>
          {/* The Cat that follows the active section */}
          <img 
            src={catImages[activeSection] || catHome} 
            className="nav-cat"
            style={{
              left: bubbleStyle.width > 0 ? bubbleStyle.left + (bubbleStyle.width / 2) - 25 : 0
            }}
            alt="playing cat"
          />

          <div className="nav-bubble" style={bubbleStyle} />
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              ref={el => navRefs.current[index] = el}
              className={`nav-item font-brush ${activeSection === link.id ? 'active-text' : ''}`}
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
  );
};

export default Navbar;
