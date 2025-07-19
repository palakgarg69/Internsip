// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert('Please enter a task.');
    return;
  }

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);

  taskInput.value = '';
  loadTasks();
}

// Load tasks and display them
function loadTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = getTasks();

  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div class="task-actions">
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Toggle task completion
function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
}

// Delete task
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
