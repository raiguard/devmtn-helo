import React, { Component } from "react";
import axios from "axios";

import "./Form.css";

import placeholder from "../../assets/placeholder.png";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: ""
    };
  }

  addPost = async () => {
    const { title, img, content } = this.state;

    const passedImg = img === "" ? `https://robohash.org/${title}` : img;

    try {
      await axios.post(`/api/post`, { title, img: passedImg, content });
      this.props.history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  updateInputState = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  fallbackToPlaceholderImg = (e) => {
    e.target.src = placeholder;
  };

  render() {
    const { title, img, content } = this.state;
    return (
      <section className="form-page">
        <div className="content-box form">
          <div className="form-upper-part">
            <h1>New Post</h1>
          </div>
          <div className="form-input-container">
            <label>Title:</label>
            <input name="title" value={title} onChange={this.updateInputState} />
          </div>
          <div className="fill form-img">
            <img src={img} alt="Form" onError={this.fallbackToPlaceholderImg} />
          </div>
          <div className="form-input-container">
            <label>Image URL:</label>
            <input name="img" value={img} onChange={this.updateInputState} />
          </div>
          <div className="form-input-container">
            <label>Content:</label>
            <input classname="content-input" name="content" value={content} onChange={this.updateInputState} />
          </div>
          <div className="form-button-row">
            <button onClick={this.addPost}>Post</button>
          </div>
        </div>
      </section>
    );
  }
}

export default Form;
