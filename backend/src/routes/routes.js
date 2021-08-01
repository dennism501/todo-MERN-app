const express = require("express");
const todo = require("../services/todo/todo");

const router = express.Router();

router.get("/", todo.getAllTodos);

router.post("/", todo.createTodo);

router.put("/:id", todo.updateTodo);

router.delete("/:id", todo.deleteTodo);

module.exports = router;
