import React, { useContext, useEffect, useState } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import StationsContext from "../../contexts/StationsContext";
import StationsButtonBar from "./StationsButtonBar";
import Station from "./Station";
import NewStationForm from "./NewStationForm";

const Stations = () => {
	const [add, setAdd] = useState(false);
	const [stations, setStations] = useState([]);
	const [strata, setStrata] = useState([]);
	const [trawls, setTrawls] = useState([]);
	const [ctds, setCtds] = useState([]);
	const [samplers, setSamplers] = useState([]);
	const [stationsBackup, setStationsBackup] = useState([stations]);
	const selectedSurveyContext = useContext(SelectedSurveyContext);

	/**
	 * Create station.
	 * @param {event} e
	 * @param {object} station - The station to be created.
	 */	const createStation = (e, station) => {
		e.preventDefault();

		fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STATION), {
			method: "POST",
			headers: API_CONFIG.HEADERS.DEFAULT,
			body: JSON.stringify(station),
		})
			.then((response) => response.json())
			.then((s) => {
				const newStations = [s, ...stations];
				// newStations.sort((a, b) => a.station - b.station);
				setStations(newStations);
			})
			.catch((error) => console.log(error));
	};

	/**
	 * Edit station.
	 * @param {event} e
	 * @param {number} stationId - The ID of the station to be edited.
	 */	const updateStation = (e, stationId) => {
		e.preventDefault();

		const api = buildApiUrl(API_CONFIG.ENDPOINTS.STATION_BY_ID(stationId));

		const updated_station = stations.filter((station) => station.id === stationId);

		fetch(api, {
			method: "PUT",
			headers: API_CONFIG.HEADERS.DEFAULT,
			body: JSON.stringify(updated_station[0]), //look the [0]!!!
		}).catch((error) => console.log(error));
	};

	/**
	 * Restores the stations to their original state.
	 * @param {number} stationId - The ID of the station to be restored.
	 */
	const restoreStations = (stationId) => {
		const newStations = stationsBackup.map((station) => {
			if (station.id === stationId) {
				return station;
			} else {
				return station;
			}
		});
		setStations(newStations);
	};

	/**
	 * Delete station.
	 * @param {event} e
	 * @param {number} stationId - The ID of the station to be deleted.
	 */	const deleteStation = (stationId) => {
		const api = buildApiUrl(API_CONFIG.ENDPOINTS.STATION_BY_ID(stationId));

		fetch(api, {
			method: "DELETE",
			headers: {
				...API_CONFIG.HEADERS.DEFAULT,
				Accept: "application/json",
			},
		})
			.then(() => {
				const newStations = stations.filter((station) => station.id !== stationId);
				setStations(newStations);
			})
			.catch((error) => alert(error));
	};

	/**
	 * Handle change fields of Station forms.
	 * @param {event} e
	 * @param {number} stationId - The ID of the station to be changed.
	 */
	const handleChangeStation = (e, stationId) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;

		const newStations = stations.map((station) => {
			if (station.id === stationId) {
				const updated_station = {
					...station,
					[name]: value,
				};
				return updated_station;
			}

			return station;
		});
		setStations(newStations);
	};

	/**
	 * Creates the common properties of a haul and sends to the server.
	 * @param {event} e
	 * @param {object} updatedHaul - The updated haul object.
	 */	const createHaul = (e, haul) => {
		e.preventDefault();
		console.log(haul);

		const apiForm =
			haul.sampler_id === "1"
				? buildApiUrl(API_CONFIG.ENDPOINTS.CREATE_TRAWL)
				: haul.sampler_id === "2"
				? buildApiUrl(API_CONFIG.ENDPOINTS.CREATE_HYDROGRAPHY)
				: null;

		fetch(apiForm, {
			method: "POST",
			headers: API_CONFIG.HEADERS.DEFAULT,
			body: JSON.stringify(haul),
		})
			.then((response) => response.json())
			.then((h) => {
				const newStations = stations.map((station) => {
					if (station.id === parseInt(haul.station_id)) {
						station.hauls
							? (station.hauls = [...station.hauls, h])
							: (station.hauls = [h]);
						return station;
					} else {
						return station;
					}
				});

				setStations(newStations);
			})
			.catch((error) => console.log(error));
	};

	/**
	 * Updates the common properties of a haul and sends the updated haul to the server.
	 * @param {object} updatedHaul - The updated haul object.
	 */
	const updateHaulCommon = (updatedHaul) => {
		const newStations = stations.map((station) => {
			if (station.station === updatedHaul.station) {
				const new_hauls = station.hauls.map((haul) => {
					if (haul.id === updatedHaul.id) {
						return updatedHaul;
					} else {
						return haul;
					}
				});
				station.hauls = new_hauls;
				return station;
			} else {
				return station;
			}
		});		setStations(newStations);

		const apiForm = buildApiUrl(API_CONFIG.ENDPOINTS.HAUL_BY_ID(updatedHaul.id));

		const station = stations.find((s) => s.station === updatedHaul.station);
		const haul = station.hauls.find((h) => h.id === updatedHaul.id);

		fetch(apiForm, {
			method: "PUT",
			headers: API_CONFIG.HEADERS.DEFAULT,
			body: JSON.stringify(haul),
		}).catch((error) => console.log(error));
	};

	/**
	 * Restores the haul of a station to its original state.
	 * @param {number} haulId - The ID of the haul to be restored.
	 */
	const restoreHaulCommon = (haulId) => {
		const backupHaul = stationsBackup.find((station) =>
			station.hauls.some((h) => h.id === haulId)
		);

		const newStations = stations.map((station) => {
			if (station.station === backupHaul.station) {
				const newHauls = station.hauls.map((haul) => {
					if (haul.id === backupHaul.id) {
						return backupHaul;
					} else {
						return haul;
					}
				});
				station.hauls = newHauls;
				return station;
			} else {
				return station;
			}
		});

		setStations(newStations);
	};

	/**
	 * Delete haul.
	 * @param {number} id_haul
	 */	const deleteHaul = (id_haul) => {
		const api = buildApiUrl(API_CONFIG.ENDPOINTS.HAUL_BY_ID(id_haul));

		fetch(api, {
			method: "DELETE",
			headers: {
				...API_CONFIG.HEADERS.DEFAULT,
				Accept: "application/json",
			},
		})
			.then(() => {
				var newStations = stations.map((station) => {
					if (station.hauls.some((h) => h.id === id_haul)) {
						var new_hauls = station.hauls.filter((haul) => haul.id !== id_haul);
						station.hauls = new_hauls;
					}
					return station;
				});
				setStations(newStations);
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
			e.target.setCustomValidity("This station already exists in this survey.");
		}

		return e.target.reportValidity();
	};

	useEffect(() => {
		/**
		 * Build url api of all the stations of a survey, using apiHauls and SelectedSurveyContext
		 * @returns url api
		 */		const getStationsApi = () => {
			return selectedSurveyContext.selectedSurveyId === null
				? buildApiUrl(API_CONFIG.ENDPOINTS.GET_STATIONS)
				: buildApiUrl(API_CONFIG.ENDPOINTS.GET_STATIONS_WITH_HAULS(selectedSurveyContext.selectedSurveyId));
		};
		if (selectedSurveyContext.selectedSurveyId !== "") {
			// Fetch strata (require previously fetch survey to get stratification).
			const apiSurvey = buildApiUrl(API_CONFIG.ENDPOINTS.SURVEY_BY_ID(selectedSurveyContext.selectedSurveyId));

			fetch(apiSurvey)
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong!!");
					}
					return response.json();
				})				.then((survey) => {
					const apiStrata = buildApiUrl(API_CONFIG.ENDPOINTS.STRATA_BY_ID(survey.stratification_id));
					fetch(apiStrata)
						.then((response) => {
							if (response.status > 400) {
								alert("something were wrong fetching the strata!!");
							}
							return response.json();
						})
						.then((strata) => {
							setStrata(strata);
						});
				});

			// Fetch stations
			const APIStations = getStationsApi();

			fetch(APIStations)
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong fetching the stations!!");
					}
					return response.json();
				})
				.then((stations) => {
					setStations(stations);
					setStationsBackup(stations);
				});			// Fetch trawls
			fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GET_TRAWLS))
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong fetching the trawls !!");
					}
					return response.json();
				})
				.then((trawls) => {
					setTrawls(trawls);
				});			// Fetch CTDs
			fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GET_CTDS))
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong fetching the trawls !!");
					}
					return response.json();
				})
				.then((ctds) => {
					setCtds(ctds);
				});			// Fetch samplers
			fetch(buildApiUrl(API_CONFIG.ENDPOINTS.GET_SAMPLERS))
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong fetching the samplers!!");
					}
					return response.json();
				})
				.then((samplers) => {
					setSamplers(samplers);
				});
		}
	}, [selectedSurveyContext.selectedSurveyId]);

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
					updateHaulCommon: updateHaulCommon,
					handleChangeStation: handleChangeStation,
					updateStation: updateStation,
					validateStationNumber: validateStationNumber,
					strata: strata,
					trawls: trawls,
					ctds: ctds,
					samplers: samplers,
					restoreStations: restoreStations,
					restoreHaulCommon: restoreHaulCommon,
					setAdd: setAdd,
				}}
			>
				<main>
					<header>
						<h1 className="title">Stations</h1>
					</header>
					<div className="wrapper stationsWrapper">
						{add === true ? (
							<NewStationForm handleAdd={setAdd} createStation={createStation} />
						) : (
							""
						)}

						<StationsButtonBar add={add} handleAdd={setAdd}></StationsButtonBar>

						{stations
							? stations.map((station) => {
									return <Station key={station.id} station={station} />;
							  })
							: ""}
					</div>
				</main>
			</StationsContext.Provider>
		);

		return content;
	};

	return renderContent();
};

export default Stations;
