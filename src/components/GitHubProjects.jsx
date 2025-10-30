import { SiReact, SiVite, SiSupabase } from 'react-icons/si';
import '../styles/Widget.css';

function GitHubProjects() {
  const projects = [
    {
      title: 'Through Their Eyes',
      description: 'Visualize the reading experience at different English proficiency levels.',
      repoUrl: 'https://github.com/dividing-by-zaro/through-their-eyes',
      deployedUrl: null, // Add when deployed
      tech: [
        { icon: SiReact, name: 'React' },
        { icon: SiVite, name: 'Vite' },
        { icon: SiSupabase, name: 'Supabase' },
      ],
    },
    // Add more projects here as they're built
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
                    Live Demo
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
