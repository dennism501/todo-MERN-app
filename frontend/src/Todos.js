import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  TextField,
  Checkbox,
} from "@material-ui/core";
import TodoList from "./components/TodoList";

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

  useEffect(() => {
    fetch("http://localhost:3001/todo/get-todos")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, [setTodos]);

  function addTodo(text, dueDate) {
    fetch("http://localhost:3001/todo/create-todo", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ text, dueDate }),
    })
      .then((response) => response.json())
      .then((todo) => setTodos([...todos, todo]));
    setNewTodoText("");
    setDueDate("");
  }

  function toggleTodoCompleted(id) {
    fetch(`http://localhost:3001/todo/update/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === id).completed,
      }),
    }).then(() => {
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
    fetch(`http://localhost:3001/todo/delete/${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Todos
      </Typography>
      <Paper className={classes.addTodoContainer}>
        <Box display="flex" flexDirection="row">
          <Box flexGrow={1}>
            <TextField
              fullWidth
              value={newTodoText}
              onChange={(event) => setNewTodoText(event.target.value)}
            />

            <TextField
              fullWidth
              value={dueDate}
              onKeyPress={(event) => {}}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </Box>
          <Button
            className={classes.addTodoButton}
            startIcon={<Icon>add</Icon>}
            onClick={() => addTodo(newTodoText, dueDate)}
          >
            Add
          </Button>
        </Box>
      </Paper>
      {todos.length > 0 && (
        <Paper className={classes.todosContainer}>
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodoCompleted={toggleTodoCompleted}
          />
          <Box display="flex" flexDirection="column" alignItems="stretch">
            {todos.map(({ id, todo, completed }) => (
              <Box
                key={id}
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.todoContainer}
              >
                <Checkbox
                  checked={completed}
                  onChange={() => toggleTodoCompleted(id)}
                ></Checkbox>
                <Box flexGrow={1}>
                  <Typography
                    className={completed ? classes.todoTextCompleted : ""}
                    variant="body1"
                  >
                    {todo}
                  </Typography>
                </Box>
                <Button
                  className={classes.deleteTodo}
                  startIcon={<Icon>delete</Icon>}
                  onClick={() => deleteTodo(id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Container>
  );
}

export default Todos;
