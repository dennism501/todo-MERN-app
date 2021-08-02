const express = require("express");
const todo = require("../services/todo/todo");

const router = express.Router();

// TODO: Rename the route paths to something meaningful.
router.get("/", async (req, res) => {
  const { page, pageSize } = req.query;
  const result = await todo.getAllTodos(page, pageSize);

  res.status(200);
  res.send(result);
});

router.post("/", async (req, res) => {
  const { text, dueDate } = req.body;
  if (typeof text !== "string" && typeof dueDate !== "string") {
    res.status(400);
    res.json({ message: "invalid 'text' expected string" });
    return;
  }
  const result = await todo.createTodo(text, dueDate);
  res.status(201);
  res.send(result);
});

router.put("/:id", todo.updateTodo);

router.delete("/:id", todo.deleteTodo);

module.exports = router;
