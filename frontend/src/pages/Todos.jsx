import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  Checkbox,
} from "@material-ui/core";
import TodoList from "../components/Todo/TodoList";
import AddTodo from "../components/Todo/AddTodo";
import { getTodos, createTodo, updateTodo, removeTodo } from "../api/api";
import CenteredBox from "../components/CenteredBox";
import Filter from "../components/Filter";
import ErrorComp from "../components/ErrorComp";

export const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: { marginTop: 10, padding: 10 },
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    marginTop: 5,
    "&:first-child": {
      margin: 0,
      borderTop: "none",
    },
    "&:hover": {
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  deleteTodo: {
    visibility: "hidden",
  },
});

function Todos() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filterTodayDate, setFilterTodayDate] = useState("");

  useEffect(() => {
    getTodos(filterTodayDate).then((todos) => setTodos(todos));
  }, [setTodos, filterTodayDate]);

  function addTodo(text, dueDate) {
    createTodo(text, dueDate).then((todo) => setTodos([...todos, todo]));
    setNewTodoText("");
    setDueDate("");
  }

  function toggleTodoCompleted(id) {
    updateTodo(id, todos).then(() => {
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
    });
  }

  function deleteTodo(id) {
    removeTodo(id).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  }

  function filterTodos(date) {
    if (todos.length === 0) {
      return;
    }
    setFilterTodayDate(date.toISOString().substring(0, 10));
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Todos
      </Typography>

      <AddTodo
        newTodoText={newTodoText}
        setNewTodoText={setNewTodoText}
        dueDate={dueDate}
        addTodo={addTodo}
        setDueDate={setDueDate}
      />

      <Filter
        filterTodos={filterTodos}
        setFilterTodayDate={setFilterTodayDate}
        filterTodayDate={filterTodayDate}
      />
      {todos.length > 0 ? (
        <Paper className={classes.todosContainer}>
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodoCompleted={toggleTodoCompleted}
          />
        </Paper>
      ) : (
        <CenteredBox>
          <ErrorComp />
        </CenteredBox>
      )}
    </Container>
  );
}

export default Todos;
