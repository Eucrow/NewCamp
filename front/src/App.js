import React, { Fragment, useEffect, useState } from "react";
import "./index.scss";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ComponentsSurveys from "./components/surveys/Surveys.js";

import ComponentsSurveySelect from "./components/surveySelect/SurveySelect.js";

import ComponentsStations from "./components/stations/Stations.js";

// import ComponentsHauls from "./components/hauls/Hauls.js";

import ComponentsTrawlCatches from "./components/trawlCatches/TrawlHaulCatches.js";

import Species from "./components/species/Species";
import Ships from "./components/ships/Ships";
import Gears from "./components/gears/Trawls";

export default function App() {
	const [surveySelected, setSelectedSurvey] = useState(() => {
		const survey_description = window.localStorage.getItem(
			"survey_description"
		);

		return survey_description !== null ? survey_description : "";
	});

	return (
		<Router>
			<main>
				<nav aria-label="nCamp">
					<ul class="nav" role="menubar" aria-label="nCamp">
						<li class="nav__item" role="none">
							{/* survey name */}
							{/* if surveySelected is not null, get the name of the survey */}
							{surveySelected !== ""
								? surveySelected
								: // : getSurveyName(surveySelected)}
								  "none selected"}

							{/* {surveyName === undefined ? ( */}
							<Link to="/SurveySelect" role="menuitem">
								Select Survey
							</Link>
							{/* ) : (
								<h2>{surveyName}</h2>
							)} */}
						</li>
						<li class="nav__item" role="none">
							<Link to="/Surveys" role="menuitem">
								Surveys
							</Link>
						</li>
						<li class="nav__item" role="none">
							<Link to="/Species" role="menuitem">
								Species
							</Link>
						</li>
						<li class="nav__item" role="none">
							<Link to="/Ships" role="menuitem">
								Ships
							</Link>
						</li>
					</ul>
					{/* <Link to="/">Home</Link>- -*/}
					{/* <Link to="/Strata">Strata</Link>-
						<Link to="/Stations">Stations</Link>- -- --
						<Link to="/Trawls">Trawls</Link> */}
				</nav>
			</main>

			<Route path="/" exact component={Home} />

			<Route
				path="/SurveySelect"
				exact
				// component={ComponentsSurveySelect}
				render={(props) => (
					<ComponentsSurveySelect
						{...props}
						surveySelected={surveySelected}
						setSelectedSurvey={setSelectedSurvey}
					/>
				)}
			/>

			<Route path="/Surveys" exact component={ComponentsSurveys} />

			<Route path="/Stations" exact component={ComponentsStations} />

			{/* TODO: CONSIDER IF THE NEXT PATH IS USEFULL */}
			{/* <Route path="/Hauls/:survey_id([0-9]+)" exact component={ComponentsHauls} />
				<Route path="/Hauls" exact component={ComponentsHauls} /> */}

			<Route
				path="/Catches/haul/:haul_id"
				exact
				component={ComponentsTrawlCatches}
			/>

			{/* <Route path="/Weights" component={Weights} /> */}
			{/* <Route path="/Samples" component={Samples} /> */}
			<Route path="/Species" component={Species} />

			<Route path="/Ships" component={Ships} />

			<Route path="/Trawls" component={Gears} />
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
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
		veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
		commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
		velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
		occaecat cupidatat non proident, sunt in culpa qui officia deserunt
		mollit anim id est laborum.
	</p>
);
