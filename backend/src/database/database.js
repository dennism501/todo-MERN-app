const { MongoClient } = require("mongodb");
const config = require("../config/config");

const database = module.exports;

database.connect = async function connect() {
  database.client = await MongoClient.connect(
    `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@database/`,
    {
      useUnifiedTopology: true,
    }
  );
};
