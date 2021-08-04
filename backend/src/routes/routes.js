const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

// todoController: Rename the route paths to something meaningful.
router.get("/api/v1/todo/get-todos", todoController.getAllTodos);

router.post("/api/v1/todo/create-todo", todoController.createTodo);

router.put("/api/v1/todo/update/:id", todoController.updateTodo);

router.delete("/api/v1/todo/delete/:id", todoController.deleteTodo);

module.exports = router;
