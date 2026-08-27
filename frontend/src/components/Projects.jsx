import React from 'react';
import { Github } from 'lucide-react';
import { projects } from '../data/projects';

const Projects = React.forwardRef((props, ref) => {
  const featuredProjects = projects.slice(0, 3);
  const otherProjects = projects.slice(3);

  return (
    <section id="work" className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title font-brush">Latest Work</h2>

        <div className="featured-list font-brush">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`featured-row ${index % 2 === 1 ? 'reverse' : ''} animate-on-scroll fade-up`}
            >
              <div className="featured-image-container">
                {project.demoLink ? (
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="image-link-wrapper"
                  >
                    <img src={project.image} alt={project.title} className="featured-image" />
                  </a>
                ) : (
                  <img src={project.image} alt={project.title} className="featured-image" />
                )}
              </div>
              
              <div className="featured-content">
                <span className="tag font-brush">{project.category}</span>
                <h3 className="font-brush">{project.title}</h3>
                <p className="font-brush">{project.description}</p>
                
                {project.repoLink && (
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn font-brush">
                    <Github size={18} style={{ marginRight: '8px' }}/> View Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-title font-brush" style={{ fontSize: '1.5rem', marginTop: '80px' }}>More Projects</h3>
        <div className="grid-3 font-brush">
          {otherProjects.map((project, index) => (
            <div key={project.id} className="card neon-border animate-on-scroll fade-up"
              style={{ transitionDelay: `${index * 100}ms` }}>
              
              {project.demoLink ? (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                   <img src={project.image} alt={project.title} className="card-image" />
                </a>
              ) : (
                <img src={project.image} alt={project.title} className="card-image" />
              )}

              <div className="card-content">
                <span className="tag font-brush">{project.category}</span>
                <h3 className="font-brush">{project.title}</h3>
                <p className="font-brush">{project.description}</p>
                <div className="card-actions">
                  {project.repoLink ? (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link font-brush">
                      View Code <Github size={16} style={{ marginLeft: '5px' }}/>
                    </a>
                  ) : (
                    <span className="project-link font-brush" style={{ opacity: 0.5 }}>Private Repo</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
