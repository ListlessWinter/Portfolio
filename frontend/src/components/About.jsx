import React from 'react';

const About = React.forwardRef((props, ref) => {
  return (
    <section className="section" ref={ref} id="about">
      <div className="container">
        <h2 className="section-title animate-on-scroll fade-up font-brush">About Me</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p
            className="animate-on-scroll fade-up font-brush about-bio"
          >
            I'm an IT student who enjoys turning ideas into reality through coding. I am responsible and motivated with experience in both
            <span className="highlight-text font-brush"> front-end</span> and
            <span className="highlight-text font-brush"> back-end</span> development.
            I stay passionate about coding, problem-solving, and continuously learning new technologies. I like to keep things simple and clean
            by writing a clean and well structured code.
          </p>

          <div className="about-grid">
            <div className="about-column animate-on-scroll slide-from-left">
              <h3 className="font-brush">Education:</h3>
              <ul className="info-list font-brush">
                <li>
                  <strong>High School:</strong> La Consolacion College of Daet (2014 - 2020)
                </li>
                <li>
                  <strong>College:</strong> Ateneo De Naga University (2022 - 2026)
                </li>
              </ul>
            </div>

            <div className="about-column animate-on-scroll slide-from-right">
              <h3 className="font-brush">Hobbies:</h3>
              <ul className="info-list font-brush">
                <li>🎮 Playing Video Games</li>
                <li>🤖 Building Plastic Model Kits </li>
                <li>📚 Reading Manga and Novels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-section animate-on-scroll fade-up">
        <h3 className="font-brush tech-title">Technologies</h3>

        <div className="scroller">
          <div className="scroller-inner font-brush">
            {[
              "React.js", "Node.js", "JavaScript", "HTML", "CSS",
              "C Language", "C++", "Java", "Dart", "Flutter", "SQL", "Git"
            ].map((skill, index) => (
              <div className="tech-item font-brush" key={index}>
                {skill}
              </div>
            ))}

            {[
              "React.js", "Node.js", "JavaScript", "HTML", "CSS",
              "C Language", "C++", "Java", "Dart", "Flutter", "SQL", "Git"
            ].map((skill, index) => (
              <div className="tech-item font-brush" key={`duplicate-${index}`}>
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
