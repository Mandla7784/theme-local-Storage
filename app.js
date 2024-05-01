function changeTheme() {
  let theme;
  const setTheme = document.body;
  setTheme.classList.toggle("dark-mode");

  if (setTheme.classList.contains("dark-mode")) {
    console.log("dark");
    theme = "dark";
  } else {
    theme = "light";
    console.log("light");
  }
  //save them to local storage;
  localStorage.setItem("pageTheme", JSON.stringify(theme));
}

let getTheme = JSON.parse(localStorage.getItem("pageTheme"));
if (getTheme === "dark") {
  document.body.classList = "dark-mode";
}

document.getElementById("btn-theme").addEventListener("click", changeTheme);

///storing data from to local  storage.....

let taskList = [];
const uniqueTaskList = new Map();
function saveAndReadData() {
  const saveButton = document.getElementById("btn-submit");
  saveButton.onclick = () => {
    const task = {
      id: new Date().getTime().toString(),
      userTask: document.querySelector("#user-task").value,
    };
    ////adding a task to the list
    taskList.push(task);

    taskList.forEach((task) => {
      if (!uniqueTaskList.has(task)) {
        uniqueTaskList.set(task.userTask, task);
      }
    });
    const taskListNoDuplications = Array.from(uniqueTaskList.values());
    ///save to local////
    localStorage.setItem("tasks", JSON.stringify(taskListNoDuplications));

    function displayTask() {
      const retrievedTasks = JSON.parse(localStorage.getItem("tasks"));

      document.getElementById("tasks-added").innerHTML = retrievedTasks.map(
        (task) => {
          return `
              <span>${task.userTask}</span>
           
              <button onclick="deleteTask(${task.id})" data-id-${task.id}>X</button>
            `;
        }
      );
    }

    displayTask();
  };
}

saveAndReadData();

function deleteTask(id) {
  const indexOftask = taskList.findIndex((task) => task.id === id);

  if (!indexOftask == -1) {
    taskList.splice(indexOftask, task);
  }
}
