const list = document.querySelector("#liste");
const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#button");
const body = document.querySelector("body");
const swap = document.querySelector(".switch");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    insertItem(taskText);
    taskInput.value = "";
  }
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function insertItem(taskText) {
  const newItem = document.createElement("li");
  newItem.className = "list-group-item custom-item";
  newItem.textContent = taskText;
  list.querySelector("ul").appendChild(newItem);
  newItem.addEventListener("click", function () {
    this.style.opacity = 0;
    setTimeout(() => {
      this.remove();
      updateLocalStorage();
    }, 200);
    updateLocalStorage();
  });
  updateLocalStorage();
}

const isDarkMode = localStorage.getItem("darkMode") === "true" || false;
updateDarkMode(isDarkMode);

function toggleDarkMode() {
  const isDarkMode = document.getElementById("darkModeToggle").checked;
  updateDarkMode(isDarkMode);
  localStorage.setItem("darkMode", isDarkMode);
}

function updateDarkMode(isDarkMode) {
  if (isDarkMode) {
    body.classList.add("dark-mode");
    swap.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
    swap.classList.remove("dark-mode");
  }
}

document
  .getElementById("darkModeToggle")
  .addEventListener("change", toggleDarkMode);

function setInitialMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "true" || false;
  document.getElementById("darkModeToggle").checked = isDarkMode;
  updateDarkMode(isDarkMode);
}

setInitialMode();

function updateLocalStorage() {
  const items = [];
  const itemList = list.querySelectorAll(".custom-item");
  itemList.forEach((item) => {
    items.push(item.textContent);
  });
  localStorage.setItem("todoItems", JSON.stringify(items));
}

window.addEventListener("load", function () {
  const storedItems = JSON.parse(localStorage.getItem("todoItems"));
  if (storedItems) {
    storedItems.forEach((item) => {
      insertItem(item);
    });
  }
});
