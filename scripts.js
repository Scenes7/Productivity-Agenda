const newTaskButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
const confirmButton = document.getElementById('yesBtn')
const exitButton = document.getElementById('noBtn')
const x = document.getElementById("createTaskDiv");
const description = document.getElementById("taskDescription");
const title = document.getElementById("taskTitle");
const allTasks = document.getElementById("allTasks");

x.style.display = "none";

newTaskButton.addEventListener('click', () => {
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
});

confirmButton.addEventListener('click', () => {
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

    newDeleteButton.addEventListener('click', () =>{
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
