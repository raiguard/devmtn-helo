import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";

import "./Nav.css";
import axios from "axios";

class Nav extends Component {
  async componentDidMount() {
    const res = await axios.get("/auth/me");
    const { username, profile_pic: profilePicture } = res.data;
    // this is supposed to redirect the user if they're not signed in, but it doesn't really work all that well...
    if (!username) {
      return this.props.history.push("/");
    }
    this.props.setUser(username, profilePicture);
  }

  signOut = async () => {
    axios.post("/auth/signout");
    this.props.history.push("/");
  };

  render() {
    const { location, profilePicture, username } = this.props;
    if (location.pathname === "/") {
      return <></>;
    }
    return (
      <aside className="nav">
        <section>
          <img src={profilePicture} alt="Avatar" />
          <span>{username}</span>
        </section>
        <nav>
          <Link to="/dashboard">Home</Link>
          <Link to="/new">New post</Link>
          <button onClick={this.signOut}>Sign out</button>
        </nav>
      </aside>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

// withRouter() gives the component router, params, location, and routes props
export default connect(mapStateToProps, { setUser })(withRouter(Nav));
