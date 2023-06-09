import React, { useState, useEffect, useRef } from "react";

import {
	convertDecimalToDMCoordinate,
	convertDMToDecimalCoordinate,
} from "C:/Users/ieoma/Desktop/NewCamp/front/src/utils/Coordinates";

import MeteorologyFormView from "./view/MeteorologyFormView";
import TrawlFormView from "./view/TrawlFormView";
import HydrographyFormView from "./view/HydrographyFormView";
import MeteorologyFormEdit from "./edit/MeteorologyFormEdit";
import TrawlFormEdit from "./edit/TrawlFormEdit";
import HydrographyFormEdit from "./edit/HydrographyFormEdit";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

const useRenderCount = () => {
	const renderCount = useRef(0);
	useEffect(() => {
		renderCount.current += 1;
	});
	return renderCount.current;
};

const HaulDetails = ({ haul, detail, setDetail }) => {
	/**
	 * Component to show the details of a haul. It is possible to edit the haul.
	 * When the component is loaded, the data of the haul is fetched from the API and stored in the state and
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
	const apiTrawlPartial = "http://127.0.0.1:8000/api/1.0/haul/trawl/";

	const [shootingLatitude, setShootingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [shootingLongitude, setShootingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [haulingLatitude, setHaulingLatitude] = useState({ degrees: 0, minutes: 0 });
	const [haulingLongitude, setHaulingLongitude] = useState({ degrees: 0, minutes: 0 });
	const [bottomLatitude, setBottomLatitude] = useState({ degrees: 0, minutes: 0 });
	const [bottomLongitude, setBottomLongitude] = useState({ degrees: 0, minutes: 0 });

	useEffect(() => {
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
	}, [
		trawl.bottom_latitude,
		trawl.bottom_longitude,
		trawl.hauling_latitude,
		trawl.hauling_longitude,
		trawl.shooting_latitude,
		trawl.shooting_longitude,
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

	const handleCoordinatesChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		// determine which setter function to call based on the name of the input element
		// this is not the best way to do it, but it works
		let setter;
		let units;
		switch (true) {
			case name === "shooting_latitude_degrees":
				setter = setShootingLatitude;
				units = name.split("_")[2];
				break;
			case name === "shooting_longitude_degrees":
				setter = setShootingLongitude;
				units = name.split("_")[2];
				break;
			case name === "hauling_latitude_degrees":
				setter = setHaulingLatitude;
				units = name.split("_")[2];
				break;
			case name === "hauling_longitude_degrees":
				setter = setHaulingLongitude;
				units = name.split("_")[2];
				break;
			case name === "bottom_latitude_degrees":
				setter = setBottomLatitude;
				units = name.split("_")[2];
				break;
			case name === "bottom_longitude_degrees":
				setter = setBottomLongitude;
				units = name.split("_")[2];
				break;
			case name === "shooting_latitude_minutes":
				setter = setShootingLatitude;
				units = name.split("_")[2];
				break;
			case name === "shooting_longitude_minutes":
				setter = setShootingLongitude;
				units = name.split("_")[2];
				break;
			case name === "hauling_latitude_minutes":
				setter = setHaulingLatitude;
				units = name.split("_")[2];
				break;
			case name === "hauling_longitude_minutes":
				setter = setHaulingLongitude;
				units = name.split("_")[2];
				break;
			case name === "bottom_latitude_minutes":
				setter = setBottomLatitude;
				units = name.split("_")[2];
				break;
			case name === "bottom_longitude_minutes":
				setter = setBottomLongitude;
				units = name.split("_")[2];
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

	const handleChangeHydrography = (e) => {
		var name = e.target.name;
		var value = e.target.value;
		setHydrography((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const updateCoordinates = () => {
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

		return {
			shooting_latitude,
			shooting_longitude,
			hauling_latitude,
			hauling_longitude,
			bottom_latitude,
			bottom_longitude,
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// create a deepcopy of the trawl object
		const trawlCopy = JSON.parse(JSON.stringify(trawl));

		if (haul.sampler_id === 1) {
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
			setTrawl(trawlCopy);
		}

		const apiMeteorology = apiMeteorologyPartial + haul.id;
		fetch(apiMeteorology, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(meteorology),
		}).catch((error) => console.log(error));

		const apiHaul =
			haul.sampler_id === 1
				? apiTrawlPartial + haul.id
				: haul.sampler_id === 2
				? apiHydrographyPartial + haul.id
				: null;
		console.log(apiHaul);

		fetch(apiHaul, {
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
	};

	const handleCancel = (status) => {
		setTrawl(backupTrawl);
		setMeteorology(backupMeteorology);
		setHydrography(backupHydrography);
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
						if (response.status > 400) {
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
						if (response.status > 400) {
							setFetchError("Something went wrong!");
						}
						return response.json();
					})
					.then((trawl) => {
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
						className="form--wide"
						onSubmit={(e) => {
							handleSubmit(e);
							setEdit(false);
						}}
					>
						<p>Render count: {renderCount}</p>
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
									<UiButtonCancel buttonText="Cancel" handleMethod={handleCancel} />
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
					<form className="form--wide" disabled>
						<div className="form__row">
							<HydrographyFormView haul={hydrography} />
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
					<div>
						<HydrographyFormEdit
							hydrography={hydrography}
							handleChangeHydrography={handleChangeHydrography}
						/>
						<input type="submit" value="Save Haul" onClick={handleSubmit} />
						<button
							onClick={() => {
								setEdit(false);
							}}
						>
							Cancel Edition
						</button>
					</div>
				);
			}
		}

		return null;
	};

	const renderCount = useRenderCount();

	return renderContent();
};

export default HaulDetails;
