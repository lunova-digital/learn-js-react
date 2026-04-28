// DRY - Don't Repeat Yourself

import { getTasks, addTask, updateTask, deleteTask, clearTasks } from './js/api.js';

const taskList = document.getElementById('task-list');

const insertTaskItem = (task) => {
    const li = document.createElement('li');

    li.innerHTML = `
        <label>
            <input type="checkbox"/>
            <span>${task.title}</span>
        </label>
        <button class="delete-button">&#x1F5D1;</button>
    `;
    taskList.appendChild(li);

    const checkBox = li.querySelector('input');
    checkBox.checked = task.is_done;

    checkBox.addEventListener('change', () => {
        updateTask({
            ...task,
            is_done: checkBox.checked,
        });
    });

    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
        li.remove();
    });

}

const renderTasks = async () => {
    taskList.innerHTML = 'Loading tasks...';
    const tasks = await getTasks();

    if (!tasks) {
        taskList.innerHTML = "Something went wrong";
        return;
    }

    if (tasks.length === 0) {
        taskList.innerHTML = "No tasks found";
        return;
    }

    taskList.innerHTML = '';

    for (const task of tasks) {
        insertTaskItem(task);
    }
}

const addTaskHandler = async (value) => {

    const btn = document.getElementById('add-button');
    btn.disabled = true;
    btn.innerHTML = 'Saving...';

    const res = await addTask(value);

    btn.disabled = false;
    btn.innerHTML = 'Add';


    insertTaskItem(res.data);
}

const initiateInput = () => {
    const btn = document.getElementById('add-button');

    btn.addEventListener('click', () => {
        // event.preventDefault();
        const input = document.getElementById('task-input');
        const value = input.value.trim();

        if (!value) {
            return;
        }
        addTaskHandler(value);
        input.value = '';
    });
}

const clearTasksHandler = async () => {
    const btn = document.getElementById('clear-button');
    btn.disabled = true;
    btn.innerHTML = 'Clearing...';
    await clearTasks();
    btn.disabled = false;
    btn.innerHTML = 'Clear';
    taskList.innerHTML = '';
}

const initiateClearButton = () => {
    const btn = document.getElementById('clear-button');
    btn.addEventListener('click', () => {
        clearTasksHandler();
    });
}

const main = async () => {
    initiateInput();
    initiateClearButton();
    await renderTasks();
}

main();
