// Prompt Memory Extension - Content Script
// Captures prompts when user presses Enter

console.log('Prompt Memory: Content script loaded');

// Listen for Enter key press
document.addEventListener('keydown', function(e) {
  // Check if Enter key (without Shift for new line)
  if (e.key === 'Enter' && !e.shiftKey) {
    // Find the textarea element
    const textarea = document.querySelector('textarea');
    
    if (!textarea) return;
    
    const text = textarea.value.trim();
    
    // Only save non-empty prompts
    if (!text) return;
    
    console.log('Prompt Memory: Capturing prompt:', text.substring(0, 50) + '...');
    
    // Get existing prompts from storage
    chrome.storage.local.get(['prompts'], (res) => {
      const prompts = res.prompts || [];
      
      // Create prompt object
      const newPrompt = {
        text: text,
        time: Date.now(),
        platform: window.location.hostname,
        url: window.location.href
      };
      
      // Add to beginning of array (most recent first)
      prompts.unshift(newPrompt);
      
      // Limit to last 1000 prompts
      if (prompts.length > 1000) {
        prompts.pop();
      }
      
      // Save back to storage
      chrome.storage.local.set({ prompts: prompts }, () => {
        console.log('Prompt Memory: Saved! Total prompts:', prompts.length);
      });
    });
  }
});
