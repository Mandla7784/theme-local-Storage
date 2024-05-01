function changeTheme() {
  const setTheme = document.body;
  setTheme.classList.toggle("dark-mode");

  const theme = setTheme.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("pageTheme", theme);
}

function saveTask() {
  const userTaskInput = document.querySelector("#user-task");
  const userTask = userTaskInput.value.trim();

  if (userTask) {
    const task = {
      id: new Date().getTime().toString(),
      userTask: userTask,
    };

    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    displayTasks();
    userTaskInput.value = "";
  } else {
    alert("Please enter a task before saving.");
  }
}

function displayTasks() {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  const tasksContainer = document.getElementById("tasks-added");

  tasksContainer.innerHTML = taskList
    .map(
      (task) => `
    <div>
      <span>${task.userTask}</span>
      <button onclick="deleteTask('${task.id}')">X</button>
    </div>
  `
    )
    .join("");
}

function deleteTask(id) {
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList = taskList.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  displayTasks();
}

// Initial setup
let getTheme = localStorage.getItem("pageTheme");
if (getTheme === "dark") {
  document.body.classList.add("dark-mode");
}

document.getElementById("btn-theme").addEventListener("click", changeTheme);
document.getElementById("btn-submit").addEventListener("click", saveTask);
displayTasks();
