import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import TodoItem from "./TodoItem";
import useStyles from "../../pages/Todos";

const TodoList = ({ todos, deleteTodo, toggleTodoCompleted }) => {
  const classes = useStyles();
  return (
    <>
      <List>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            toggleTodoCompleted={toggleTodoCompleted}
            deleteTodo={deleteTodo}
          />
        ))}
      </List>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
};

export default TodoList;
