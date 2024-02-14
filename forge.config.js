const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    name: 'rimsender',
    icon: path.resolve(__dirname, 'assets/icons/icon')
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Kirill "Rimjact" Tolokolnikov',
        description: 'A simple Discord webhook messages sender. Send a simple and embed messages.',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
