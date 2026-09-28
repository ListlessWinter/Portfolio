import React, { useState, useEffect, useRef } from 'react';

// Full-width katakana while decoding into Japanese; narrow half-width ones (plus latin)
// while decoding back to English, so the in-between text keeps roughly the right width.
const JP_SCRAMBLE = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
const EN_SCRAMBLE = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎABCDEFGHKMNRSTXZ';
const DURATION = 520;
const FRAME_MS = 38;

// English text that decodes into Japanese while hovered (tap on touch, focus on keyboard).
const GlitchText = ({ text, jpText, className = "" }) => {
  const [display, setDisplay] = useState(text);
  const [isJapanese, setIsJapanese] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const rafRef = useRef(0);
  const pointerTypeRef = useRef('mouse');

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const scrambleTo = (target, toJapanese) => {
    cancelAnimationFrame(rafRef.current);
    setIsJapanese(toJapanese);
    setIsGlitching(true);

    const pool = toJapanese ? JP_SCRAMBLE : EN_SCRAMBLE;
    const start = performance.now();
    let lastFrame = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      if (now - lastFrame >= FRAME_MS || progress === 1) {
        lastFrame = now;
        const resolved = Math.floor(progress * target.length);
        let out = '';
        for (let i = 0; i < target.length; i++) {
          const ch = target[i];
          out += i < resolved || ch === ' '
            ? ch
            : pool[Math.floor(Math.random() * pool.length)];
        }
        setDisplay(out);
      }
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
        setIsGlitching(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const showJapanese = () => { if (!isJapanese) scrambleTo(jpText, true); };
  const showEnglish = () => { if (isJapanese) scrambleTo(text, false); };

  return (
    <span
      className={`glitch-text ${isJapanese ? 'is-jp' : ''}`}
      tabIndex={0}
      role="button"
      aria-label={`${text} (${jpText})`}
      aria-pressed={isJapanese}
      onPointerDown={(e) => { pointerTypeRef.current = e.pointerType; }}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') showJapanese(); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') showEnglish(); }}
      onClick={() => {
        if (pointerTypeRef.current !== 'mouse') {
          if (isJapanese) showEnglish(); else showJapanese();
        }
      }}
      onFocus={() => { if (pointerTypeRef.current === 'mouse') showJapanese(); }}
      onBlur={showEnglish}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (isJapanese) showEnglish(); else showJapanese();
        }
      }}
    >
      {/* Invisible spacers reserve room for both languages so nothing shifts */}
      <span className="glitch-spacer" aria-hidden="true">{text}</span>
      <span className="glitch-spacer spacer-jp" aria-hidden="true">{jpText}</span>

      <span
        className={`glitch-wrapper ${isGlitching ? 'glitch-active' : ''} ${className}`}
        data-text={display}
        aria-hidden="true"
      >
        {display}
      </span>
    </span>
  );
};

export default GlitchText;
