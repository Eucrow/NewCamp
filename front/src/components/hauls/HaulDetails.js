import React, { useState, useEffect } from "react";

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
import UiIconDetailHide from "../ui/UiIconDetailHide";
import UiIconEdit from "../ui/UiIconEdit";

// const useRenderCount = () => {
// 	const renderCount = useRef(0);
// 	useEffect(() => {
// 		renderCount.current += 1;
// 	});
// 	return renderCount.current;
// };

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

	const [fecthError, setFetchError] = useState("");

	const apiHydrographyPartial = "http://127.0.0.1:8000/api/1.0/hydrography/";
	const apiMeteorologyPartial = "http://127.0.0.1:8000/api/1.0/meteorology/";
	const apiTrawlPartial = "http://127.0.0.1:8000/api/1.0/trawl/";

	// TRAWL
	const [shootingLatitude, setShootingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [shootingLongitude, setShootingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [haulingLatitude, setHaulingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [haulingLongitude, setHaulingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [bottomLatitude, setBottomLatitude] = useState({ degrees: 0, minutes: 0 });
	const [bottomLongitude, setBottomLongitude] = useState({ degrees: 0, minutes: 0 });

	const [backupShootingLatitude, setBackupShootingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupShootingLongitude, setBackupShootingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [backupHaulingLatitude, setBackupHaulingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupHaulingLongitude, setBackupHaulingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [backupBottomLatitude, setBackupBottomLatitude] = useState({ degrees: 0, minutes: 0 });
	const [backupBottomLongitude, setBackupBottomLongitude] = useState({ degrees: 0, minutes: 0 });

	// HTYDROGRAPHY
	const [latitude, setLatitude] = useState({ degrees: 0, minutes: 0 });
	const [longitude, setLongitude] = useState({ degrees: 0, minutes: 0 });

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
		const [degreesHaulingLatitude, minutesHaulingLatitude] = convertDecimalToDMCoordinate(trawl.hauling_latitude);
		const [degreesHaulingLongitude, minutesHaulingLongitude] = convertDecimalToDMCoordinate(
			trawl.hauling_longitude
		);
		const [degreesBottomLatitude, minutesBottomLatitude] = convertDecimalToDMCoordinate(trawl.bottom_latitude);
		const [degreesBottomLongitude, minutesBottomLongitude] = convertDecimalToDMCoordinate(trawl.bottom_longitude);

		// Store the converted latitude and longitude values in state
		setShootingLatitude({ degrees: degreesShootingLatitude, minutes: minutesShootingLatitude });
		setShootingLongitude({ degrees: degreesShootingLongitude, minutes: minutesShootingLongitude });
		setHaulingLatitude({ degrees: degreesHaulingLatitude, minutes: minutesHaulingLatitude });
		setHaulingLongitude({ degrees: degreesHaulingLongitude, minutes: minutesHaulingLongitude });
		setBottomLatitude({ degrees: degreesBottomLatitude, minutes: minutesBottomLatitude });
		setBottomLongitude({ degrees: degreesBottomLongitude, minutes: minutesBottomLongitude });

		// Store the converted latitude and longitude values in backup state
		setBackupShootingLatitude({ degrees: degreesShootingLatitude, minutes: minutesShootingLatitude });
		setBackupShootingLongitude({ degrees: degreesShootingLongitude, minutes: minutesShootingLongitude });
		setBackupHaulingLatitude({ degrees: degreesHaulingLatitude, minutes: minutesHaulingLatitude });
		setBackupHaulingLongitude({ degrees: degreesHaulingLongitude, minutes: minutesHaulingLongitude });
		setBackupBottomLatitude({ degrees: degreesBottomLatitude, minutes: minutesBottomLatitude });
		setBackupBottomLongitude({ degrees: degreesBottomLongitude, minutes: minutesBottomLongitude });

		// HYDROGRAPHY
		// Convert the latitude and longitude values to degrees and minutes when the component is loaded
		const [degreesLatitude, minutesLatitude] = convertDecimalToDMCoordinate(hydrography.latitude);
		const [degreesLongitude, minutesLongitude] = convertDecimalToDMCoordinate(hydrography.longitude);

		// Store the converted latitude and longitude values in state
		setLatitude({ degrees: degreesLatitude, minutes: minutesLatitude });
		setLongitude({ degrees: degreesLongitude, minutes: minutesLongitude });

		// Store the converted latitude and longitude values in backup state
		setBackupLatitude({ degrees: degreesLatitude, minutes: minutesLatitude });
		setBackupLongitude({ degrees: degreesLongitude, minutes: minutesLongitude });
	}, [
		trawl.bottom_latitude,
		trawl.bottom_longitude,
		trawl.hauling_latitude,
		trawl.hauling_longitude,
		trawl.shooting_latitude,
		trawl.shooting_longitude,
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

	useEffect(() => {
		console.log(hydrography);
	}, [hydrography]);

	const handleCoordinatesChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		// determine which setter function to call based on the name of the input element
		// this is not the best way to do it, but it works
		let setter;
		let units;
		switch (true) {
			// TRAWL
			case name === "shooting_latitude_degrees" || name === "shooting_latitude_minutes":
				setter = setShootingLatitude;
				units = name.split("_")[2];
				break;
			case name === "shooting_longitude_degrees" || name === "shooting_longitude_minutes":
				setter = setShootingLongitude;
				units = name.split("_")[2];
				break;
			case name === "hauling_latitude_degrees" || name === "hauling_latitude_minutes":
				setter = setHaulingLatitude;
				units = name.split("_")[2];
				break;
			case name === "hauling_longitude_degrees" || name === "hauling_longitude_minutes":
				setter = setHaulingLongitude;
				units = name.split("_")[2];
				break;
			case name === "bottom_latitude_degrees" || name === "bottom_latitude_minutes":
				setter = setBottomLatitude;
				units = name.split("_")[2];
				break;
			case name === "bottom_longitude_degrees" || name === "bottom_longitude_minutes":
				setter = setBottomLongitude;
				units = name.split("_")[2];
				break;
			// HYDROGRAPHY
			case name === "latitude_degrees" || name === "latitude_minutes":
				setter = setLatitude;
				units = name.split("_")[1];
				break;
			case name === "longitude_degrees" || name === "longitude_minutes":
				setter = setLongitude;
				units = name.split("_")[1];
				break;
			default:
				return;
		}

		// update the state using the appropriate setter function and element
		setter((prev) => ({
			...prev,
			[units]: value,
		}));
	};

	const updateCoordinates = () => {
		// TODO: I'm doing this with coordinates or trawl and hydrography. Should be done separately.
		// TRAWL
		const shooting_latitude = convertDMToDecimalCoordinate(
			shootingLatitude["degrees"],
			shootingLatitude["minutes"]
		);

		const shooting_longitude = convertDMToDecimalCoordinate(
			shootingLongitude["degrees"],
			shootingLongitude["minutes"]
		);

		const hauling_latitude = convertDMToDecimalCoordinate(haulingLatitude["degrees"], haulingLatitude["minutes"]);

		const hauling_longitude = convertDMToDecimalCoordinate(
			haulingLongitude["degrees"],
			haulingLongitude["minutes"]
		);

		const bottom_latitude = convertDMToDecimalCoordinate(bottomLatitude["degrees"], bottomLatitude["minutes"]);

		const bottom_longitude = convertDMToDecimalCoordinate(bottomLongitude["degrees"], bottomLongitude["minutes"]);

		// HYDROGRAPHY
		const latitude_hydro = convertDMToDecimalCoordinate(latitude["degrees"], latitude["minutes"]);
		const longitude_hydro = convertDMToDecimalCoordinate(longitude["degrees"], longitude["minutes"]);

		return {
			shooting_latitude,
			shooting_longitude,
			hauling_latitude,
			hauling_longitude,
			bottom_latitude,
			bottom_longitude,
			latitude_hydro,
			longitude_hydro,
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (haul.sampler_id === 1) {
			// create a deepcopy of the trawl object
			const trawlCopy = JSON.parse(JSON.stringify(trawl));

			const newCoordinates = updateCoordinates();
			// update the coordinates in the deepcopy trawl object
			trawlCopy["shooting_latitude"] = newCoordinates["shooting_latitude"];
			trawlCopy["shooting_longitude"] = newCoordinates["shooting_longitude"];
			trawlCopy["hauling_latitude"] = newCoordinates["hauling_latitude"];
			trawlCopy["hauling_longitude"] = newCoordinates["hauling_longitude"];
			trawlCopy["bottom_latitude"] = newCoordinates["bottom_latitude"];
			trawlCopy["bottom_longitude"] = newCoordinates["bottom_longitude"];
			// to avoid a infinite loop, we need to update the state of the trawl object completely
			// so we need to update the state of the trawl object with the deepcopy

			// update the date time fields, must be null if empty, instead of empty string.
			trawlCopy["shooting_date_time"] =
				trawlCopy["shooting_date_time"] === "" ? null : trawlCopy["shooting_date_time"];
			trawlCopy["hauling_date_time"] =
				trawlCopy["hauling_date_time"] === "" ? null : trawlCopy["hauling_date_time"];
			trawlCopy["bottom_date_time"] = trawlCopy["bottom_date_time"] === "" ? null : trawlCopy["bottom_date_time"];
			setTrawl(trawlCopy);

			const apiTrawl = apiTrawlPartial + haul.id;

			fetch(apiTrawl, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(trawlCopy),
			})
				.then(() => {
					setEdit(false);
				})
				.catch((error) => console.log(error));
		}

		if (haul.sampler_id === 2) {
			// create a deepcopy of the hyfrogaphy object
			const hydrographyCopy = JSON.parse(JSON.stringify(hydrography));

			const newCoordinates = updateCoordinates();

			// update the coordinates in the deepcopy trawl object
			hydrographyCopy["latitude"] = newCoordinates["latitude_hydro"];
			hydrographyCopy["longitude"] = newCoordinates["longitude_hydro"];
			// to avoid a infinite loop, we need to update the state of the trawl object completely
			// so we need to update the state of the trawl object with the deepcopy

			// update the date time fields, must be null if empty, instead of empty string.
			hydrographyCopy["date_time"] = hydrographyCopy["date_time"] === "" ? null : hydrographyCopy["date_time"];
			setHydrography(hydrographyCopy);

			const apiHydrography = apiHydrographyPartial + haul.id;

			fetch(apiHydrography, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(hydrographyCopy),
			})
				.then(() => {
					setEdit(false);
				})
				.catch((error) => console.log(error));
		}

		const apiMeteorology = apiMeteorologyPartial + haul.id;
		fetch(apiMeteorology, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
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
		setHaulingLatitude(backupHaulingLatitude);
		setHaulingLongitude(backupHaulingLongitude);
		setBottomLatitude(backupBottomLatitude);
		setBottomLongitude(backupBottomLongitude);

		//HYDROGRAPHY
		setLatitude(backupLatitude);
		setLongitude(backupLongitude);
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
		const apiMeteorology = apiMeteorologyPartial + haul.id;
		const apiHydrography = apiHydrographyPartial + haul.id;
		const apiTrawl = apiTrawlPartial + haul.id;

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
						// Convert date and time to local time (just removve the Z at the end).
						const fixed_shooting_date_time = fixDateTime(trawl.shooting_date_time);
						const fixed_hauling_date_time = fixDateTime(trawl.hauling_date_time);
						const fixed_bottom_date_time = fixDateTime(trawl.bottom_date_time);
						trawl.shooting_date_time = fixed_shooting_date_time;
						trawl.hauling_date_time = fixed_hauling_date_time;
						trawl.bottom_date_time = fixed_bottom_date_time;

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
	}, [detail, haul.sampler_id, apiHydrographyPartial, haul.id, apiMeteorologyPartial]);

	const renderContent = () => {
		if (Number(haul.sampler_id) === 1) {
			if (edit === false) {
				return (
					<form className="form--wide" disabled>
						<div className="form__row">
							<MeteorologyFormView meteorology={meteorology} />
						</div>
						<div className="form__row">
							<TrawlFormView trawl={trawl} />
						</div>
						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonStatusHandle
										buttonText={"Hide detail"}
										handleMethod={setDetail}
										newStatus={false}
									>
										<UiIconDetailHide />
									</UiButtonStatusHandle>
									<UiButtonStatusHandle buttonText={"Edit"} handleMethod={setEdit} newStatus={true}>
										<UiIconEdit />
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
						{/* <p>Render count: {renderCount}</p> */}
						<div className="form__row">
							<MeteorologyFormEdit
								meteorology={meteorology}
								handleChangeMeteorology={handleChangeMeteorology}
							/>
						</div>

						<div className="form__row">
							<TrawlFormEdit
								trawl={trawl}
								shootingLatitude={shootingLatitude}
								shootingLongitude={shootingLongitude}
								haulingLatitude={haulingLatitude}
								haulingLongitude={haulingLongitude}
								bottomLatitude={bottomLatitude}
								bottomLongitude={bottomLongitude}
								handleChangeTrawl={handleChangeTrawl}
								handleCoordinatesChange={handleCoordinatesChange}
							/>
						</div>

						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonSave buttonText="Save Haul" />
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
							<HydrographyFormView hydrography={hydrography} latitude={latitude} longitude={longitude} />
						</div>

						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonStatusHandle
										buttonText={"Hide detail"}
										handleMethod={setDetail}
										newStatus={false}
									/>

									<UiButtonStatusHandle buttonText={"Edit"} handleMethod={setEdit} newStatus={true} />
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
								latitude={latitude}
								longitude={longitude}
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
