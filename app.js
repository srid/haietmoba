// HAIETMOBA Journal App - Main JavaScript

// Journal entries storage
let entries = [];

// Chrome extension storage helper functions
async function loadEntries() {
    try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            // Chrome extension mode - use sync storage for persistent data
            const result = await chrome.storage.sync.get(['journalEntries']);
            entries = result.journalEntries || [];
        } else {
            // Web version fallback to localStorage
            entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        }
    } catch (error) {
        console.error('Error loading entries:', error);
        throw error; // Don't fallback in extension mode
    }
    renderTimeline();
}

async function saveEntries() {
    try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            // Chrome extension mode - use sync storage for persistent data
            await chrome.storage.sync.set({ journalEntries: entries });
        } else {
            // Web version fallback to localStorage
            localStorage.setItem('journalEntries', JSON.stringify(entries));
        }
    } catch (error) {
        console.error('Error saving entries:', error);
        throw error; // Don't fallback in extension mode
    }
}

// Migration function to move data from localStorage to chrome.storage.sync
async function migrateFromLocalStorage() {
    try {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            const localData = localStorage.getItem('journalEntries');
            if (localData) {
                const localEntries = JSON.parse(localData);
                if (localEntries.length > 0) {
                    // Check if we already have data in chrome.storage.sync
                    const result = await chrome.storage.sync.get(['journalEntries']);
                    if (!result.journalEntries || result.journalEntries.length === 0) {
                        // Migrate data
                        await chrome.storage.sync.set({ journalEntries: localEntries });
                        entries = localEntries;
                        console.log('Migrated', localEntries.length, 'entries from localStorage to chrome.storage.sync');
                        // Remove from localStorage after successful migration
                        localStorage.removeItem('journalEntries');
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error during migration:', error);
    }
}

// DOM elements will be set in setupEventListeners

// Current selected mood
let selectedMood = 'Good';

// Mood configurations
const moodConfig = {
    'Bad': { 
        icon: '●', 
        color: 'text-red-500',
        bgColor: 'bg-red-50', 
        borderColor: 'border-red-200', 
        textColor: 'text-red-700' 
    },
    'Good': { 
        icon: '●', 
        color: 'text-blue-500',
        bgColor: 'bg-blue-50', 
        borderColor: 'border-blue-200', 
        textColor: 'text-blue-700' 
    },
    'Excellent': { 
        icon: '●', 
        color: 'text-green-500',
        bgColor: 'bg-green-50', 
        borderColor: 'border-green-200', 
        textColor: 'text-green-700' 
    }
};

// Add entry function
async function addEntry() {
    const description = entryInput.value.trim();

    if (!description) return;

    const entry = {
        id: Date.now(),
        description,
        mood: selectedMood,
        timestamp: new Date().toISOString()
    };

    entries.unshift(entry); // Add to beginning for timeline order
    await saveEntries();
    
    entryInput.value = '';
    selectedMood = 'Good';
    updateMoodButtons();
    
    renderTimeline();
}

// Update mood button selection
function updateMoodButtons() {
    document.querySelectorAll('.mood-btn').forEach(btn => {
        const mood = btn.getAttribute('data-mood');
        const config = moodConfig[mood];
        
        // Remove all possible active/inactive classes first
        btn.classList.remove('border-2', 'border-red-200', 'border-blue-200', 'border-green-200', 'bg-red-50', 'bg-blue-50', 'bg-green-50');
        
        if (mood === selectedMood) {
            // Active state: add border and background
            btn.classList.add('border-2', config.borderColor, config.bgColor);
        }
        // Inactive state: no additional classes needed (base styles handle it)
    });
}

// Edit entry function
async function editEntry(entryId, newDescription) {
    const entryIndex = entries.findIndex(entry => entry.id === entryId);
    if (entryIndex !== -1) {
        entries[entryIndex].description = newDescription;
        await saveEntries();
        renderTimeline();
    }
}

// Delete entry function
async function deleteEntry(entryId) {
    const entryIndex = entries.findIndex(entry => entry.id === entryId);
    if (entryIndex !== -1) {
        entries.splice(entryIndex, 1);
        await saveEntries();
        renderTimeline();
        showMessage('✅ Entry deleted', 'success');
    }
}

// Handle double-click editing
function makeEditable(element, entryId) {
    const currentText = element.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'w-full px-2 py-1 rounded-lg bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-blue/50';
    
    // Replace text with input
    element.innerHTML = '';
    element.appendChild(input);
    input.focus();
    input.select();

    // Save on Enter
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newText = input.value.trim();
            if (newText) {
                editEntry(entryId, newText);
            } else {
                renderTimeline(); // Restore original if empty
            }
        }
    });

    // Save on blur
    input.addEventListener('blur', () => {
        const newText = input.value.trim();
        if (newText) {
            editEntry(entryId, newText);
        } else {
            renderTimeline(); // Restore original if empty
        }
    });

    // Cancel on Escape
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            renderTimeline(); // Restore original
        }
    });
}

