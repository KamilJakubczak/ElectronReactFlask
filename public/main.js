const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const pyshell = require('python-shell');
const isDev = require('electron-is-dev')
const { exec } = require('child_process');

require("@electron/remote/main").initialize()

// Global PythonShell object -> FLASK server instance
let backendServer;
let mainWindow;
let tray; /* Required as global variable in other case tray icon will disappear
 after couple of seconds due to garbage collection */

app.on('ready', createWindow)

app.on('window-all-closed', handleQuit)

app.whenReady().then(createTray)

function createWindow() {
  setStartBackendServer()
  mainWindow = createMainWindow()
  mainWindow.loadURL(getUrl())
  mainWindow.webContents.openDevTools()
  mainWindow.on('minimize', handleMinimize);
  mainWindow.on('close', handleClose);
}

function createMainWindow() {
  return new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })
}

function createTray() {

  tray = new Tray(path.join(__dirname, 'spinner.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
        mainWindow.show();
      } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
      } }
  ]);
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

function killServerProd() {
  exec('taskkill /f /t /im server.exe', (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

function killServerDev() {
   backendServer.childProcess.kill();
}

function setStartBackendServer() {
  if (isDev) {
    backendServer = new pyshell.PythonShell('./backend/server.py')
  } else {
    const script = path.join(__dirname, 'server.exe')
    backendServer = require('child_process').execFile(script)
  }
}

function getUrl() {
  return isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
}

function handleMinimize(e) {
  e.preventDefault();
  mainWindow.hide();
}

function handleClose(e) {
    if(!app.isQuiting){
      e.preventDefault();
      mainWindow.hide();
    }
    return false;
}

function handleQuit () {
  isDev ? killServerDev() : killServerProd()
  if (process.platform !== 'darwin') app.quit()
}