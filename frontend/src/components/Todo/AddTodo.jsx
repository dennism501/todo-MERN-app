import { Box, Button, Icon, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import useStyles from "../../pages/Todos";

const AddTodo = ({
  newTodoText,
  setNewTodoText,
  dueDate,
  setDueDate,
  addTodo,
}) => {
  const [todoTextError, setTodoTextError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.addTodoContainer}>
        <Box display="flex" flexDirection="column">
          <Box flexGrow={1} padding={2}>
            <TextField
              inputProps={{
                "data-testid": "add-todo-txt",
                pattern: "[a-zA-Z]+",
              }}
              fullWidth
              required
              error={todoTextError}
              helperText={todoTextError ? "Todo should not be null" : ""}
              label="Outlined"
              variant="outlined"
              style={{ marginTop: 5 }}
              label="What are you planning?"
              InputLabelProps={{
                shrink: true,
              }}
              value={newTodoText}
              onChange={(event) => setNewTodoText(event.target.value)}
            />

            <TextField
              fullWidth
              inputProps={{ "data-testid": "add-todo-txt-date" }}
              label="Outlined"
              variant="outlined"
              required
              error={dueDateError}
              helperText={dueDateError ? "Due date should not be null" : ""}
              id="date"
              type="date"
              style={{ marginTop: 10 }}
              label="Due date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </Box>
          <Button
            variant="contained"
            data-testid="add-todo-btn"
            color="primary"
            className={classes.addTodoButton}
            startIcon={<Icon>add</Icon>}
            onClick={() => {
              if (dueDate === "") {
                setDueDateError(true);
              }
              if (newTodoText === "") {
                setTodoTextError(true);
                return;
              }
              return addTodo(newTodoText, dueDate);
            }}
          >
            Add
          </Button>
        </Box>
      </Paper>
    </>
  );
};

AddTodo.propTypes = {
  newTodoText: PropTypes.string.isRequired,
  setNewTodoText: PropTypes.func.isRequired,
  dueDate: PropTypes.string.isRequired,
  setDueDate: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
