import express from "express";
import cors from "cors";

import db from "./db.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//get tasks

app.get('/tasks', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Tasks');
        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching tasks')
    }
})

// create tasks
app.post("/tasks", async (req, res) => {
    try {
        await db.query('INSERT INTO Tasks (list-title, task, completed) VALUES ($1, $2, $3)', [list, task, completed]);
        res.status(201).json(result.rows[0])

    } catch (error) {
        console.error(error);
        res.status(201).json({ message: 'Task successfuly created' })
    }
});
//  edit tasks
app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    try {
        await db.query('UPDATE Tasks SET task = $1, completed = $2 WHERE id = $3', [task, completed, id]);
        res.status(200).json({ message: "Task edited" })
    } catch (error) {
        console.error(error)
        res.status(500).send("Error editing task")
    }
});

// delete task 
app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Tasks WHERE id = $1', [id]);
        res.status(204).json({ message: "Task deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).send("Error deleting task")
    }
})


//  create lists
app.post("/list", async (req, res) => {
    try {
        await db.query('INSERT INTO Lists (list-title, list-color) VALUES ($1, $2)', [list, color])
        res.status(201).json({ message: 'List successfully created' })
    } catch (error) {

    }
})
app.delete("/list/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM Lists WHERE id = $1', [id]);
        res.status(204).json({ message: "List deleted" })
    } catch (error) {
        console.error(error)
        res.status(500).send("Error deleting list")
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log("error", err);
    }
    console.log(`Server is running on port ${port}`)
})