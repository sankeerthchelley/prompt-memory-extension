// Prompt Memory Extension - Popup Script
// Complete functionality with search, filter, favorites, tags, export/import

let allPrompts = [];
let currentFilter = 'all';
let currentSearch = '';
let selectedPromptIndex = null;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  loadPrompts();
  initializeEventListeners();
  loadSettings();
});

// Load all prompts from storage
function loadPrompts() {
  chrome.storage.local.get(['prompts', 'favorites', 'tags'], (result) => {
    allPrompts = result.prompts || [];
    const favorites = result.favorites || [];
    const tags = result.tags || {};
    
    // Merge favorites and tags into prompts
    allPrompts = allPrompts.map((prompt, index) => ({
      ...prompt,
      id: index,
      favorite: favorites.includes(index),
      tags: tags[index] || []
    }));
    
    updateStats();
    renderPrompts();
  });
}

// Render prompts based on current filter and search
function renderPrompts() {
  const filteredPrompts = filterPrompts();
  const promptsList = document.getElementById('promptsList');
  const emptyState = document.getElementById('emptyState');
  
  if (filteredPrompts.length === 0) {
    promptsList.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }
  
  promptsList.classList.remove('hidden');
  emptyState.classList.add('hidden');
  
  promptsList.innerHTML = filteredPrompts.map((prompt, index) => `
    <div class="prompt-card" data-id="${prompt.id}">
      <div class="prompt-header">
        <button class="favorite-btn ${prompt.favorite ? 'active' : ''}" 
                onclick="toggleFavorite(${prompt.id})">
          ${prompt.favorite ? '⭐' : '☆'}
        </button>
        <span class="platform-tag">${getPlatformName(prompt.platform)}</span>
        <span class="prompt-date">${formatDate(prompt.time)}</span>
      </div>
      <div class="prompt-text" onclick="openPromptModal(${prompt.id})">
        ${truncateText(prompt.text, 150)}
      </div>
      ${prompt.tags.length > 0 ? `
        <div class="prompt-tags">
          ${prompt.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      ` : ''}
      <div class="prompt-actions">
        <button onclick="copyPrompt(${prompt.id})" title="Copy">📋</button>
        <button onclick="openPromptModal(${prompt.id})" title="Details">ℹ️</button>
        <button onclick="deletePrompt(${prompt.id})" class="delete-btn" title="Delete">🗑️</button>
      </div>
    </div>
  `).join('');
}

// Filter prompts
function filterPrompts() {
  return allPrompts.filter(prompt => {
    // Apply filter
    if (currentFilter === 'favorites' && !prompt.favorite) return false;
    if (currentFilter !== 'all' && currentFilter !== 'favorites') {
      if (!prompt.platform.includes(currentFilter)) return false;
    }
    
    // Apply search
    if (currentSearch) {
      const searchLower = currentSearch.toLowerCase();
      return prompt.text.toLowerCase().includes(searchLower) ||
             prompt.tags.some(tag => tag.toLowerCase().includes(searchLower));
    }
    
    return true;
  });
}

// Event Listeners
function initializeEventListeners() {
  // Search
  document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderPrompts();
  });
  
  document.getElementById('clearSearch').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    currentSearch = '';
    renderPrompts();
  });
  
  // Filter tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderPrompts();
    });
  });
  
  // Dark mode
  document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
  
  // Export/Import
  document.getElementById('exportBtn').addEventListener('click', exportPrompts);
  document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('importFileInput').click();
  });
  document.getElementById('importFileInput').addEventListener('change', importPrompts);
  
  // Clear all
  document.getElementById('clearAllBtn').addEventListener('click', clearAllPrompts);
  
  // Modal
  document.querySelector('.close-modal').addEventListener('click', closeModal);
  document.getElementById('copyModalBtn').addEventListener('click', () => {
    copyPrompt(selectedPromptIndex);
  });
  document.getElementById('deleteModalBtn').addEventListener('click', () => {
    deletePrompt(selectedPromptIndex);
    closeModal();
  });
  document.getElementById('addTagBtn').addEventListener('click', addTag);
}

// Toggle favorite
function toggleFavorite(id) {
  chrome.storage.local.get(['favorites'], (result) => {
    let favorites = result.favorites || [];
    const index = favorites.indexOf(id);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }
    
    chrome.storage.local.set({ favorites }, () => {
      loadPrompts();
    });
  });
}

