const { v4: generateId } = require("uuid");
const database = require("../../database/database");

const getAllTodos = async (req, res) => {
  const todos = database.client.db("todos").collection("todos");
  const response = await todos.find({}).toArray();
  res.status(200);
  res.json(response);
};

const createTodo = async (req, res) => {
  const { text, dueDate } = req.body;
  if (typeof text !== "string" && typeof dueDate !== "string") {
    res.status(400);
    res.json({ message: "invalid 'text' expected string" });
    return;
  }

  const todo = { id: generateId(), text, dueDate, completed: false };
  await database.client.db("todos").collection("todos").insertOne(todo);
  res.status(201);
  res.json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    res.status(400);
    res.json({ message: "invalid 'completed' expected boolean" });
    return;
  }

  await database.client
    .db("todos")
    .collection("todos")
    .updateOne({ id }, { $set: { completed } });
  res.status(200);
  res.end();
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await database.client.db("todos").collection("todos").deleteOne({ id });
  res.status(203);
  res.end();
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
