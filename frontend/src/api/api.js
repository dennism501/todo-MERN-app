import { BaseURL } from "../utils/constants";

export const getTodos = async (filterTodayDate) => {
  return await fetch(
    `${BaseURL}/todo/get-todos?todayDate=${filterTodayDate}`
  ).then((response) => response.json());
};

export const createTodo = async (text, dueDate) => {
  return await fetch(`${BaseURL}/todo/create-todo`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ text, dueDate }),
  }).then((response) => response.json());
};

export const updateTodo = async (id, todos) => {
  return await fetch(`${BaseURL}/todo/update/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      completed: !todos.find((todo) => todo.id === id).completed,
    }),
  });
};

export const removeTodo = async (id) => {
  return await fetch(`${BaseURL}/todo/delete/${id}`, {
    method: "DELETE",
  });
};
