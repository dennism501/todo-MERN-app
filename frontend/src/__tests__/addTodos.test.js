import AddTodo from "../components/Todo/AddTodo";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const addTodoProps = {
  newTodoText: "",
  setNewTodoText: jest.fn(),
  dueDate: "",
  setDueDate: jest.fn(),
  addTodo: jest.fn(),
};

const renderComponent = () => {
  const container = render(<AddTodo {...addTodoProps} />);
  return container;
};

describe("AddTodo tests", () => {
  it("Ok, Component should render", () => {
    const container = renderComponent();
    expect(container.queryByTestId("add-todo-txt")).toBeTruthy();
    expect(container.queryByTestId("add-todo-txt-date")).toBeTruthy();
    expect(container.queryByTestId("add-todo-btn")).toBeTruthy();
  });

  it("Ok, Todo and dueDate text input", async () => {
    const container = renderComponent();
    const todoInput = container
      .queryByTestId("add-todo-txt")
      .querySelector("input");
    const dueDateInput = container
      .queryByTestId("add-todo-txt-date")
      .querySelector("input");
    expect(todoInput.value).toBe("");
    fireEvent.change(todoInput, { target: { value: "Test todo" } });
    expect(todoInput.value).toEqual("Test todo");

    expect(dueDateInput.value).toBe("");
    fireEvent.change(dueDateInput, {
      target: { value: new Date().toISOString().substring(0, 10) },
    });
    expect(dueDateInput.value).toEqual(
      new Date().toISOString().substring(0, 10)
    );
  });

  it("Ok, Add todo button is clicked and the inputs are cleared", () => {
    const container = renderComponent();
    const addTodoButton = container.queryByTestId("add-todo-btn");
    const todoInput = container.queryByTestId("add-todo-txt");

    const dueDateInput = container.queryByTestId("add-todo-txt-date");

    expect(todoInput.value).toBe("");
    fireEvent.change(todoInput, { target: { value: "Test todo" } });

    expect(todoInput.value).toEqual("Test todo");

    expect(dueDateInput.value).toBe("");
    fireEvent.change(dueDateInput, {
      target: { value: new Date().toISOString().substring(0, 10) },
    });
    expect(dueDateInput.value).toEqual(
      new Date().toISOString().substring(0, 10)
    );
    fireEvent.click(addTodoButton);
    expect(todoInput.value).toBe("");
    expect(dueDateInput.value).toBe("");
  });
});
