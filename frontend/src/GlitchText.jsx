import React, { useState, useEffect } from 'react';

const GlitchText = ({ text, jpText, className = "" }) => {
  const [currentText, setCurrentText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timeoutId;

    const triggerGlitch = () => {
      // Random delay between 2 and 5 seconds
      const randomDelay = Math.random() * 3000 + 2000;

      timeoutId = setTimeout(() => {
        setIsGlitching(true);
        setCurrentText(jpText);

        // Switch back to English after 1.5 seconds
        setTimeout(() => {
          setCurrentText(text);
          setIsGlitching(false);
          triggerGlitch();
        }, 1500); 

      }, randomDelay);
    };

    triggerGlitch();

    return () => clearTimeout(timeoutId);
  }, [text, jpText]);

  return (
    <span style={{ 
      display: 'inline-grid', // Use Grid to stack elements
      verticalAlign: 'bottom' // Aligns text correctly on the line
    }}>
      {/* 1. THE INVISIBLE SPACER */}
      {/* This copy of the English text is invisible but forces the 
          container to stay exactly this wide/tall at all times. */}
      <span style={{ 
        gridArea: '1 / 1', // Sit in row 1, col 1
        opacity: 0,        // Invisible
        pointerEvents: 'none',
        whiteSpace: 'nowrap' // Prevent unexpected wrapping
      }}>
        {text}
      </span>

      {/* 2. THE VISIBLE GLITCH TEXT */}
      {/* This sits exactly on top of the spacer */}
      <span 
        className={`glitch-wrapper ${isGlitching ? 'glitch-active' : ''} ${className}`}
        data-text={currentText}
        style={{ 
          gridArea: '1 / 1', // Sit in row 1, col 1 (on top of spacer)
          whiteSpace: 'nowrap',
          width: '100%',
          textAlign: 'center' // Ensures Japanese text centers in the English box
        }} 
      >
        {currentText}
      </span>
    </span>
  );
};

export default GlitchText;