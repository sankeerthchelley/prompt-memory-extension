// Code update to load prompts from correct storage key
// Assuming existing code structure

function loadPrompts() {
    chrome.storage.local.get(['prompts'], function(result) {
        if (result.prompts) {
            // Do something with the prompts
            console.log('Loaded prompts:', result.prompts);
        } else {
            console.log('No prompts found');
        }
    });
}

// Call the loadFunction to initialize prompts
loadPrompts();