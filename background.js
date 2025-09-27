// Background service worker for HAIETMOBA Chrome extension
// This handles the extension lifecycle and storage events

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('HAIETMOBA extension installed');
    // Migration will be handled in the main app
  }
});

// Handle storage changes and sync events
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.journalEntries) {
    console.log('Journal entries synced across devices');
  }
});