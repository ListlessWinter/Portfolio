import React, { useEffect, useRef, useState } from 'react';
import { Github, Mail, Facebook, Instagram, Copy, Check, ArrowUp } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useMagnetic } from '../hooks/useInteractions';

const EMAIL = 'vincentdolera25@gmail.com';

const socials = [
  { href: 'https://github.com/ListlessWinter', label: 'GitHub', icon: Github, external: true },
  { href: `mailto:${EMAIL}`, label: 'Email', icon: Mail },
  { href: 'https://www.facebook.com/biboy.dolera', label: 'Facebook', icon: Facebook, external: true },
  { href: 'https://www.instagram.com/memer.fluff/', label: 'Instagram', icon: Instagram, external: true },
];

const Contact = React.forwardRef((props, ref) => {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(0);
  const ctaRef = useMagnetic(0.35);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="section footer-section" ref={ref}>
      <div className="container footer-content font-brush">
        <SectionHeading index="04" kanji="肆" title="Contact" jp="連絡" />

        <p className="footer-title animate-on-scroll fade-up">
          Let's turn ideas <span className="gradient-text">into reality.</span>
        </p>
        <p className="footer-desc animate-on-scroll fade-up" style={{ '--d': 1 }}>
          Have a project in mind? Let's build something amazing.
        </p>

        <div className="contact-actions animate-on-scroll fade-up" style={{ '--d': 2 }}>
          <a href={`mailto:${EMAIL}`} className="btn btn-primary btn-lg" ref={ctaRef}>
            Say Hello <span aria-hidden="true">· こんにちは</span>
          </a>
          <button type="button" className={`email-copy ${copied ? 'is-copied' : ''}`} onClick={copyEmail}>
            <span className="email-text">{EMAIL}</span>
            <span className="email-icon" aria-hidden="true">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </span>
            <span className="sr-only">{copied ? 'Email copied' : 'Copy email address'}</span>
          </button>
          <span className={`copy-toast ${copied ? 'show' : ''}`} role="status">
            {copied ? 'Copied! · コピーしました' : ''}
          </span>
        </div>

        <ul className="social-icons animate-on-scroll fade-up" style={{ '--d': 3 }}>
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span className="social-label">{social.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Vincent Dolera. Built with React.</p>
          <a href="#home" className="to-top-link">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="seigaiha" aria-hidden="true" />
    </footer>
  );
});

export default Contact;
