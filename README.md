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
- **Chrome extension**: chrome.storage.session (session-scoped, not synced across devices)
- Extension fails instead of falling back to localStorage for data integrity

## Development

```bash
just serve     # Local server
just package   # Build extension  
just deploy    # Push to GitHub Pages
```

All data is client-side only. Try importing `sample.json` for demo data.