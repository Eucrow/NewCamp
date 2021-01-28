import React, { Component, Fragment } from "react";

import ComponentsStationOptions from "./options/Options.js";
import ComponentsUiNewStationButton from "../ui/NewStationButton.js";

import Hauls from "../hauls/Hauls";

import SurveyContext from "../../contexts/SurveyContext.js";

class ComponentsStations extends Component {
	/**
	 * List of stations
	 * @param {*} props
	 */

	// The contextType property on a class can be assigned a Context object created by React.createContext().
	// This lets you consume the nearest current value of that Context type using this.context. You can reference
	// this in any of the lifecycle methods including the render function.
	static contextType = SurveyContext;

	constructor(props) {
		super(props);
		this.state = {
			stations: [],
		};

		// The next api retrieve all the stations. If a 'hauls/survey_id' is added at the end, retrieve only the
		// stations of this survey
		this.apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";

		this.apiTrawlForm = "http://127.0.0.1:8000/api/1.0/haul/trawl/new/";
		this.apiHydrographyForm = "http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";

		this.apiDeleteStation = "http://127.0.0.1:8000/api/1.0/station/";
		this.apiDeleteHaul = "http://127.0.0.1:8000/api/1.0/haul/";

		this.deleteStation = this.deleteStation.bind(this);
		this.createHaul = this.createHaul.bind(this);
		this.deleteHaul = this.deleteHaul.bind(this);
	}

	getStationsApi() {
		/**
		 * Build url api of all the stations of a survey, using apiHauls and context
		 */
		return this.context.surveySelector === null
			? this.apiStationsPartial
			: this.apiStationsPartial + "hauls/" + this.context.surveySelector;
	}

	createHaul(event, haul) {
		/**
		 * Method to create haul
		 * */
		event.preventDefault();

		const apiForm =
			haul.sampler.id === "1" ? this.apiTrawlForm : haul.sampler.id === "2" ? this.apiHydrographyForm : null;

		console.log(JSON.stringify(haul));

		fetch(apiForm, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(haul),
		})
			.then((response) => response.json())
			.then((h) => {
				const new_stations = this.state.stations.map((station) => {
					if (station.id === parseInt(haul.station.id)) {
						const new_hauls = [...station.hauls, h];
						station.hauls = new_hauls;
						return station;
					} else {
						return station;
					}
				});

				this.setState(() => {
					return {
						stations: new_stations,
					};
				});
			})
			.catch((error) => console.log(error));
	}

	deleteHaul(e, id_station, id_haul) {
		/**
		 * Method to delete haul.
		 */

		const api = this.apiDeleteHaul + id_haul;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				var new_stations = this.state.stations.map((station) => {
					if (station.id === id_station) {
						var new_hauls = station.hauls.filter((haul) => haul.id !== id_haul);
						station.hauls = new_hauls;
						return station;
					} else {
						return station;
					}
				});
				this.setState({
					stations: new_stations,
				});
			})
			.catch((error) => alert(error));
	}

	deleteStation(e, ids) {
		/**
		 * Method to delete haul.
		 */

		e.preventDefault();

		const api = this.apiDeleteStation + ids;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				const new_stations = this.state.stations.filter((station) => station.id !== ids);

				this.setState({
					stations: new_stations,
				});
			})
			.catch((error) => alert(error));
	}

	componentDidMount() {
		const APIStations = this.getStationsApi();

		fetch(APIStations)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((stations) => {
				this.setState(() => {
					return {
						stations,
						loaded: true,
					};
				});
			});
	}

	render() {
		return (
			<Fragment>
				<div>
					<ComponentsUiNewStationButton />
				</div>

				<ul>
					{this.state.stations.map((station) => {
						return (
							<li key={station.id}>
								Station: {station.station} - Comments: {station.comment} -
								{/* {<ComponentsStationOptions station_id={station.id} onDelete={this.deleteStation} />} */}
								<button
									onClick={(e) => {
										if (window.confirm("Delete the station?")) {
											this.deleteStation(e, station.id);
										}
									}}
								>
									Remove
								</button>
								<Hauls
									hauls={station.hauls}
									deleteHaul={this.deleteHaul}
									createHaul={this.createHaul}
								/>
							</li>
						);
					})}
				</ul>
			</Fragment>
		);
	}
}

export default ComponentsStations;
