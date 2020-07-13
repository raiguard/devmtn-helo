import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Nav.css";

class Nav extends Component {
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
          <Link to="/">Sign out</Link>
        </nav>
      </aside>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    username: reduxState.username,
    profilePicture: reduxState.profilePicture
  };
};

// withRouter() gives the component router, params, location, and routes props
export default connect(mapStateToProps)(withRouter(Nav));
