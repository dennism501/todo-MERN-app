const { v4: generateId } = require("uuid");
const database = require("../../database/database");

/**
 *
 * @param {number} page
 * @param {number} pageSize
 * @param {string} todaysDate
 * @returns
 */
const getAllTodos = (page, pageSize, todaysDate) => {
  const todos = database.client.db("todos").collection("todos");
  const response = todos
    .find({
      $or: [
        {
          dueDate: todaysDate,
        },
        {
          dueDate: { $exists: !todaysDate },
        },
      ],
    })
    .sort({ dueDate: -1 })
    .limit(parseInt(pageSize, 10))
    .skip(parseInt(pageSize, 10) * parseInt(page, 10))
    .toArray();

  return response;
};

/**
 *
 * @param {string} text
 * @param {string} dueDate
 * @returns
 */
const createTodo = (text, dueDate) => {
  const todo = { id: generateId(), text, dueDate, completed: false };
  database.client.db("todos").collection("todos").insertOne(todo);
  return todo;
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
