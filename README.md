# 🎮 Twitch Chat Filter

A professional Electron desktop app that intelligently filters Twitch chat to show only meaningful messages, helping streamers with high viewer counts focus on quality interactions.

![Version](https://img.shields.io/badge/version-2.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![Electron](https://img.shields.io/badge/electron-latest-green)

## 📸 Screenshots

### Connection Screen
![Connection Screen](Screenshot%202025-12-05%20140604.png)

### Live Chat View
![Live Chat View](Screenshot%202025-12-05%20141058.png)

---

## ✨ Features Overview

### 🎯 Intelligent Message Filtering
Advanced multi-layer filtering system that shows **ONLY** high-quality messages:

- **ALL CAPS Filter** - Removes messages with >60% capital letters
- **Copypasta Detection** - Filters repeating words and patterns (even 2+ repetitions)
- **Emote-Only Filter** - Removes messages containing only emotes
- **Short Message Filter** - Filters messages under 10 characters
- **Gibberish Detection** - Removes nonsensical text with poor vowel/consonant ratios
- **Excessive Emotes** - Filters messages where >40% are emotes
- **Single Word Filter** - Removes one-word messages (unless they're questions)
- **Spam Phrase Detection** - Filters 100+ common spam phrases (gg, lol, bruh, etc.)
- **Bot Filter** - Automatically filters bot messages (Fossabot, Nightbot, etc.)
- **Reaction Filter** - Removes low-effort reactions and short responses
- **Mention Filter** - Filters @ mentions that aren't questions
- **Symbol-Only Filter** - Removes messages with no real words
- **Quality Scoring** - Smart algorithm that allows longer, substantive messages to pass

### 🎭 Dynamic Emote System
Automatically fetches and displays emotes from **all major sources**:

#### Supported Platforms
- ✅ **BetterTTV (BTTV)** - Global + channel-specific emotes
- ✅ **FrankerFaceZ (FFZ)** - Global + channel-specific emotes
- ✅ **7TV** - Global + channel-specific emotes
- ✅ **Native Twitch** - Built-in Twitch emotes

#### Emote Features
- 🔄 **Real-time fetching** - Always up-to-date emote lists
- 🖼️ **Visual display** - Actual emote images in messages
- 🎬 **Animated emotes** - GIF and WebP animations play automatically
- 📊 **1000+ emotes** - Typically loaded per channel
- 🎨 **Hover effects** - Emotes enlarge and glow on hover

### 🔥 Current Mood Display
Real-time mood indicator showing what chat is spamming:

#### Features
- 🎯 **Emote tracking** - Monitors last 25 messages
- 🔢 **Combo counter** - Shows "2x", "10x", "50x" as spam continues
- 📈 **Infinite combos** - No cap on combo count
- 🎨 **Visual feedback** - Glowing, pulsing animation when active
- 🖼️ **Emote images** - Displays actual emote pictures (including animated)
- 💫 **Auto-reset** - Switches when a different emote becomes popular

#### How It Works
```
Message 1: "KEKW" → Waiting...
Message 2: "KEKW" → Current Mood: [KEKW] 2x (combo starts!)
Message 3: "KEKW" → Current Mood: [KEKW] 3x
Message 4: "KEKW" → Current Mood: [KEKW] 4x
...continues growing...
```

## 🚀 Quick Start

### Option 1: Download Release (Recommended)
1. **Download** the latest release from [GitHub Releases](https://github.com/Demoen/twitch-chat-app/releases)
2. **Run** `Twitch Chat Filter 1.0.0.exe` - No installation required!

### Option 2: Run from Source
```bash
git clone <repository-url>
cd twitch-chat-app
npm install
npm start
```
---

## 📖 How to Use

1. **Launch the app** - Download and run the .exe or use `npm start`
2. **Enter channel name** - Type any Twitch username (e.g., "shroud", "pokimane")
3. **Configure filters** - Toggle filters on/off (all enabled by default)
4. **Click Connect** - Enjoy filtered chat with only quality messages!

---

## 🎯 What Gets Filtered

### ❌ Filtered Out
- Emote spam (KEKW KEKW KEKW)
- Copypasta and repeated words
- ALL CAPS messages
- Short reactions (gg, lol, bruh)
- Bot messages
- Gibberish text
- Single word messages

### ✅ Allowed Through
- Questions
- Thoughtful comments (10+ characters)
- Multi-word sentences with substance
- Meaningful conversations

---

## 🔧 Technologies

- **Electron** - Desktop framework
- **tmi.js** - Twitch chat connection
- **BetterTTV, FrankerFaceZ, 7TV** - Emote APIs
- **DecAPI** - Twitch avatars

---

## 🐛 Troubleshooting

**No messages showing?** Try disabling some filters or check your internet connection.

**Emotes not loading?** Wait a few seconds after connecting.

**Performance issues?** Click "Clear Chat" to reset the display.

---

## 📄 License

MIT License - Free to use and modify.

---

**Built with ❤️ for the Twitch community**
