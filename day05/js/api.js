const BASE_URL = 'http://localhost:8080';

export const getTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks/list.php`);
    const tasks = await response.json();
    return tasks;
}


export const addTask = async (value) => {
    const response = await fetch(`${BASE_URL}/tasks/save.php`, {
        method: 'POST',
        body: JSON.stringify({
            title: value,
        }),
    });
    const res = await response.json();
    return res;
}

// data: { id, title, description, is_done }

export const updateTask = async (data) => {

    if (!data.id) {
        throw new Error('ID is required');
    }

    if (!data.title) {
        throw new Error('Title is required');
    }

    const response = await fetch(`${BASE_URL}/tasks/save.php`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
}


export const deleteTask = async (id) => {
    const response = await fetch(`${BASE_URL}/tasks/delete.php`, {
        method: 'POST',
        body: JSON.stringify({
            id: id,
        }),
    });
    const res = await response.json();
    return res;
}


export const clearTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks/clear.php`);
    const res = await response.json();
    return res;
}
