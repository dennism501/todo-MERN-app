const { MongoClient } = require("mongodb");

describe("DATABASE, all CRUD operations", () => {
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
    await connection.close();
  });

  const mockTodo = {
    _id: "some-user-id",
    id: "12021d62-a6e4-4138-b877-b84c67f86c17",
    todo: "Test Todo",
    dueDate: "2021-08-03",
    completed: false,
  };

  it("OK, should get all Todos has no todos", async () => {
    const todos = db.collection("todos");
    const queryParams = {
      todayDate: "",
      pageSize: 20,
      page: 0,
    };
    const allTodos = await todos
      .find({
        $or: [
          {
            dueDate: queryParams.todayDate,
          },
          {
            dueDate: { $exists: !queryParams.todayDate },
          },
        ],
      })
      .sort({ dueDate: -1 })
      .limit(parseInt(queryParams.pageSize, 10))
      .skip(parseInt(queryParams.pageSize, 10) * parseInt(queryParams.page, 10))
      .toArray();

    expect(allTodos).toEqual([]);
  });

  it("OK, It should create new Todo", async () => {
    const todos = db.collection("todos");
    await todos.insertOne(mockTodo);
    const insertTodo = await todos.findOne({ _id: "some-user-id" });
    expect(insertTodo).toEqual(mockTodo);
  });

  it("OK, It should update todo", async () => {
    const todos = db.collection("todos");
    await todos.updateOne(
      { id: "12021d62-a6e4-4138-b877-b84c67f86c17" },
      { $set: { completed: true } }
    );
    const insertTodo = await todos.findOne({ _id: "some-user-id" });

    expect(insertTodo.completed).toEqual(true);
  });

  it("OK, It should delete a todo", async () => {
    const todos = db.collection("todos");
    todos.deleteOne({ id: "12021d62-a6e4-4138-b877-b84c67f86c17" });
    const insertTodo = await todos.findOne({ _id: "some-user-id" });
    expect(insertTodo).toBeNull();
  });
});
