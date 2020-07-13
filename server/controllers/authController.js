const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    // check if the user already exists
    const existingUser = await db.user.check_username(username);
    if (existingUser[0]) return res.status(409).send("User with that name already exists");

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const profilePicture = `https://robohash.org/${username}`;
    const newUser = await db.user.create({ username, hash, profilePicture });
    req.session.userid = newUser.id;
    res.status(200).send(newUser);
  },
  signIn: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    const foundUser = await db.user.check_username(username);
    const user = foundUser[0];
    if (!user) return res.status(400).send("Incorrect username or password");

    const authenticated = bcrypt.compareSync(password, user.password);
    if (authenticated) {
      delete user.password;
      req.session.userid = user.id;
      return res.status(200).send(foundUser);
    } else {
      return res.status(400).send("Incorrect username or password");
    }
  },
  signOut: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getInfo: async (req, res) => {
    const db = req.app.get("db");
    const { userid } = req.session;

    if (!userid) return res.sendStatus(200);

    const foundUser = await db.user.get_info(userid);
    const user = foundUser[0];
    if (user) return res.status(200).send(user);
    else return res.status(500).send("User not found");
  }
};
