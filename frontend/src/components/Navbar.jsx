import React, { useState, useEffect, useRef, useCallback } from 'react';

const navLinks = [
  { id: 'home', label: 'Home', jp: 'ホーム', kanji: '序' },
  { id: 'about', label: 'About', jp: '自己紹介', kanji: '壱' },
  { id: 'experience', label: 'Experience', jp: '経歴', kanji: '弐' },
  { id: 'work', label: 'Projects', jp: '作品', kanji: '参' },
  { id: 'contact', label: 'Contact', jp: '連絡', kanji: '肆' },
];

const Navbar = ({ activeSection }) => {
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const linkRefs = useRef([]);
  const bubbleRef = useRef(null);

  const bubbleTarget = hovered ?? activeSection;

  const placeBubble = useCallback((id) => {
    const el = linkRefs.current[navLinks.findIndex((link) => link.id === id)];
    const bubble = bubbleRef.current;
    if (!el || !bubble) return;
    bubble.style.width = `${el.offsetWidth}px`;
    bubble.style.transform = `translateX(${el.offsetLeft}px)`;
    bubble.style.opacity = '1';
  }, []);

  // Keep the bubble under the hovered/active link, including after resizes and font loading
  useEffect(() => {
    placeBubble(bubbleTarget);
    const onResize = () => placeBubble(bubbleTarget);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [bubbleTarget, placeBubble]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock page scroll, close on Escape or when resizing up to desktop
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 1100) setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-bg" />
      <div className="container navbar-content font-brush">
        <a href="#home" className="logo font-brush" onClick={() => setMenuOpen(false)}>
          <span className="hanko" aria-hidden="true">ヴィ</span>
          <span className="logo-text">Vincent Dolera</span>
        </a>

        <div className="nav-links" onMouseLeave={() => setHovered(null)}>
          <div className="nav-bubble" ref={bubbleRef} />
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              ref={(el) => { linkRefs.current[index] = el; }}
              className={`nav-item ${bubbleTarget === link.id ? 'on-bubble' : ''}`}
              aria-current={activeSection === link.id ? 'true' : undefined}
              onMouseEnter={() => setHovered(link.id)}
              onFocus={() => setHovered(link.id)}
              onBlur={() => setHovered(null)}
            >
              <span className="nav-roll">
                <span>{link.label}</span>
                <span aria-hidden="true">{link.jp}</span>
              </span>
            </a>
          ))}
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <span className="nav-progress" aria-hidden="true" />

      <div id="mobile-menu" className="nav-overlay font-brush" inert={!menuOpen}>
        <div className="overlay-grid" aria-hidden="true" />
        <ul>
          {navLinks.map((link, index) => (
            <li key={link.id} style={{ '--i': index }}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'is-active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <span className="ov-kanji">{link.kanji}</span>
                <span className="ov-label">{link.label}</span>
                <span className="ov-jp">{link.jp}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="ov-foot">Vincent Dolera · ポートフォリオ</p>
      </div>
    </nav>
  );
};

export default Navbar;
