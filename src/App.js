import React from "react";
import "./App.css";

import Nav from "./Components/Nav/Nav";

import routes from "./routes";

function App() {
  return (
    <section className="app">
      <Nav />
      <main>{routes}</main>
    </section>
  );
}

export default App;
