import React, { useContext, useEffect, useState } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import StationsContext from "../../contexts/StationsContext";
import StationsButtonBar from "./StationsButtonBar";
import Station from "./Station";
import NewStationForm from "./NewStationForm";

const Stations = () => {
	const [add, setAdd] = useState(false);
	const [stations, setStations] = useState([]);
	const [strata, setStrata] = useState([]);
	const [gears, setGears] = useState([]);
	const [samplers, setSamplers] = useState([]);
	const [stationsBackup, setStationsBackup] = useState([stations]);

	const selectedSurveyContext = useContext(SelectedSurveyContext);
	const apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";
	const apiHydrographyForm = "http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";
	const apiStation = "http://127.0.0.1:8000/api/1.0/station/";
	const apiHaul = "http://127.0.0.1:8000/api/1.0/haul/";
	const apiNewHaul = "http://127.0.0.1:8000/api/1.0/haul/new/";
	const apiSurveyPartial = "http://127.0.0.1:8000/api/1.0/survey/";
	const apiStrataPartial = "http://127.0.0.1:8000/api/1.0/strata/";
	const apiGears = "http://127.0.0.1:8000/api/1.0/gears/trawl/basic/";
	const apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";

	/**
	 * Create station.
	 * @param {event} e
	 * @param {object} station - The station to be created.
	 */
	const createStation = (e, station) => {
		e.preventDefault();

		fetch(apiStation, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(station),
		})
			.then((response) => response.json())
			.then((s) => {
				const newStations = [...stations, s];
				setStations(newStations);
			})
			.catch((error) => console.log(error));
	};

	/**
	 * Edit station.
	 * @param {event} e
	 * @param {number} stationId - The ID of the station to be edited.
	 */
	const updateStation = (e, stationId) => {
		e.preventDefault();

		const api = apiStation + stationId;

		const updated_station = stations.filter((station) => station.id === stationId);

		fetch(api, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
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
	 */
	const deleteStation = (stationId) => {
		const api = apiStation + stationId;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
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
	 */
	const createHaul = (e, haul) => {
		e.preventDefault();
		console.log(haul);

		// const apiForm = haul.sampler_id === "1" ? apiTrawlForm : haul.sampler_id === "2" ? apiHydrographyForm : null;

		const apiForm = haul.sampler_id === "1" ? apiNewHaul : haul.sampler_id === "2" ? apiHydrographyForm : null;

		fetch(apiForm, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(haul),
		})
			.then((response) => response.json())
			.then((h) => {
				const newStations = stations.map((station) => {
					if (station.id === parseInt(haul.station_id)) {
						station.hauls ? (station.hauls = [...station.hauls, h]) : (station.hauls = [h]);
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
		});
		setStations(newStations);

		const apiForm = apiHaul + updatedHaul.id;

		const station = stations.find((s) => s.station === updatedHaul.station);
		const haul = station.hauls.find((h) => h.id === updatedHaul.id);

		fetch(apiForm, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(haul),
		}).catch((error) => console.log(error));
	};

	/**
	 * Restores the haul of a station to its original state.
	 * @param {number} haulId - The ID of the haul to be restored.
	 */
	const restoreHaulCommon = (haulId) => {
		const backupHaul = stationsBackup.find((station) => station.hauls.some((h) => h.id === haulId));

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
	 * Detele haul.
	 * @param {number} id_haul
	 */
	const deleteHaul = (id_haul) => {
		const api = apiHaul + id_haul;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
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
		 */
		const getStationsApi = () => {
			return selectedSurveyContext.selectedSurveyId === null
				? apiStationsPartial
				: apiStationsPartial + "hauls/" + selectedSurveyContext.selectedSurveyId;
		};

		if (selectedSurveyContext.selectedSurveyId !== "") {
			// Fetch strata (require previously fetch survey to get stratification).
			const apiSurvey = apiSurveyPartial + selectedSurveyContext.selectedSurveyId;

			fetch(apiSurvey)
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong!!");
					}
					return response.json();
				})
				.then((survey) => {
					const apiStrata = apiStrataPartial + survey.stratification_id;
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
				});

			// Fetch gears
			fetch(apiGears)
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong fetching the gears !!");
					}
					return response.json();
				})
				.then((gears) => {
					setGears(gears);
				});

			// Fetch samplers
			fetch(apiSamplers)
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong fecthing the samplers!!");
					}
					return response.json();
				})
				.then((samplers) => {
					setSamplers(samplers);
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
					updateHaulCommon: updateHaulCommon,
					handleChangeStation: handleChangeStation,
					updateStation: updateStation,
					validateStationNumber: validateStationNumber,
					strata: strata,
					gears: gears,
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
						{add === true ? <NewStationForm handleAdd={setAdd} createStation={createStation} /> : ""}

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
