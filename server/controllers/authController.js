const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    // check if the user already exists
    const existingUser = await db.user.get(username);
    if (existingUser[0]) return res.status(409).send("User with that name already exists");

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const profilePicture = `https://robohash.org/${username}`;
    const newUser = await db.user.create({ username, hash, profilePicture });
    res.status(200).send(newUser);
  },
  signIn: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const user = await db.user.get(username);
    if (!user[0]) return res.status(400).send("Incorrect username or password");

    const authenticated = bcrypt.compareSync(password, user[0].password);
    if (authenticated) {
      delete user.password;
      return res.status(200).send(user);
    } else {
      return res.status(400).send("Incorrect username or password");
    }
  }
};
