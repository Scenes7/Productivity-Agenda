// const { app, BrowserWindow, ipcMain, Menu, MenuItem } = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs');

async function handleOpenTasks() {
  fs.readFile('storedTasks.json', (err, data) => {
    if (err) throw err;
    let pastTasks = JSON.parse(data);
    return pastTasks
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}

// const menu = new Menu()
// menu.append(new MenuItem({
//   label: 'Electron',
//   submenu: [{
//     role: 'help',
//     accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
//     click: () => {
//       const description = document.getElementById("taskDescription");
//     }
//   }]
// }))

// Menu.setApplicationMenu(menu)


app.whenReady().then(() => {
  ipcMain.handle('openTasks', handleOpenTasks)

  // ipcMain.handle('dialog:openFile', handleFileOpen) //change later
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



// fs.readFile('storedTasks.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });



/*

(node:29964) electron: Failed to load URL: file:///C:/Users/simon/Downloads/toDo/index.html with error: ERR_FILE_NOT_FOUND
(Use `electron --trace-warnings ...` to show where the warning was created)
`electron --trace-warnings ...`
file:///C:/Users/simon/Downloads/toDo/src/index.html
*/