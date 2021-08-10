import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "../components/Todo/TodoItem";

afterEach(cleanup);
const todoItemProps = {
  todo: {
    id: "8c7c92d4-03c7-4891-80de-2aed86f0f6b4",
    todo: "Hello",
    dueDate: "2021-08-01",
    completed: false,
    _id: "610d66bdec3054001e2833b7",
  },
  toggleTodoCompleted: jest.fn(),
  deleteTodo: jest.fn(),
};
const screen = () => render(<TodoItem {...todoItemProps} />);

describe("Test the TodoItem", () => {
  it("Ok, it should render component", () => {
    const container = screen();
    expect(container.queryByText("Hello")).toBeTruthy();
    expect(container.queryByText("2021-08-01")).toBeTruthy();
    expect(
      container
        .queryByTestId("todo-item-checkbox")
        .querySelector('input[type="checkbox"]').checked
    ).toEqual(false);
  });

  it("Ok, The checkbox should be checked", () => {
    const container = screen();
    const onChange = jest.fn();
    expect(container.queryByText("Hello")).toBeTruthy();
    expect(container.queryByText("2021-08-01")).toBeTruthy();
    const checkbox = container
      .queryByTestId("todo-item-checkbox")
      .querySelector('input[type="checkbox"]');
    console.log(checkbox.getAttribute("type"));
    expect(checkbox.checked).toEqual(false);

    userEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
