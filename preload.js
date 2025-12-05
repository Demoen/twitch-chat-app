const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  connectChat: (channelName) => ipcRenderer.send('connect-chat', channelName),
  disconnectChat: () => ipcRenderer.send('disconnect-chat'),
  onChatMessage: (callback) => ipcRenderer.on('chat-message', (event, data) => callback(data)),
  onConnectionStatus: (callback) => ipcRenderer.on('connection-status', (event, data) => callback(data)),
  onConnectionError: (callback) => ipcRenderer.on('connection-error', (event, error) => callback(error))
});

