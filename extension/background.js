// Background service worker for HAIETMOBA Chrome extension
// This handles the extension lifecycle and storage events

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('HAIETMOBA extension installed');
    // Open the journal on first install
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
  }
});

// Handle toolbar icon click - open journal in new tab
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
});

// Handle storage changes and sync events
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.journalEntries) {
    console.log('Journal entries synced across devices');
  }
});