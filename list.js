// selecting the html elements
theInput = document.querySelector(".input");
theButton = document.querySelector(".add");
tasksContainer = document.querySelector(".tasks");
theDate = document.querySelector(".current-time");
console.log(theDate);

// create onclick function
let arrayOfTasks = [];
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
  displayTasksLocalStroageInPage();
}

theButton.onclick = function () {
  if (theInput.value != "") {
    // addTasksToArray
    addTasksToArray(theInput.value);
  }
  // display tasks on the screen
  displayTasks(arrayOfTasks);
  // loccccccal storaaaaage
  addTasksToLocaStorage(arrayOfTasks);
};

// activate of delete button
tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    let theId = e.target.parentElement.getAttribute("data-id");
    const tasksId = arrayOfTasks.findIndex((task) => task.id === theId);
    console.log(tasksId);
    arrayOfTasks.splice(tasksId, 1);
    console.log(arrayOfTasks);
    updateTasksInlocalStorage();
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    manipulateStatus(e.target.getAttribute("data-id"));
  }
});

// addTasksToArray
function addTasksToArray(inputValue) {
  const task = {
    id: new Date(),
    title: inputValue,
    status: false,
  };
  arrayOfTasks.push(task);
  theInput.value = "";
}

function displayTasks(arrayOfTasks) {
  tasksContainer.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    divOfTask = document.createElement("div");
    divOfTask.className = "task";
    if (task.status == true) {
      divOfTask.className = "task done";
    }
    divOfTask.setAttribute("data-id", task.id);
    divOfTask.appendChild(document.createTextNode(`[ ${task.title} ]`));
    tasksContainer.appendChild(divOfTask);
    // CREATE DELETE BUTTON
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    divOfTask.appendChild(span);
  });
}

// create multiple functions for local stroage

function addTasksToLocaStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function updateTasksInlocalStorage() {
  addTasksToLocaStorage(arrayOfTasks);
}

function displayTasksLocalStroageInPage() {
  let data = window.localStorage.getItem("tasks");
  dataAsObj = JSON.parse(data);
  displayTasks(dataAsObj);
}

function manipulateStatus(divId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == divId) {
      arrayOfTasks[i].status == false
        ? (arrayOfTasks[i].status = true)
        : (arrayOfTasks[i].status = false);
    }
  }
  updateTasksInlocalStorage();
}

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = new Date();
let month = date.getMonth() + 1;
let dayInMonth = date.getDate();
let dayInWeek = daysOfWeek[date.getDay()];
let year = date.getFullYear();

theDate.innerHTML = `${dayInWeek},   ${dayInMonth}/${month}/${year}`;
