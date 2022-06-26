const { contextBridge } = require('electron')
const fs = require('fs')

let pastTasks = JSON.parse(fs.readFileSync('storedTasks.json', 'utf8'));

contextBridge.exposeInMainWorld('allTaskFile', pastTasks)

contextBridge.exposeInMainWorld('deleteTask', (taskName) => {
    delete pastTasks[taskName]
    fs.writeFileSync("storedTasks.json", JSON.stringify(pastTasks));
})

contextBridge.exposeInMainWorld('addTask', (taskName, taskValue) => {
    pastTasks[taskName] = taskValue
    fs.writeFileSync("storedTasks.json", JSON.stringify(pastTasks));
})

contextBridge.exposeInMainWorld('deleteAllTasks', () => {
    fs.writeFileSync("storedTasks.json", JSON.stringify({}));
    pastTasks = {}
})