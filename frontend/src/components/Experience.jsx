import React, { useEffect, useRef } from 'react';
import SectionHeading from './SectionHeading';
import { trackSpotlight } from '../hooks/useInteractions';
import { experience } from '../data/projects';

const Experience = React.forwardRef((props, ref) => {
  const timelineRef = useRef(null);

  // Fill the timeline line as the reader scrolls through it
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      el.style.setProperty('--tl-progress', progress.toFixed(4));
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
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="container">
        <SectionHeading index="02" kanji="弐" title="Experience" jp="経歴" />

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-track" aria-hidden="true">
            <div className="timeline-fill" />
          </div>

          {experience.map((item, i) => (
            <article
              key={item.id}
              className={`timeline-item accent-${item.accent} animate-on-scroll fade-up`}
              style={{ '--d': i }}
            >
              <span className="timeline-node" aria-hidden="true" />
              <div className="glass-card timeline-card spotlight font-brush" onPointerMove={trackSpotlight}>
                <span className="card-kanji" aria-hidden="true">{item.kanji}</span>
                <h3 className="timeline-role">{item.role}</h3>

                {item.entries.map((entry) => (
                  <div className="timeline-entry" key={entry.meta}>
                    <p className="timeline-meta">
                      <span>{entry.meta}</span>
                      <span className="timeline-date">{entry.date}</span>
                    </p>
                    <ul className="timeline-points">
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="chip-row">
                  {item.stack.map((tech) => (
                    <span className="chip" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;
