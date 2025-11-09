# Personal Website Project

A minimal, grayscale personal website built with React and Vite.

## Design Philosophy

**Ultra Minimalist & Grayscale**
- Keep everything minimal and clean
- Strictly grayscale color palette (no colors except shades of gray)
- No emojis in code or content unless explicitly requested
- Use subtle opacity changes and borders for visual hierarchy
- Light font weights (300-400) preferred
- Proper dark mode support for all components

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Quote.jsx       # Random quote display
│   ├── VegasWeather.jsx # Live Vegas weather with icons
│   └── WorkoutTracker.jsx # GitHub-style workout tracker
├── pages/              # Route pages
│   ├── Home.jsx        # Landing page with widgets
│   ├── About.jsx       # About page
│   ├── Blog*.jsx       # Blog index and post pages
│   └── Resume.jsx      # Resume page
├── posts/              # Markdown blog posts
├── styles/             # CSS modules
│   ├── Home.css        # Home page styles
│   ├── Page.css        # Shared page styles
│   └── Widget.css      # Widget component styles
└── utils/              # Utility functions
    └── posts.js        # Blog post loading logic
```

## Key Components

### VegasWeather
- Fetches live weather from wttr.in API (no API key needed)
- Shows temperature and weather-appropriate icons
- Updates every 10 minutes
- Day/night awareness for clear weather conditions

### WorkoutTracker
- GitHub-style contribution graph (vertical layout, 7 rows for days of week)
- Displays year-to-date active minutes with intensity-based grayscale shading
- Data stored in component (update `activeMinutesData` object to add new data)
- Intensity levels: 0 (blank), 1 (1-19 min), 2 (20-39), 3 (40-59), 4 (60+)

### Blog System
- Markdown files in `src/posts/` directory
- File naming: `YYYY-MM-DD-title-slug.md`
- Frontmatter required: `title`, `date`, `preview`
- Uses `gray-matter` for parsing and `react-markdown` for rendering

## Coding Conventions

**React Components**
- Functional components with hooks
- Use `useState` and `useEffect` for state management
- Keep components focused and single-purpose
- Export default at end of file

**Styling**
- CSS modules in `src/styles/`
- Use semantic class names
- Always include dark mode support with `@media (prefers-color-scheme: dark)`
- Maintain consistent spacing (1rem = 16px baseline)

**Colors & Opacity**
- Light backgrounds: `rgba(0, 0, 0, 0.05)` to `rgba(0, 0, 0, 0.7)`
- Dark backgrounds: `rgba(255, 255, 255, 0.05)` to `rgba(255, 255, 255, 0.7)`
- Text opacity: 0.6-0.7 for muted elements, 1.0 for primary text
- Border colors: `rgba(0, 0, 0, 0.1)` (light) / `rgba(255, 255, 255, 0.1)` (dark)

**Code Formatting in Blog Posts**
- Inline code uses monospace fonts with subtle gray background
- Font stack: SF Mono, Monaco, Inconsolata, Fira Mono, etc.
- Padding and borders for definition without breaking minimalism
- Full dark mode support for code blocks

## Common Tasks

### Adding a New Blog Post
1. Create file: `src/posts/YYYY-MM-DD-title-slug.md`
2. Add frontmatter:
   ```yaml
   ---
   title: Post Title
   date: YYYY-MM-DD
   preview: Brief description for the index page
   ---
   ```
3. Write content in markdown below frontmatter
4. Will auto-appear on `/blog` sorted by date

### Adding New Workout Data
1. Open `src/components/WorkoutTracker.jsx`
2. Update `activeMinutesData` object with new entries:
   ```javascript
   '2025-10-28': 45,  // Add entries in YYYY-MM-DD format
   ```
3. Component will automatically reflect changes

### Creating a New Widget
1. Create component in `src/components/YourWidget.jsx`
2. Import and use `../styles/Widget.css`
3. Wrap content in `<div className="widget">...</div>`
4. Add to Home.jsx in appropriate section
5. Follow grayscale styling patterns
6. Include dark mode support

## Design Considerations

**Images & Visual Content**
When adding images or screenshots to the site, maintain minimalism through:
- **Expandable cards**: Collapsed by default, expand on click to reveal grayscale images
- **Monochrome filter**: Apply grayscale to all images to maintain aesthetic
- **Progressive disclosure**: Show text first, images on demand
- **Text-first approach**: Prioritize written content over visual elements
- Consider: hover-reveal images, lightbox modals, or side-by-side layouts (desktop only)

## Important Notes

- **No TypeScript**: This project uses plain JavaScript
- **Vite-specific**: Use `import.meta.glob` for file imports
- **API Usage**: Prefer free, no-auth APIs when possible
- **Git Commits**: Include descriptive messages following conventional format
- **User Preferences**: Always respect the grayscale aesthetic unless explicitly asked to change it

## Development

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Dependencies

**Core**
- React 19.1.1 + React Router DOM 7.9.5
- Vite 7.1.7

**Blog System**
- gray-matter 4.0.3 (frontmatter parsing)
- react-markdown 10.1.0 (rendering)
- buffer 6.0.3 (for gray-matter compatibility)

**Weather**
- Uses wttr.in free API (no package needed)
