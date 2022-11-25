// My Tasks Basic

// HTML Elements
let taskInputEl = document.getElementById("task-input");
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = initTasks();
displayTasks();

// Go Btn - Menu Listener
taskInputEl.addEventListener("keydown", taskSubmitHandler);

function taskSubmitHandler(e) {
  if(e.code === "Enter"){  
    // Add Submitted Task
    let userTask = taskInputEl.value;
    tasks.push(newTask(userTask));
    saveTasks();
    displayTasks();
    taskInputEl.value = "";
  }
}

// MENU FUNCTIONS

function toggleTask() {
  let taskIndex = +prompt('Please enter number of task to toggle:');
  let task = tasks[taskIndex];
  if (task.completed === '') {
    task.completed = 'completed';
  } else {
    task.completed = '';
  }
  saveTasks();
  displayTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  displayTasks();
}

// HELPERS
function initTasks() {
  let jsonTasks = localStorage.getItem('tasks');
  return JSON.parse(jsonTasks) ?? [];
}

function displayTasks() {
  tasksEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(getTaskHTML(tasks[i], i));
  }
}

function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: false,
  };
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskHTML(task, index) {
  // Use JavaScript to build the task <div>

  //Check Box Element
  let checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.dataset.index = index;
  checkboxEl.checked = task.completed;
  checkboxEl.addEventListener("input", checkBoxHandler);
  

  //Task Description Text Node
  let textSpanEl = document.createElement("span");
  textSpanEl.innerHTML = task.description;
  if (task.completed) {
    textSpanEl.className = "completed"
  }

  // Remove Button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";
  buttonEl.dataset.index = index;
  buttonEl.addEventListener("click", removeBtnHandler);

  // Add everything to a div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkboxEl);
  divEl.appendChild(textSpanEl);
  divEl.appendChild(buttonEl);
  
  return divEl;
}

//Event Functions
function checkBoxHandler(e){
  // Get index of task to remove
  let taskIndex = +e.target.dataset.index;
  let task = tasks[taskIndex];
  task.completed = !task.completed;
  saveTasks();
  displayTasks();

}

function removeBtnHandler(e){
  // Get INdex of the Task to Remove
  let taskIndex = +e.target.dataset.index;
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayTasks();
}

