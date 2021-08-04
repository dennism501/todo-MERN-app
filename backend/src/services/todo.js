const { v4: generateId } = require("uuid");
const database = require("../database/database");

/**
 * @function getAllTodos return all todos from the DB
 * @function createTodo creates a new Todo
 * @function updateTodo updates a todo based on Id
 * @function deleteTodo deletes a Todo based on Id
 */

/**
 * @param {Number} page
 * @param {Number} pageSize
 * @param {String} todayDate
 * @returns an array of all Todos
 */
const getAllTodos = (page, pageSize, todayDate) => {
  if (page === "" && pageSize === "") {
    page = 0;
    pageSize = 20;
  }
  const todos = database.client.db("todos").collection("todos");
  const response = todos
    .find({
      $or: [
        {
          dueDate: todayDate,
        },
        {
          dueDate: { $exists: !todayDate },
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
 * @param {string} todoText The contents of the the todo to be created
 * @param {string} dueDate The due of the day the todo
 * @returns The object of the created todo || The error that is caught during the DB insert
 */
const createTodo = (todoText, dueDate) => {
  const todo = { id: generateId(), todoText, dueDate, completed: false };
  try {
    database.client.db("todos").collection("todos").insertOne(todo);
  } catch (err) {
    return err;
  }
  return todo;
};

/**
 * @param {string} id Id of the todo to be updated
 * @param {boolean} completed The status of the todo
 * @returns If an error occurs during the DB update, an err is returned
 */
const updateTodo = (id, completed) => {
  try {
    database.client
      .db("todos")
      .collection("todos")
      .updateOne({ id }, { $set: { completed } });
  } catch (err) {
    return err;
  }
};

/**
 * @param {string} id Id of the todo to be deleted
 * @returns If an error occurs during the DB update, an err is returned
 */
const deleteTodo = (id) => {
  try {
    database.client.db("todos").collection("todos").deleteOne({ id });
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
