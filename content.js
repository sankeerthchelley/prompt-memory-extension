// Content script for ChatGPT Prompt Memory Extension

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPrompts") {
    sendResponse({ prompts: getAllPrompts() });
  }
});

// Function to get all prompts from the page
function getAllPrompts() {
  const prompts = [];
  
  // Select all user message elements in ChatGPT
  const userMessages = document.querySelectorAll('[data-message-author-role="user"]');
  
  userMessages.forEach((element, index) => {
    const textContent = element.innerText || element.textContent;
    if (textContent && textContent.trim()) {
      prompts.push({
        id: index + 1,
        text: textContent.trim(),
        timestamp: new Date().toISOString()
      });
    }
  });
  
  return prompts;
}

// Auto-save prompts to storage
function savePromptsToStorage() {
  const prompts = getAllPrompts();
  if (prompts.length > 0) {
    chrome.storage.local.get(['allPrompts'], (result) => {
      const existingPrompts = result.allPrompts || [];
      const newPrompts = prompts.filter(p => 
        !existingPrompts.some(ep => ep.text === p.text)
      );
      
      if (newPrompts.length > 0) {
        const updatedPrompts = [...existingPrompts, ...newPrompts];
        chrome.storage.local.set({ allPrompts: updatedPrompts });
      }
    });
  }
}

// Save prompts when Enter key is pressed in textarea
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    const textarea = document.querySelector('textarea[placeholder*="Message"]');
    if (textarea && document.activeElement === textarea) {
      setTimeout(savePromptsToStorage, 1000); // Wait for message to be sent
    }
  }
});

// Save prompts when send button is clicked
document.addEventListener('click', (e) => {
  const sendButton = e.target.closest('button[data-testid="send-button"]');
  if (sendButton) {
    setTimeout(savePromptsToStorage, 1000); // Wait for message to be sent
  }
});

// Observe DOM changes to catch dynamically loaded messages
const observer = new MutationObserver(() => {
  savePromptsToStorage();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial save
setTimeout(savePromptsToStorage, 2000);
