// DOM Elements
const channelInput = document.getElementById('channelInput');
const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const connectionStatus = document.getElementById('connectionStatus');
const chatMessages = document.getElementById('chatMessages');
const clearBtn = document.getElementById('clearBtn');
const connectionScreen = document.getElementById('connectionScreen');
const chatScreen = document.getElementById('chatScreen');
const channelNameDisplay = document.getElementById('channelName');

// Filter checkboxes
const filterAllCaps = document.getElementById('filterAllCaps');
const filterRepeating = document.getElementById('filterRepeating');
const filterEmoteOnly = document.getElementById('filterEmoteOnly');
const filterShort = document.getElementById('filterShort');
const filterGibberish = document.getElementById('filterGibberish');
const filterExcessiveEmotes = document.getElementById('filterExcessiveEmotes');
const filterCustomWords = document.getElementById('filterCustomWords');

// Custom filter elements
const customWordInput = document.getElementById('customWordInput');
const addCustomWordsBtn = document.getElementById('addCustomWordsBtn');
const importFileBtn = document.getElementById('importFileBtn');
const customWordFile = document.getElementById('customWordFile');
const clearCustomWordsBtn = document.getElementById('clearCustomWordsBtn');
const customWordsList = document.getElementById('customWordsList');

// Custom words storage
let customFilterWords = new Set();

// Stats
const totalCount = document.getElementById('totalCount');
const filteredCount = document.getElementById('filteredCount');
const shownCount = document.getElementById('shownCount');

let stats = {
  total: 0,
  filtered: 0,
  shown: 0
};

let currentChannel = '';
let channelSpecificEmotes = [];
let globalBTTVEmotes = [];
let globalFFZEmotes = [];
let global7TVEmotes = [];
let bttvChannelEmotes = [];
let ffzChannelEmotes = [];
let sevenTVChannelEmotes = [];

// Current mood tracking
let recentMessages = []; // Store last 25 messages
const RECENT_MESSAGE_LIMIT = 25;
const MOOD_THRESHOLD = 2; // Show mood if emote appears 2+ times

// Combo tracking
let currentComboEmote = null;
let comboCount = 0;

// Emote URL builders
// Note: These URLs automatically serve GIFs for animated emotes and PNGs/WebP for static ones
const emoteUrls = {
  bttv: (emoteId) => `https://cdn.betterttv.net/emote/${emoteId}/3x`,  // Returns GIF if animated
  ffz: (emoteId) => `https://cdn.frankerfacez.com/emote/${emoteId}/4`,  // Returns GIF if animated
  sevenTV: (emoteId) => `https://cdn.7tv.app/emote/${emoteId}/4x.webp`, // Returns animated WebP if animated
  twitch: (emoteId) => `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/3.0` // Returns GIF if animated
};

// Emote ID mappings (will be populated when emotes are fetched)
let emoteIdMap = {};

