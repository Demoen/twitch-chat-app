# 🎮 Twitch Chat Filter

A professional Electron desktop app that intelligently filters Twitch chat to show only meaningful messages, helping streamers with high viewer counts focus on quality interactions.

![Version](https://img.shields.io/badge/version-2.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![Electron](https://img.shields.io/badge/electron-latest-green)

## 📸 Screenshots

### Connection Screen
![Connection Screen](Screenshot%202025-12-05%20140604.png)
*Configure your filter settings and connect to any Twitch channel*

### Live Chat View
![Live Chat View](Screenshot%202025-12-05%20141058.png)
*Real-time filtered chat with emote support, mood tracking, and channel avatar display*

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

### 🎨 Professional UI Design

#### Modern Interface
- 🌙 **Dark theme** - Beautiful purple gradient design
- 💎 **Glass-morphism** - Translucent buttons with backdrop blur
- ✨ **Smooth animations** - GPU-accelerated transitions
- 📱 **Responsive** - Adapts to different screen sizes
- 🎯 **Clean layout** - Distraction-free fullscreen chat

#### Chat Display
- 👤 **Username badges** - Colored badges with user's Twitch color
- 🖼️ **Channel avatar** - Displays streamer's profile picture
- ⏰ **Timestamps** - Monospace font for easy reading
- 🎭 **Inline emotes** - Actual emote images within messages
- 📜 **Custom scrollbar** - Purple gradient, smooth scrolling
- 🎬 **Slide-in animation** - Messages appear smoothly
- 🌈 **Hover effects** - Subtle purple glow on message hover

#### Action Buttons
- 🗑️ **Clear Chat** - Glass-morphism design with icon
- 🚪 **Disconnect** - Premium purple gradient button
- 🎨 **Icon animations** - Icons scale on hover
- 💫 **Smooth transitions** - 0.1-0.2s for snappy feel

### 📊 Real-Time Statistics
Track filtering effectiveness:
- **Total Messages** - All messages received
- **Filtered** - Messages blocked by filters
- **Shown** - Quality messages displayed

---

## 🚀 Quick Start

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd twitch-chat-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm start
```

4. **Development mode** (with DevTools)
```bash
npm run dev
```

### Requirements
- Node.js 16 or higher
- Internet connection (for Twitch chat and emote APIs)

---

## 📖 How to Use

### Step-by-Step Guide

1. **Launch the app** - Run `npm start`
2. **Configure filters** - Toggle filters on/off (all enabled by default)
3. **Enter channel name** - Type a Twitch username (e.g., "shroud", "xqc", "pokimane")
4. **Click Connect** - App switches to fullscreen chat view
5. **Watch filtered chat** - See only quality messages in real-time
6. **Monitor mood** - Check "Current Mood" to see what chat is spamming
7. **Clear chat** - Click "Clear Chat" to reset the display
8. **Disconnect** - Click "Disconnect" to return and try another channel

### Filter Configuration

All filters are enabled by default for **maximum filtering**. You can toggle individual filters:

- ✅ **Filter ALL CAPS messages**
- ✅ **Filter repeating words (copypasta)**
- ✅ **Filter emote-only messages**
- ✅ **Filter very short messages (<10 chars)**
- ✅ **Filter gibberish text**
- ✅ **Filter excessive emotes (>40% of message)**

---

## 🎯 What Gets Filtered

### ❌ Filtered Out
- Single word messages
- Emote spam (KEKW KEKW KEKW)
- Copypasta (any word repeated 2+ times)
- All caps yelling (HELLO STREAMER)
- Bot messages (Fossabot, Nightbot, etc.)
- Short reactions (gg, lol, bruh)
- @ mentions (unless questions)
- Gibberish (asdfghjkl)
- Messages with no real words
- Excessive punctuation (!!!!!!)
- Common spam phrases

### ✅ Allowed Through
- Questions (messages with "?")
- Thoughtful comments (10+ characters with real words)
- Useful information or observations
- Multi-word sentences with substance
- Longer messages with @ mentions (8+ words)
- Messages with meaningful content

---

## 🔧 Technical Details

### Technologies Used
- **Electron** - Desktop application framework
- **tmi.js** - Twitch messaging interface
- **BetterTTV API** - Dynamic emote fetching
- **FrankerFaceZ API** - Dynamic emote fetching
- **7TV API** - Dynamic emote fetching
- **DecAPI** - Twitch user avatar fetching
- **HTML/CSS/JavaScript** - Modern frontend

### Filter Algorithm

#### Quality Scoring System
Messages are evaluated on multiple criteria:
```javascript
// Example scoring
- Length (longer = better)
- Contains question mark (+points)
- Has meaningful words (+points)
- All caps (-points)
- Excessive emotes (-points)
- Spam phrases (-points)
```

#### Smart Filtering
- **Short messages** (<8 words) - Heavily filtered
- **Long messages** (8-10+ words) - More lenient
- **Questions** - Always prioritized
- **Substantive content** - Recognized and allowed

### Emote Detection

#### Fetching Process
```javascript
1. Connect to channel
2. Fetch Twitch user ID
3. Load global emotes (BTTV, FFZ, 7TV)
4. Load channel-specific emotes
5. Build emote map for rendering
6. Parse messages and replace emote text with images
```

#### Image Rendering
```html
<!-- Emote found -->
<img src="https://cdn.betterttv.net/emote/{id}/3x" 
     alt="KEKW" 
     class="message-emote" 
     title="KEKW" />

<!-- Regular text -->
That's hilarious
```

### Mood Tracking

#### Algorithm
```javascript
1. Track last 25 messages
2. Count emote occurrences
3. Find most popular emote (threshold: 2+)
4. Display emote with combo counter
5. Increment combo if same emote continues
6. Reset combo if different emote wins
```

#### Combo System
- Starts at **2x** when threshold reached
- Increments by **1** with each update
- **No cap** - can go to infinity
- Resets when new emote becomes popular

### Performance Optimizations

#### CSS
- GPU-accelerated animations (`translate3d`)
- CSS containment (`contain: layout style paint`)
- Optimized transitions (0.1-0.2s)
- No layout recalculations on hover
- Efficient selectors

#### JavaScript
- Message limit (500 max)
- Efficient emote parsing
- Cached emote lookups
- Debounced updates
- Minimal DOM manipulation

#### Network
- CDN-hosted emote images
- Browser image caching
- Async API calls
- Fallback handling

---

## 🎨 Design Philosophy

### Visual Hierarchy
```
Timestamp → Username → Message
  (small)   (medium)    (normal)
  (gray)    (colored)   (white)
```

### Color Scheme
- **Background**: Dark gradients (rgba(0, 0, 0, 0.2-0.3))
- **Messages**: Subtle white tint (rgba(255, 255, 255, 0.01-0.03))
- **Usernames**: User's Twitch color + badge
- **Text**: Bright white (#e8e8e8)
- **Timestamp**: Gray (#808080, 70% opacity)
- **Accent**: Purple gradient (#9d4edd → #7b2cbf)

### Typography
- **Messages**: Sans-serif, 0.98em, line-height 1.6
- **Usernames**: Bold 700, 0.95em, 0.3px letter-spacing
- **Timestamp**: Monospace, 0.75em, 0.5px letter-spacing

### Spacing
- **Message padding**: 14px 20px
- **Message gap**: 4px
- **Emote margin**: 3px
- **Username padding**: 2px 8px

---

## 🎭 Emote Examples

### Example Messages

**Before (Text Only):**
```
[20:15:32] Username: That's hilarious KEKW OMEGALUL
[20:15:33] Username: catJAM PepeD monkaS
```

**After (With Emote Images):**
```
[20:15:32] Username: That's hilarious [KEKW image] [OMEGALUL image]
[20:15:33] Username: [catJAM animated] [PepeD animated] [monkaS animated]
```

### Supported Emote Types
- **Static emotes** - PNG images
- **Animated emotes** - GIF format
- **WebP emotes** - 7TV animated WebP
- **All sizes** - 1x, 2x, 3x, 4x available

---

## 📊 Filtering Examples

### Example 1: Spam Filtered
```
Input:  "KEKW KEKW KEKW KEKW"
Result: ❌ FILTERED (copypasta)
```

### Example 2: Quality Message
```
Input:  "What settings are you using for this game?"
Result: ✅ SHOWN (question, meaningful)
```

### Example 3: Short Reaction
```
Input:  "lol"
Result: ❌ FILTERED (spam phrase, too short)
```

### Example 4: Substantive Comment
```
Input:  "That play was insane, I can't believe you pulled that off"
Result: ✅ SHOWN (long, meaningful, substantive)
```

### Example 5: @ Mention (Short)
```
Input:  "@streamer hi"
Result: ❌ FILTERED (short @ mention)
```

### Example 6: @ Mention (Long)
```
Input:  "@streamer what do you think about the new update that just came out?"
Result: ✅ SHOWN (long, question, substantive)
```

---

## 🎯 Tips & Best Practices

### For Streamers
- Start with **all filters enabled** for maximum filtering
- Disable specific filters if you want more messages
- Use **Clear Chat** button to reset between segments
- Monitor **statistics** to see filtering effectiveness
- Watch **Current Mood** to gauge chat sentiment

### For Viewers
- The app shows what streamers see
- Quality messages are more likely to be read
- Ask thoughtful questions
- Avoid spam and copypasta
- Use emotes sparingly in messages

### Performance Tips
- App keeps last **500 messages** to prevent memory issues
- Clear chat periodically for best performance
- Close DevTools in production for better FPS
- Use on a stable internet connection

---

## 🐛 Troubleshooting

### Common Issues

**Issue: No messages showing**
- Check if filters are too aggressive
- Try disabling some filters
- Verify channel name is correct
- Check internet connection

**Issue: Emotes not displaying**
- Wait a few seconds for emotes to load
- Check browser console for errors
- Verify channel has custom emotes
- Try reconnecting

**Issue: Avatar not showing**
- Check internet connection
- Verify channel name is correct
- DecAPI might be temporarily down
- Avatar will fallback gracefully

**Issue: Lag or performance issues**
- Clear chat display
- Close DevTools
- Restart the application
- Check system resources

---

## 🔮 Future Enhancements

Potential features for future versions:
- 🎵 Sound effects for combos
- 🏆 Combo achievements/leaderboard
- 💾 Save filter presets
- 📝 Message history export
- 🎨 Custom themes
- 🔔 Notification system
- 📊 Advanced analytics
- 🌐 Multi-channel support
- 🎮 Streamer mode

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

## 🙏 Acknowledgments

- **Twitch** - For the IRC interface
- **BetterTTV** - For the emote API
- **FrankerFaceZ** - For the emote API
- **7TV** - For the emote API
- **DecAPI** - For the avatar API
- **tmi.js** - For the Twitch library
- **Electron** - For the desktop framework

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**Built with ❤️ for the Twitch community**

*Making chat readable, one filter at a time.* 🎮
