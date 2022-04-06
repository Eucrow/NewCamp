import React, { useContext, useEffect, useState } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import StationsContext from "../../contexts/StationsContext";

import StationsButtonBar from "./StationsButtonBar";

import Station from "./Station";
import NewStationForm from "./NewStationForm";

const ComponentsStations = () => {
	const [add, setAdd] = useState(false);
	const [stations, setStations] = useState([]);

	const selectedSurveyContext = useContext(SelectedSurveyContext);

	const apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";

	const apiTrawlForm = "http://127.0.0.1:8000/api/1.0/haul/trawl/new/";
	const apiHydrographyForm =
		"http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";

	const apiStation = "http://127.0.0.1:8000/api/1.0/station/"; //to get, update or add station
	const apiDeleteHaul = "http://127.0.0.1:8000/api/1.0/haul/";

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
			})
			.catch((error) => console.log(error));
	};

	const editStation = (event, station_id) => {
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

	const deleteStation = (e, ids) => {
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
			})
			.catch((error) => alert(error));
	};

	/**
	 * Handle change fields of Station forms.
	 * @param {*} event
	 * @param {*} station_id
	 */
	const handleChangeStation = (event, station_id) => {
		event.preventDefault();
		const name = event.target.name;
		const value = event.target.value;

		const new_stations = stations.map((station) => {
			if (station.id === station_id) {
				const updated_station = {
					...station,
					[name]: value,
				};
				return updated_station;
			}

			return station;
		});
		setStations(new_stations);
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
			})
			.catch((error) => alert(error));
	};

	// VALIDATIONS
	/**
	 * Detect if exists an station in state.
	 * @param {stId} number Station number.
	 * @returns True if the station exists, false if doesn't.
	 */
	const stationExists = (stId) => {
		if (stations.find((st) => st.station === stId)) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * Validate start date with end date
	 * @param {event} e onChange event
	 * @returns In case of error in date, show report validity.
	 */
	const validateStationNumber = (e) => {
		e.target.setCustomValidity("");

		if (stationExists(parseInt(e.target.value))) {
			e.target.setCustomValidity(
				"This station already exists in this survey."
			);
		}

		return e.target.reportValidity();
	};

	/**
	 * When the component is rendered, get stations
	 */
	useEffect(() => {
		/**
		 * Build url api of all the stations of a survey, using apiHauls and SelectedSurveyContext
		 * @returns url api
		 */
		const getStationsApi = () => {
			return selectedSurveyContext.selectedSurveyId === null
				? apiStationsPartial
				: apiStationsPartial +
						"hauls/" +
						selectedSurveyContext.selectedSurveyId;
		};

		if (selectedSurveyContext.selectedSurveyId !== "") {
			const APIStations = getStationsApi();

			fetch(APIStations)
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong!!");
					}
					return response.json();
				})
				.then((stations) => {
					setStations(stations);
				});
		}
	}, []);

	const renderContent = () => {
		var content = "";

		if (selectedSurveyContext.selectedSurveyId === "") {
			content = <div>There is not survey selected</div>;
			return content;
		}

		content = (
			<StationsContext.Provider
				value={{
					deleteStation: deleteStation,
					deleteHaul: deleteHaul,
					createHaul: createHaul,
					handleChangeStation: handleChangeStation,
					editStation: editStation,
					validateStationNumber: validateStationNumber,
				}}
			>
				<main>
					<header>
						<h1 className="title">Stations</h1>
					</header>
					<div className="wrapper stationsWrapper">
						{add === true ? (
							<NewStationForm
								handleAdd={setAdd}
								createStation={createStation}
							/>
						) : (
							""
						)}

						<StationsButtonBar
							add={add}
							handleAdd={setAdd}
						></StationsButtonBar>

						{stations.map((station) => {
							return (
								<Station
									key={station.id}
									station={station}
									createHaul={createHaul}
								/>
							);
						})}
					</div>
				</main>
			</StationsContext.Provider>
		);

		return content;
	};

	return renderContent();
};

export default ComponentsStations;
