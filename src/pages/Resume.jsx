import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/Page.css';
import '../styles/Widget.css';

function Resume() {
  const [resumeData, setResumeData] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    fetch('/all professional experience.md')
      .then(response => response.text())
      .then(text => {
        const parsed = parseResume(text);
        setResumeData(parsed);

        // Set DeepLearning.AI (first Professional Experience item) as expanded by default
        const profExpIdx = parsed.sections.findIndex(s => s.title === 'Professional Experience');
        if (profExpIdx !== -1) {
          setExpandedItems({ [`${profExpIdx}-0`]: true });
        }
      })
      .catch(error => console.error('Error loading resume:', error));
  }, []);

  const toggleItem = (sectionIdx, itemIdx) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const parseResume = (text) => {
    const lines = text.split('\n');
    const summary = lines[0];
    const sections = [];
    let currentSection = null;
    let currentItem = null;
    let i = 1;

    // Known section headers
    const sectionHeaders = ['Education', 'Professional Experience', 'Volunteer Work', 'Skills', 'Professional Development'];

    while (i < lines.length) {
      const line = lines[i].trim();

      // Check if line is a section header
      if (line.match(/^\*\*[^*]+\*\*$/)) {
        const title = line.replace(/\*\*/g, '').trim();

        // Is this a known section header?
        if (sectionHeaders.includes(title)) {
          // Save previous section
          if (currentSection) {
            if (currentItem) {
              currentSection.items.push(currentItem);
              currentItem = null;
            }
            sections.push(currentSection);
          }

          // Start new section
          currentSection = {
            title: title,
            items: []
          };
          i++;
          continue;
        }
      }

      // Check if line is an organization/item header (bold text, not a section)
      if (line.match(/^\*\*[^*]+\*\*$/) && currentSection) {
        // Save previous item
        if (currentItem) {
          currentSection.items.push(currentItem);
        }

        // Start new item
        currentItem = {
          title: line.replace(/\*\*/g, '').trim(),
          subtitle: '',
          additionalInfo: '',
          content: []
        };

        // Look ahead for additional info, position, and dates
        i++;

        // Check next line - could be additional info (plain text) or position (italic)
        if (i < lines.length) {
          const nextLine = lines[i].trim();

          // If it's plain text (not italic, not bullet), it's additional info
          if (nextLine && !nextLine.match(/^\*[^*]/) && !nextLine.match(/^[\*•]/)) {
            currentItem.additionalInfo = nextLine;
            i++;
          }
        }

        // Check for position title (italic)
        if (i < lines.length) {
          const posLine = lines[i].trim();
          if (posLine.match(/^\*[^*]+\*$/)) {
            currentItem.subtitle = posLine.replace(/\*/g, '').trim();
            i++;
          }
        }

        // Check for date (italic)
        if (i < lines.length) {
          const dateLine = lines[i].trim();
          if (dateLine.match(/^\*[^*]+\*$/)) {
            if (currentItem.subtitle) {
              currentItem.subtitle += ' | ' + dateLine.replace(/\*/g, '').trim();
            } else {
              currentItem.subtitle = dateLine.replace(/\*/g, '').trim();
            }
            i++;
          }
        }

        continue;
      }

      // Check if line is a bullet point
      if (line.match(/^[\*•]/) && currentSection) {
        // If there's no current item, create a default one for sections with direct bullets
        if (!currentItem) {
          currentItem = {
            title: '',
            subtitle: '',
            additionalInfo: '',
            content: []
          };
        }
        currentItem.content.push(line);
        i++;
        continue;
      }

      // Skip empty lines or other content
      i++;
    }

    // Push remaining items
    if (currentItem) {
      currentSection.items.push(currentItem);
    }
    if (currentSection) {
      sections.push(currentSection);
    }

    return { summary, sections };
  };

  if (!resumeData) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="resume-page">
      <p className="resume-summary">{resumeData.summary}</p>

      {resumeData.sections.map((section, idx) => (
        <div key={idx} className="widget resume-section">
          <h3>{section.title}</h3>
          <div className="resume-items">
            {section.items.map((item, itemIdx) => {
              // For items with no title (like Skills section), render content directly without the box
              if (!item.title && item.content.length > 0) {
                return (
                  <div key={itemIdx} className="resume-item-content">
                    <ReactMarkdown>{item.content.join('\n')}</ReactMarkdown>
                  </div>
                );
              }

              const itemKey = `${idx}-${itemIdx}`;
              const isExpanded = expandedItems[itemKey];
              const isProfessionalExp = section.title === 'Professional Experience';
              const isEducation = section.title === 'Education';

              // Education logos mapping
              const educationLogos = {
                'Master of Education, Secondary Science Curriculum and Instruction': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPC6jQpdbMcbrSmkiOh6sJLzegmHjBnG-b_Q&s',
                'Bachelor of Arts, Cognitive Science': '/UniversityofPennsylvania_Shield_RGB-2.png'
              };

              // Professional Experience logos mapping
              const professionalLogos = {
                'DeepLearning.AI': '/deeplearningai-logo.jpg',
                'The AI Education Project (aiEDU)': '/aiedu-logo.jpg',
                'Code.org': '/code-org-logo.png',
                'CodePath.org': '/codepath-logo.png',
                'Sunrise Mountain High School': '/ccsd-logo.png',
                'Kode with Klossy': '/kwk-logo.png',
                'University of Pennsylvania': '/UniversityofPennsylvania_Shield_RGB-2.png'
              };

              // For Professional Experience, render collapsible items
              if (isProfessionalExp) {
                const logo = professionalLogos[item.title];
                return (
                  <div
                    key={itemIdx}
                    className={`resume-item resume-item-collapsible ${isExpanded ? 'expanded' : 'collapsed'}`}
                    onClick={() => toggleItem(idx, itemIdx)}
                  >
                    <div className="resume-item-header-collapsible">
                      {logo && (
                        <div className="resume-item-logo">
                          <img src={logo} alt={item.title} />
                        </div>
                      )}
                      <div className="resume-item-info">
                        {item.title && (
                          <div className="resume-item-header">
                            <h4 className="resume-item-title">{item.title}</h4>
                            {item.additionalInfo && (
                              <p className="resume-item-additional">{item.additionalInfo}</p>
                            )}
                            {item.subtitle && (
                              <span className="resume-item-subtitle">{item.subtitle}</span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className={`caret ${isExpanded ? 'caret-up' : 'caret-down'}`}>
                        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    {item.content.length > 0 && isExpanded && (
                      <div className="resume-item-content resume-item-content-expanded">
                        <ReactMarkdown>{item.content.join('\n')}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                );
              }

              // For Education section, render with logo
              if (isEducation && item.title) {
                const logo = educationLogos[item.title];
                return (
                  <div key={itemIdx} className="resume-item resume-item-with-logo">
                    {logo && (
                      <div className={`resume-item-logo ${item.title.includes('Pennsylvania') ? 'upenn-logo' : ''}`}>
                        <img src={logo} alt={item.title} />
                      </div>
                    )}
                    <div className="resume-item-content-wrapper">
                      <div className="resume-item-header">
                        <h4 className="resume-item-title">{item.title}</h4>
                        {item.additionalInfo && (
                          <p className="resume-item-additional">{item.additionalInfo}</p>
                        )}
                        {item.subtitle && (
                          <span className="resume-item-subtitle">{item.subtitle}</span>
                        )}
                      </div>
                      {item.content.length > 0 && (
                        <div className="resume-item-content">
                          <ReactMarkdown>{item.content.join('\n')}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // For other sections, render normally
              return (
                <div key={itemIdx} className="resume-item">
                  {item.title && (
                    <div className="resume-item-header">
                      <h4 className="resume-item-title">{item.title}</h4>
                      {item.additionalInfo && (
                        <p className="resume-item-additional">{item.additionalInfo}</p>
                      )}
                      {item.subtitle && (
                        <span className="resume-item-subtitle">{item.subtitle}</span>
                      )}
                    </div>
                  )}
                  {item.content.length > 0 && (
                    <div className="resume-item-content">
                      <ReactMarkdown>{item.content.join('\n')}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}

export default Resume;
