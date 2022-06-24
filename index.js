const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs');

// function handleSetTitle (event, title) {
//   const webContents = event.sender
//   const win = BrowserWindow.fromWebContents(webContents)
//   win.setTitle(title)
// }

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), //this is useless rn since all code in preload.js is commented
      nodeIntegration: false
    }
  })

  ipcMain.on('set-title', (event, title) => { //this code might be useless now since set title stuff isn't needed
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  // ipcMain.on('set-title', handleSetTitle)
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



fs.readFile('storedTasks.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
});



/*

(node:29964) electron: Failed to load URL: file:///C:/Users/simon/Downloads/toDo/index.html with error: ERR_FILE_NOT_FOUND
(Use `electron --trace-warnings ...` to show where the warning was created)
`electron --trace-warnings ...`
file:///C:/Users/simon/Downloads/toDo/src/index.html
*/