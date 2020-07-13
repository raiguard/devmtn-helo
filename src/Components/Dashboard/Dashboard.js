import React, { Component } from "react";
import axios from "axios";

import "./Dashboard.css";

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
      <section className="dashboard">
        <div className="content-box dashboard-content dashboard-search">
          <input
            className="dashboard-search-input"
            placeholder="Search by title"
            value={searchQuery}
            onChange={this.onSearchInputChange}
          />
          <button onClick={this.updatePosts}>Search</button>
          <button onClick={this.resetSearch}>Reset</button>
          <input
            id="showUserPosts"
            type="checkbox"
            checked={showUserPosts}
            onChange={this.onShowUserPostsInputChange}
          />
          <label for="showUserPosts">My Posts</label>
        </div>
        <div className="content-box dashboard-content">
          {posts.map((post, i) => (
            <section
              key={i}
              className="content-box dashboard-content dashboard-post"
              onClick={() => this.props.history.push(`/post/${post.id}`)}
            >
              <h1>{post.title}</h1>
              <div className="author-box">
                <label className="author-name">by {post.username}</label>
                <img className="profile-picture" src={post.profile_pic} alt="Avatar" />
              </div>
              {/* <Link to={`/post/${post.id}`}>View</Link> */}
            </section>
          ))}
        </div>
      </section>
    );
  }
}

export default Dashboard;
