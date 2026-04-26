const renderTasks = async () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = 'Loading tasks...';
    const response = await fetch('http://localhost:8080/tasks/list.php');
    const tasks = await response.json();

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
        checkBox.checked = true;
    }
}

const addTask = async (value) => {
    const response = await fetch('http://localhost:8080/tasks/save.php', {
        method: 'POST',
        body: JSON.stringify({
            title: value,
        }),
    });

    const data = await response.json(); // JSON -> Object
    console.log(data);
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

        addTask(value);
    });
}


const main = async () => {
    initiateInput();
    await renderTasks();
}

main();
