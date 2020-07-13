module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get("db");
    const { userid } = req.params;
    const { search, userposts } = req.query;

    try {
      const posts = await db.post.get_all({
        search: search === "" ? null : `%${search.toLowerCase()}%`,
        userid: +userid,
        userposts: userposts === "true"
      });
      return res.status(200).send(posts);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  getOne: async (req, res) => {
    const db = req.app.get("db");
    const { postid } = req.params;

    try {
      const post = await db.post.get_one(+postid);
      res.status(200).send(post);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  add: async (req, res) => {
    const db = req.app.get("db");
    const { userid } = req.params;
    const { title, img, content } = req.body;

    try {
      await db.post.add({ title, img, content, userid });
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};
