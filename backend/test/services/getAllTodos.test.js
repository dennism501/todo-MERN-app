const todoService = require("../../src/services/todo");
const { MongoClient } = require("mongodb");

describe("✅ Tests the service layer", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    //await connection.close();
  });

  const todo = todoService(connection);
  const querysArgs = {
    page: 0,
    pageSize: 20,
    dueDate: "",
  };
  it("OK, Get all todos from empty collection", () => {
    const todos = todo.getAllTodos(querysArgs.page, querysArgs.pageSize);
    expect(todos).toEqual([]);
  });
});