// Comprehensive Twitch, BetterTTV, and FrankerFaceZ emotes
const commonEmotes = [
  // Native Twitch Emotes
  'Kappa', 'KappaPride', 'KappaRoss', 'KappaClaus', 'Keepo', 'PogChamp', 'PogU', 'Pog',
  'LUL', 'LULW', 'OMEGALUL', 'MEGALUL', 'EZ', 'EZY', 'TriHard', 'CmonBruh', 'BibleThump',
  'BlessRNG', 'Kreygasm', 'DansGame', 'NotLikeThis', 'ResidentSleeper', 'WutFace',
  'FailFish', 'FrankerZ', 'SMOrc', 'SwiftRage', 'PJSalt', 'MingLee', 'KappaWealth',
  'SeemsGood', 'MrDestructoid', 'BCWarrior', 'GingerPower', 'TwitchUnity', 'StinkyCheese',
  'CoolCat', 'NomNom', 'TheRinger', 'HotPokket', 'AsianGlow', 'BabyRage', 'SuperVinlin',
  
  // BetterTTV Popular Emotes
  'KEKW', 'KEKWait', 'LULW', 'OMEGALUL', 'LUL', 'monkaS', 'monkaW', 'monkaH', 'monkaGIGA',
  'Pepega', 'PepeLaugh', 'PepeHands', 'PepeJam', 'PepoDance', 'PepoG', 'PepoThink',
  'FeelsGoodMan', 'FeelsBadMan', 'FeelsStrongMan', 'FeelsWeirdMan', 'FeelsDankMan',
  'Sadge', 'Madge', 'Bedge', 'Clueless', 'Aware', 'Okayge', 'Wokege', 'Susge',
  'POGGERS', 'PogU', 'PogO', 'Pog', 'PauseChamp', 'PagMan', 'Pagchomp',
  'Copium', 'Hopium', 'Despair', 'Aware', 'Clueless', 'Clap', 'NOTED', 'Hmm',
  'LULE', 'KUKLE', 'forsen', 'forsenE', 'forsenCD', 'forsenPls', 'forsenSWA',
  'gachiGASM', 'gachiBASS', 'gachiHYPER', 'HandsUp', 'pepeD', 'catJAM',
  'widePeepoHappy', 'widePeepoSad', 'peepoHappy', 'peepoSad', 'peepoClap',
  'YEP', 'NOPE', 'Stare', 'WAYTOODANK', 'HACKERMANS', 'HYPERS', 'HYPERDANSGAME',
  'FeelsOkayMan', 'FeelsRainMan', 'FeelsAmazingMan', 'FeelsBirthdayMan',
  'monkaTOS', 'monkaEyes', 'monkaHmm', 'monkaOMEGA', 'monkaX',
  'pepeLaugh', 'pepeMeltdown', 'pepeW', 'pepePoint', 'pepeSpit',
  'COGGERS', 'POGSLIDE', 'POGGIES', 'PogFish', 'PogTasty',
  'EZ', 'EZY', 'EZCLAP', 'GAMBA', 'Clap', 'CLAP',
  'ICANT', 'GIGACHAD', 'Clueless', 'Aware', 'Listening', 'Chatting',
  'OOOO', 'NOOO', 'YEP', 'NOPE', 'TRUE', 'REAL', 'FAKE',
  'BatChest', 'DankG', 'DankHug', 'DankPepe', 'DankSip',
  'ConcernDoge', 'DonoWall', 'SadCat', 'SadgeCry', 'SadgeHug',
  'Smadge', 'Gladge', 'Wokege', 'Bedge', 'Madge',
  'PepoG', 'PepoThink', 'PepoWant', 'PepoEvil', 'PepoHey',
  'modCheck', 'docPls', 'docSpin', 'docArrive', 'docLeave',
  'AlienPls', 'AlienDance', 'CrabPls', 'PartyParrot', 'PepoDance',
  
  // FrankerFaceZ Emotes
  'LUL', 'CatBag', 'FeelsBirthdayMan', 'FeelsGoodMan', 'FeelsBadMan',
  'FeelsAmazingMan', 'FeelsWeirdMan', 'FeelsOkayMan', 'FeelsStrongMan',
  'KKona', 'KKonaW', 'NaM', 'NaMmers', 'AYAYA', 'AYAY',
  'WideHard', 'WidePeepoHappy', 'WidePeepoSad', 'WidePeepoBlanket',
  'PepeLaugh', 'PepeHands', 'PepeJam', 'PepoDance', 'PepePoint',
  
  // Channel-Specific (ohnePixel example)
  'ohneW', 'ohneGoon', 'ohneCool', 'ohnePls', 'ohnePixel',
  'coinfuBABY', 'lolaPch', 'Zwai', 'dxx', 'Tssk',
  
  // Common variations and typos
  'kekw', 'omegalul', 'lul', 'lulw', 'poggers', 'pog', 'pogu',
  'pepega', 'sadge', 'copium', 'monkas', 'monkaw', 'kappa',
  'pepelaugh', 'pepehands', 'icant', 'gigachad', 'clueless',
  'aware', 'chatting', 'oooo', 'yep', 'nope', 'clap', 'ez',
  
  // Additional spam patterns
  'HUH', 'LOL', 'LMAO', 'LMFAO', 'ROFL', 'XD', 'xD', ':)',
  'Farmed', 'Clipped', 'Based', 'Cringe', 'Yikes', 'Jebaited',
  'HoldOn', 'Listening', 'Stare', 'Hmm', 'NOTED', 'TRUE', 'REAL',
  'oldge', 'Okayge', 'Bedge', 'Wokege', 'Susge', 'Madge', 'Gladge'
];

// Common spam phrases and low-quality patterns
const spamPhrases = [
  // Basic reactions
  'gg', 'lol', 'lmao', 'lmfao', 'rofl', 'xd', 'bruh', 'kek', 'pog', 'poggers',
  'wtf', 'omg', 'omegalul', 'rip', 'ez', 'oof', 'yikes', 'oof', 'rekt',
  
  // Twitch culture spam
  'yapping', 'glaze', 'glazing', 'edging', 'goon', 'gooning', 'cooked', 'cooked',
  'clip', 'clipped', 'bro', 'fr', 'ngl', 'tbh', 'imo', 'imho', 'afk', 'brb',
  'cringe', 'based', 'ratio', 'cope', 'mald', 'copium', 'hopium', 'seethe',
  'holy', 'insane', 'crazy', 'wild', 'blyat', 'cyka', 'rush', 'noob', 'bot',
  
  // Single word spam
  'true', 'real', 'fake', 'cap', 'nocap', 'fax', 'facts', 'same', 'mood',
  'yes', 'no', 'yeah', 'nah', 'yep', 'nope', 'yup', 'nop',
  'nice', 'good', 'bad', 'sad', 'mad', 'glad', 'big', 'huge',
  
  // Gaming spam
  'aimbot', 'hacker', 'cheater', 'smurf', 'throw', 'throwing', 'throw',
  'peek', 'peeks', 'peeked', 'peeking', 'clutch', 'ace', 'nt', 'ns',
  'gj', 'wp', 'ggs', 'glhf', 'hf', 'gl', 'ty', 'thx', 'thanks',
  
  // Emote words
  'kappa', 'kekw', 'pepega', 'sadge', 'monkas', 'pogchamp', 'lul',
  'pepe', 'feels', 'dank', 'meme', 'memes', 'spam', 'spamming',
  
  // Low effort
  'what', 'why', 'how', 'when', 'where', 'who', 'huh', 'wut', 'wat',
  'hmm', 'hmmm', 'uhh', 'umm', 'uh', 'um', 'ah', 'oh', 'ok', 'okay',
  
  // Variations
  'broky', 'donk', 'goon', 'goat', 'bot', 'bots', 'farmed', 'farm'
];

