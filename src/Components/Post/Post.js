import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      img: null,
      content: null,
      username: null,
      profilePicture: null,
      postID: null,
      authorID: null
    };
  }

  async componentDidMount() {
    if (!this.props.id) {
      this.props.history.push("/");
    } else {
      try {
        const res = await axios.get(`/api/post/${this.props.match.params.postid}`);
        const {
          title,
          img,
          content,
          username,
          profile_pic: profilePicture,
          author_id: authorID,
          post_id: postID
        } = res.data[0];
        this.setState({ title, img, content, username, profilePicture, authorID, postID });
      } catch (err) {
        console.log(err);
      }
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
    const { title, img, content, username, profilePicture, authorID } = this.state;
    return (
      <article>
        <img src={img} alt="Media" />
        <label>{title}</label>
        <label>{content}</label>
        <label>{username}</label>
        <img src={profilePicture} alt="Avatar" />
        {this.props.id === authorID ? <button onClick={this.deletePost}>Delete</button> : <></>}
      </article>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { id: reduxState.id };
};

export default connect(mapStateToProps)(Post);
