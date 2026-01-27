import React, { useState, useEffect } from 'react';

const GlitchText = ({ text, jpText, className = "", style = {} }) => {
  const [currentText, setCurrentText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timeoutId;

    const triggerGlitch = () => {
      const randomDelay = Math.random() * 3000 + 2000;

      timeoutId = setTimeout(() => {
        setIsGlitching(true);
        setCurrentText(jpText);

        setTimeout(() => {
          setCurrentText(text);
          setIsGlitching(false);
          triggerGlitch();
        }, 850); 

      }, randomDelay);
    };

    triggerGlitch();

    return () => clearTimeout(timeoutId);
  }, [text, jpText]);

  return (
    <span 
      className={`glitch-wrapper ${isGlitching ? 'glitch-active' : ''} ${className}`}
      data-text={currentText}
      // ADD THIS LINE: Pass the style and ensure inline-block behavior
      style={{ display: 'inline-block', ...style }} 
    >
      {currentText}
    </span>
  );
};

export default GlitchText;