// Bot usernames to filter
const botNames = ['fossabot', 'nightbot', 'streamelements', 'moobot', 'streamlabs'];

// Quality scoring system - returns true if message should be FILTERED
function shouldFilterMessage(message) {
  const text = message.message.trim();
  const username = message.username.toLowerCase();
  
  // Always filter bots
  if (botNames.some(bot => username.includes(bot))) {
    return true;
  }
  
  // Filter 1: All caps (more than 60% caps)
  if (filterAllCaps.checked) {
    const letters = text.replace(/[^a-zA-Z]/g, '');
    if (letters.length > 2) {
      const capsCount = text.replace(/[^A-Z]/g, '').length;
      const capsRatio = capsCount / letters.length;
      if (capsRatio > 0.6) {
        return true;
      }
    }
  }

  // Filter 2: Repeating words (copypasta detection)
  if (filterRepeating.checked) {
    const words = text.split(/\s+/);
    if (words.length >= 3) {
      const wordCounts = {};
      words.forEach(word => {
        const normalized = word.toLowerCase();
        wordCounts[normalized] = (wordCounts[normalized] || 0) + 1;
      });
      
      // If any word appears more than 2 times, likely copypasta
      for (const count of Object.values(wordCounts)) {
        if (count > 2) {
          return true;
        }
      }

      // Check for repeating patterns
      const uniqueWords = new Set(words.map(w => w.toLowerCase()));
      if (uniqueWords.size === 1 && words.length > 1) {
        return true;
      }
    }
  }

  // Filter 3: Emote-only messages
  if (filterEmoteOnly.checked) {
    const words = text.split(/\s+/);
    const allEmotes = [...commonEmotes, ...channelSpecificEmotes];
    const nonEmoteWords = words.filter(word => {
      const lower = word.toLowerCase();
      return !allEmotes.some(emote => emote.toLowerCase() === lower) && 
             !/^[^\w\s]+$/.test(word);
    });
    
    if (nonEmoteWords.length === 0 && text.length > 0) {
      return true;
    }
  }

  // Filter 4: Very short messages (less than 10 characters)
  if (filterShort.checked) {
    if (text.length < 10) {
      return true;
    }
  }

  // Filter 5: Gibberish detection
  if (filterGibberish.checked) {
    const words = text.split(/\s+/).filter(w => w.length > 2);
    
    for (const word of words) {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (cleanWord.length >= 4) {
        const vowels = cleanWord.match(/[aeiou]/g);
        const vowelRatio = vowels ? vowels.length / cleanWord.length : 0;
        
        if (vowelRatio < 0.25) {
          return true;
        }
        
        // Check for repeating characters
        const repeatingPattern = /(.)\1{3,}/;
        if (repeatingPattern.test(cleanWord)) {
          return true;
        }
      }
    }
  }

  // Filter 6: Excessive emotes (more than 40% of message)
  if (filterExcessiveEmotes.checked) {
    const words = text.split(/\s+/);
    const allEmotes = [...commonEmotes, ...channelSpecificEmotes];
    const emoteCount = words.filter(word => {
      const lower = word.toLowerCase();
      return allEmotes.some(emote => emote.toLowerCase() === lower) || 
             /^[^\w\s]+$/.test(word);
    }).length;
    
    if (words.length > 0 && emoteCount / words.length > 0.4) {
      return true;
    }
  }

  // NEW ULTRA-AGGRESSIVE FILTERS FOR QUALITY
  
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const textLower = text.toLowerCase();
  const allEmotes = [...commonEmotes, ...channelSpecificEmotes];
  
  // Additional spam detection filters (controlled by gibberish filter)
  if (filterGibberish.checked) {
    // Filter 7: Single or two word messages (unless it's a question)
    if (words.length <= 2 && !text.includes('?')) {
      return true;
    }
    
    // Filter 8: Messages that are only spam phrases
    const isOnlySpam = words.every(word => {
      const cleanWord = word.replace(/[^a-z]/gi, '').toLowerCase();
      return spamPhrases.includes(cleanWord) || 
             allEmotes.some(emote => emote.toLowerCase() === cleanWord) ||
             cleanWord.length < 2;
    });
    if (isOnlySpam) {
      return true;
    }
    
    // Filter 9: Messages with no actual words (only symbols/emotes)
    const hasRealWords = words.some(word => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      return cleanWord.length >= 3;
    });
    if (!hasRealWords) {
      return true;
    }
  }
  
  // Filter 10: Messages with emotes but little substance (controlled by emote filter)
  if (filterEmoteOnly.checked) {
    const emoteCount = words.filter(word => 
      allEmotes.some(emote => emote.toLowerCase() === word.toLowerCase())
    ).length;
    
    // Filter if message has emotes and is short (unless it's a question)
    if (emoteCount > 0 && words.length <= 4 && !text.includes('?')) {
      return true;
    }
    
    // Filter if message has more emotes than real words
    if (emoteCount > 0 && emoteCount >= words.length / 2) {
      return true;
    }
  }
  
  // Additional quality filters (controlled by gibberish filter)
  if (filterGibberish.checked) {
    // Filter 11: Messages with @ mentions (only filter if short)
    // Allow longer messages with @ mentions as they're usually substantive
    if (text.includes('@') && !text.includes('?') && words.length < 8) {
      return true;
    }
    
    // Filter 12: Messages that contain spam phrases (even if mixed with other words)
    const containsSpamPhrase = words.some(word => {
      const cleanWord = word.replace(/[^a-z]/gi, '').toLowerCase();
      return spamPhrases.includes(cleanWord);
    });
    
    // If message contains spam phrase and is short, filter it
    // Allow longer messages (8+ words) even with spam phrases
    if (containsSpamPhrase && words.length < 8 && !text.includes('?')) {
      return true;
    }
  }
  
  // Advanced spam detection (controlled by gibberish filter)
  if (filterGibberish.checked) {
    // Filter 13: Common spam patterns
    const spamPatterns = [
      /^[a-z]{1,4}$/i,  // Very short words
      /^\d+$/,  // Only numbers
      /^[!?\.,:;]+$/,  // Only punctuation
      /^(same|true|real|fake|based|cringe|yikes|oof|rip|nice|good|bad|yes|no|yeah|nah)$/i,  // Agreement spam
      /^(lol|lmao|lmfao|rofl|xd|kek|pog|wtf|omg|bruh|fr|ngl)$/i,  // Reaction spam
      /^(gg|ez|rekt|owned|noob|bot)$/i,  // Gaming spam
      /^(clip|clipped|farmed|cooked|based|ratio|cope|mald)$/i,  // Twitch culture spam
      /(.)\1{2,}/i,  // Repeated characters (aaa, lll, etc)
      /^[^a-z]*$/i,  // No letters at all
    ];
    
    for (const pattern of spamPatterns) {
      if (pattern.test(textLower.trim())) {
        return true;
      }
    }
    
    // Filter 14: Messages that are just player names or short reactions
    const playerNames = ['broky', 'donk', 'zywoo', 'simple', 'niko', 'device', 'faze', 'navi', 'vitality', 'spirit'];
    if (words.length <= 3) {
      const isJustNames = words.every(word => {
        const cleanWord = word.replace(/[^a-z]/gi, '').toLowerCase();
        return playerNames.includes(cleanWord) || cleanWord.length < 3;
      });
      if (isJustNames) {
        return true;
      }
    }
    
    // Filter 15: Messages with excessive punctuation
    const punctuationCount = (text.match(/[!?.,;:]/g) || []).length;
    if (punctuationCount > text.length * 0.3) {
      return true;
    }
    
    // Filter 16: Messages that are just numbers or number + word
    if (words.length <= 2 && words.some(w => /^\d+$/.test(w))) {
      return true;
    }
    
    // Filter 17: Check if message has meaningful content
    // A quality message should have at least 2-3 words with 3+ letters each
    const meaningfulWords = words.filter(word => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      const isNotEmote = !allEmotes.some(emote => emote.toLowerCase() === word.toLowerCase());
      const isNotSpam = !spamPhrases.includes(cleanWord.toLowerCase());
      return cleanWord.length >= 3 && isNotEmote && isNotSpam;
    });
    
    // For longer messages (10+ words), be more lenient
    // For shorter messages, require at least 2 meaningful words
    const requiredMeaningful = words.length >= 10 ? 1 : 2;
    if (meaningfulWords.length < requiredMeaningful && !text.includes('?')) {
      return true;
    }
    
    // Filter 18: Messages that are just reactions to gameplay
    const reactionPatterns = [
      /^(holy|insane|crazy|wild|wtf|omg|wow|damn|nice|good|bad)\s*(shit|fuck|damn|bro|dude)?$/i,
      /^(lets?|go+|come on|cmon|bruh|bro)\s*(bro|dude|man)?$/i,
      /^(what|why|how|huh|wut)\s*(the\s*)?(fuck|hell|heck)?$/i,
    ];
    
    for (const pattern of reactionPatterns) {
      if (pattern.test(textLower.trim())) {
        return true;
      }
    }
  }
  
  // Filter 19: Custom words filter
  if (filterCustomWords.checked && customFilterWords.size > 0) {
    const textLower = text.toLowerCase();
    const words = textLower.split(/\s+/);
    
    // Check if any custom word is in the message
    for (const customWord of customFilterWords) {
      // Check for exact word match or substring match
      if (words.includes(customWord) || textLower.includes(customWord)) {
        return true;
      }
    }
  }

  return false;
}

