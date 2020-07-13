require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  authCtrl = require("./controllers/authController"),
  postCtrl = require("./controllers/postController"),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 10 }
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then((db) => {
  app.set("db", db);
  console.log("Database connection established");
});

app.post("/auth/register", authCtrl.register);
app.post("/auth/signin", authCtrl.signIn);
app.post("/auth/signout", authCtrl.signOut);
app.get("/auth/me", authCtrl.getInfo);

app.get("/api/posts", postCtrl.getAll);
app.get("/api/post/:postid", postCtrl.getOne);

app.post("/api/post", postCtrl.add);
app.delete("/api/post/:postid", postCtrl.delete);

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));
