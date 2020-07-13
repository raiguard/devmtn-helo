import React, { Component } from "react";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      img: null,
      content: null,
      username: null,
      profilePicture: null
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get(`/api/post/${this.props.match.params.postid}`);
      const { title, img, content, username, profile_pic: profilePicture } = res.data[0];
      this.setState({ title, img, content, username, profilePicture });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { title, img, content, username, profilePicture } = this.state;
    return (
      <article>
        <img src={img} alt="Media" />
        <label>{title}</label>
        <label>{content}</label>
        <label>{username}</label>
        <img src={profilePicture} alt="Avatar" />
      </article>
    );
  }
}

export default Post;