// Copy prompt
function copyPrompt(id) {
  const prompt = allPrompts.find(p => p.id === id);
  navigator.clipboard.writeText(prompt.text).then(() => {
    showNotification('Copied to clipboard!');
  });
}

// Delete prompt
function deletePrompt(id) {
  if (!confirm('Delete this prompt?')) return;
  
  chrome.storage.local.get(['prompts'], (result) => {
    const prompts = result.prompts || [];
    prompts.splice(id, 1);
    chrome.storage.local.set({ prompts }, () => {
      loadPrompts();
    });
  });
}

// Open prompt modal
function openPromptModal(id) {
  selectedPromptIndex = id;
  const prompt = allPrompts.find(p => p.id === id);
  
  document.getElementById('modalPromptText').textContent = prompt.text;
  document.getElementById('modalPlatform').textContent = getPlatformName(prompt.platform);
  document.getElementById('modalDate').textContent = formatDate(prompt.time);
  
  const tagsContainer = document.getElementById('modalTags');
  tagsContainer.innerHTML = prompt.tags.map(tag => 
    `<span class="tag">${tag} <button onclick="removeTag(${id}, '${tag}')">×</button></span>`
  ).join('');
  
  document.getElementById('promptModal').classList.remove('hidden');
}

// Close modal
function closeModal() {
  document.getElementById('promptModal').classList.add('hidden');
}

// Add tag
function addTag() {
  const input = document.getElementById('newTagInput');
  const tag = input.value.trim();
  
  if (!tag) return;
  
  chrome.storage.local.get(['tags'], (result) => {
    const tags = result.tags || {};
    if (!tags[selectedPromptIndex]) tags[selectedPromptIndex] = [];
    if (!tags[selectedPromptIndex].includes(tag)) {
      tags[selectedPromptIndex].push(tag);
    }
    chrome.storage.local.set({ tags }, () => {
      input.value = '';
      loadPrompts();
      openPromptModal(selectedPromptIndex);
    });
  });
}

// Remove tag
function removeTag(id, tag) {
  chrome.storage.local.get(['tags'], (result) => {
    const tags = result.tags || {};
    if (tags[id]) {
      tags[id] = tags[id].filter(t => t !== tag);
    }
    chrome.storage.local.set({ tags }, () => {
      loadPrompts();
      openPromptModal(id);
    });
  });
}

// Export prompts
function exportPrompts() {
  chrome.storage.local.get(['prompts', 'favorites', 'tags'], (result) => {
    const data = {
      prompts: result.prompts || [],
      favorites: result.favorites || [],
      tags: result.tags || {},
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-memory-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Exported successfully!');
  });
}

// Import prompts
function importPrompts(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      chrome.storage.local.set({
        prompts: data.prompts || [],
        favorites: data.favorites || [],
        tags: data.tags || {}
      }, () => {
        loadPrompts();
        showNotification('Imported successfully!');
      });
    } catch (error) {
      alert('Invalid file format');
    }
  };
  reader.readAsText(file);
}

// Clear all prompts
function clearAllPrompts() {
  if (!confirm('Delete ALL prompts? This cannot be undone!')) return;
  
  chrome.storage.local.set({
    prompts: [],
    favorites: [],
    tags: {}
  }, () => {
    loadPrompts();
  });
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('darkModeIcon').textContent = isDark ? '☀️' : '🌙';
  chrome.storage.local.set({ darkMode: isDark });
}

// Load settings
function loadSettings() {
  chrome.storage.local.get(['darkMode'], (result) => {
    if (result.darkMode) {
      document.body.classList.add('dark-mode');
      document.getElementById('darkModeIcon').textContent = '☀️';
    }
  });
}

// Update stats
function updateStats() {
  document.getElementById('promptCount').textContent = `${allPrompts.length} prompts`;
  if (allPrompts.length > 0) {
    const lastPrompt = allPrompts[0];
    document.getElementById('lastSaved').textContent = `Last saved ${formatDate(lastPrompt.time)}`;
  }
}

// Utility functions
function getPlatformName(hostname) {
  if (hostname.includes('openai') || hostname.includes('chatgpt')) return 'ChatGPT';
  if (hostname.includes('claude')) return 'Claude';
  if (hostname.includes('gemini')) return 'Gemini';
  return hostname;
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return `${Math.floor(diffMins / 1440)}d ago`;
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

function showNotification(message) {
  // Simple notification (you can enhance this)
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}
