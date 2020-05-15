import React, { Fragment } from "react";
import "./index.css";

import {BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><Link to="/Surveys">Surveys</Link></li>
            <li><Link to="/Stations">Stations</Link></li>
            <li><Link to="/Hauls">Hauls</Link></li>
            <li><Link to="/Species">Species</Link></li>
          </ul>
          </nav>

      <Route path="/Surveys" component={Surveys} />
      <Route path="/Stations" component={Stations} />
      <Route path="/Hauls" component={Hauls} />
      <Route path="/Species" component={Species} />

      </main>
    </Router>
  );
}
// Home Page
const Surveys = () => (
  <Fragment>
    <h1>Surveys</h1>
    <FakeText />
  </Fragment>
  );
// Stations Page
const Stations = () => (
  <Fragment>
    <h1>Stations</h1>
    <FakeText />
  </Fragment>
  );
// Hauls Page
const Hauls = () => (
  <Fragment>
    <h1>Hauls</h1>
    <FakeText />
  </Fragment>
  );
// Species Page
const Species = () => (
  <Fragment>
    <h1>Species</h1>
    <FakeText />
  </Fragment>
  );

const FakeText = () => (
  <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  )
