# 🧠 Prompt Memory Extension

> Never lose a great AI prompt again! Save, organize, and reuse your best prompts across all AI platforms.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)

## 🚀 Overview

Prompt Memory is a Chrome extension that automatically saves your AI prompts as you use ChatGPT, Claude, Gemini, and other AI platforms. Never waste time rewriting prompts or searching through chat history again.

## ✨ Features

### Current (Week 1 - MVP)
- ✅ **Auto-save prompts** - Automatically captures prompts when you press Enter
- ✅ **Works across platforms** - ChatGPT, Claude, Gemini support
- ✅ **Local storage** - All your prompts saved securely in your browser
- ✅ **Simple popup** - Quick access to your prompt library

### Coming Soon
- 🔜 **Search & Filter** - Find prompts instantly (Week 2)
- 🔜 **Tags & Categories** - Organize prompts by topic (Week 3)
- 🔜 **One-click reuse** - Insert saved prompts with one click (Week 3)
- 🔜 **Favorites** - Star your most-used prompts (Week 3)
- 🔜 **Export/Import** - Backup and share your prompt library (Week 4)

## 📦 Installation

### For Users (Coming Soon)
Once published on Chrome Web Store:
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "Prompt Memory"
3. Click "Add to Chrome"

### For Developers (Now)
1. Clone this repository:
   ```bash
   git clone https://github.com/sankeerthchelley/prompt-memory-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the cloned folder

## 🛠️ Tech Stack

- **Manifest V3** - Latest Chrome Extension standard
- **Vanilla JavaScript** - No frameworks, pure performance
- **Chrome Storage API** - Secure local storage
- **HTML/CSS** - Clean, responsive UI

## 📁 Project Structure

```
prompt-memory-extension/
├── manifest.json       # Extension configuration
├── content.js          # Captures prompts from web pages
├── popup.html          # Extension popup UI
├── popup.js            # Popup functionality
├── styles.css          # Styling
└── README.md           # You are here!
```

## 🗓️ Development Roadmap

### Week 1: Foundation ✅
- [x] Project setup
- [x] Manifest.json configuration
- [x] Basic content script
- [x] Prompt capture on Enter key
- [x] Local storage integration

### Week 2: Library UI (In Progress)
- [ ] Create popup interface
- [ ] Display saved prompts list
- [ ] Add search functionality
- [ ] Implement copy button
- [ ] Add delete functionality

### Week 3: Enhanced Features
- [ ] Tag system
- [ ] Category organization
- [ ] One-click prompt insertion
- [ ] Favorites/starred prompts
- [ ] Edit saved prompts

### Week 4: Polish & Launch
- [ ] Export/import prompts
- [ ] Dark mode support
- [ ] Onboarding tutorial
- [ ] Chrome Web Store submission
- [ ] Landing page

## 🎯 30-Day Goal

**Ship a working extension with 50+ real users by March 13, 2026**

## 💡 Why This Project?

This project was born from a simple realization: we spend hours crafting perfect prompts, but they vanish into chat history. Prompt Memory solves this by:

1. **Saving time** - Reuse proven prompts instantly
2. **Building knowledge** - Create a personal prompt library
3. **Improving results** - Learn from your best prompts
4. **Staying organized** - Keep prompts categorized and searchable

## 🤝 Contributing

This is currently a personal learning project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need to save and reuse AI prompts efficiently
- Built as part of a 30-day shipping challenge
- Thanks to the AI community for the inspiration

## 📧 Contact

Sankeerth Chelley - [@sankeerthchelley](https://github.com/sankeerthchelley)

Project Link: [https://github.com/sankeerthchelley/prompt-memory-extension](https://github.com/sankeerthchelley/prompt-memory-extension)

---

**Status**: 🚧 Week 1 Complete - Building Week 2 Features

**Last Updated**: February 11, 2026
**Test sync at [current time] - If you see this, sync is working!**
