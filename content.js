// Updated content.js

const savePrompts = (prompts) => {
    const formattedPrompts = prompts.map(prompt => ({
        ...prompt,
        platform: navigator.platform,
        time: new Date().toISOString()
    }));
    localStorage.setItem('prompts', JSON.stringify(formattedPrompts));
};

const loadPrompts = () => {
    const storedPrompts = localStorage.getItem('prompts');
    return storedPrompts ? JSON.parse(storedPrompts) : [];
};

// Example usage
const prompts = loadPrompts();
savePrompts(prompts);