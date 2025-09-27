# HAIETMOBA

Moment-by-moment journal app with client-side data storage.[^1] Available as web app or Chrome extension.

🌐 **Web App**: [https://haietmoba.naivete.me](https://haietmoba.naivete.me)
🔗 **Article**: [https://srid.ca/HAIETMOBA](https://srid.ca/HAIETMOBA)

> [!NOTE]
> This project is [largely LLM-generated](https://x.com/sridca/status/1971968939954409592).

## Features

- Simple journaling with mood tracking (Bad, Good, Excellent)
- Timeline view grouped by day
- Double-click to edit entries
- Import/export JSON backup
- Chrome extension with session storage
- Progressive Web App (PWA) - installable on mobile devices

## Chrome Extension Setup

1. Download/clone this repo
2. Run `just extension build` to build the extension
3. Chrome → `chrome://extensions/` → Enable "Developer mode"
4. Click "Load unpacked" → Select the `dist/extension/` folder
5. Click extension icon to open

## PWA Installation

**Android Chrome:**
1. Open [https://srid.github.io/haietmoba](https://srid.github.io/haietmoba) in Chrome
2. Tap the menu (⋮) → "Install app" or look for the install prompt
3. App will be added to your home screen

**iOS Safari:**
1. Open the web app in Safari
2. Tap the share button → "Add to Home Screen"

## Storage

- **Web version**: localStorage
- **Chrome extension**: chrome.storage.sync (persistent, synced across devices)

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

All data is client-side only.[^1] Try importing `sample.json` for demo data.

[^1]: Chrome extension sync uses Google's servers to synchronize data across your signed-in Chrome browsers.
