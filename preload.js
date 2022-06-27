const { contextBridge } = require('electron')
const fs = require('fs')
const path = require('path')

let pastTasks = JSON.parse(fs.readFileSync(path.join(__dirname, 'storedTasks.json'), 'utf8'));

contextBridge.exposeInMainWorld('allTaskFile', pastTasks)

contextBridge.exposeInMainWorld('deleteTask', (taskName) => {
    delete pastTasks[taskName]
    fs.writeFileSync(path.join(__dirname, 'storedTasks.json'), JSON.stringify(pastTasks));
})

contextBridge.exposeInMainWorld('addTask', (taskName, taskValue) => {
    pastTasks[taskName] = taskValue
    fs.writeFileSync(path.join(__dirname, 'storedTasks.json'), JSON.stringify(pastTasks));
})

contextBridge.exposeInMainWorld('deleteAllTasks', () => {
    fs.writeFileSync(path.join(__dirname, 'storedTasks.json'), JSON.stringify({}));
    pastTasks = {}
})