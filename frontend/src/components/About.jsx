import React, { useEffect, useState } from 'react';
import { Gamepad2, Bot, BookOpen, GraduationCap, School } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useInView, trackSpotlight } from '../hooks/useInteractions';
import { projects, internshipProjectCount, frontendSkills, languages } from '../data/projects';

const CountUp = ({ value, suffix = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let rafId;
    const start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(p === 1 ? value : Math.round(value * (1 - Math.pow(2, -10 * p))));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value]);

  return (
    <span ref={ref} className="stat-value">
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  { value: 486, label: 'Internship hours', jp: '研修時間' },
  { value: projects.length + internshipProjectCount, label: 'Projects built', jp: '作品' },
  { value: 2, label: 'AI seminars led', jp: '講演' },
  { value: new Set([...frontendSkills, ...languages]).size, suffix: '+', label: 'Technologies', jp: '技術' },
];

const hobbies = [
  { icon: Gamepad2, label: 'Playing Video Games', jp: 'ゲーム' },
  { icon: Bot, label: 'Building Plastic Model Kits', jp: 'プラモデル' },
  { icon: BookOpen, label: 'Reading Manga and Novels', jp: '漫画・小説' },
];

const About = React.forwardRef((props, ref) => {
  return (
    <section className="section about-section" ref={ref} id="about">
      <div className="container">
        <SectionHeading index="01" kanji="壱" title="About Me" jp="自己紹介" />

        <div className="about-intro">
          <div
            className="glass-card about-bio spotlight animate-on-scroll fade-up"
            onPointerMove={trackSpotlight}
          >
            <span className="card-kanji font-brush" aria-hidden="true">私</span>
            <p className="font-brush">
              Motivated Information Technology graduate from <em>Ateneo de Naga University</em> with
              professional internship experience. Passionate about Fullstack Web and Mobile Development,
              with hands-on expertise in the <em>MERN stack, Next.js, and Expo</em>. Proficient in
              AI-driven development, using prompt engineering to speed up coding workflows, debug
              efficiently, and optimize logic. Adept at combining AI tools with modern frameworks and
              eager to continue building <em>scalable, user-centric applications</em> and expanding my
              technical skill set.
            </p>
          </div>

          <div className="stat-grid">
            {stats.map((stat, i) => (
              <div
                className="stat glass-card spotlight animate-on-scroll fade-up"
                style={{ '--d': i }}
                key={stat.label}
                onPointerMove={trackSpotlight}
              >
                <CountUp value={stat.value} suffix={stat.suffix} />
                <span className="stat-label font-brush">{stat.label}</span>
                <span className="stat-jp font-brush" aria-hidden="true">{stat.jp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-grid">
          <div
            className="glass-card about-card spotlight animate-on-scroll slide-from-left font-brush"
            onPointerMove={trackSpotlight}
          >
            <h3 className="about-card-title">
              Education <span className="title-jp" aria-hidden="true">学歴</span>
            </h3>
            <ul className="edu-list">
              <li>
                <span className="edu-icon"><GraduationCap size={20} aria-hidden="true" /></span>
                <div>
                  <strong>Bachelor of Science in Information Technology</strong>
                  <span>Ateneo De Naga University</span>
                  <span className="edu-year">2022 – 2026</span>
                </div>
              </li>
              <li>
                <span className="edu-icon"><School size={20} aria-hidden="true" /></span>
                <div>
                  <strong>High School</strong>
                  <span>La Consolacion College of Daet</span>
                  <span className="edu-year">2014 – 2020</span>
                </div>
              </li>
            </ul>
          </div>

          <div
            className="glass-card about-card spotlight animate-on-scroll slide-from-right font-brush"
            onPointerMove={trackSpotlight}
          >
            <h3 className="about-card-title">
              Hobbies <span className="title-jp" aria-hidden="true">趣味</span>
            </h3>
            <ul className="hobby-list">
              {hobbies.map((hobby) => {
                const Icon = hobby.icon;
                return (
                  <li key={hobby.label}>
                    <span className="hobby-icon"><Icon size={20} aria-hidden="true" /></span>
                    <span className="hobby-label">{hobby.label}</span>
                    <span className="hobby-jp" aria-hidden="true">{hobby.jp}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Conveyor belt — intentionally unchanged */}
      <div className="tech-section animate-on-scroll fade-up font-brush">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Frontend, Backend & AI Skills</h3>
        <div className="scroller font-brush" style={{ marginBottom: '30px' }}>
          <div className="scroller-inner font-brush">
            {[...frontendSkills, ...frontendSkills].map((skill, index) => (
              <div className="tech-item font-brush" key={index} aria-hidden={index >= frontendSkills.length}>
                {skill}
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff' }}>Programming Languages</h3>
        <div className="scroller font-brush">
          <div className="scroller-inner-reverse font-brush">
            {[...languages, ...languages].map((skill, index) => (
              <div className="tech-item font-brush" key={index} aria-hidden={index >= languages.length}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
