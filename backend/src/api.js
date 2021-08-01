const express = require("express");
const { requestLogger } = require("./middleware/logger");
const router = require("./routes/routes");

const app = express();

app.use(requestLogger);
app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All application routes are configured here
app.use(router);

module.exports = app;
