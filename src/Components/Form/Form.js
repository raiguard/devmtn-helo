import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: ""
    };
  }

  componentDidMount() {
    if (!this.props.id) {
      this.props.history.push("/");
    }
  }

  addPost = async () => {
    const { title, img, content } = this.state;

    const passedImg = img === "" ? `https://robohash.org/${title}` : img;

    try {
      await axios.post(`/api/post/${this.props.id}`, { title, img: passedImg, content });
      this.props.history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  updateInputState = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, img, content } = this.state;
    return (
      <section>
        <input name="title" placeholder="Title" value={title} onChange={this.updateInputState} />
        <input name="img" placeholder="Image URL" value={img} onChange={this.updateInputState} />
        <input name="content" placeholder="Content" value={content} onChange={this.updateInputState} />
        <button onClick={this.addPost}>Post</button>
      </section>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return { id: reduxState.id };
};

export default connect(mapStateToProps)(Form);
