import { SiReact, SiVite, SiSupabase, SiPython, SiFastapi, SiBootstrap, SiOpenai, SiAnthropic, SiSqlalchemy } from 'react-icons/si';
import '../styles/Widget.css';

function GitHubProjects() {
  const projects = [
    {
      title: 'Through Their Eyes',
      description: 'Visualize the reading experience at different English proficiency levels.',
      repoUrl: 'https://github.com/dividing-by-zaro/through-their-eyes',
      deployedUrl: null,
      tech: [
        { icon: SiReact, name: 'React' },
        { icon: SiVite, name: 'Vite' },
        { icon: SiSupabase, name: 'Supabase' },
      ],
    },
    {
      title: 'PromptDiff',
      description: 'Compare LLM responses side-by-side by submitting multiple prompts to a variety of models.',
      repoUrl: 'https://github.com/isabel-dlai/promptdiff',
      deployedUrl: null,
      tech: [
        { icon: SiPython, name: 'Python' },
        { icon: SiFastapi, name: 'FastAPI' },
        { icon: SiBootstrap, name: 'Bootstrap' },
        { icon: SiOpenai, name: 'OpenAI' },
        { icon: SiAnthropic, name: 'Anthropic' },
      ],
    },
    {
      title: 'Balatro Joker Arena',
      description: 'Community-driven ELO ranking system for Balatro jokers based on pairwise comparisons.',
      repoUrl: 'https://github.com/isabel-dlai/balatro-elo',
      deployedUrl: 'https://balatro-joker-arena.up.railway.app/',
      tech: [
        { icon: SiPython, name: 'Python' },
        { icon: SiFastapi, name: 'FastAPI' },
      ],
    },
  ];

  return (
    <div className="widget github-projects">
      <h3>Recent Projects</h3>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <h4 className="project-title">{project.title}</h4>
              {project.tech && (
                <div className="tech-stack">
                  {project.tech.map((tech, techIndex) => {
                    const Icon = tech.icon;
                    return (
                      <Icon
                        key={techIndex}
                        className="tech-icon"
                        title={tech.name}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-links">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Repository
                <svg className="external-link-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.5L4.5 7.5M10.5 1.5H6.5M10.5 1.5V5.5M10.5 10.5H1.5V1.5H5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              {project.deployedUrl && (
                <>
                  <span className="link-separator">·</span>
                  <a
                    href={project.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Site
                    <svg className="external-link-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 1.5L4.5 7.5M10.5 1.5H6.5M10.5 1.5V5.5M10.5 10.5H1.5V1.5H5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GitHubProjects;
