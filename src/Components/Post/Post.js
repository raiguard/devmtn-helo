import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      img: null,
      content: null,
      username: null,
      profilePicture: null,
      postID: null
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/post/${this.props.match.params.postid}`);
      const { title, img, content, username, profile_pic: profilePicture, post_id: postID } = res.data[0];
      this.setState({ title, img, content, username, profilePicture, postID });
    } catch (err) {
      console.log(err);
    }
  }

  deletePost = async () => {
    try {
      await axios.delete(`/api/post/${this.state.postID}`);
      this.props.history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { title, img, content, username, profilePicture } = this.state;
    return (
      <section className="post-page">
        <div className="content-box post">
          <div className="post-upper-part">
            <h1>{title}</h1>
            <div className="author-box">
              <label className="author-name">by {username}</label>
              <img className="profile-picture" src={profilePicture} alt="Avatar" />
            </div>
          </div>
          <div className="post-lower-part">
            <div className="post-img fill">
              <img className="post-img" src={img} alt="Media" />
            </div>
            <p className="post-content">{content}</p>
          </div>
          {this.props.username === username ? (
            <div className="post-button-row">
              <button onClick={this.deletePost}>Delete</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { username: reduxState.username };
};

export default connect(mapStateToProps)(Post);