// Parse Twitch native emotes from message
function parseTwitchEmotes(messageData) {
  const emotes = messageData.emotes;
  const emoteList = [];
  
  if (emotes && Object.keys(emotes).length > 0) {
    // Twitch emotes format: { "emoteId": ["startIndex-endIndex", ...] }
    for (const emoteId in emotes) {
      const positions = emotes[emoteId];
      positions.forEach(pos => {
        const [start, end] = pos.split('-').map(Number);
        const emoteName = messageData.message.substring(start, end + 1);
        
        // Store emote ID mapping for Twitch native emotes
        if (!emoteIdMap[emoteName]) {
          emoteIdMap[emoteName] = { id: emoteId, type: 'twitch' };
        }
        
        emoteList.push(emoteName);
      });
    }
  }
  
  return emoteList;
}

// Track emotes for mood detection
function trackMessageForMood(messageData) {
  // Parse Twitch native emotes first
  parseTwitchEmotes(messageData);
  
  // Check if current combo emote is in this message
  let messageContainsComboEmote = false;
  if (currentComboEmote) {
    const words = messageData.message.split(/\s+/);
    const allEmotes = [...commonEmotes, ...channelSpecificEmotes];
    
    messageContainsComboEmote = words.some(word => {
      const isKnownEmote = allEmotes.some(emote => emote.toLowerCase() === word.toLowerCase());
      const hasEmoteId = emoteIdMap[word];
      return (isKnownEmote || hasEmoteId) && word === currentComboEmote;
    });
  }
  
  recentMessages.push(messageData);
  
  // Keep only last 50 messages
  if (recentMessages.length > RECENT_MESSAGE_LIMIT) {
    recentMessages.shift();
  }
  
  updateCurrentMood(messageContainsComboEmote);
}

