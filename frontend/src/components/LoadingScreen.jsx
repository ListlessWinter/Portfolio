import React, { useState, useEffect, useRef } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const onCompleteRef = useRef(onLoadingComplete);

  useEffect(() => {
    onCompleteRef.current = onLoadingComplete;
  }, [onLoadingComplete]);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    // Wait 2s, start opening doors
    const openTimer = setTimeout(() => {
      setIsOpening(true);
      onCompleteRef.current?.();
    }, 2000);

    // After opening animation (1.5s), unmount
    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true);
      document.body.style.overflow = '';
    }, 3500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <div className={`loading-screen-container ${isOpening ? 'opening' : ''}`} role="status" aria-label="Loading">

      {/* Loading Indicator */}
      <div className={`loading-indicator-wrapper ${isOpening ? 'fade-out' : ''}`}>
        <div className="enso">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="enso-ink" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff00c1" />
                <stop offset="1" stopColor="#00fff9" />
              </linearGradient>
            </defs>
            <path
              d="M72 18 C 52 6, 20 14, 13 42 C 6 70, 32 92, 58 86 C 82 80, 94 56, 84 34 C 80 26, 76 22, 70 20"
              pathLength="1"
            />
          </svg>
          <span className="hanko enso-seal font-brush">ヴィ</span>
        </div>
        <div className="loading-text font-brush">読み込み中 · LOADING</div>
      </div>

      <div className={`door door-left ${isOpening ? 'open' : ''}`}>
        <div className="door-panel">
          <div className="paper">
            <div className="wood-grid"></div>
          </div>
          <span className="door-handle" />
        </div>
      </div>

      <div className={`door door-right ${isOpening ? 'open' : ''}`}>
        <div className="door-panel">
          <div className="paper">
             <div className="wood-grid"></div>
          </div>
          <span className="door-handle" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
