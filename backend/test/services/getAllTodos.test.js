const todoService = require("../../src/services/todo");
const database = require("../../src/database/database");

describe("✅ Tests the service layer", () => {
  const todo = todoService(database);
  it("OK, Get all todos from empty collection", async () => {});
});
