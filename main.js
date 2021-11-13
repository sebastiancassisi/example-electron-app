if (process.env.NODE_DEV !== 'production') {
  require('electron-reload')(__dirname, {});
}

const { app, BrowserWindow } = require('electron');
const path = require('path');

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
};

app.whenReady().then(createMainWindow);

//Cierre par mac
app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.quit();
  }
});

/** Cuando no hay ninguna ventana abierta, y el icono de la aplicacion queda en el
 docker de navegacion de mac, al hacer click en el icono vuelve a lanzar la aplicaicon. */
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
