require('./devServer.js');

import menubar from 'menubar';

const mb = menubar({
  index: `file://${__dirname}/index.html`,
  'always-on-top': true,
});

mb.on('ready', () => {

});

mb.on('show', () => {
  mb.window.webContents.openDevTools();
});
