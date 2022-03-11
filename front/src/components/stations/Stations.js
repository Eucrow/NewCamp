import React, { Component, Fragment } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";

import Station from "./Station";
import NewStationForm from "./NewStationForm";

class ComponentsStations extends Component {
	/**
	 * List of stations
	 * @param {*} props
	 */

	// The contextType property on a class can be assigned a Context object created by React.createContext().
	// This lets you consume the nearest current value of that Context type using this.context. You can reference
	// this in any of the lifecycle methods including the render function.
	static contextType = SelectedSurveyContext;

	constructor(props) {
		super(props);
		this.state = {
			stations: [],
			add: false,
		};

		// The next api retrieve all the stations. If a 'hauls/survey_id' is added at the end, retrieve only the
		// stations of this survey
		this.apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";

		this.apiTrawlForm = "http://127.0.0.1:8000/api/1.0/haul/trawl/new/";
		this.apiHydrographyForm =
			"http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";

		this.apiStation = "http://127.0.0.1:8000/api/1.0/station/"; //to get, update or add station
		this.apiDeleteHaul = "http://127.0.0.1:8000/api/1.0/haul/";

		this.handleAdd = this.handleAdd.bind(this);
		this.UiAddButton = this.UiAddButton.bind(this);

		this.handleSubmitEditStation = this.handleSubmitEditStation.bind(this);
		this.createStation = this.createStation.bind(this);

		this.deleteStation = this.deleteStation.bind(this);
		this.createHaul = this.createHaul.bind(this);
		this.deleteHaul = this.deleteHaul.bind(this);

		this.renderContent = this.renderContent.bind(this);

		this.handleChangeStationFields =
			this.handleChangeStationFields.bind(this);
	}

	getStationsApi() {
		/**
		 * Build url api of all the stations of a survey, using apiHauls and context
		 */
		return this.context.selectedSurveyId === null
			? this.apiStationsPartial
			: this.apiStationsPartial +
					"hauls/" +
					this.context.selectedSurveyId;
	}

	handleAdd(status) {
		this.setState(() => {
			return {
				add: status,
			};
		});
	}

	UiAddButton(status) {
		return (
			<button
				onClick={(e) => {
					this.handleAdd(status);
				}}
			>
				New Station
			</button>
		);
	}

	handleSubmitEditStation(event, station_id) {
		event.preventDefault();

		const api = this.apiStation + station_id;

		const updated_station = this.state.stations.filter(
			(station) => station.id === station_id
		);

		fetch(api, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updated_station[0]), //look the [0]!!!
		}).catch((error) => console.log(error));
	}

	createStation(event, station) {
		event.preventDefault();

		fetch(this.apiStation, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(station),
		})
			.then((response) => response.json())
			.then((s) => {
				const new_stations = [...this.state.stations, s];
				this.setState(() => {
					return {
						stations: new_stations,
					};
				});
			})
			.catch((error) => console.log(error));
	}

	handleChangeStationFields(event, ids) {
		event.preventDefault();
		const name = event.target.name;
		const value = event.target.value;

		const new_stations = this.state.stations.map((station) => {
			if (station.id === ids) {
				const updated_station = {
					...station,
					[name]: value,
				};
				return updated_station;
			}

			return station;
		});

		this.setState({
			stations: new_stations,
		});
	}

	createHaul(event, haul) {
		/**
		 * Method to create haul
		 * */
		event.preventDefault();

		const apiForm =
			haul.sampler.id === "1"
				? this.apiTrawlForm
				: haul.sampler.id === "2"
				? this.apiHydrographyForm
				: null;

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
						var new_hauls = station.hauls.filter(
							(haul) => haul.id !== id_haul
						);
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

		const api = this.apiStation + ids;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				const new_stations = this.state.stations.filter(
					(station) => station.id !== ids
				);

				this.setState({
					stations: new_stations,
				});
			})
			.catch((error) => alert(error));
	}

	componentDidMount() {
		if (this.context.selectedSurveyId !== "") {
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
	}

	renderContent() {
		var content = "";

		if (this.context.selectedSurveyId === "") {
			content = <div>There is not survey selected</div>;
		} else if (this.state.add === false) {
			content = (
				<main>
					<header>
						<h1 className="title">Stations</h1>
					</header>
					<div className="wrapper stationsWrapper">
						<div>{this.UiAddButton(true)}</div>

						{this.state.stations.map((station) => {
							return (
								<Station
									key={station.id}
									station={station}
									deleteStation={this.deleteStation}
									deleteHaul={this.deleteHaul}
									createHaul={this.createHaul}
									handleChangeStationFields={
										this.handleChangeStationFields
									}
									handleSubmitEditStation={
										this.handleSubmitEditStation
									}
								/>
							);
						})}
					</div>
				</main>
			);
		} else if (this.state.add === true) {
			content = (
				<main>
					<header>
						<h1 className="title">Stations</h1>
					</header>
					<div className="wrapper stationsWrapper">
						<NewStationForm
							handleAdd={this.handleAdd}
							createStation={this.createStation}
						/>
						<ul>
							{this.state.stations.map((station) => {
								return (
									<Station
										key={station.id}
										station={station}
										deleteStation={this.deleteStation}
										deleteHaul={this.deleteHaul}
										createHaul={this.createHaul}
										handleChangeStationFields={
											this.handleChangeStationFields
										}
										handleSubmitEditStation={
											this.handleSubmitEditStation
										}
									/>
								);
							})}
						</ul>
					</div>
				</main>
			);
		}

		return <Fragment>{content}</Fragment>;
	}

	render() {
		return this.renderContent();
	}
}

export default ComponentsStations;
