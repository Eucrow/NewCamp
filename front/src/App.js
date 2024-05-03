import React, { Fragment, useEffect, useState } from "react";

import "./index.scss";

import SelectedSurveyContext from "./contexts/SelectedSuveryContext";
import GlobalContext from "./contexts/GlobalContext.js";

import { HashRouter as Router, Route, Link } from "react-router-dom";

import ComponentsSurveys from "./components/surveys/Surveys.js";

import ComponentsSurveySelect from "./components/surveySelect/SurveySelect.js";

import Stations from "./components/stations/Stations.js";

import Species from "./components/species/Species";
import Ships from "./components/ships/Ships";

export default function App() {
	const [selectedSurvey, setSelectedSurvey] = useState(() => {
		const survey_description = window.localStorage.getItem("survey_description");

		return survey_description !== null ? survey_description : "";
	});

	const [selectedSurveyId, setSelectedSurveyId] = useState(() => {
		const survey_id = window.localStorage.getItem("survey_id");

		return survey_id !== null ? survey_id : "";
	});

	const apiSpecies = "http://127.0.0.1:8000/api/1.0/species/";

	const [species, setSpecies] = useState([]);

	useEffect(() => {
		fetch(apiSpecies)
			.then((response) => response.json())
			.then((data) => setSpecies(data));
	}, []);

	const sexesAvailable = {
		1: "Male",
		2: "Female",
		3: "Undetermined",
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
			<GlobalContext.Provider value={{ species, setSpecies, apiSpecies, sexesAvailable }}>
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
								<Link to="/Species" role="menuitem">
									Species
								</Link>
							</li>
							<li className="headNav__item" role="none">
								<Link to="/Ships" role="menuitem">
									Ships
								</Link>
							</li>
							<li className="headNav__item" role="none">
								<Link to="/Surveys" role="menuitem">
									Surveys
								</Link>
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
						render={(props) => (
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
					<Route path="/Ships" component={Ships} />
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
// Surveys Page
// const Surveys = () => (
//   <Fragment>
//     <h1>Surveys</h1>
//     <FakeText />
//   </Fragment>
//   );
// Stations Page
// const Stations = () => (
// 	<Fragment>
// 		<h1>Stations</h1>
// 		<FakeText />
// 	</Fragment>
// );
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
