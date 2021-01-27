import React, { Component, Fragment } from "react";

import ComponentsStationOptions from "./options/Options.js";
import ComponentsUiNewStationButton from "../ui/NewStationButton.js";
import ComponentsHaulsOptions from "../hauls/options/Options.js";

import Haul from "../haul/Haul";
import Hauls from "../hauls/hauls";

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
			loaded: false,
			placeholder: "Loading",
		};

		// The next api retrieve all the stations. If a 'hauls/survey_id' is added at the end, retrieve only the
		// stations of this survey
		this.apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";

		this.apiDeleteHaul = "http://127.0.0.1:8000/api/1.0/haul/";

		this.deleteHaul = this.deleteHaul.bind(this);

		this.onDelete = this.onDelete.bind(this);
	}

	getStationsApi() {
		/**
		 * Build url api of all the stations of a survey, using apiHauls and context
		 */
		return this.context.surveySelector === null
			? this.apiStationsPartial
			: this.apiStationsPartial + "hauls/" + this.context.surveySelector;
	}

	onDelete(station_id) {
		// state, before delete anything
		const currentStations = this.state.stations;

		// Remove deleted item from state.
		this.setState({
			stations: currentStations.filter((station) => station.id !== station_id),
		});
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
								{<ComponentsStationOptions station_id={station.id} onDelete={this.onDelete} />}
								{/* <ul> */}
								<Hauls hauls={station.hauls} deleteHaul={this.deleteHaul} />
								{/* {station.hauls.map((haul) => {
										return (
											<li key={haul.id}>
												<Haul haul={haul} />
													<p>Haul: {haul.haul}
											 	- Is valid?: {haul.valid}
											 	- Sampler: {haul.sampler.sampler}
											 	- <ComponentsHaulsOptions haul_id={haul.id} />
											 	</p>
											</li>
										);
									})} */}
								{/* </ul> */}
							</li>
						);
					})}
				</ul>
			</Fragment>
		);
	}
}

export default ComponentsStations;
