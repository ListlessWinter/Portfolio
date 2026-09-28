import React from 'react';

// Kanji numeral + number, a title that rises in letter by letter, a Japanese subtitle,
// and a brush stroke that paints itself underneath.
const SectionHeading = ({ index, kanji, title, jp, align = 'center' }) => {
  const words = title.split(' ');
  const wordOffsets = words.map((_, w) => words.slice(0, w).join('').length);

  return (
    <div className={`section-heading align-${align} animate-on-scroll`}>
      <span className="sh-index font-brush">
        <span className="sh-kanji">{kanji}</span>
        <span className="sh-rule" />
        <span>{index}</span>
      </span>

      <h2 className="sh-title font-brush" aria-label={title}>
        {words.map((word, w) => (
          <span className="sh-word" key={w} aria-hidden="true">
            {[...word].map((ch, c) => (
              <span className="sh-char" style={{ '--ci': wordOffsets[w] + c }} key={c}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <span className="sh-jp font-brush">{jp}</span>

      <svg className="sh-brush" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`brush-${index}`} x1="0" x2="1">
            <stop offset="0" stopColor="#ff00c1" />
            <stop offset="1" stopColor="#00fff9" />
          </linearGradient>
        </defs>
        <path
          d="M4 10 C 60 4, 120 13, 180 7 S 270 5, 296 8"
          stroke={`url(#brush-${index})`}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          pathLength="1"
        />
      </svg>
    </div>
  );
};

export default SectionHeading;
