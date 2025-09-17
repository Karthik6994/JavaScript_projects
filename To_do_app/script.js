const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks(tasks);

addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = { text: taskText, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks(tasks);
    taskInput.value = '';
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.parentElement.dataset.index;
        tasks.splice(index, 1);
    } else if (e.target.tagName === 'SPAN') {
        const index = e.target.parentElement.dataset.index;
        tasks[index].completed = !tasks[index].completed;
    }
    saveTasks();
    renderTasks(tasks);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filter === 'all') renderTasks(tasks);
        else if (filter === 'completed') renderTasks(tasks.filter(t => t.completed));
        else renderTasks(tasks.filter(t => !t.completed));
    });
});

function renderTasks(tasksToRender) {
    taskList.innerHTML = '';
    tasksToRender.forEach((task, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `<span>${task.text}</span> <button class="delete-btn">Delete</button>`;
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