// Get emote image URL
function getEmoteImageUrl(emoteName) {
  const emoteData = emoteIdMap[emoteName];
  
  if (!emoteData) {
    // Fallback: return null if emote not found
    return null;
  }
  
  switch (emoteData.type) {
    case 'bttv':
      return emoteUrls.bttv(emoteData.id);
    case 'ffz':
      return emoteUrls.ffz(emoteData.id);
    case 'sevenTV':
      return emoteUrls.sevenTV(emoteData.id);
    case 'twitch':
      return emoteUrls.twitch(emoteData.id);
    default:
      return null;
  }
}

// Calculate and display current mood
function updateCurrentMood(messageContainsComboEmote = false) {
  const allEmotes = [...commonEmotes, ...channelSpecificEmotes];
  const emoteCounts = {};
  
  // Count emotes in recent messages
  recentMessages.forEach(msg => {
    const words = msg.message.split(/\s+/);
    words.forEach(word => {
      // Check if word is a known emote OR if we have it in our emoteIdMap (from Twitch native)
      const isKnownEmote = allEmotes.some(emote => emote.toLowerCase() === word.toLowerCase());
      const hasEmoteId = emoteIdMap[word];
      
      if (isKnownEmote || hasEmoteId) {
        emoteCounts[word] = (emoteCounts[word] || 0) + 1;
      }
    });
  });
  
  // Find most common emote
  let topEmote = null;
  let topCount = 0;
  
  for (const [emote, count] of Object.entries(emoteCounts)) {
    if (count > topCount && count >= MOOD_THRESHOLD) {
      topEmote = emote;
      topCount = count;
    }
  }
  
  // Update combo counter
  if (topEmote && topCount >= MOOD_THRESHOLD) {
    if (currentComboEmote === topEmote) {
      // Same emote still popular
      // Only increment if this message contained the combo emote
      if (messageContainsComboEmote) {
        comboCount++;
      }
    } else {
      // New emote, start combo at threshold (2)
      currentComboEmote = topEmote;
      comboCount = MOOD_THRESHOLD; // Start at 2x
    }
  } else {
    // No mood, reset combo
    currentComboEmote = null;
    comboCount = 0;
  }
  
  // Update mood display
  const moodDisplay = document.getElementById('currentMood');
  moodDisplay.style.display = 'flex';
  
  if (topEmote && topCount >= MOOD_THRESHOLD) {
    const emoteUrl = getEmoteImageUrl(topEmote);
    
    if (emoteUrl) {
      // Show emote image with combo count
      moodDisplay.innerHTML = `
        <span class="mood-label">Current Mood:</span>
        <img src="${emoteUrl}" alt="${escapeHtml(topEmote)}" class="mood-emote-image" title="${escapeHtml(topEmote)}" />
        <span class="mood-count">${comboCount}x</span>
      `;
    } else {
      // Fallback to text if image not available
      moodDisplay.innerHTML = `
        <span class="mood-label">Current Mood:</span>
        <span class="mood-emote">${escapeHtml(topEmote)}</span>
        <span class="mood-count">${comboCount}x</span>
      `;
    }
    moodDisplay.classList.add('mood-active');
  } else {
    moodDisplay.innerHTML = `
      <span class="mood-label">Current Mood:</span>
      <span class="mood-emote mood-placeholder">—</span>
      <span class="mood-count mood-waiting">Waiting...</span>
    `;
    moodDisplay.classList.remove('mood-active');
  }
}

// Display message
function displayMessage(messageData) {
  stats.total++;
  
  // Track all messages for mood detection (even filtered ones)
  trackMessageForMood(messageData);
  
  const isFiltered = shouldFilterMessage(messageData);
  
  // Debug logging (comment out in production)
  if (!isFiltered) {
    console.log('✅ SHOWING:', messageData.message);
  }
  
  if (isFiltered) {
    stats.filtered++;
    updateStats();
    return;
  }

  stats.shown++;
  updateStats();

  // Remove empty state if it exists
  const emptyState = chatMessages.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }

  const messageEl = document.createElement('div');
  messageEl.className = 'message';
  
  const timestamp = new Date(messageData.timestamp).toLocaleTimeString();
  const parsedMessage = parseMessageWithEmotes(messageData);
  
  messageEl.innerHTML = `
    <span class="timestamp">${timestamp}</span>
    <span class="username" style="color: ${messageData.color}">${messageData.username}</span>
    <span class="message-text">${parsedMessage}</span>
  `;
  
  chatMessages.appendChild(messageEl);
  
  // Auto-scroll to bottom with smooth behavior
  // Use requestAnimationFrame to ensure the element is rendered before scrolling
  requestAnimationFrame(() => {
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
  });
  
  // Limit messages to prevent memory issues (keep last 500)
  const messages = chatMessages.querySelectorAll('.message');
  if (messages.length > 500) {
    messages[0].remove();
  }
}

