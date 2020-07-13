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
      res.status(200).send(posts);
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
  }
};
