process.env.NODE_ENV = "test";
const api = require("../../src/api");
const request = require("supertest");
const { v4: generateId } = require("uuid");

describe("GET /todo/get-todos,", () => {
  const todoData = {
    todo: "Test todo",
    dueDate: "2015-08-1",
    completed: false,
  };
  it("OK, get all todos when no todos are present in the DB", () => {});

  it("OK, get todos when todos are present in the DB", () => {});
});