function updateStats() {
  totalCount.textContent = stats.total;
  filteredCount.textContent = stats.filtered;
  shownCount.textContent = stats.shown;
  
  // Calculate filter percentage
  if (stats.total > 0) {
    const filterPercentage = Math.round((stats.filtered / stats.total) * 100);
    document.title = `Twitch Chat Filter - ${filterPercentage}% filtered`;
  }
}

// Custom Filter Functions
function addCustomWords(wordsString) {
  // Split by comma and clean up
  const words = wordsString.split(',')
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length > 0);
  
  words.forEach(word => customFilterWords.add(word));
  updateCustomWordsList();
  saveCustomWords();
}

function removeCustomWord(word) {
  customFilterWords.delete(word);
  updateCustomWordsList();
  saveCustomWords();
}

function updateCustomWordsList() {
  customWordsList.innerHTML = '';
  
  if (customFilterWords.size === 0) {
    return; // CSS ::before will show placeholder
  }
  
  customFilterWords.forEach(word => {
    const tag = document.createElement('div');
    tag.className = 'custom-word-tag';
    tag.innerHTML = `
      <span>${escapeHtml(word)}</span>
      <span class="remove-word" data-word="${escapeHtml(word)}">×</span>
    `;
    customWordsList.appendChild(tag);
  });
  
  // Add click handlers for remove buttons
  document.querySelectorAll('.remove-word').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const word = e.target.getAttribute('data-word');
      removeCustomWord(word);
    });
  });
}

function saveCustomWords() {
  localStorage.setItem('customFilterWords', JSON.stringify([...customFilterWords]));
}

