import React from 'react';
import { Github, Linkedin, Mail, Facebook, Instagram } from 'lucide-react';

const Contact = React.forwardRef((props, ref) => {
  return (
    <footer id="contact" className="section footer-section" ref={ref}>
      <div className="container footer-content font-brush">
        <h2 className="footer-title font-brush">Let's turn ideas into reality.</h2>
        <p className="footer-desc font-brush">Have a project in mind? Let's build something amazing.</p>
        <a href="mailto:vincentdolera25@gmail.com" className="btn font-brush">Say Hello</a>
        <div className="social-icons">
          <a href="https://github.com/ListlessWinter" target="_blank" rel="noopener noreferrer"><Github color="#a1a1aa" className="social-icon-hover" /></a>
          <a href="mailto:vincentdolera25@gmail.com"><Mail color="#a1a1aa" className="social-icon-hover" /></a>
          <a href="https://www.facebook.com/biboy.dolera" target="_blank" rel="noopener noreferrer"><Facebook color="#a1a1aa" className="social-icon-hover" /></a>
          <a href="https://www.instagram.com/memer.fluff/" target="_blank" rel="noopener noreferrer"><Instagram color="#a1a1aa" className="social-icon-hover" /></a>
        </div>
        <p className="copyright font-brush">© 2025 Vincent Dolera. Built with React.</p>
      </div>
    </footer>
  );
});

export default Contact;
