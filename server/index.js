const express = require("express"),
  ctrl = require("./controller"),
  app = express();

app.use(express.json());

const SERVER_PORT = 4000;

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));
