const newTaskButton = document.getElementById('btn')
const confirmButton = document.getElementById('yesBtn')
const exitButton = document.getElementById('noBtn')
const x = document.getElementById("createTaskDiv");
const description = document.getElementById("taskDescription");
const title = document.getElementById("taskTitle");
const allTasks = document.getElementById("allTasks");
const deleteAllTasksButton = document.getElementById("clearAll");

x.style.display = "none";

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


newTaskButton.addEventListener('click', () => {
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
});

confirmButton.addEventListener('click', () => {

  window["addTask"](title.value, description.value)

  x.style.display = "none";
  const newTask = document.createElement("task")
  const textDiv = document.createElement("div")
  const newTaskTitle = document.createElement("p")
  newTaskTitle.className += "taskH"
  newTaskTitle.appendChild(
    document.createTextNode(title.value)
  )
  const newTaskDescription = document.createElement("p")
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
      window["deleteTask"](newTaskTitle.value)
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
})

exitButton.addEventListener('click', () => {
    x.style.display = "none";
    title.value = ""
    description.value = ""
})

deleteAllTasksButton.addEventListener('click', () => {
  allTasks.innerHTML = '';
})