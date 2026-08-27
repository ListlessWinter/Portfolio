import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    // Wait 2s, start opening doors
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 2000);

    // After opening animation (1.5s), unmount
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
      document.body.style.overflow = '';
      if (onLoadingComplete) onLoadingComplete();
    }, 3500); 

    return () => {
      clearTimeout(openTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = '';
    };
  }, [onLoadingComplete]);

  if (isUnmounted) return null;

  return (
    <div className={`loading-screen-container ${isOpening ? 'opening' : ''}`}>
      
      {/* Loading Indicator */}
      <div className={`loading-indicator-wrapper ${isOpening ? 'fade-out' : ''}`}>
        <div className="spinner"></div>
        <div className="loading-text font-brush">LOADING</div>
      </div>

      <div className={`door door-left ${isOpening ? 'open' : ''}`}>
        <div className="door-panel">
          <div className="paper">
            <div className="wood-grid"></div>
          </div>
        </div>
      </div>
      
      <div className={`door door-right ${isOpening ? 'open' : ''}`}>
        <div className="door-panel">
          <div className="paper">
             <div className="wood-grid"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
