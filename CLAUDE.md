# CLAUDE.md

## Instructions for Claude Code

When making changes to this codebase:

1. **NEVER commit or change git history** - Do not use `git commit`, `git push`, or any git commands that modify history unless explicitly told to by the user each and every time
2. **Always update documentation** - If you modify architecture, storage, features, or development workflow, update both `README.md` and this `CLAUDE.md` file accordingly
3. **Keep README.md technical** - Focus on setup, usage, and technical details rather than marketing language
4. **Keep CLAUDE.md comprehensive** - Document architectural decisions, data flow changes, and any new patterns introduced
5. **Update storage documentation** - If storage logic changes, update the Storage section in both files
6. **Document new features** - Add any new functionality to the Features section in README.md
7. **Update development commands** - If justfile targets change, update the Development section in README.md

## Architecture

### Overview
HAIETMOBA is a dual-mode journaling application that works as both a web app and Chrome extension. The architecture is designed for simplicity with vanilla JavaScript and no external dependencies.

### File Structure
- `index.html` - Main HTML structure with semantic markup
- `app.js` - Core JavaScript functionality and storage logic
- `styles.css` - Custom CSS replacing Tailwind for Chrome extension CSP compliance
- `manifest.json` - Chrome extension configuration (manifest v3)
- `background.js` - Chrome extension service worker
- `justfile` - Development automation commands
- `sample.json` - Demo data for testing

### Storage Architecture
The app uses a hybrid storage system:

- **Web version**: Uses `localStorage` for client-side persistence
- **Chrome extension**: Uses `chrome.storage.sync` for cross-device synchronization
- **Migration**: Automatically migrates data from localStorage to chrome.storage.sync when first using extension
- **Failure handling**: Extension mode fails hard instead of falling back to localStorage for data integrity

### Core Components

#### Entry Management
- Entries stored as JSON objects with `timestamp`, `mood`, and `description`
- Three mood levels: Bad (red), Good (blue), Excellent (green)
- Timeline view grouped by day with relative date labels

#### User Interface
- Sticky header with app title linking to https://srid.ca/HAIETMOBA
- Fixed input area with mood selector (Good is default)
- Timeline with double-click editing functionality
- Footer with storage indicator and GitHub link
- Floating settings button with import/export functionality

#### Chrome Extension Features
- Manifest v3 service worker architecture
- CSP compliance (no inline scripts, external CDNs, or eval)
- Toolbar icon opens app in new tab
- Blue smiley face icon (light blue fill #93c5fd, dark blue stroke #1e40af)

### Data Flow
1. App initializes and detects environment (web vs extension)
2. Updates storage indicator in footer
3. Attempts migration from localStorage if in extension mode
4. Loads entries from appropriate storage backend
5. Renders timeline and sets up event listeners
6. All changes immediately save to storage without confirmation

### Development Notes
- No build process required - pure vanilla JS/CSS/HTML
- Event delegation used for dynamic content (timeline entries)
- Responsive design with mobile-first approach
- All external dependencies removed for Chrome extension compatibility

### Security Considerations
- Client-side only - no server communication
- No external script loading (CSP compliant)
- No eval() or inline event handlers
- Storage APIs handle data persistence securely