// Export entries function
function exportEntries() {
    const exportData = {
        exportDate: new Date().toISOString(),
        entryCount: entries.length,
        version: "1.0",
        entries: entries
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `journal-entries-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showMessage(`✅ Exported ${entries.length} entries successfully!`, 'success');
}

// Import entries function
async function importEntries(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const importData = JSON.parse(e.target.result);
            
            // Validate structure
            if (!importData.entries || !Array.isArray(importData.entries)) {
                throw new Error('Invalid file format: missing entries array');
            }

            // Validate each entry
            const validEntries = importData.entries.filter(entry => {
                return entry.id && entry.description && entry.mood && entry.timestamp &&
                       ['Bad', 'Good', 'Excellent'].includes(entry.mood);
            });

            if (validEntries.length === 0) {
                throw new Error('No valid entries found in file');
            }

            // Get existing IDs to avoid duplicates
            const existingIds = new Set(entries.map(entry => entry.id));
            const newEntries = validEntries.filter(entry => !existingIds.has(entry.id));

            if (newEntries.length === 0) {
                showMessage('ℹ️ No new entries to import (all entries already exist)', 'info');
                return;
            }

            // Confirm import
            if (confirm(`Import ${newEntries.length} new entries? This will add them to your existing ${entries.length} entries.`)) {
                entries.push(...newEntries);
                entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first
                await saveEntries();
                renderTimeline();
                showMessage(`✅ Successfully imported ${newEntries.length} entries!`, 'success');
            }

        } catch (error) {
            showMessage(`❌ Import failed: ${error.message}`, 'error');
        }
    };
    
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
}

// Show message function
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('importExportMessage');
    messageDiv.textContent = message;
    messageDiv.className = `mt-2 text-center text-xs ${
        type === 'success' ? 'text-green-300' :
        type === 'error' ? 'text-red-300' :
        'text-gray-600'
    }`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'mt-2 text-center text-gray-600 text-xs';
    }, 5000);
}

// Render timeline
function renderTimeline() {
    if (entries.length === 0) {
        timeline.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    
    // Group entries by date
    const groupedEntries = entries.reduce((groups, entry) => {
        const date = new Date(entry.timestamp);
        const dateKey = date.toDateString();
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(entry);
        return groups;
    }, {});

    // Render grouped entries
    timeline.innerHTML = Object.entries(groupedEntries).map(([dateKey, dayEntries]) => {
        const date = new Date(dateKey);
        const isToday = date.toDateString() === new Date().toDateString();
        const isYesterday = date.toDateString() === new Date(Date.now() - 86400000).toDateString();
        
        let dateLabel;
        if (isToday) {
            dateLabel = 'Today';
        } else if (isYesterday) {
            dateLabel = 'Yesterday';
        } else {
            dateLabel = date.toLocaleDateString([], {weekday: 'long', month: 'long', day: 'numeric'});
        }

        const entriesHtml = dayEntries.map(entry => {
            const config = moodConfig[entry.mood];
            const time = new Date(entry.timestamp);
            const timeStr = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            return `
                <div class="entry-item group ${config.bgColor} rounded-lg border ${config.borderColor} p-4 hover:shadow-sm transition-all duration-200 relative">
                    <div class="flex items-center gap-3">
                        <div class="text-xs text-gray-500 font-medium min-w-12">
                            ${timeStr}
                        </div>
                        <span class="text-xl ${config.color}" title="Feeling ${entry.mood.toLowerCase()}">${config.icon}</span>
                        <div class="flex-1 min-w-0">
                            <p class="editable-entry text-gray-800 leading-relaxed cursor-pointer hover:bg-white/50 rounded p-1 -m-1 transition-colors" data-entry-id="${entry.id}" title="💡 Double-click to edit this entry">${entry.description}</p>
                        </div>
                        <span class="delete-btn opacity-0 group-hover:opacity-100 transition-all duration-200 text-gray-400 hover:text-red-500 cursor-pointer" data-entry-id="${entry.id}" title="Delete this entry">
                            🗑️
                        </span>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="mb-8">
                <h2 class="text-lg font-semibold text-gray-700 mb-4 px-2">${dateLabel}</h2>
                <div class="space-y-3">
                    ${entriesHtml}
                </div>
            </div>
        `;
    }).join('');
}

// DOM elements
let entryInput, timeline, emptyState;

// Event listeners setup
function setupEventListeners() {
    // Entry input
    entryInput = document.getElementById('entryInput');
    timeline = document.getElementById('timeline');
    emptyState = document.getElementById('emptyState');

    entryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addEntry();
        }
    });

    // Mood button event listeners
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedMood = e.target.getAttribute('data-mood');
            updateMoodButtons();
        });
    });

    // Import/Export buttons
    document.getElementById('exportBtn').addEventListener('click', exportEntries);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importEntries);

    // Timeline click handlers for editing - delegated event listener
    timeline.addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('editable-entry')) {
            const entryId = parseInt(e.target.getAttribute('data-entry-id'));
            makeEditable(e.target, entryId);
        }
    });

    // Timeline click handlers for delete - delegated event listener
    timeline.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const entryId = parseInt(e.target.getAttribute('data-entry-id'));
            deleteEntry(entryId);
        }
    });
}

// Update storage indicator in footer
function updateStorageIndicator() {
    const indicator = document.getElementById('storageIndicator');
    if (!indicator) return;
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
        indicator.textContent = 'Storage: chrome.storage.sync';
        indicator.className = 'text-xs text-blue-600 px-2 py-1 bg-blue-50 rounded-full';
    } else {
        indicator.textContent = 'Storage: localStorage';
        indicator.className = 'text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded-full';
    }
}

// Initialize
async function initialize() {
    setupEventListeners();
    updateStorageIndicator();
    await migrateFromLocalStorage();
    await loadEntries();
    updateMoodButtons();
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}