import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

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
    if (!this.props.id) {
      this.props.history.push("/");
    } else {
      this.updatePosts();
    }
  }

  resetSearch = () => {
    this.setState({ searchQuery: "", showUserPosts: true });
    this.updatePosts();
  };

  updatePosts = async () => {
    const { searchQuery, showUserPosts } = this.state;
    try {
      const res = await axios.get(`/api/posts/${this.props.id}?search=${searchQuery}&userposts=${showUserPosts}`);
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
            <article key={i}>
              <label>{post.title}</label>
              <label>{post.username}</label>
              <img src={post.profile_pic} />
            </article>
          ))}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);
