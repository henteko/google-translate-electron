const {app, BrowserWindow, Menu} = require('electron');
const rootURL = 'https://translate.google.co.jp/?hl=ja';
let mainWindow;

const template = [
  {
    label: 'AppName',
    submenu: [
      {
        label: 'New Window',
        accelerator: 'Cmd+Ctrl+T',
        click: function() { createWindow(rootURL); }
      },
      {
        label: 'Quit',
        accelerator: 'Cmd+Q',
        click: function() { app.quit(); }
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+T',
        click: function() { createWindow(rootURL); }
      },
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  }
];

function createWindow (url) {
  mainWindow = new BrowserWindow({width: 1050, height: 600});
  mainWindow.loadURL(url);

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.on('ready', function () { createWindow(rootURL) });

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
