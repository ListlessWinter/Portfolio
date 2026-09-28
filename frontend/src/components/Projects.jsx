import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { trackSpotlight } from '../hooks/useInteractions';
import { projects } from '../data/projects';

const hostOf = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return '';
  }
};

// Ink-brush cover for projects without a screenshot
const InkCover = ({ project }) => (
  <div className="ink-cover font-brush" aria-hidden="true">
    <span className="ink-kanji">{project.kanji}</span>
    <span className="ink-title">{project.title}</span>
    <span className="hanko hanko-sm ink-seal">{project.kanji}</span>
  </div>
);

const ProjectImage = ({ project }) =>
  project.image ? (
    <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
  ) : (
    <InkCover project={project} />
  );

// Wraps media in a link to the live demo when one exists
const MediaLink = ({ project, className, children }) =>
  project.demoLink ? (
    <a
      href={project.demoLink}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Open ${project.title} live demo`}
    >
      {children}
      <span className="media-overlay font-brush" aria-hidden="true">
        Visit live site <ArrowUpRight size={16} />
      </span>
    </a>
  ) : (
    <div className={className}>{children}</div>
  );

const Projects = React.forwardRef((props, ref) => {
  const featuredProjects = projects.slice(0, 3);
  const otherProjects = projects.slice(3);

  return (
    <section id="work" className="section projects-section" ref={ref}>
      <div className="container">
        <SectionHeading index="03" kanji="参" title="Latest Work" jp="作品" />

        <div className="featured-list font-brush">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`featured-row ${index % 2 === 1 ? 'reverse' : ''} animate-on-scroll fade-up`}
            >
              <MediaLink project={project} className="featured-media">
                <div className="browser">
                  <div className="browser-bar" aria-hidden="true">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                    <span className="browser-url">
                      {project.demoLink ? hostOf(project.demoLink) : hostOf(project.repoLink)}
                    </span>
                  </div>
                  <div className="browser-body">
                    <ProjectImage project={project} />
                  </div>
                </div>
              </MediaLink>

              <div className="featured-content">
                <span className="featured-num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="tag">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.stack.map((tech) => (
                    <span className="chip" key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="featured-actions">
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Live Demo <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                  {project.repoLink && (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      <Github size={18} aria-hidden="true" /> View Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="subheading animate-on-scroll fade-up font-brush">
          <h3>More Projects</h3>
          <span className="title-jp" aria-hidden="true">その他の作品</span>
          <span className="subheading-rule" aria-hidden="true" />
        </div>

        <div className="grid-3 font-brush">
          {otherProjects.map((project, index) => (
            <article
              key={project.id}
              className="card spotlight animate-on-scroll fade-up"
              style={{ '--d': index % 3 }}
              onPointerMove={trackSpotlight}
            >
              <MediaLink project={project} className="card-media">
                <ProjectImage project={project} />
              </MediaLink>

              <div className="card-content">
                <span className="tag">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.stack.map((tech) => (
                    <span className="chip chip-sm" key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="card-actions">
                  {project.repoLink ? (
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Code <Github size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="project-link is-muted">Private Repo</span>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                      Live <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
