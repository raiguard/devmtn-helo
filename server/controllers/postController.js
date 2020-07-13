module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { userid } = req.params;
    const { search, userposts } = req.query;

    console.log({ userid, search, userposts });

    try {
      let posts = null;
      posts = await db.post.get_all({
        search: search === "" ? null : `%${search.toLowerCase()}%`,
        userid: +userid,
        userposts: userposts === "true"
      });
      console.log(posts);
      res.status(200).send(posts);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
};
