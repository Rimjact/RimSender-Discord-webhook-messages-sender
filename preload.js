// preload.js
/* ===== REQUIREMENTS ===== */
const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const { contextBridge } = require('electron');

// File stream saveData for save inputs data
contextBridge.exposeInMainWorld('saveData', {
    save: (path, data) => { 
        const text = JSON.stringify(data);

        fs.writeFileSync(path, text);
    },
    load: (path) => {
        if (!fs.existsSync(path)) return null;

        let readedData = fs.readFileSync(path, { encoding: 'utf8' });

        return JSON.parse(readedData);
    }
});

// Path
contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args) 
});

// App
contextBridge.exposeInMainWorld('app', {
    getUserDataPath: () => ipcRenderer.invoke('getUserDataPath')
});