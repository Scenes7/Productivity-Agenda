const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')

let pastTasks = JSON.parse(fs.readFileSync('storedTasks.json', 'utf8'));

// console.log(pastTasks)
// function ff(a) {
//     newName = a[0]
//     newVal = a[1]
//     pastTasks.newName = newVal

// }
// ff(["task1", "1"])
// console.log(pastTasks)

contextBridge.exposeInMainWorld('allTaskFile', pastTasks)

contextBridge.exposeInMainWorld('deleteTask', (taskName) => {
    console.log(taskName)
    delete pastTasks[taskName]
    fs.writeFileSync("storedTasks.json", JSON.stringify(pastTasks));
})

contextBridge.exposeInMainWorld('addTask', (taskName, taskValue) => {
    pastTasks[taskName] = taskValue
    fs.writeFileSync("storedTasks.json", JSON.stringify(pastTasks));
})

function updateFile(m) {
    fs.writeFileSync("storedTasks.json", JSON.stringify(m));
}

contextBridge.exposeInMainWorld('updateTaskFile', updateFile)

// contextBridge.exposeInMainWorld('electronAPI', {
//   openFile: () => ipcRenderer.invoke('dialog:openFile')
// })
