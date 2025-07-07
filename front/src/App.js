import React, { Fragment, useEffect, useState } from "react";

import "./index.scss";

import { API_CONFIG, buildApiUrl } from "./config/api.js";

import SelectedSurveyContext from "./contexts/SelectedSuveryContext";
import GlobalContext from "./contexts/GlobalContext.js";

import { HashRouter as Router, Route, Link } from "react-router-dom";

import ComponentsSurveys from "./components/surveys/Surveys.js";
import ComponentsSurveySelect from "./components/surveySelect/SurveySelect.js";
import Stations from "./components/stations/Stations.js";
import Species from "./components/species/Species";
import Ships from "./components/ships/Ships";
import Strata from "./components/strata/Strata";
import Measurements from "./components/measurements/Measurements";
import Reports from "./components/reports/Reports.js";

export default function App() {
  const [selectedSurvey, setSelectedSurvey] = useState(() => {
    const survey_description =
      window.localStorage.getItem("survey_description");

    return survey_description !== null ? survey_description : "";
  });

  const [selectedSurveyId, setSelectedSurveyId] = useState(() => {
    const survey_id = window.localStorage.getItem("survey_id");

    return survey_id !== null ? survey_id : "";
  });

  const apiSpecies = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SPECIES);
  const apiMeasurementTypes = buildApiUrl(
    API_CONFIG.ENDPOINTS.GET_MEASUREMENT_TYPES
  );
  const apiSurveys = buildApiUrl(API_CONFIG.ENDPOINTS.GET_SURVEYS);

  const [species, setSpecies] = useState([]);
  const [measurementTypes, setMeasurementTypes] = useState([]);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch(apiSpecies)
      .then(response => response.json())
      .then(data => setSpecies(data));

    fetch(apiMeasurementTypes)
      .then(response => response.json())
      .then(data => setMeasurementTypes(data));

    fetch(apiSurveys)
      .then(response => {
        if (response.status > 400) {
          alert("something were wrong getting the surveys!!");
        }
        return response.json();
      })
      .then(surveys => {
        setSurveys(surveys);
      })
      .catch(error => console.log(error));
  }, []);

  const sexesAvailable = {
    1: "Male",
    2: "Female",
    3: "Undetermined",
  };

  const getMeasurementName = measurementTypeId => {
    if (measurementTypeId !== undefined) {
      const measurementName = measurementTypes.find(
        m => m.id === measurementTypeId
      );
      return measurementName ? measurementName.name : "no unit";
    }
  };

  const getMeasurementFactor = measurementTypeId => {
    if (measurementTypeId !== undefined) {
      const measurementFactor = measurementTypes.find(
        m => m.id === measurementTypeId
      );
      return measurementFactor.conversion_factor;
    }
  };

  const getMeasurement = measurementTypeId => {
    if (measurementTypeId !== undefined) {
      const measurement = measurementTypes.find(
        m => m.id === measurementTypeId
      );
      return measurement;
    }
  };

  return (
    <SelectedSurveyContext.Provider
      value={{
        selectedSurvey,
        setSelectedSurvey,
        selectedSurveyId,
        setSelectedSurveyId,
      }}
    >
      <GlobalContext.Provider
        value={{
          species,
          setSpecies,
          apiSpecies,
          sexesAvailable,
          measurementTypes,
          apiMeasurementTypes,
          getMeasurementName,
          getMeasurementFactor,
          getMeasurement,
          surveys,
        }}
      >
        <Router>
          <nav className="headNav" aria-label="nCamp">
            <h1 className="headNav__selectedSurvey">
              {selectedSurvey !== "" ? selectedSurvey : "not survey selected"}
            </h1>
            <ul className="headNav__wrapper" role="menubar" aria-label="nCamp">
              <li className="headNav__item" role="none">
                <Link to="/SurveySelect" role="menuitem">
                  Select Survey
                </Link>
              </li>
              <li className="headNav__item" role="none">
                <Link to="/Stations" role="menuitem">
                  Stations
                </Link>
              </li>

              <li className="headNav__item" role="none">
                <Link to="/Surveys" role="menuitem">
                  Surveys
                </Link>
              </li>
              <li className="headNav__item" role="none">
                <Link to="/Reports" role="menuitem">
                  Reports
                </Link>
              </li>
              <li className="headNav__item headNav__dropdown" role="none">
                <span role="menuitem" aria-haspopup="true">
                  Reference Tables
                </span>
                <ul className="headNav__submenu" role="menu">
                  <li className="headNav__item" role="none">
                    <Link to="/Species" role="menuitem">
                      Species
                    </Link>
                  </li>
                  <li className="headNav__item" role="none">
                    <Link to="/Measurements" role="menuitem">
                      Measurements
                    </Link>
                  </li>
                  <li className="headNav__item" role="none">
                    <Link to="/Strata" role="menuitem">
                      Strata
                    </Link>
                  </li>
                  <li className="headNav__item" role="none">
                    <Link to="/Ships" role="menuitem">
                      Ships
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="headNav__item" role="none">
                <Link to="/" role="menuitem">
                  Home
                </Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Home} />

          <Route
            path="/SurveySelect"
            exact
            render={props => (
              <ComponentsSurveySelect
                {...props}
                selectedSurvey={selectedSurvey}
                setSelectedSurvey={setSelectedSurvey}
              />
            )}
          />

          <Route path="/Surveys" exact component={ComponentsSurveys} />
          <Route path="/Stations" exact component={Stations} />
          <Route path="/Species" component={Species} />
          <Route path="/Strata" component={Strata} />
          <Route path="/Ships" component={Ships} />
          <Route path="/Measurements" component={Measurements} />
          <Route path="/Reports" component={Reports} />
        </Router>
      </GlobalContext.Provider>
    </SelectedSurveyContext.Provider>
  );
}

// Home Page
const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <FakeText />
  </Fragment>
);

const FakeText = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);
