import React, { Fragment } from "react";
import "./index.css";

import {BrowserRouter as Router, Route, Link } from "react-router-dom";

import ComponentsSurveys from "./components/surveys/Surveys.js";
import ComponentsSurvey from "./components/surveyDetails/Survey.js";
import ComponentsSurveyNew from "./components/surveyNew/SurveyNew.js";
import ComponentsStations from "./components/stations/Stations.js";
import ComponentsStationNew from "./components/stationNew/StationNew.js";
import ComponentsStation from "./components/stationDetail/station.js";
import ComponentHaul from "./components/haulDetail/haul.js";
import ComponentsHauls from "./components/hauls/hauls.js";

export default function App() {
  return (
    <Router>
      <main>
        <nav>
            <Link to="/">Home</Link> - 
            <Link to="/Surveys">Surveys</Link> - 
            <Link to="/Strata">Strata</Link> - 
            <Link to="/Stations">Stations</Link> - 
            <Link to="/Hauls">Hauls</Link> - 
            <Link to="/Weights">Weights</Link> - 
            <Link to="/Samples">Samples</Link> - 
            <Link to="/Masters">Species</Link>
         </nav>


      <Route path="/" exact component={Home} />

      <Route path="/Survey/new" exact component={ComponentsSurveyNew} />
      <Route path="/Survey/survey/:survey_id" exact component={ComponentsSurvey} />
      
      <Route path="/Surveys" exact component={ComponentsSurveys} />
      
      <Route path="/Stations" exact component={ComponentsStations} />
      <Route path="/Stations/new" exact component={ComponentsStationNew} />
      <Route path="/Stations/station/:station_id" exact component={ComponentsStation} />

      <Route path="/Hauls/:survey_id" exact component={ComponentsHauls} />
      <Route path="/Hauls" exact component={ComponentsHauls} />
      <Route path="/Hauls/haul/:haul_id" exact component={ComponentHaul} />

      
      <Route path="/Weights" component={Weights} />
      <Route path="/Samples" component={Samples} />
      {/* <Route path="/Species" component={Species} /> */}

      </main>
    </Router>
  );
}

// Home Page
const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <FakeText />
  </Fragment>
  );
// Surveys Page
// const Surveys = () => (
//   <Fragment>
//     <h1>Surveys</h1>
//     <FakeText />
//   </Fragment>
//   );
// Stations Page
// const Stations = () => (
//   <Fragment>
//     <h1>Stations</h1>
//     <FakeText />
//   </Fragment>
//   );
// Hauls Page
// const Hauls = () => (
//   <Fragment>
//     <h1>Hauls</h1>
//     <FakeText />
//   </Fragment>
//   );
// Weights Page
const Weights = () => (
  <Fragment>
    <h1>Weights</h1>
    <FakeText />
  </Fragment>
  );
// Samples Page
const Samples = () => (
  <Fragment>
    <h1>Samples</h1>
    <FakeText />
  </Fragment>
  );
// Species Page
// const Species = () => (
//   <Fragment>
//     <h1>Species</h1>
//     <FakeText />
//   </Fragment>
//   );

const FakeText = () => (
  <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  )
