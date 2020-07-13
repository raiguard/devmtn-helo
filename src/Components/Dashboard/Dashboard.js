import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchQuery: "",
      showUserPosts: true
    };
  }

  async componentDidMount() {
    this.updatePosts();
  }

  resetSearch = () => {
    // update posts in setState() callback to guarantee that state changes first
    this.setState({ searchQuery: "", showUserPosts: true }, () => this.updatePosts());
  };

  updatePosts = async () => {
    const { searchQuery, showUserPosts } = this.state;
    try {
      const res = await axios.get(`/api/posts?search=${searchQuery}&userposts=${showUserPosts}`);
      this.setState({ posts: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  onSearchInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  onShowUserPostsInputChange = (e) => {
    this.setState({ showUserPosts: e.target.checked });
  };

  render() {
    const { posts, searchQuery, showUserPosts } = this.state;
    return (
      <section>
        <section>
          <input placeholder="Search" value={searchQuery} onChange={this.onSearchInputChange} />
          <input
            id="showUserPosts"
            type="checkbox"
            checked={showUserPosts}
            onChange={this.onShowUserPostsInputChange}
          />
          <label for="showUserPosts">My Posts</label>
          <button onClick={this.updatePosts}>Search</button>
          <button onClick={this.resetSearch}>Reset</button>
        </section>
        <section>
          {posts.map((post, i) => (
            <article key={i} className="dashboard-post">
              <label>{post.title}</label>
              <label>{post.username}</label>
              <img src={post.profile_pic} alt="Avatar" />
              <Link to={`/post/${post.id}`}>View</Link>
            </article>
          ))}
        </section>
      </section>
    );
  }
}

export default Dashboard;
