const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

// todoController: Rename the route paths to something meaningful.
router.get("/", todoController.getAllTodos);

router.post("/", todoController.createTodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);

module.exports = router;
