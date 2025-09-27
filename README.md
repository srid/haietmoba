# HAIETMOBA

Moment-by-moment journal app. Available as web app or Chrome extension.

🌐 **Web App**: [https://srid.github.io/haietmoba](https://srid.github.io/haietmoba)  
🔗 **Article**: [https://srid.ca/HAIETMOBA](https://srid.ca/HAIETMOBA)

## Features

- Simple journaling with mood tracking (Bad, Good, Excellent)
- Timeline view grouped by day  
- Double-click to edit entries
- Import/export JSON backup
- Chrome extension with session storage

## Chrome Extension Setup

1. Download/clone this repo
2. Chrome → `chrome://extensions/` → Enable "Developer mode"
3. Click "Load unpacked" → Select project folder
4. Click extension icon to open

## Storage

- **Web version**: localStorage
- **Chrome extension**: chrome.storage.sync (persistent, synced across devices)
- Extension fails instead of falling back to localStorage for data integrity

## Development

```bash
just open               # Build and open local web version in browser
just build-web          # Build web version to dist/web/
just css build          # Build CSS only
just extension build    # Build extension to dist/extension/
just extension test     # Build extension and show testing instructions
just extension package  # Create distributable extension zip
```

### Build Process
- **Justfile modules**: `css/justfile` and `extension/justfile` as proper modules
- **Tailwind CSS**: `css/src/input.css` → `css/styles.css`
- **Clean builds**: All outputs go to `dist/` folder
- **Chrome extension CSP compliant**

All data is client-side only. Try importing `sample.json` for demo data.