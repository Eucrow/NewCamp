import React, { Fragment, useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SurveyContext from "./contexts/SurveyContext.js";

import ComponentsSurveys from "./components/surveys/Surveys.js";
import ComponentsSurvey from "./components/surveyDetails/Survey.js";
import ComponentsSurveyNew from "./components/surveyNew/SurveyNew.js";
import ComponentsSurveySelect from "./components/surveySelect/SurveySelect.js";

import ComponentsStations from "./components/stations/Stations.js";
import ComponentsStationNew from "./components/stationNew/StationNew.js";
// import ComponentsStation from "./components/stationDetail/station.js";

// import ComponentsHauls from "./components/hauls/Hauls.js";

// import ComponentsTrawlCatches from "./components/trawlCatches/TrawlHaulCatches.js";

import Species from "./components/species/Species";

export default function App() {
	const [surveySelector, setSurvey] = useState(null);
	const value = { surveySelector, setSurvey };

	const [surveyName, setSurveyName] = useState();

	function getSurveyName(survey_id) {
		fetch("http://127.0.0.1:8000/api/1.0/surveys/" + survey_id)
			.then((response) => {
				return response.json();
			})
			.then((survey) => {
				return survey.description;
			})
			.then((surveyName) => {
				setSurveyName(surveyName);
			});
	}

	return (
		<SurveyContext.Provider value={value}>
			<Router>
				{/* { console.log (surveyName)} */}
				<main>
					<nav>
						{/* survey name */}
						{/* if surveySelector is not null, get the name of the survey */}
						{surveySelector === null ? "" : getSurveyName(surveySelector)}
						{surveyName === undefined ? (
							<div style={{ display: "inline", fontWeight: "bold" }}>not survey selected</div>
						) : (
							<div style={{ display: "inline", fontWeight: "bold", fontSize: "1.5em" }}>{surveyName}</div>
						)}{" "}
						<Link to="/">Home</Link>-<Link to="/SurveySelect">Select Survey</Link>-
						<Link to="/Surveys">Surveys</Link>-<Link to="/Strata">Strata</Link>-
						<Link to="/Stations">Stations</Link>-<Link to="/Species">Species</Link>
					</nav>
				</main>

				<Route path="/" exact component={Home} />

				<Route path="/SurveySelect" exact component={ComponentsSurveySelect} />

				<Route path="/Survey/new" exact component={ComponentsSurveyNew} />
				<Route path="/Survey/survey/:survey_id" exact component={ComponentsSurvey} />

				<Route path="/Surveys" exact component={ComponentsSurveys} />

				<Route path="/Stations" exact component={ComponentsStations} />
				<Route path="/Stations/new" exact component={ComponentsStationNew} />
				{/* <Route path="/Stations/station/:station_id" exact component={ComponentsStation} /> */}

				{/* TODO: CONSIDER IF THE NEXT PATH IS USEFULL */}
				{/* <Route path="/Hauls/:survey_id([0-9]+)" exact component={ComponentsHauls} />
				<Route path="/Hauls" exact component={ComponentsHauls} /> */}

				{/* <Route path="/Catches/haul/:haul_id" exact component={ComponentsTrawlCatches} /> */}

				{/* <Route path="/Weights" component={Weights} /> */}
				{/* <Route path="/Samples" component={Samples} /> */}
				<Route path="/Species" component={Species} />
			</Router>
		</SurveyContext.Provider>
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
// const Weights = () => (
// 	<Fragment>
// 		<h1>Weights</h1>
// 		<FakeText />
// 	</Fragment>
// );
// // Samples Page
// const Samples = () => (
// 	<Fragment>
// 		<h1>Samples</h1>
// 		<FakeText />
// 	</Fragment>
// );
// Species Page
// const Species = () => (
//   <Fragment>
//     <h1>Species</h1>
//     <FakeText />
//   </Fragment>
//   );

const FakeText = () => (
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
		magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
		pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
		laborum.
	</p>
);
