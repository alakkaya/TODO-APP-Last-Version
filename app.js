const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [
    {
        id: 1,
        title: "Alışveriş Yap.",
        completed: false
    },
    {
        id: 2,
        title: "Okula git",
        completed: true
    },
    {
        id: 3,
        title: "Projeyi bitir.",
        completed: false
    }
];

app.get("/", (req, res) => {
    res.send("To Do List");
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send("Todo bulunamadı.");
    }
});

app.post("/todos", (req, res) => {
    const todo = req.body;
    todo.id = todos.length + 1;
    todo.completed = false;
    todos.push(todo);
    res.send("Todo eklendi!");
});

//belirli bir todo'nun title kısmını güncellemek.id otomatik oluşuyor
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index] = { ...todos[index], ...updatedTodo };
        res.send("Todo Güncellendi.");
    } else {
        res.status(404).send("Todo bulunamadı");
    }
})

//belirli bir todo'yu tamamlandı-tamamlanmadı olarak işaretleme  ->patch
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index].completed = !todos[index].completed;
        if (todos[index].completed) {
            res.send('Todo tamamlandı olarak işaretlendi!');
        } else {
            res.send('Todo tamamlanmadı olarak işaretlendi!');
        }
    } else {
        res.status(404).send('Todo bulunamadı!');
    }
});




app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.send("Todo silindi.");
});

app.listen(3000, () => {
    console.log("Listening on port 3000.")
});