import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Nav extends Component {
  render() {
    if (this.props.location.pathname === "/") {
      return <></>;
    }
    return (
      <nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/new">New post</Link>
        <Link to="/">Sign out</Link>
      </nav>
    );
  }
}

// withRouter() gives the component router, params, location, and routes props
export default withRouter(Nav);
