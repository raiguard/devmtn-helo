require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  ctrl = require("./controller"),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then((db) => {
  app.set("db", db);
  console.log("Database conneciton established");
});

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));

// TODO set up tables on DB side
