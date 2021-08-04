const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.get("/todo/get-todos", todoController.getAllTodos);

router.post("/todo/create-todo", todoController.createTodo);

router.put("/todo/update/:id", todoController.updateTodo);

router.delete("/todo/delete/:id", todoController.deleteTodo);

module.exports = router;