function loadCustomWords() {
  const saved = localStorage.getItem('customFilterWords');
  if (saved) {
    try {
      const words = JSON.parse(saved);
      customFilterWords = new Set(words);
      updateCustomWordsList();
    } catch (e) {
      console.error('Failed to load custom words:', e);
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Parse message and replace emotes with images
function parseMessageWithEmotes(messageData) {
  const allEmotes = [...commonEmotes, ...channelSpecificEmotes];
  let messageHtml = '';
  const words = messageData.message.split(/(\s+)/); // Keep whitespace
  
  words.forEach(word => {
    // Check if word is whitespace
    if (/^\s+$/.test(word)) {
      messageHtml += word;
      return;
    }
    
    // Check if word is an emote
    const isKnownEmote = allEmotes.some(emote => emote.toLowerCase() === word.toLowerCase());
    const hasEmoteId = emoteIdMap[word];
    
    if (isKnownEmote || hasEmoteId) {
      const emoteUrl = getEmoteImageUrl(word);
      if (emoteUrl) {
        // Render as image
        messageHtml += `<img src="${emoteUrl}" alt="${escapeHtml(word)}" class="message-emote" title="${escapeHtml(word)}" />`;
      } else {
        // Fallback to text
        messageHtml += escapeHtml(word);
      }
    } else {
      // Regular text
      messageHtml += escapeHtml(word);
    }
  });
  
  return messageHtml;
}

function showStatus(message, type = 'info') {
  connectionStatus.textContent = message;
  connectionStatus.className = `status-message ${type}`;
}

// Fetch global BetterTTV emotes
async function fetchGlobalBTTVEmotes() {
  try {
    const response = await fetch('https://api.betterttv.net/3/cached/emotes/global');
    const data = await response.json();
    globalBTTVEmotes = data.map(emote => emote.code);
    
    // Store emote IDs for image display
    data.forEach(emote => {
      emoteIdMap[emote.code] = { id: emote.id, type: 'bttv' };
    });
    
    console.log(`Loaded ${globalBTTVEmotes.length} global BTTV emotes`);
  } catch (error) {
    console.error('Failed to fetch global BTTV emotes:', error);
  }
}

// Fetch channel-specific BetterTTV emotes
async function fetchChannelBTTVEmotes(channel, twitchUserId) {
  try {
    if (!twitchUserId) {
      console.log('No Twitch user ID provided for BTTV, skipping channel emotes');
      return;
    }
    
    const response = await fetch(`https://api.betterttv.net/3/cached/users/twitch/${twitchUserId}`);
    const data = await response.json();
    
    bttvChannelEmotes = [];
    if (data.channelEmotes) {
      data.channelEmotes.forEach(emote => {
        bttvChannelEmotes.push(emote.code);
        emoteIdMap[emote.code] = { id: emote.id, type: 'bttv' };
      });
    }
    if (data.sharedEmotes) {
      data.sharedEmotes.forEach(emote => {
        bttvChannelEmotes.push(emote.code);
        emoteIdMap[emote.code] = { id: emote.id, type: 'bttv' };
      });
    }
    
    console.log(`Loaded ${bttvChannelEmotes.length} channel-specific BTTV emotes for ${channel}`);
  } catch (error) {
    console.error('Failed to fetch channel BTTV emotes:', error);
  }
}

// Fetch global FrankerFaceZ emotes
async function fetchGlobalFFZEmotes() {
  try {
    const response = await fetch('https://api.frankerfacez.com/v1/set/global');
    const data = await response.json();
    globalFFZEmotes = [];
    
    if (data.sets) {
      for (const setId in data.sets) {
        const emotes = data.sets[setId].emoticons;
        emotes.forEach(emote => {
          globalFFZEmotes.push(emote.name);
          emoteIdMap[emote.name] = { id: emote.id, type: 'ffz' };
        });
      }
    }
    
    console.log(`Loaded ${globalFFZEmotes.length} global FFZ emotes`);
  } catch (error) {
    console.error('Failed to fetch global FFZ emotes:', error);
  }
}

// Fetch channel-specific FrankerFaceZ emotes
async function fetchChannelFFZEmotes(channel) {
  try {
    const response = await fetch(`https://api.frankerfacez.com/v1/room/${channel}`);
    const data = await response.json();
    ffzChannelEmotes = [];
    
    if (data.sets) {
      for (const setId in data.sets) {
        const emotes = data.sets[setId].emoticons;
        emotes.forEach(emote => {
          ffzChannelEmotes.push(emote.name);
          emoteIdMap[emote.name] = { id: emote.id, type: 'ffz' };
        });
      }
    }
    
    console.log(`Loaded ${ffzChannelEmotes.length} channel-specific FFZ emotes for ${channel}`);
  } catch (error) {
    console.error('Failed to fetch channel FFZ emotes:', error);
  }
}

// Fetch global 7TV emotes
async function fetchGlobal7TVEmotes() {
  try {
    const response = await fetch('https://7tv.io/v3/emote-sets/global');
    const data = await response.json();
    global7TVEmotes = [];
    
    if (data.emotes) {
      data.emotes.forEach(emote => {
        global7TVEmotes.push(emote.name);
        emoteIdMap[emote.name] = { id: emote.id, type: 'sevenTV' };
      });
    }
    
    console.log(`Loaded ${global7TVEmotes.length} global 7TV emotes`);
  } catch (error) {
    console.error('Failed to fetch global 7TV emotes:', error);
  }
}

// Fetch channel-specific 7TV emotes
async function fetchChannel7TVEmotes(channel, twitchUserId) {
  try {
    // Try with Twitch user ID first (more reliable)
    let url = `https://7tv.io/v3/users/twitch/${twitchUserId || channel}`;
    console.log(`Fetching 7TV emotes from: ${url}`);
    let response = await fetch(url);
    
    // If that fails, try with channel name
    if (!response.ok && twitchUserId) {
      console.log(`7TV: First attempt failed (${response.status}), trying with channel name`);
      url = `https://7tv.io/v3/users/twitch/${channel}`;
      response = await fetch(url);
    }
    
    if (!response.ok) {
      console.error(`7TV API error: ${response.status} ${response.statusText}`);
      return;
    }
    
    const data = await response.json();
    console.log('7TV API response:', data);
    sevenTVChannelEmotes = [];
    
    if (data.emote_set && data.emote_set.emotes) {
      data.emote_set.emotes.forEach(emote => {
        sevenTVChannelEmotes.push(emote.name);
        emoteIdMap[emote.name] = { id: emote.id, type: 'sevenTV' };
      });
      console.log(`✅ Loaded ${sevenTVChannelEmotes.length} channel-specific 7TV emotes for ${channel}`);
      console.log('7TV emotes:', sevenTVChannelEmotes.join(', '));
    } else {
      console.log('No 7TV emotes found in response');
    }
  } catch (error) {
    console.error('Failed to fetch channel 7TV emotes:', error);
  }
}

// Fetch all emotes for a channel
async function fetchAllEmotes(channel) {
  showStatus('Loading emote lists from BTTV, FFZ, and 7TV...', 'info');
  
  // Fetch global emotes if not already loaded (cache them)
  const globalPromises = [];
  if (globalBTTVEmotes.length === 0) {
    globalPromises.push(fetchGlobalBTTVEmotes());
  }
  if (globalFFZEmotes.length === 0) {
    globalPromises.push(fetchGlobalFFZEmotes());
  }
  if (global7TVEmotes.length === 0) {
    globalPromises.push(fetchGlobal7TVEmotes());
  }
  
  await Promise.all(globalPromises);
  
  // Get Twitch user ID first (needed for BTTV and 7TV)
  let twitchUserId = null;
  try {
    const userResponse = await fetch(`https://decapi.me/twitch/id/${channel}`);
    const userId = await userResponse.text();
    if (userId && !userId.includes('User not found')) {
      twitchUserId = userId.trim();
      console.log(`Twitch user ID for ${channel}: ${twitchUserId}`);
    }
  } catch (error) {
    console.error('Failed to fetch Twitch user ID:', error);
  }
  
  // Fetch channel-specific emotes (pass user ID to functions that need it)
  await Promise.all([
    fetchChannelBTTVEmotes(channel, twitchUserId),
    fetchChannelFFZEmotes(channel),
    fetchChannel7TVEmotes(channel, twitchUserId)
  ]);
  
  // Combine all emotes
  channelSpecificEmotes = [
    ...globalBTTVEmotes,
    ...globalFFZEmotes,
    ...global7TVEmotes,
    ...bttvChannelEmotes,
    ...ffzChannelEmotes,
    ...sevenTVChannelEmotes
  ];
  
  // Remove duplicates
  channelSpecificEmotes = [...new Set(channelSpecificEmotes)];
  
  console.log(`Total emotes loaded: ${channelSpecificEmotes.length} (BTTV: ${globalBTTVEmotes.length + bttvChannelEmotes.length}, FFZ: ${globalFFZEmotes.length + ffzChannelEmotes.length}, 7TV: ${global7TVEmotes.length + sevenTVChannelEmotes.length})`);
  showStatus('Emotes loaded, connecting to chat...', 'info');
}

// Event Listeners
connectBtn.addEventListener('click', async () => {
  const channel = channelInput.value.trim().toLowerCase();
  if (!channel) {
    showStatus('Please enter a channel name', 'error');
    return;
  }
  
  currentChannel = channel;
  connectBtn.disabled = true;
  
  // Fetch all emotes (BTTV + FFZ, global + channel-specific)
  await fetchAllEmotes(channel);
  
  window.electronAPI.connectChat(channel);
});

disconnectBtn.addEventListener('click', () => {
  window.electronAPI.disconnectChat();
  
  // Switch back to connection screen
  chatScreen.style.display = 'none';
  connectionScreen.style.display = 'flex';
  
  connectBtn.disabled = false;
  channelInput.disabled = false;
  channelInput.value = '';
  
  // Reset chat and channel-specific emotes (keep global ones cached)
  chatMessages.innerHTML = '<div class="empty-state"><p>Waiting for quality messages...</p></div>';
  stats = { total: 0, filtered: 0, shown: 0 };
  recentMessages = [];
  currentComboEmote = null;
  comboCount = 0;
  bttvChannelEmotes = [];
  ffzChannelEmotes = [];
  sevenTVChannelEmotes = [];
  channelSpecificEmotes = [];
  // Note: Keep emoteIdMap cached for global emotes
  updateStats();
  
  showStatus('Disconnected', 'info');
});

clearBtn.addEventListener('click', () => {
  chatMessages.innerHTML = '<div class="empty-state"><p>Waiting for quality messages...</p></div>';
  stats = { total: 0, filtered: 0, shown: 0 };
  recentMessages = [];
  currentComboEmote = null;
  comboCount = 0;
  updateStats();
  updateCurrentMood();
});

// Custom Filter Event Listeners
addCustomWordsBtn.addEventListener('click', () => {
  const words = customWordInput.value.trim();
  if (words) {
    addCustomWords(words);
    customWordInput.value = '';
  }
});

customWordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const words = customWordInput.value.trim();
    if (words) {
      addCustomWords(words);
      customWordInput.value = '';
    }
  }
});

