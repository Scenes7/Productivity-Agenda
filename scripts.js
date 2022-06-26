const newTaskButton = document.getElementById('btn')
const confirmButton = document.getElementById('yesBtn')
const exitButton = document.getElementById('noBtn')
const createNewTask = document.getElementById("createTaskDiv");
const description = document.getElementById("taskDescription");
const title = document.getElementById("taskTitle");
const allTasks = document.getElementById("allTasks");
const deleteAllTasksButton = document.getElementById("clearAll");
const darkModeButton = document.getElementById("darkMode");
const body = document.getElementById("body");

let isDarkMode = false;

createNewTask.style.display = "none";

let allTaskVar = window["allTaskFile"]

//Load all stored tasks
for (const tempName in window["allTaskFile"]) {
  let tempDescription = window["allTaskFile"][tempName]
  const newTask = document.createElement("task")
  const textDiv = document.createElement("div")
  const newTaskTitle = document.createElement("p")
  newTaskTitle.className += "taskH"
  newTaskTitle.appendChild(
    document.createTextNode(tempName)
  )
  const newTaskDescription = document.createElement("p")
  newTaskDescription.appendChild(
    document.createTextNode(tempDescription)
  )
  textDiv.appendChild(newTaskTitle)
  textDiv.appendChild(newTaskDescription)

  const newDeleteButton = document.createElement("button")
  newDeleteButton.className += "deleteButton"
  newDeleteButton.appendChild(
    document.createTextNode("-")
  )

  newDeleteButton.addEventListener('click', () => {
    window["deleteTask"](tempName)
    newTask.innerHTML = ''
    newTask.style.display = "none";
  })
  const marker = document.createElement("input")
  marker.setAttribute("type", "checkbox")

  const groupButtons = document.createElement("div")
  groupButtons.style.display = "flex"
  groupButtons.style.alignItems = "center"
  groupButtons.appendChild(marker)
  groupButtons.appendChild(newDeleteButton)

  newTask.appendChild(textDiv)
  newTask.appendChild(groupButtons)

  allTasks.append(newTask)
}

darkModeButton.addEventListener('click', () => {
  const allTaskElements = document.querySelectorAll("task")
  const deleteButtons = document.querySelectorAll(".deleteButton")
  const markers = document.querySelectorAll("input")
  if (isDarkMode) {
    for (const task of allTaskElements) {
      task.style.backgroundColor = "rgb(240, 240, 240)";
      task.style.color = "black";
    }
    for (const eachDeleteButton of deleteButtons) {
      eachDeleteButton.style.opacity = "1";
    }
    for (const marker of markers) {
      marker.style.opacity = "1";
    }
    body.style.backgroundColor = "white";
    description.style.opacity = "1.0";
  } else {
    body.style.backgroundColor = "white";
    for (const task of allTaskElements) {
      task.style.backgroundColor = "rgb(30, 30, 30)";
      task.style.color = "white";
    }
    for (const eachDeleteButton of deleteButtons) {
      eachDeleteButton.style.opacity = "0.5";
    }
    for (const marker of markers) {
      marker.style.opacity = "0.5";
    }
    body.style.backgroundColor = "rgb(30, 30, 30)"
    description.style.opacity = "0.5"
  }
  isDarkMode = !isDarkMode;
})

newTaskButton.addEventListener('click', () => {
  if (createNewTask.style.display === "none") {
    createNewTask.style.display = "block";
  } else {
    createNewTask.style.display = "none";
  }
});

confirmButton.addEventListener('click', () => {

  window["addTask"](title.value, description.value)

  createNewTask.style.display = "none";
  const newTask = document.createElement("task")
  const textDiv = document.createElement("div")
  const newTaskTitle = document.createElement("p")
  const newTaskDescription = document.createElement("p")

  newTaskTitle.className += "taskH"
  newTaskTitle.appendChild(
    document.createTextNode(title.value)
  )
  newTaskDescription.appendChild(
    document.createTextNode(description.value)
  )
  textDiv.appendChild(newTaskTitle)
  textDiv.appendChild(newTaskDescription)

  title.value = ""
  description.value = ""

  const newDeleteButton = document.createElement("button")
  newDeleteButton.className += "deleteButton"
  newDeleteButton.appendChild(
    document.createTextNode("-")
  )

  newDeleteButton.addEventListener('click', () => {
    window["deleteTask"](newTaskTitle.innerHTML)
    newTask.innerHTML = ''
    newTask.style.display = "none";
  })
  const marker = document.createElement("input")
  marker.setAttribute("type", "checkbox")

  const groupButtons = document.createElement("div")
  groupButtons.style.display = "flex"
  groupButtons.style.alignItems = "center"
  groupButtons.appendChild(marker)
  groupButtons.appendChild(newDeleteButton)

  newTask.appendChild(textDiv)
  newTask.appendChild(groupButtons)

  if (isDarkMode) {
    newTask.style.backgroundColor = "rgb(30, 30, 30)";
    textDiv.style.color = "white";
    newDeleteButton.style.opacity = "0.5";
    marker.style.opacity = "0.5";
  }

  allTasks.append(newTask)
})

exitButton.addEventListener('click', () => {
  createNewTask.style.display = "none";
  title.value = ""
  description.value = ""
})

deleteAllTasksButton.addEventListener('click', () => {
  window["deleteAllTasks"]()
  allTasks.innerHTML = '';
})