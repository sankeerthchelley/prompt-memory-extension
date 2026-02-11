function loadPrompts() {
    chrome.storage.local.get(['prompts', 'favorites', 'tags'], function (data) {
        // Logic to handle data
    });
}

function renderPrompts(filteredPrompts) {
    // Logic to display filtered prompts
}

function filterPrompts(criteria) {
    // Logic to filter prompts based on criteria
}

function initializeEventListeners() {
    document.getElementById('search').addEventListener('input', filterPrompts);
    // Initialize other event listeners for dark mode, export, import, and clear all
}

function toggleFavorite(promptId) {
    // Logic to toggle favorite status for a prompt
}

function copyPrompt(promptId) {
    // Logic to copy prompt text
}

function deletePrompt(promptId) {
    // Logic to delete a prompt
}

function openPromptModal(promptId) {
    // Logic to open modal with prompt details
}

function closeModal() {
    // Logic to close modal
}

function addTag(promptId, tag) {
    // Logic to add a tag to a prompt
}

function removeTag(promptId, tag) {
    // Logic to remove a tag from a prompt
}

function exportPrompts() {
    // Logic to export prompts
}

function importPrompts(file) {
    // Logic to import prompts from a file
}

function clearAllPrompts() {
    // Logic to clear all prompts
}

function toggleDarkMode() {
    // Logic to toggle dark mode
}

function loadSettings() {
    // Logic to load settings from storage
}

function updateStats() {
    // Logic to update statistics
}

function getPlatformName() {
    // Logic to get platform name
}

function formatDate(date) {
    // Logic to format date
}

function truncateText(text, length) {
    // Logic to truncate text to a specified length
}

function showNotification(message) {
    // Logic to display notifications to the user
}