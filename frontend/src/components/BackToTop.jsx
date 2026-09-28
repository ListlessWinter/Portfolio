import React, { useEffect, useState } from 'react';

// Floating "上" button whose ring traces scroll progress (reads the global --scroll variable)
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a href="#home" className={`back-to-top font-brush ${visible ? 'is-visible' : ''}`} aria-label="Back to top" tabIndex={visible ? 0 : -1}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle className="ring-track" cx="24" cy="24" r="21" />
        <circle className="ring-fill" cx="24" cy="24" r="21" pathLength="1" />
      </svg>
      <span aria-hidden="true">上</span>
    </a>
  );
};

export default BackToTop;
