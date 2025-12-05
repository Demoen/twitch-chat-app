const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const tmi = require('tmi.js');

let mainWindow;
let twitchClient = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#1a1a2e',
    title: 'Twitch Chat Filter',
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true,
    frame: true
  });

  // Remove the menu bar completely
  Menu.setApplicationMenu(null);

  mainWindow.loadFile('index.html');
  
  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (twitchClient) {
    twitchClient.disconnect();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle Twitch chat connection
ipcMain.on('connect-chat', (event, channelName) => {
  if (twitchClient) {
    twitchClient.disconnect();
  }

  twitchClient = new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [channelName]
  });

  twitchClient.connect().catch(err => {
    event.reply('connection-error', err.message);
  });

  twitchClient.on('connected', () => {
    event.reply('connection-status', { connected: true, channel: channelName });
  });

  twitchClient.on('message', (channel, tags, message, self) => {
    if (self) return;

    const messageData = {
      username: tags['display-name'] || tags.username,
      message: message,
      color: tags.color || '#FFFFFF',
      badges: tags.badges || {},
      emotes: tags.emotes || {},
      timestamp: Date.now()
    };

    event.reply('chat-message', messageData);
  });

  twitchClient.on('disconnected', (reason) => {
    event.reply('connection-status', { connected: false, reason });
  });
});

ipcMain.on('disconnect-chat', () => {
  if (twitchClient) {
    twitchClient.disconnect();
    twitchClient = null;
  }
});

