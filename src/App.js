import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Auth from "./Components/Auth/Auth";
import Dashboard from "./Components/Dashboard/Dashboard";
import Form from "./Components/Form/Form";
import Nav from "./Components/Nav/Nav";
import Post from "./Components/Post/Post";

function App() {
  return (
    <section className="app">
      <Nav />
      <Auth />
      <Dashboard />
      <Form />
      <Post />
    </section>
  );
}

export default App;
