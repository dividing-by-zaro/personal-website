import { SiPython, SiJupyter, SiOpenai, SiAnthropic, SiGooglesheets, SiPandas, SiTableau, SiSqlite, SiGooglegemini } from 'react-icons/si';
import '../styles/Widget.css';

function CoursesBuilt() {
  const courses = [
    {
      title: 'Data Analytics Professional Certificate',
      description: 'Extract insights from data using statistical techniques, Python, SQL, and AI tools while developing skills in visualization and storytelling.',
      courseUrl: 'https://www.deeplearning.ai/courses/data-analytics/',
      lifetimeEnrollments: 17205,
      rating: 4.8,
      tech: [
        { icon: SiGooglesheets, name: 'Google Sheets' },
        { icon: SiJupyter, name: 'Jupyter' },
        { icon: SiPython, name: 'Python' },
        { icon: SiPandas, name: 'Pandas' },
        { icon: SiSqlite, name: 'SQLite' },
        { icon: SiTableau, name: 'Tableau' },
        { icon: SiOpenai, name: 'OpenAI' },
        { icon: SiAnthropic, name: 'Anthropic' },
        { icon: SiGooglegemini, name: 'Gemini' },
      ],
    },
    {
      title: 'Design, Develop, and Deploy Multi-Agent Systems with CrewAI',
      description: 'Build multi-agent systems that go beyond single-task automation. Create intelligent agent teams that plan, reason, and collaborate using tools, memory, and guardrails.',
      courseUrl: 'https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/',
      comingSoon: true,
      tech: [
        { icon: SiJupyter, name: 'Jupyter' },
        { icon: SiPython, name: 'Python' },
        { iconUrl: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/crewai-color.png', name: 'CrewAI' },
        { icon: SiOpenai, name: 'OpenAI' },
      ],
    },
    {
      title: 'AI Python for Beginners',
      description: 'Write Python scripts that interact with large language models, automate tasks, and analyze your own data while building AI-powered applications from day one.',
      courseUrl: 'https://www.deeplearning.ai/short-courses/ai-python-for-beginners/',
      lifetimeEnrollments: 350300,
      rating: 4.7,
      tech: [
        { icon: SiJupyter, name: 'Jupyter' },
        { icon: SiPython, name: 'Python' },
        { icon: SiOpenai, name: 'OpenAI' },
        { icon: SiAnthropic, name: 'Anthropic' },
      ],
    },
  ];

  return (
    <div className="widget courses-built">
      <h3>Selected courses built</h3>
      <div className="projects-list">
        {courses.map((course, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <h4 className="project-title">{course.title}</h4>
              {course.tech && (
                <div className="tech-stack">
                  {course.tech.map((tech, techIndex) => {
                    if (tech.iconUrl) {
                      return (
                        <img
                          key={techIndex}
                          src={tech.iconUrl}
                          alt={tech.name}
                          className="tech-icon"
                          title={tech.name}
                        />
                      );
                    } else {
                      const Icon = tech.icon;
                      return (
                        <Icon
                          key={techIndex}
                          className="tech-icon"
                          title={tech.name}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
            <p className="project-description">{course.description}</p>
            <div className="course-stats">
              {course.comingSoon ? (
                <>
                  <span className="stat-item">Coming soon</span>
                  <span className="stat-separator">·</span>
                  <span className="stat-item rating-stat">
                    -/5
                    <svg className="star-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.5L6 8.885L2.91 10.5L3.5 7.07L1 4.635L4.455 4.13L6 1Z" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  <span className="stat-item">
                    {course.lifetimeEnrollments.toLocaleString()} enrollments
                  </span>
                  <span className="stat-separator">·</span>
                  <span className="stat-item rating-stat">
                    {course.rating}/5
                    <svg className="star-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.5L6 8.885L2.91 10.5L3.5 7.07L1 4.635L4.455 4.13L6 1Z" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </>
              )}
            </div>
            <div className="project-links">
              <a
                href={course.courseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Course
                <svg className="external-link-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 1.5L4.5 7.5M10.5 1.5H6.5M10.5 1.5V5.5M10.5 10.5H1.5V1.5H5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesBuilt;
