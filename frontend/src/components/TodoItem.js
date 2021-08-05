import React from "react";
import PropTypes from "prop-types";
import {
  ListItemText,
  ListItem,
  ListItemIcon,
  Checkbox,
  Typography,
  Icon,
  Button,
  ListItemSecondaryAction,
} from "@material-ui/core";

import useStyles from "../Todos";

const TodoItem = ({ todo, toggleTodoCompleted, deleteTodo }) => {
  const classes = useStyles();
  return (
    <>
      <ListItem divider className={classes.todoContainer}>
        <ListItemIcon>
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleTodoCompleted(todo.id)}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              className={todo.completed ? classes.todoTextCompleted : ""}
              variant="body1"
            >
              {todo.todo}
            </Typography>
          }
          secondary={todo.dueDate}
        />
        <ListItemSecondaryAction>
          <Button
            className={classes.deleteTodo}
            startIcon={<Icon>delete</Icon>}
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;