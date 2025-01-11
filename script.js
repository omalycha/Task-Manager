let tasks = [];

const taskInput = document.getElementById("taskInput");
const taskDeadline = document.getElementById("taskDeadline");
const taskCategory = document.getElementById("taskCategory");
const taskList = document.getElementById("taskList");
const sortBy = document.getElementById("sortBy");
const filterBy = document.getElementById("filterBy");

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const taskDeadlineValue = taskDeadline.value;
  const taskCategoryValue = taskCategory.value;
  const taskPriorityValue = document.querySelector(
    'input[name="priority"]:checked'
  ).value;

  if (taskText === "") return alert("Please enter a task!");

  const newTask = {
    text: taskText,
    deadline: taskDeadlineValue,
    category: taskCategoryValue,
    priority: taskPriorityValue,
    completed: false,
  };

  tasks.push(newTask);
  displayTasks();
  taskInput.value = "";
  taskDeadline.value = "";
}

// Function to calculate the time remaining
function getTimeRemaining(deadline) {
  const now = new Date();
  const endDate = new Date(deadline);
  const timeDiff = endDate - now;

  if (timeDiff <= 0) return "Expired";

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
}

// Function to display tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add(`priority-${task.priority}`);
    taskElement.classList.toggle("completed", task.completed);

    const timeRemaining = getTimeRemaining(task.deadline);

    taskElement.innerHTML = `
      <div>
        <span class="category-badge">${task.category}</span>
        <span>${task.text} (Deadline: ${task.deadline})</span>
        <span class="deadline-countdown">${timeRemaining}</span>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
}

// Function to mark a task as completed
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// Sorting Function
function sortTasks(sortByValue) {
  if (sortByValue === "priority") {
    tasks.sort((a, b) => a.priority.localeCompare(b.priority));
  } else if (sortByValue === "deadline") {
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }
  displayTasks();
}

// Filtering Function
function filterTasks(filterByValue) {
  if (filterByValue === "completed") {
    tasks = tasks.filter((task) => task.completed);
  } else if (filterByValue === "pending") {
    tasks = tasks.filter((task) => !task.completed);
  }
  displayTasks();
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Event Listeners for Sort and Filter
sortBy.addEventListener("change", (e) => {
  sortTasks(e.target.value);
});

filterBy.addEventListener("change", (e) => {
  filterTasks(e.target.value);
});
