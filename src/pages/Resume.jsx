import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import '../styles/Page.css';
import '../styles/Widget.css';

function Resume() {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    fetch('/src/assets/all professional experience.md')
      .then(response => response.text())
      .then(text => {
        const parsed = parseResume(text);
        setResumeData(parsed);
      })
      .catch(error => console.error('Error loading resume:', error));
  }, []);

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
      if (line.match(/^[\*•]/) && currentItem) {
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
      <div className="page">
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <main>
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <main className="resume-page">
        <p className="resume-summary">{resumeData.summary}</p>

        {resumeData.sections.map((section, idx) => (
          <div key={idx} className="widget resume-section">
            <h3>{section.title}</h3>
            <div className="resume-items">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="resume-item">
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
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Resume;
