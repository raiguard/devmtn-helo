import React, { Component } from "react";
import axios from "axios";

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
      await axios.post("/auth/signin", { username, password });
      this.props.history.push("/dashboard");
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  onRegisterButtonClick = async () => {
    const { username, password } = this.state;
    try {
      await axios.post("/auth/register", { username, password });
      this.props.history.push("/dashboard");
    } catch (err) {
      alert(err.response.request.response);
    }
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

export default Auth;
