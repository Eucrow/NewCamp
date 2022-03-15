import React, {
	Component,
	Fragment,
	useContext,
	useEffect,
	useState,
} from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import StationsContext from "../../contexts/StationsContext";

import Station from "./Station";
import NewStationForm from "./NewStationForm";

// class ComponentsStations extends Component {
const ComponentsStations = () => {
	const [add, setAdd] = useState(false);
	const [stations, setStations] = useState();

	const selectedSurveyContext = useContext(SelectedSurveyContext);

	const apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";

	const apiTrawlForm = "http://127.0.0.1:8000/api/1.0/haul/trawl/new/";
	const apiHydrographyForm =
		"http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";

	const apiStation = "http://127.0.0.1:8000/api/1.0/station/"; //to get, update or add station
	const apiDeleteHaul = "http://127.0.0.1:8000/api/1.0/haul/";

	const getStationsApi = () => {
		/**
		 * Build url api of all the stations of a survey, using apiHauls and context
		 */
		return selectedSurveyContext.selectedSurveyId === null
			? apiStationsPartial
			: apiStationsPartial +
					"hauls/" +
					selectedSurveyContext.selectedSurveyId;
	};

	const handleAdd = (status) => {
		setAdd(status);
		// this.setState(() => {
		// 	return {
		// 		add: status,
		// 	};
		// });
	};

	const UiAddButton = (status) => {
		return (
			<button
				onClick={(e) => {
					handleAdd(status);
				}}
			>
				New Station
			</button>
		);
	};

	const handleSubmitEditStation = (event, station_id) => {
		event.preventDefault();

		const api = apiStation + station_id;

		const updated_station = stations.filter(
			(station) => station.id === station_id
		);

		fetch(api, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updated_station[0]), //look the [0]!!!
		}).catch((error) => console.log(error));
	};

	const createStation = (event, station) => {
		event.preventDefault();

		fetch(apiStation, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(station),
		})
			.then((response) => response.json())
			.then((s) => {
				const new_stations = [...stations, s];
				setStations(new_stations);
				// this.setState(() => {
				// 	return {
				// 		stations: new_stations,
				// 	};
				// });
			})
			.catch((error) => console.log(error));
	};

	const handleChangeStationFields = (event, ids) => {
		event.preventDefault();
		const name = event.target.name;
		const value = event.target.value;

		const new_stations = stations.map((station) => {
			if (station.id === ids) {
				const updated_station = {
					...station,
					[name]: value,
				};
				return updated_station;
			}

			return station;
		});
		setStations(new_stations);

		// this.setState({
		// 	stations: new_stations,
		// });
	};

	const createHaul = (event, haul) => {
		/**
		 * Method to create haul
		 * */
		event.preventDefault();

		const apiForm =
			haul.sampler.id === "1"
				? apiTrawlForm
				: haul.sampler.id === "2"
				? apiHydrographyForm
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
				const new_stations = stations.map((station) => {
					if (station.id === parseInt(haul.station.id)) {
						const new_hauls = [...station.hauls, h];
						station.hauls = new_hauls;
						return station;
					} else {
						return station;
					}
				});

				setStations(new_stations);

				// this.setState(() => {
				// 	return {
				// 		stations: new_stations,
				// 	};
				// });
			})
			.catch((error) => console.log(error));
	};

	const deleteHaul = (e, id_station, id_haul) => {
		/**
		 * Method to delete haul.
		 */

		const api = apiDeleteHaul + id_haul;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				var new_stations = stations.map((station) => {
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
				setStations(new_stations);
				// this.setState({
				// 	stations: new_stations,
				// });
			})
			.catch((error) => alert(error));
	};

	const deleteStation = (e, ids) => {
		/**
		 * Method to delete haul.
		 */

		e.preventDefault();

		const api = apiStation + ids;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				const new_stations = stations.filter(
					(station) => station.id !== ids
				);
				setStations(new_stations);
				// this.setState({
				// 	stations: new_stations,
				// });
			})
			.catch((error) => alert(error));
	};

	useEffect(() => {
		if (selectedSurveyContext.selectedSurveyId !== "") {
			const APIStations = getStationsApi();

			fetch(APIStations)
				.then((response) => {
					if (response.status > 400) {
						// return this.setState(() => {
						// 	return { placeholder: "Something went wrong!" };
						// });
						alert("something were wrong!!");
					}
					return response.json();
				})
				.then((stations) => {
					// this.setState(() => {
					// 	return {
					// 		stations,
					// 		loaded: true,
					// 	};
					// });
					setStations(stations);
					console.log(stations);
				});
		}
	}, []);

	const renderContent = () => {
		var content = "";

		if (selectedSurveyContext.selectedSurveyId === "") {
			content = <div>There is not survey selected</div>;
		} else if ((add === false) & (typeof stations !== "undefined")) {
			content = (
				<main>
					<header>
						<h1 className="title">Stations</h1>
					</header>
					<div className="wrapper stationsWrapper">
						<div>{UiAddButton(true)}</div>

						{stations.map((station) => {
							return (
								<Station
									key={station.id}
									station={station}
									deleteStation={deleteStation}
									deleteHaul={deleteHaul}
									createHaul={createHaul}
									handleChangeStationFields={
										handleChangeStationFields
									}
									handleSubmitEditStation={
										handleSubmitEditStation
									}
								/>
							);
						})}
					</div>
				</main>
			);
		} else if (add === true) {
			content = (
				<main>
					<header>
						<h1 className="title">Stations</h1>
					</header>
					<div className="wrapper stationsWrapper">
						<NewStationForm
							handleAdd={handleAdd}
							createStation={createStation}
						/>
						<ul>
							{stations.map((station) => {
								return (
									<Station
										key={station.id}
										station={station}
										deleteStation={deleteStation}
										deleteHaul={deleteHaul}
										createHaul={createHaul}
										handleChangeStationFields={
											handleChangeStationFields
										}
										handleSubmitEditStation={
											handleSubmitEditStation
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
	};

	return renderContent();

	// render() {
	// 	const { signedInUser, theme } = this.props;
	// 	return this.renderContent();
	// }
};

export default ComponentsStations;
