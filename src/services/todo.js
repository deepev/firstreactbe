const { v4: uuidv4 } = require('uuid');

let todos = [
    {
        id: uuidv4(),
        title: "todo 1",
        completed: true,
    },
    {
        id: uuidv4(),
        title: "todo 2",
        completed: false,
    },
    {
        id: uuidv4(),
        title: "todo 3",
        completed: false,
    },
    {
        id: uuidv4(),
        title: "todo 4",
        completed: false,
    },
    {
        id: uuidv4(),
        title: "todo 5",
        completed: false,
    },
];

const getAll = () => {
    return todos
}

const addTodo = (data) => {
    const todo = { title: data.title, id: uuidv4(), completed: false };
    todos.push(todo);
    return todos
}

const getTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);
    const completed = Boolean(req.body.completed);
    if (index > -1) {
        todos[index].completed = completed;
    }
    return todos[index];
}

const deleteTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);
    if (index > -1) {
        todos.splice(index, 1);
    }

    return todos;
}

module.exports = {
    addTodo,
    getAll,
    getTodo,
    deleteTodo
}