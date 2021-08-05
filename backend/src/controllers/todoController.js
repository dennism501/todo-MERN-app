const database = require("../database/database");
const todoService = require("../services/todo")(database);

const getAllTodos = async (req, res) => {
  const { page, pageSize, todayDate } = req.query;
  const allTodos = await todoService.getAllTodos(page, pageSize, todayDate);
  if (allTodos instanceof Error) {
    console.error(allTodos);
    return res.status(400).end();
  }

  res.status(200);
  res.json(allTodos);
};

const createTodo = async (req, res) => {
  const { text, dueDate } = req.body;
  if (typeof text !== "string" && typeof dueDate !== "string") {
    return res.status(400).json({ message: "invalid 'text' expected string" });
  }
  if (!text || !dueDate) {
    return res.status(400).json({ message: "'text' can not be null" });
  }
  const createdTodo = await todoService.createTodo(text, dueDate);

  if (createdTodo instanceof Error) {
    console.error(createdTodo);
    return res.status(500).send(createdTodo);
  }
  res.status(201);
  res.send(createdTodo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    res.status(400);
    res.json({ message: "invalid 'completed' expected boolean" });
    return;
  }

  const error = await todoService.updateTodo(id, completed);

  if (error instanceof Error) {
    console.error(error);
    res.status(500);
    res.end();
  }
  res.status(200);
  res.end();
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const error = todoService.deleteTodo(id);
  if (error instanceof Error) {
    console.error(error);
    res.status(500);
    res.end();
  }
  res.status(203);
  res.end();
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
