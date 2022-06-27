import React, { useContext, useEffect, useState } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import StationsContext from "../../contexts/StationsContext";
import StationsButtonBar from "./StationsButtonBar";
import Station from "./Station";
import NewStationForm from "./NewStationForm";

const ComponentsStations = () => {
	const [add, setAdd] = useState(false);
	const [stations, setStations] = useState([]);
	const [strata, setStrata] = useState([]);
	const [gears, setGears] = useState([]);
	const [samplers, setSamplers] = useState([]);

	const selectedSurveyContext = useContext(SelectedSurveyContext);

	const apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";

	const apiTrawlForm = "http://127.0.0.1:8000/api/1.0/haul/trawl/new/";

	const apiHydrographyForm =
		"http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";

	const apiStation = "http://127.0.0.1:8000/api/1.0/station/";

	const apiHaul = "http://127.0.0.1:8000/api/1.0/haul/";

	const apiSurveyPartial = "http://127.0.0.1:8000/api/1.0/survey/";

	const apiStrataPartial = "http://127.0.0.1:8000/api/1.0/strata/";

	const apiGears = "http://127.0.0.1:8000/api/1.0/trawl/basic/";

	const apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";

	/**
	 * Create station.
	 * @param {event} e
	 * @param {object} station
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
				const new_stations = [...stations, s];
				setStations(new_stations);
			})
			.catch((error) => console.log(error));
	};

	/**
	 * Edit station.
	 * @param {event} e
	 * @param {number} station_id
	 */
	const editStation = (e, station_id) => {
		e.preventDefault();

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

	/**
	 * Delete station.
	 * @param {event} e
	 * @param {number} station_id
	 */
	const deleteStation = (e, station_id) => {
		e.preventDefault();

		const api = apiStation + station_id;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				const new_stations = stations.filter(
					(station) => station.id !== station_id
				);
				setStations(new_stations);
			})
			.catch((error) => alert(error));
	};

	/**
	 * Handle change fields of Station forms.
	 * @param {event} e
	 * @param {number} station_id
	 */
	const handleChangeStation = (e, station_id) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;

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

	/**
	 * Create new haul
	 * @param {event} e
	 * @param {object} haul
	 */
	const createHaul = (e, haul) => {
		e.preventDefault();

		const apiForm =
			haul.sampler_id === "1"
				? apiTrawlForm
				: haul.sampler_id === "2"
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
					if (station.id === parseInt(haul.station_id)) {
						station.hauls
							? (station.hauls = [...station.hauls, h])
							: (station.hauls = [h]);
						return station;
					} else {
						return station;
					}
				});

				setStations(new_stations);
			})
			.catch((error) => console.log(error));
	};

	/**
	 * Update haul.
	 * @param {event} e
	 * @param {number} haul_id
	 * @param {number} station_id
	 */
	const updateHaulCommon = (e, haul_id, station_id) => {
		e.preventDefault();

		const apiForm = apiHaul + haul_id;

		const station = stations.find((s) => s.id === station_id);
		const haul = station.hauls.find((h) => h.id === haul_id);

		fetch(apiForm, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(haul),
		}).catch((error) => console.log(error));
	};

	/**
	 * Detele haul.
	 * @param {event} e
	 * @param {number} id_haul
	 */
	const deleteHaul = (e, id_haul) => {
		const api = apiHaul + id_haul;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => {
				var new_stations = stations.map((station) => {
					if (station.hauls.some((h) => h.id === id_haul)) {
						var new_hauls = station.hauls.filter(
							(haul) => haul.id !== id_haul
						);
						station.hauls = new_hauls;
					}
					return station;
				});
				setStations(new_stations);
			})
			.catch((error) => alert(error));
	};

	/**
	 * Handle change fields of Common Haul forms.
	 * @param {event} e
	 * @param {number} id_haul of haul to change.
	 */
	const handleChangeCommonHaul = (e, id_haul) => {
		const name = e.target.name;
		const value = e.target.value;

		var new_stations = stations.map((station) => {
			if (station.hauls.some((haul) => haul.id === id_haul)) {
				var id_haul_index = station.hauls.findIndex(
					(h) => h.id === id_haul
				);

				station.hauls[id_haul_index][name] = value;
			}
			return station;
		});
		setStations(new_stations);
	};

	const handleChangeCommonValid = (id_haul) => {
		var new_stations = stations.map((station) => {
			if (station.hauls.some((haul) => haul.id === id_haul)) {
				var id_haul_index = station.hauls.findIndex(
					(h) => h.id === id_haul
				);

				station.hauls[id_haul_index]["valid"] =
					!station.hauls[id_haul_index]["valid"];
			}
			return station;
		});
		setStations(new_stations);
	};

	/**
	 * Handle change Gear field.
	 * @param {event} e
	 * @param {number} id_haul of haul to change.
	 */
	const handleChangeGear = (e, id_haul) => {
		const value = e.target.value;

		var new_stations = stations.map((station) => {
			if (station.hauls.some((haul) => haul.id === id_haul)) {
				var id_haul_index = station.hauls.findIndex(
					(h) => h.id === id_haul
				);

				station.hauls[id_haul_index]["gear_id"] = value;
				// get stratum name:
				const gear = gears.find((s) => s.id === parseInt(value));
				station.hauls[id_haul_index]["gear"] = gear.name;
			}
			return station;
		});
		setStations(new_stations);
	};

	/**
	 * Handle change Stratum field.
	 * @param {event} e
	 * @param {number} id_haul of haul to change.
	 */
	const handleChangeStratum = (e, id_haul) => {
		const value = e.target.value;

		var new_stations = stations.map((station) => {
			if (station.hauls.some((haul) => haul.id === id_haul)) {
				var id_haul_index = station.hauls.findIndex(
					(h) => h.id === id_haul
				);

				station.hauls[id_haul_index]["stratum_id"] = value;
				// get stratum name:
				const stratum = strata.find((s) => s.id === parseInt(value));
				station.hauls[id_haul_index]["stratum"] = stratum.stratum;
			}
			return station;
		});
		setStations(new_stations);
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
			// Fetch strata (require previously fetch survey to get stratification).
			const apiSurvey =
				apiSurveyPartial + selectedSurveyContext.selectedSurveyId;

			fetch(apiSurvey)
				.then((response) => {
					if (response.status > 400) {
						alert("something were wrong!!");
					}
					return response.json();
				})
				.then((survey) => {
					const apiStrata = apiStrataPartial + survey.stratification;
					fetch(apiStrata)
						.then((response) => {
							if (response.status > 400) {
								alert("something were wrong!!");
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
						alert("something were wrong fetching the Stations!!");
					}
					return response.json();
				})
				.then((stations) => {
					setStations(stations);
				});

			// Fetch gears
			fetch(apiGears)
				.then((response) => {
					if (response.status > 400) {
						return this.setState(() => {
							return { placeholder: "Something went wrong!" };
						});
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
						return this.setState(() => {
							return { placeholder: "Something went wrong!" };
						});
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
					handleChangeGear: handleChangeGear,
					handleChangeStation: handleChangeStation,
					editStation: editStation,
					validateStationNumber: validateStationNumber,
					handleChangeCommonHaul: handleChangeCommonHaul,
					handleChangeCommonValid: handleChangeCommonValid,
					handleChangeStratum: handleChangeStratum,
					strata: strata,
					gears: gears,
					samplers: samplers,
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

						{stations
							? stations.map((station) => {
									return (
										<Station
											key={station.id}
											station={station}
										/>
									);
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

export default ComponentsStations;
