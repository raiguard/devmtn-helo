require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  authCtrl = require("./controllers/authController"),
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

app.post("/auth/register", authCtrl.register);
app.post("/auth/signin", authCtrl.signIn);

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));