importFileBtn.addEventListener('click', () => {
  customWordFile.click();
});

customWordFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (event) => {
    const content = event.target.result;
    // Handle both comma-separated and newline-separated
    const words = content.replace(/\n/g, ',').replace(/\r/g, '');
    addCustomWords(words);
  };
  reader.readAsText(file);
  
  // Reset file input
  e.target.value = '';
});

clearCustomWordsBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all custom words?')) {
    customFilterWords.clear();
    updateCustomWordsList();
    saveCustomWords();
  }
});

// Load custom words on startup
loadCustomWords();

// Fetch Twitch user avatar
async function fetchChannelAvatar(channelName) {
  try {
    console.log(`Fetching avatar for channel: ${channelName}`);
    
    // Use Twitch's public API endpoint
    const userResponse = await fetch(`https://decapi.me/twitch/avatar/${channelName}`);
    
    if (!userResponse.ok) {
      console.error('Failed to fetch avatar from DecAPI');
      return null;
    }
    
    const avatarUrl = await userResponse.text();
    
    // Check if we got a valid URL
    if (avatarUrl && avatarUrl.startsWith('http')) {
      console.log('Avatar URL fetched:', avatarUrl);
      return avatarUrl;
    }
    
    console.error('Invalid avatar URL received');
    return null;
  } catch (error) {
    console.error('Error fetching channel avatar:', error);
    return null;
  }
}

// IPC Listeners
window.electronAPI.onConnectionStatus(async (data) => {
  if (data.connected) {
    // Switch to chat screen
    connectionScreen.style.display = 'none';
    chatScreen.style.display = 'flex';
    
    channelNameDisplay.textContent = `#${data.channel}`;
    channelInput.disabled = true;
    
    // Fetch and display channel avatar
    const avatarImg = document.getElementById('channelAvatar');
    console.log('Avatar element found:', !!avatarImg);
    
    const avatarUrl = await fetchChannelAvatar(data.channel);
    console.log('Avatar URL received:', avatarUrl);
    
    if (avatarUrl && avatarImg) {
      avatarImg.src = avatarUrl;
      avatarImg.style.display = 'block';
      console.log('Avatar displayed successfully');
    } else {
      console.error('Failed to display avatar. URL:', avatarUrl, 'Element:', !!avatarImg);
    }
  } else {
    // Switch back to connection screen
    chatScreen.style.display = 'none';
    connectionScreen.style.display = 'flex';
    
    showStatus(`Disconnected: ${data.reason || 'Unknown reason'}`, 'error');
    connectBtn.disabled = false;
    channelInput.disabled = false;
    
    // Hide avatar
    const avatarImg = document.getElementById('channelAvatar');
    if (avatarImg) {
      avatarImg.style.display = 'none';
    }
  }
});

window.electronAPI.onConnectionError((error) => {
  showStatus(`Error: ${error}`, 'error');
  connectBtn.disabled = false;
});

window.electronAPI.onChatMessage((messageData) => {
  displayMessage(messageData);
});

// Allow Enter key to connect
channelInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !connectBtn.disabled) {
    connectBtn.click();
  }
});

