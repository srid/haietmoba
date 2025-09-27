# How am I experiencing this moment of being alive?

A moment-by-moment journalmoment-by-moment journal app. Available as web app thator capturesChrome yourextension experiencewithcross-devicesync.

🌐 **Web App**: [https://srid.github.io/haietmoba](https://srid.github.io/haietmoba)  
🔗 **Article**: [https://srid.ca/HAIETMOBA](https://srid.ca/HAIETMOBA)

## Features

✨ **Simple Journaling**: Answer "How am I experiencing this moment of being alive?" with a quick entry  
🎯 **Mood Tracking**: Three moods with color-coded visual indicators (Bad, Good, Excellent)  
📅 **Timeline View**: Entries grouped by day with "Today/Yesterday" labels  
✏️ **Inline Editing**: Double-click any entry to edit in-place  
📱 **Mobile Responsive**: Works perfectly on desktop and mobile  
🔄 **Import/Export**: Backup and restore your entries as JSON  
🎨 **Clean Design**: Crisp, light, and playful interface

## Chrome Extension (Recommended)

🚀 **Automatic Sync**: Install as Chrome extension for seamless sync across all your devices

### Installation
1. Download this repository or clone it
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked" and select the project folder
5. Click the extension icon in your toolbar to open your journal

### Benefits
- **Zero setup**: Uses your Google account for sync (no registration needed)
- **Cross-device**: Works on desktop, mobile, and any Chrome browser where you're signed in
- **Instant sync**: Entries appear on all devices automatically
- **Offline support**: Works without internet, syncs when online
- **Migration**: Automatically migrates existing web app data

## Usage

1. **Add Entry**: Type your response and press Enter (default mood: Good)
2. **Select Mood**: Click the colored circle that matches your feeling
3. **Edit Entry**: Double-click any entry text to edit
4. **Export Data**: Use the settings button (⚙️) to backup your entries
5. **Import Data**: Upload a JSON file to restore entries

## Development

```bash
# Start local server
just serve

# Package Chrome extension
just package

# Deploy to GitHub Pages
just deploy

# Show all commands
just
```

## Sample Data

Try importing `sample.json` to see the app with realistic demo data spanning several days.

## Technical Details

- **Client-side only**: No server, no tracking, your data stays private
- **Storage**: localStorage (web) or chrome.storage.sync (extension)
- **Framework**: Vanilla JavaScript with custom CSS
- **Responsive**: Mobile-first design with Flexbox layout🌐 **Web App**: [https://srid.github.io/haietmoba](https://srid.github.io/haietmoba)  
🔗 **Article**: [https://srid.ca/HAIETMOBA](https://srid.ca/HAIETMOBA)

## Features

- Simple journaling with mood tracking (Bad, Good, Excellent)
- Timeline view grouped by day
- Double-click to edit entries
- Import/export JSON backup
- Chrome extension: automatic sync across devices

## Chrome Extension Setup

1. Download/clone this repo
2. Chrome → `chrome://extensions/` → Enable "Developer mode"
3. Click "Load unpacked" → Select project folder
4. Click extension icon to open

## Development

```bash
just serve     # Local server
just package   # Build extension
just deploy    # Push to GitHub Pages
```

All data is client-side only. Try importing `sample.json` for demo data.