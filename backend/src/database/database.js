const { MongoClient } = require("mongodb");
const config = require("../config/config");

const database = module.exports;

database.connect = async function connect() {
  try {
    database.client = await MongoClient.connect(
      `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@database/`,
      {
        useUnifiedTopology: true,
      }
    );
    await database.client.db("todos").command({ ping: 1 });
    console.log("Connected successfully to server 🚀");
  } finally {
    await database.client.close();
  }
};
