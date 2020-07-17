import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";

import "./Nav.css";
import axios from "axios";

import dashboardIcon from "../../assets/dashboard.png";
import newPostIcon from "../../assets/newPost.png";
import signOutIcon from "../../assets/signOut.png";

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

  navigate = (e) => {
    const { name } = e.target;
    this.props.history.push(`/${name}`);
  };

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
      <nav>
        <img className="profile-picture" src={profilePicture} alt="Avatar" />
        <h1>{username}</h1>
        <Link to="/dashboard">
          <img className="nav-img" src={dashboardIcon} alt="Dashboard" />
        </Link>
        <Link to="/new">
          <img className="nav-img" src={newPostIcon} alt="New Post" />
        </Link>
        <img className="nav-img nav-signout-img" src={signOutIcon} onClick={this.signOut} alt="Sign out" />
      </nav>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

// withRouter() gives the component router, params, location, and routes props
export default connect(mapStateToProps, { setUser })(withRouter(Nav));
