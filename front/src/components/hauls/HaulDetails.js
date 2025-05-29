import React, { useState, useEffect } from "react";

import { API_CONFIG, buildApiUrl } from "../../config/api";

import {
	convertDecimalToDMCoordinate,
	convertDMToDecimalCoordinate,
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

	// TRAWL
	// TODO: factorize this??
	const [shootingLatitude, setShootingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [shootingLongitude, setShootingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [bottomLatitude, setBottomLatitude] = useState({ degrees: 0, minutes: 0 });
	const [bottomLongitude, setBottomLongitude] = useState({ degrees: 0, minutes: 0 });
	const [trawlingLatitude, setTrawlingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [trawlingLongitude, setTrawlingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [haulingLatitude, setHaulingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [haulingLongitude, setHaulingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [takeOffLatitude, setTakeOffLatitude] = useState({ degrees: 0, minutes: 0 });
	const [takeOffLongitude, setTakeOffLongitude] = useState({ degrees: 0, minutes: 0 });
	const [onBoardLatitude, setOnBoardLatitude] = useState({ degrees: 0, minutes: 0 });
	const [onBoardLongitude, setOnBoardLongitude] = useState({ degrees: 0, minutes: 0 });

	const [backupShootingLatitude, setBackupShootingLatitude] = useState({
		degrees: 0,
		minutes: 0,
	});
	const [backupShootingLongitude, setBackupShootingLongitude] = useState({
		degrees: 0,
		minutes: 0,
	});
	const [backupBottomLatitude, setBackupBottomLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupBottomLongitude, setBackupBottomLongitude] = useState({ degrees: 0, minutes: 0 });
	const [backupTrawlingLatitude, setBackupTrawlingLatitude] = useState({
		degrees: 0,
		minutes: 0,
	});
	const [backupTrawlingLongitude, setBackupTrawlingLongitude] = useState({
		degrees: 0,
		minutes: 0,
	});
	const [backupHaulingLatitude, setBackupHaulingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupHaulingLongitude, setBackupHaulingLongitude] = useState({
		degrees: 0,
		minutes: 0,
	});
	const [backupTakeOffLatitude, setBackupTakeOffLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupTakeOffLongitude, setBackupTakeOffLongitude] = useState({
		degrees: 0,
		minutes: 0,
	});
	const [backupOnBoardLatitude, setBackupOnBoardLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupOnBoardLongitude, setBackupOnBoardLongitude] = useState({
		degrees: 0,
		minutes: 0,
	});

	// HTYDROGRAPHY
	const [hidroLatitude, setHidroLatitude] = useState({ degrees: 0, minutes: 0 });
	const [hidroLongitude, setHidroLongitude] = useState({ degrees: 0, minutes: 0 });

	const [backupLatitude, setBackupLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupLongitude, setBackupLongitude] = useState({ degrees: 0, minutes: 0 });

	useEffect(() => {
		// TRAWL
		// Convert the latitude and longitude values to degrees and minutes when the component is loaded
		const [degreesShootingLatitude, minutesShootingLatitude] = convertDecimalToDMCoordinate(
			trawl.shooting_latitude
		);
		const [degreesShootingLongitude, minutesShootingLongitude] = convertDecimalToDMCoordinate(
			trawl.shooting_longitude
		);
		const [degreesBottomLatitude, minutesBottomLatitude] = convertDecimalToDMCoordinate(
			trawl.bottom_latitude
		);
		const [degreesBottomLongitude, minutesBottomLongitude] = convertDecimalToDMCoordinate(
			trawl.bottom_longitude
		);
		const [degreesTrawlingLatitude, minutesTrawlingLatitude] = convertDecimalToDMCoordinate(
			trawl.trawling_latitude
		);
		const [degreesTrawlingLongitude, minutesTrawlingLongitude] = convertDecimalToDMCoordinate(
			trawl.trawling_longitude
		);
		const [degreesHaulingLatitude, minutesHaulingLatitude] = convertDecimalToDMCoordinate(
			trawl.hauling_latitude
		);
		const [degreesHaulingLongitude, minutesHaulingLongitude] = convertDecimalToDMCoordinate(
			trawl.hauling_longitude
		);
		const [degreesTakeOffLatitude, minutesTakeOffLatitude] = convertDecimalToDMCoordinate(
			trawl.take_off_latitude
		);
		const [degreesTakeOffLongitude, minutesTakeOffLongitude] = convertDecimalToDMCoordinate(
			trawl.take_off_longitude
		);
		const [degreesOnBoardLatitude, minutesOnBoardLatitude] = convertDecimalToDMCoordinate(
			trawl.on_board_latitude
		);
		const [degreesOnBoardLongitude, minutesOnBoardLongitude] = convertDecimalToDMCoordinate(
			trawl.on_board_longitude
		);

		// Store the converted latitude and longitude values in state
		setShootingLatitude({ degrees: degreesShootingLatitude, minutes: minutesShootingLatitude });
		setShootingLongitude({
			degrees: degreesShootingLongitude,
			minutes: minutesShootingLongitude,
		});
		setBottomLatitude({ degrees: degreesBottomLatitude, minutes: minutesBottomLatitude });
		setBottomLongitude({ degrees: degreesBottomLongitude, minutes: minutesBottomLongitude });
		setTrawlingLatitude({ degrees: degreesTrawlingLatitude, minutes: minutesTrawlingLatitude });
		setTrawlingLongitude({
			degrees: degreesTrawlingLongitude,
			minutes: minutesTrawlingLongitude,
		});
		setHaulingLatitude({ degrees: degreesHaulingLatitude, minutes: minutesHaulingLatitude });
		setHaulingLongitude({ degrees: degreesHaulingLongitude, minutes: minutesHaulingLongitude });
		setTakeOffLatitude({ degrees: degreesTakeOffLatitude, minutes: minutesTakeOffLatitude });
		setTakeOffLongitude({ degrees: degreesTakeOffLongitude, minutes: minutesTakeOffLongitude });
		setOnBoardLatitude({ degrees: degreesOnBoardLatitude, minutes: minutesOnBoardLatitude });
		setOnBoardLongitude({ degrees: degreesOnBoardLongitude, minutes: minutesOnBoardLongitude });

		// Store the converted latitude and longitude values in backup state
		setBackupShootingLatitude({
			degrees: degreesShootingLatitude,
			minutes: minutesShootingLatitude,
		});
		setBackupShootingLongitude({
			degrees: degreesShootingLongitude,
			minutes: minutesShootingLongitude,
		});
		setBackupBottomLatitude({ degrees: degreesBottomLatitude, minutes: minutesBottomLatitude });
		setBackupBottomLongitude({
			degrees: degreesBottomLongitude,
			minutes: minutesBottomLongitude,
		});
		setBackupTrawlingLatitude({
			degrees: degreesTrawlingLatitude,
			minutes: minutesTrawlingLatitude,
		});
		setBackupTrawlingLongitude({
			degrees: degreesTrawlingLongitude,
			minutes: minutesTrawlingLongitude,
		});
		setBackupHaulingLatitude({
			degrees: degreesHaulingLatitude,
			minutes: minutesHaulingLatitude,
		});
		setBackupHaulingLongitude({
			degrees: degreesHaulingLongitude,
			minutes: minutesHaulingLongitude,
		});
		setBackupTakeOffLatitude({
			degrees: degreesTakeOffLatitude,
			minutes: minutesTakeOffLatitude,
		});
		setBackupTakeOffLongitude({
			degrees: degreesTakeOffLongitude,
			minutes: minutesTakeOffLongitude,
		});
		setBackupOnBoardLatitude({
			degrees: degreesOnBoardLatitude,
			minutes: minutesOnBoardLatitude,
		});
		setBackupOnBoardLongitude({
			degrees: degreesOnBoardLongitude,
			minutes: minutesOnBoardLongitude,
		});

		// HYDROGRAPHY
		// Convert the latitude and longitude values to degrees and minutes when the component is loaded
		const [degreesHidroLatitude, minutesLatitude] = convertDecimalToDMCoordinate(
			hydrography.latitude
		);
		const [degreesHidroLongitude, minutesLongitude] = convertDecimalToDMCoordinate(
			hydrography.longitude
		);

		// Store the converted latitude and longitude values in state
		setHidroLatitude({ degrees: degreesHidroLatitude, minutes: minutesLatitude });
		setHidroLongitude({ degrees: degreesHidroLongitude, minutes: minutesLongitude });

		// Store the converted latitude and longitude values in backup state
		setBackupLatitude({ degrees: degreesHidroLatitude, minutes: minutesLatitude });
		setBackupLongitude({ degrees: degreesHidroLongitude, minutes: minutesLongitude });
	}, [
		trawl.bottom_latitude,
		trawl.bottom_longitude,
		trawl.hauling_latitude,
		trawl.hauling_longitude,
		trawl.trawling_latitude,
		trawl.trawling_longitude,
		trawl.shooting_latitude,
		trawl.shooting_longitude,
		trawl.take_off_latitude,
		trawl.take_off_longitude,
		trawl.on_board_latitude,
		trawl.on_board_longitude,
		hydrography.latitude,
		hydrography.longitude,
	]);

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
		const name = e.target.name;
		const value = e.target.value;

		// Mapping of names to setter functions
		const nameToSetter = {
			shooting_latitude_degrees: setShootingLatitude,
			shooting_latitude_minutes: setShootingLatitude,
			shooting_longitude_degrees: setShootingLongitude,
			shooting_longitude_minutes: setShootingLongitude,
			bottom_latitude_degrees: setBottomLatitude,
			bottom_latitude_minutes: setBottomLatitude,
			bottom_longitude_degrees: setBottomLongitude,
			bottom_longitude_minutes: setBottomLongitude,
			trawling_latitude_degrees: setTrawlingLatitude,
			trawling_latitude_minutes: setTrawlingLatitude,
			trawling_longitude_degrees: setTrawlingLongitude,
			trawling_longitude_minutes: setTrawlingLongitude,
			hauling_latitude_degrees: setHaulingLatitude,
			hauling_latitude_minutes: setHaulingLatitude,
			hauling_longitude_degrees: setHaulingLongitude,
			hauling_longitude_minutes: setHaulingLongitude,
			take_off_latitude_degrees: setTakeOffLatitude,
			take_off_latitude_minutes: setTakeOffLatitude,
			take_off_longitude_degrees: setTakeOffLongitude,
			take_off_longitude_minutes: setTakeOffLongitude,
			on_board_latitude_degrees: setOnBoardLatitude,
			on_board_latitude_minutes: setOnBoardLatitude,
			on_board_longitude_degrees: setOnBoardLongitude,
			on_board_longitude_minutes: setOnBoardLongitude,
			hidro_latitude_degrees: setHidroLatitude,
			hidro_latitude_minutes: setHidroLatitude,
		};

		// Get the setter function from the mapping
		const setter = nameToSetter[name];

		// Get the units from the name
		const units = name.split("_")[2];

		// Update the state using the appropriate setter function and element
		setter((prev) => ({
			...prev,
			[units]: value,
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
		// TODO: I'm doing this with coordinates or trawl and hydrography. Should be done separately.
		// TRAWL

		const coordinates = {
			shooting_latitude: shootingLatitude,
			shooting_longitude: shootingLongitude,
			bottom_latitude: bottomLatitude,
			bottom_longitude: bottomLongitude,
			trawling_latitude: trawlingLatitude,
			trawling_longitude: trawlingLongitude,
			hauling_latitude: haulingLatitude,
			hauling_longitude: haulingLongitude,
			take_off_latitude: takeOffLatitude,
			take_off_longitude: takeOffLongitude,
			hidro_latitude: hidroLatitude,
			hidro_longitude: hidroLongitude,
		};

		const convertedCoordinates = {};

		for (const [key, value] of Object.entries(coordinates)) {
			convertedCoordinates[key] = convertCoordinates(value);
		}

		return convertedCoordinates;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (haul.sampler_id === 1) {
			// create a deepcopy of the trawl object
			const trawlCopy = JSON.parse(JSON.stringify(trawl));

			const newCoordinates = updateCoordinates();

			// to avoid a infinite loop, we need to update the state of the trawl object completely
			// so we need to update the state of the trawl object with the deepcopy

			for (const key in newCoordinates) {
				trawlCopy[key] = newCoordinates[key];
			}

			// update the date time fields, must be null if empty, instead of empty string.
			trawlCopy["shooting_date_time"] =
				trawlCopy["shooting_date_time"] === "" ? null : trawlCopy["shooting_date_time"];
			trawlCopy["hauling_date_time"] =
				trawlCopy["hauling_date_time"] === "" ? null : trawlCopy["hauling_date_time"];
			trawlCopy["bottom_date_time"] =
				trawlCopy["bottom_date_time"] === "" ? null : trawlCopy["bottom_date_time"];

			setTrawl(trawlCopy);

			fetch(apiTrawl, {
				method: "PUT",
				headers: API_CONFIG.HEADERS.DEFAULT,
				body: JSON.stringify(trawlCopy),
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

			// update the coordinates in the deepcopy trawl object
			hydrographyCopy["latitude"] = newCoordinates["hidro_latitude"];
			hydrographyCopy["longitude"] = newCoordinates["hidro_longitude"];
			// to avoid a infinite loop, we need to update the state of the trawl object completely
			// so we need to update the state of the trawl object with the deepcopy

			// update the date time fields, must be null if empty, instead of empty string.
			hydrographyCopy["date_time"] =
				hydrographyCopy["date_time"] === "" ? null : hydrographyCopy["date_time"];
			setHydrography(hydrographyCopy);

			fetch(apiHydrography, {
				method: "PUT",
				headers: API_CONFIG.HEADERS.DEFAULT,
				body: JSON.stringify(hydrographyCopy),
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
		//TRAWL
		setShootingLatitude(backupShootingLatitude);
		setShootingLongitude(backupShootingLongitude);
		setBottomLatitude(backupBottomLatitude);
		setBottomLongitude(backupBottomLongitude);
		setTrawlingLatitude(backupTrawlingLatitude);
		setTrawlingLongitude(backupTrawlingLongitude);
		setHaulingLatitude(backupHaulingLatitude);
		setHaulingLongitude(backupHaulingLongitude);
		setTakeOffLatitude(backupTakeOffLatitude);
		setTakeOffLongitude(backupTakeOffLongitude);
		setOnBoardLatitude(backupOnBoardLatitude);
		setOnBoardLongitude(backupOnBoardLongitude);

		//HYDROGRAPHY
		setHidroLatitude(backupLatitude);
		setHidroLongitude(backupLongitude);
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
		// const apiMeteorology = apiMeteorologyPartial + haul.id;
		// const apiHydrography = apiHydrographyPartial + haul.id;
		// const apiTrawl = apiTrawlPartial + haul.id;

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
	}, [detail, haul.sampler_id, apiHydrography, haul.id, apiMeteorology]);

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
								shootingLatitude={shootingLatitude}
								shootingLongitude={shootingLongitude}
								bottomLatitude={bottomLatitude}
								bottomLongitude={bottomLongitude}
								trawlingLatitude={trawlingLatitude}
								trawlingLongitude={trawlingLongitude}
								haulingLatitude={haulingLatitude}
								haulingLongitude={haulingLongitude}
								takeOffLatitude={takeOffLatitude}
								takeOffLongitude={takeOffLongitude}
								onBoardLatitude={onBoardLatitude}
								onBoardLongitude={onBoardLongitude}
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
								hidro_latitude={hidroLatitude}
								hidro_longitude={hidroLongitude}
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
								hidro_latitude={hidroLatitude}
								hidro_longitude={hidroLongitude}
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

	// const renderCount = useRenderCount();

	return renderContent();
};

export default HaulDetails;
