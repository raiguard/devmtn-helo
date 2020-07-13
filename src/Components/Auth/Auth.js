import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";

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
      const res = await axios.post("/auth/signin", { username, password });
      this.setUserAndRedirect(res.data[0]);
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  setUserAndRedirect = (userInfo) => {
    const { user_id: id, username, profile_pic: profilePicture } = userInfo;
    this.props.setUser(id, username, profilePicture);
    this.props.history.push("/dashboard");
  };

  render() {
    const { username, password } = this.state;
    return (
      <section>
        <input name="username" placeholder="username" onChange={this.onInputChange} value={username} />
        <input name="password" placeholder="password" onChange={this.onInputChange} value={password} type="password" />
        <button onClick={this.onSignInButtonClick}>Sign in</button>
        <button onClick={this.onRegisterButtonClick}>Register</button>
      </section>
    );
  }
}

export default connect(null, { setUser })(Auth);
