import React, { useState, useEffect, useMemo } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import {
	convertDecimalToDMCoordinate,
	convertDMToDecimalCoordinate,
	convertTrawlCoordinates,
	convertHydrographyCoordinates,
} from "C:/Users/ieoma/Desktop/NewCamp/front/src/utils/Coordinates";
import { fixDateTime } from "../../utils/DateTime";

import MeteorologyFormView from "./view/MeteorologyFormView";
import TrawlFormView from "./view/TrawlFormView";
import HydrographyFormView from "./view/HydrographyFormView";
import MeteorologyFormEdit from "./edit/MeteorologyFormEdit";
import TrawlFormEdit from "./edit/TrawlFormEdit";
import HydrographyFormEdit from "./edit/HydrographyFormEdit";

import UiButtonSave from "../ui/UiButtonSave";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

const HaulDetails = ({ haul, detail, setDetail }) => {
	/**
	 * Component to show the details of a haul. It is possible to edit the haul.
	 * When the component is loaded, the data of the haul is fetched from the API, stored in the state and
	 * stored in the backup state. This one is used to recovery the original data if the user cancel the changes.
	 * @param {object} haul The haul object.
	 * @param {boolean} detail Boolean to show the details of the haul.
	 * @param {method} setDetail Method to set the boolean detail.
	 */

	const [meteorology, setMeteorology] = useState({});
	const [hydrography, setHydrography] = useState({});
	const [trawl, setTrawl] = useState({});

	const [backupMeteorology, setBackupMeteorology] = useState({});
	const [backupHydrography, setBackupHydrography] = useState({});
	const [backupTrawl, setBackupTrawl] = useState({});

	const [edit, setEdit] = useState(false);

	const [, setFetchError] = useState("");

	const apiHydrography = buildApiUrl(API_CONFIG.ENDPOINTS.GET_HYDROGRAPHY_BY_HAUL_ID(haul.id));
	const apiMeteorology = buildApiUrl(API_CONFIG.ENDPOINTS.GET_METEOROLOGY_BY_HAUL_ID(haul.id));
	const apiTrawl = buildApiUrl(API_CONFIG.ENDPOINTS.GET_TRAWL_BY_HAUL_ID(haul.id));

	const [coordinates, setCoordinates] = useState({
		shooting: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		bottom: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		trawling: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		hauling: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		takeOff: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		onBoard: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		hydro: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
	});

	const [backupCoordinates, setBackupCoordinates] = useState({
		shooting: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		bottom: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		trawling: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		hauling: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		takeOff: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		onBoard: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
		hydro: { latitude: { degrees: 0, minutes: 0 }, longitude: { degrees: 0, minutes: 0 } },
	});

	const trawlCoordinates = useMemo(() => {
		return Object.keys(trawl).length > 0 ? convertTrawlCoordinates(trawl) : null;
	}, [trawl]);

	const hydrographyCoordinates = useMemo(() => {
		return Object.keys(hydrography).length > 0
			? convertHydrographyCoordinates(hydrography)
			: null;
	}, [hydrography]);

	useEffect(() => {
		// Convert and set coordinates when trawl or hydrography data changes
		if (trawlCoordinates || hydrographyCoordinates) {
			setCoordinates((prev) => ({
				...prev,
				...(trawlCoordinates || {}),
				...(hydrographyCoordinates ? { hydro: hydrographyCoordinates } : {}),
			}));
		}
	}, [trawlCoordinates, hydrographyCoordinates]);

	useEffect(() => {
		setBackupCoordinates(JSON.parse(JSON.stringify(coordinates)));
	}, [coordinates]);

	const handleChangeMeteorology = (e) => {
		var name = e.target.name;
		var value = e.target.value;
		setMeteorology((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeTrawl = (e) => {
		var name = e.target.name;
		var value = e.target.value;
		setTrawl((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChangeHydrography = (e) => {
		var name = e.target.name;
		var value = e.target.value;
		setHydrography((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCoordinatesChange = (e) => {
		const { name, value } = e.target;
		const [type, coord, unit] = name.split("_");

		const typeMap = {
			shooting: "shooting",
			bottom: "bottom",
			trawling: "trawling",
			hauling: "hauling",
			take: "takeOff", // for take_off
			on: "onBoard", // for on_board
			hidro: "hydro",
		};

		const coordType = typeMap[type] || type;

		setCoordinates((prev) => ({
			...prev,
			[coordType]: {
				...prev[coordType],
				[coord]: {
					...prev[coordType][coord],
					[unit]: value,
				},
			},
		}));
	};

	/**
	 * Converts decimal coordinates to degrees and minutes format.
	 * @param {number} decimalCoordinate The decimal coordinate value.
	 * @returns {Array} An array containing the degrees and minutes values.
	 */
	const convertCoordinates = (coordinates) => {
		return convertDMToDecimalCoordinate(coordinates["degrees"], coordinates["minutes"]);
	};

	const updateCoordinates = () => {
		const convertedCoordinates = {};

		// Convert trawl coordinates
		const trawlFields = ["shooting", "bottom", "trawling", "hauling", "takeOff", "onBoard"];
		trawlFields.forEach((field) => {
			const apiField =
				field === "takeOff" ? "take_off" : field === "onBoard" ? "on_board" : field;
			convertedCoordinates[`${apiField}_latitude`] = convertCoordinates(
				coordinates[field].latitude
			);
			convertedCoordinates[`${apiField}_longitude`] = convertCoordinates(
				coordinates[field].longitude
			);
		});

		// Convert hydrography coordinates
		convertedCoordinates.hidro_latitude = convertCoordinates(coordinates.hydro.latitude);
		convertedCoordinates.hidro_longitude = convertCoordinates(coordinates.hydro.longitude);

		return convertedCoordinates;
	};

	/**
	 * Converts all empty strings to null in an object
	 * @param {object} obj The object to clean
	 * @returns {object} The cleaned object
	 */
	const cleanEmptyValues = (obj) => {
		const cleaned = { ...obj };
		Object.keys(cleaned).forEach((key) => {
			if (cleaned[key] === "") {
				cleaned[key] = null;
			}
		});
		return cleaned;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (haul.sampler_id === 1) {
			// create a deepcopy of the trawl object
			const trawlCopy = JSON.parse(JSON.stringify(trawl));
			console.log(apiTrawl);

			const newCoordinates = updateCoordinates();

			Object.keys(newCoordinates).forEach((key) => {
				if (key.includes("latitude") || key.includes("longitude")) {
					trawlCopy[key] = newCoordinates[key];
				}
			});

			// Convert ALL empty strings to null
			const cleanedTrawl = cleanEmptyValues(trawlCopy);

			setTrawl(cleanedTrawl);

			fetch(apiTrawl, {
				method: "PUT",
				headers: API_CONFIG.HEADERS.DEFAULT,
				body: JSON.stringify(cleanedTrawl),
			})
				.then(() => {
					setEdit(false);
				})
				.catch((error) => console.log(error));
		}

		if (haul.sampler_id === 2) {
			// create a deepcopy of the hydrography object
			const hydrographyCopy = JSON.parse(JSON.stringify(hydrography));

			const newCoordinates = updateCoordinates();

			hydrographyCopy["latitude"] = newCoordinates["hidro_latitude"];
			hydrographyCopy["longitude"] = newCoordinates["hidro_longitude"];

			// Convert ALL empty strings to null
			const cleanedHydrography = cleanEmptyValues(hydrographyCopy);

			fetch(apiHydrography, {
				method: "PUT",
				headers: API_CONFIG.HEADERS.DEFAULT,
				body: JSON.stringify(cleanedHydrography),
			})
				.then(() => {
					setEdit(false);
				})
				.catch((error) => console.log(error));
		}

		fetch(apiMeteorology, {
			method: "PUT",
			headers: API_CONFIG.HEADERS.DEFAULT,
			body: JSON.stringify(meteorology),
		}).catch((error) => console.log(error));
	};

	/**
	 * Restores the coordinates to their original values.
	 * This is used when the user clicks the `Cancel` button.
	 * @returns {void}
	 */
	const restoreCoordinates = () => {
		setCoordinates(JSON.parse(JSON.stringify(backupCoordinates)));
	};

	/**
	 * Manage the cancel button.
	 * @param {boolean} status - Whether the user is editing the haul.
	 * @returns {void}
	 */
	const handleCancel = (status) => {
		setTrawl(backupTrawl);
		setMeteorology(backupMeteorology);
		setHydrography(backupHydrography);
		restoreCoordinates();
		setEdit(status);
	};

	/**
	 * Fetches data from API endpoints when the `detail` state is set to `true`.
	 * If the `sampler_id` of the `haul` object is `1`, fetches meteorology and trawl data.
	 * If the `sampler_id` of the `haul` object is `2`, fetches hydrography data.
	 * Sets the `fetchError`, `meteorology`, `trawl`, and `hydrography` state variables.
	 * @param {boolean} detail - Whether to show detailed information about the haul.
	 * @param {object} haul - The haul object containing information about the haul.
	 * @param {string} haul.id - The ID of the haul.
	 * @param {number} haul.sampler_id - The ID of the sampler used for the haul.
	 */
	useEffect(() => {
		if (detail === true) {
			if (haul.sampler_id === 1) {
				// Fetch meteorology.
				fetch(apiMeteorology)
					.then((response) => {
						if (response.status === 404) {
							return {};
						} else if (response.status > 400) {
							setFetchError("Something went wrong!");
						}
						return response.json();
					})
					.then((meteorology) => {
						setMeteorology(meteorology);
						setBackupMeteorology(meteorology);
					})
					.catch((error) => console.log(error));

				// Fetch trawl.
				fetch(apiTrawl)
					.then((response) => {
						if (response.status === 404) {
							return {};
						} else if (response.status > 400) {
							setFetchError("Something went wrong!");
						}
						return response.json();
					})
					.then((trawl) => {
						// Convert date and time to local time (just remove the Z at the end).
						const fixed_shooting_date_time = fixDateTime(trawl.shooting_date_time);
						const fixed_bottom_date_time = fixDateTime(trawl.bottom_date_time);
						const fixed_trawling_date_time = fixDateTime(trawl.trawling_date_time);
						const fixed_hauling_date_time = fixDateTime(trawl.hauling_date_time);
						const fixed_take_off_date_time = fixDateTime(trawl.take_off_date_time);
						const fixed_on_board_date_time = fixDateTime(trawl.on_board_date_time);
						trawl.shooting_date_time = fixed_shooting_date_time;
						trawl.bottom_date_time = fixed_bottom_date_time;
						trawl.trawling_date_time = fixed_trawling_date_time;
						trawl.hauling_date_time = fixed_hauling_date_time;
						trawl.take_off_date_time = fixed_take_off_date_time;
						trawl.on_board_date_time = fixed_on_board_date_time;

						setTrawl(trawl);
						setBackupTrawl(trawl);
					})
					.catch((error) => console.log(error));
			}

			if (haul.sampler_id === 2) {
				// Fetch hydrography.
				fetch(apiHydrography)
					.then((response) => {
						if (response.status > 400) {
							setFetchError("Something went wrong!");
						}
						return response.json();
					})
					.then((hydrography) => {
						const fixed_date_time = fixDateTime(hydrography.date_time);
						hydrography.date_time = fixed_date_time;
						setHydrography(hydrography);
						setBackupHydrography(hydrography);
					})
					.catch((error) => console.log(error));
			}
		}
	}, [detail, haul.sampler_id, apiHydrography, haul.id, apiMeteorology, apiTrawl]);

	const renderContent = () => {
		if (Number(haul.sampler_id) === 1) {
			if (edit === false) {
				return (
					<form className="form--wide" disabled>
						<div className="form__row">
							<TrawlFormView trawl={trawl} />
						</div>
						<div className="form__row">
							<MeteorologyFormView meteorology={meteorology} />
						</div>
						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonStatusHandle
										buttonText={"Hide Haul Detail"}
										handleMethod={setDetail}
										newStatus={false}
									>
										{/* <UiIconDetailHide /> */}
									</UiButtonStatusHandle>
									<UiButtonStatusHandle
										buttonText={"Edit Haul Detail"}
										handleMethod={setEdit}
										newStatus={true}
									>
										{/* <UiIconEdit /> */}
									</UiButtonStatusHandle>
								</div>
							</div>
						</div>
					</form>
				);
			}

			if (edit === true) {
				return (
					<form
						className="form--wide"
						onSubmit={(e) => {
							handleSubmit(e);
							setEdit(false);
						}}
					>
						<div className="form__row">
							<TrawlFormEdit
								trawl={trawl}
								shootingLatitude={coordinates.shooting.latitude}
								shootingLongitude={coordinates.shooting.longitude}
								bottomLatitude={coordinates.bottom.latitude}
								bottomLongitude={coordinates.bottom.longitude}
								trawlingLatitude={coordinates.trawling.latitude}
								trawlingLongitude={coordinates.trawling.longitude}
								haulingLatitude={coordinates.hauling.latitude}
								haulingLongitude={coordinates.hauling.longitude}
								takeOffLatitude={coordinates.takeOff.latitude}
								takeOffLongitude={coordinates.takeOff.longitude}
								onBoardLatitude={coordinates.onBoard.latitude}
								onBoardLongitude={coordinates.onBoard.longitude}
								handleChangeTrawl={handleChangeTrawl}
								handleCoordinatesChange={handleCoordinatesChange}
							/>
						</div>
						<div className="form__row">
							<MeteorologyFormEdit
								meteorology={meteorology}
								handleChangeMeteorology={handleChangeMeteorology}
							/>
						</div>

						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonSave buttonText="Save" />
									<UiButtonStatusHandle
										buttonText={"Cancel"}
										handleMethod={handleCancel}
										newStatus={false}
									/>
								</div>
							</div>
						</div>
					</form>
				);
			}
		}

		if (Number(haul.sampler_id) === 2) {
			if (edit === false) {
				return (
					<form className="form--wide noSpinner" disabled>
						<div className="form__row">
							<HydrographyFormView
								hydrography={hydrography}
								hidro_latitude={coordinates.hydro.latitude}
								hidro_longitude={coordinates.hydro.longitude}
							/>
						</div>

						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonStatusHandle
										buttonText={"Hide Detail"}
										handleMethod={setDetail}
										newStatus={false}
									/>

									<UiButtonStatusHandle
										buttonText={"Edit"}
										handleMethod={setEdit}
										newStatus={true}
									/>
								</div>
							</div>
						</div>
					</form>
				);
			}

			if (edit === true) {
				return (
					<form
						className="form--wide noSpinner"
						onSubmit={(e) => {
							handleSubmit(e);
							setEdit(false);
						}}
					>
						<div className="form__row">
							<HydrographyFormEdit
								hydrography={hydrography}
								handleChangeHydrography={handleChangeHydrography}
								hidro_latitude={coordinates.hydro.latitude}
								hidro_longitude={coordinates.hydro.longitude}
								handleCoordinatesChange={handleCoordinatesChange}
							/>
						</div>
						<div className="form__row">
							<div className="form__cell form__cell--right">
								<UiButtonSave buttonText="Save Haul" />
								<UiButtonStatusHandle
									buttonText={"Cancel"}
									handleMethod={handleCancel}
									newStatus={false}
								/>
							</div>
						</div>
					</form>
				);
			}
		}

		return null;
	};

	return renderContent();
};

export default HaulDetails;
