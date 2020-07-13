import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";

import "./Auth.css";
import logo from "../../assets/logo.png";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSignInButtonClick = async () => {
    const { username, password } = this.state;
    try {
      const res = await axios.post("/auth/signin", { username, password });
      this.setUserAndRedirect(res.data[0]);
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  onRegisterButtonClick = async () => {
    const { username, password } = this.state;
    try {
      const res = await axios.post("/auth/register", { username, password });
      this.setUserAndRedirect(res.data[0]);
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  setUserAndRedirect = (userInfo) => {
    const { username, profile_pic: profilePicture } = userInfo;
    this.props.setUser(username, profilePicture);
    this.props.history.push("/dashboard");
  };

  render() {
    const { username, password } = this.state;
    return (
      <section className="auth">
        <div className="auth-container">
          <img src={logo} />
          <h1>Helo</h1>
          <div className="auth-input-row">
            <label>Username</label>
            <input name="username" onChange={this.onInputChange} value={username} />
          </div>
          <div className="auth-input-row">
            <label>Password</label>
            <input name="password" onChange={this.onInputChange} value={password} type="password" />
          </div>
          <div className="auth-button-container">
            <button onClick={this.onSignInButtonClick}>Sign in</button>
            <button onClick={this.onRegisterButtonClick}>Register</button>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(null, { setUser })(Auth);
