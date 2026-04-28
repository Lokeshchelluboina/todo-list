const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}

// Format time
function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString();
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <div class="task">
                <div class="task-text-n-date">
                    <span class="task-text">${task.text}</span>
                    <span class="task-date">
                        ${formatDate(task.date)} at ${formatTime(task.date)}
                    </span>
                </div>

                <div class="task-actions">
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleTask(${index})">
                        ${task.completed ? "Unmark" : "Complete"}
                    </button>
                </div>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

// Add task
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            text: taskText,
            date: new Date().toISOString(),
            completed: false,
        };

        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        displayTasks();
    } else {
        alert("Please enter a task");
    }
});

// Toggle complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Edit task
function editTask(index) {
    const newTaskText = prompt("Edit your task:", tasks[index].text);

    if (newTaskText && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

// Initial display
displayTasks();
