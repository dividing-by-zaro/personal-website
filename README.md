# Personal Website

A minimal, grayscale personal website built with React and Vite. Features dynamic content from various APIs and data sources while maintaining a clean, distraction-free aesthetic.

## Features

- **Dynamic Workout Tracker**: GitHub-style contribution graph powered by Google Sheets CSV
- **Live Weather Widget**: Real-time Las Vegas weather from wttr.in
- **Reading List**: Currently reading books with Open Library cover integration
- **Professional Work**: Course projects with live enrollment and rating data
- **Blog System**: Markdown-based blog with frontmatter support
- **GitHub Projects**: Curated project showcase

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 19.1.1 + React Router DOM 7.9.5
- Vite 7.1.7
- react-markdown + gray-matter (blog system)
- react-icons (UI components)

## Project Structure

See [CLAUDE.md](./CLAUDE.md) for comprehensive documentation on:
- Component architecture
- Coding conventions
- Common development tasks
- Design philosophy

## Future Directions

### Performance & Reliability

**Backend API Layer**
- Create serverless backend (Vercel/Netlify functions) to cache API responses
- Cache weather data for 10-30 minutes to reduce external API calls
- Update Coursera enrollment data once per day instead of on every page load
- Add rate limiting and request deduplication

**Fallback Mechanisms**
- Add static fallback numbers for Coursera scraping in case CORS proxy fails
- Implement graceful degradation when APIs are unavailable
- Add stale-while-revalidate caching strategy
- Store last successful API response in localStorage as emergency fallback

**Error Handling**
- Implement React Error Boundaries for component-level error isolation
- Add global error tracking (Sentry or similar)
- Show user-friendly error messages instead of blank components
- Log API failures for monitoring and debugging

### User Experience

**Loading States**
- Add skeleton loaders for all dynamic content
- Implement progressive loading (show cached data immediately, update when fresh data arrives)
- Add loading progress indicators for slower connections

**Offline Support**
- Service worker for offline functionality
- Cache critical assets and static content
- Show offline indicator when APIs are unreachable

**Accessibility**
- Comprehensive ARIA labels and semantic HTML
- Keyboard navigation improvements
- Screen reader optimization
- Color contrast verification for grayscale palette

### Content Management

**Analytics**
- Privacy-friendly analytics (Plausible or GoatCounter)
- Track which content resonates most
- Monitor API failure rates

**Data Management**
- Automated Google Sheets sync for workout data
- Reading list automation (Goodreads API integration)
- GitHub activity feed integration
- RSS feed for blog posts

**Dynamic Updates**
- WebSocket or polling for real-time workout data updates
- Notification system for new blog posts
- Newsletter integration

### Technical Improvements

**Build Optimization**
- Code splitting for faster initial load
- Image optimization and lazy loading
- Bundle size analysis and reduction
- Preload critical resources

**Testing**
- Unit tests for utility functions
- Integration tests for components
- E2E tests for critical user flows
- Visual regression testing

**Developer Experience**
- Storybook for component documentation
- Automated dependency updates (Renovate/Dependabot)
- GitHub Actions for CI/CD
- Automated lighthouse scores on PRs

### Security

**Content Security Policy**
- Add CSP headers to prevent XSS
- Implement Subresource Integrity for CDN assets
- Regular dependency security audits

**Privacy**
- Add privacy policy page
- Cookie consent (if adding analytics)
- Document all external API calls and data sharing

## Current Status

The site is production-ready as a frontend-only application. All external APIs are public/free with no authentication required. See above for recommended enhancements before high-traffic deployment.

## License

Private project - all rights reserved.
