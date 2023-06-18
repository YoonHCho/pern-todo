const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
// CORS = Cross-Origin Resource Sharing - allows web browsers to make cross-origin requests securely.
// cross-origin requests are requests made from a different domain, protocol, or port than the one from which the request originated.
app.use(cors());

// Enables the application to parse incoming requests with JSON payloads.
app.use(express.json());

// Routes

// Create a todo, async/await, waits for a function to complete before it continues
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query("SELECT * FROM todo WHERE todo_id= $1", [id]);
    if (getTodo.rowCount === 0) {
      return res.status(404).json({ error: `Todo ID ${id} not found` });
    }
    console.log(getTodo);
    res.json(getTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = ($1) WHERE todo_id = ($2)", [description, id]);
    if (updateTodo.rowCount === 0) {
      return res.status(404).json({ error: `Todo ID ${id} not found` });
    }
    res.json("Updated todo");
  } catch (error) {
    console.error(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = ($1)", [id]);
    if (deleteTodo.rowCount === 0) {
      return res.status(404).json({ error: `Todo ID ${id} not found` });
    }
    console.log("DELETE: ", deleteTodo);
    res.json(`Deleted todo ID: ${id}`);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
