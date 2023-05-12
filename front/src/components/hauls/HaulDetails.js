import React, { useState, useEffect } from "react";

import HaulFormView from "./view/HaulFormView";
import ViewMeteorology from "./view/MeteorologyFormView";
import ViewTrawl from "./view/TrawlFormView";
import ViewHydrography from "./view/HydrographyFormView";
import MeteorologyFormEdit from "./edit/MeteorologyFormEdit";
import TrawlFormEdit from "./edit/TrawlFormEdit";
import EditHydrography from "./edit/HydrographyFormEdit";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

const HaulDetails = ({ haul, detail, setDetail }) => {
	/**
	 * Component to show the details of a haul. It is possible to edit the haul.
	 * When the component is loaded, the data of the haul is fetched from the API and stored in the state and
	 * stored in the backup state. This one is used to recovery the original data if the user cancel the changes.
	 * @param {object} haul The haul object.
	 * @param {boolean} detail Boolean to show the details of the haul.
	 * @param {method} setDetail Method to set the boolean detail.
	 */

	const [thisHaul, setThisHaul] = useState({
		...haul,
		meteo: {},
		trawl_characteristics: {},
		hydrography_characteristics: {},
		sampler: {},
	});

	const [backupThisHaul, setBackupThisHaul] = useState({
		...haul,
		meteo: {},
		trawl_characteristics: {},
		hydrography_characteristics: {},
		sampler: {},
	});

	const [edit, setEdit] = useState(false);

	const [fecthError, setFetchError] = useState("");

	const apiTrawlHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/" + haul.id;
	const apiHydrographyHaul = "http://127.0.0.1:8000/api/1.0/haul/hydrography/" + haul.id;

	const handleChangeMeteorology = (e) => {
		var name = e.target.name;
		var value = e.target.value;

		setThisHaul((prevHaul) => ({
			...prevHaul,
			meteo: {
				...prevHaul.meteo,
				[name]: value,
			},
		}));
	};
	const handleChangeTrawl = (e) => {
		var name = e.target.name;
		var value = e.target.value;
		setThisHaul((prevHaul) => ({
			...prevHaul,
			trawl_characteristics: {
				...prevHaul.trawl_characteristics,
				[name]: value,
			},
		}));
	};

	const handleChangeHydrography = (e) => {
		var name = e.target.name;
		var value = e.target.value;
		setThisHaul((prevHaul) => ({
			...prevHaul,
			hydrography_characteristics: {
				...prevHaul.hydrography_characteristics,
				[name]: value,
			},
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const apiHaul = haul.sampler_id === 1 ? apiTrawlHaul : haul.sampler_id === 2 ? apiHydrographyHaul : null;

		fetch(apiHaul, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(thisHaul),
		})
			.then(() => {
				setEdit(false);
			})
			.catch((error) => console.log(error));
	};

	const handleCancel = (status) => {
		setThisHaul((prevHaul) => {
			return {
				...prevHaul,
				meteo: backupThisHaul["meteo"],
				trawl_characteristics: backupThisHaul["trawl_characteristics"],
				hydrography_characteristics: backupThisHaul["hydrography_characteristics"],
			};
		});
		setEdit(status);
	};

	useEffect(() => {
		if (detail === true) {
			const apiHaul =
				parseInt(haul.sampler_id) === 1
					? apiTrawlHaul
					: parseInt(haul.sampler_id) === 2
					? apiHydrographyHaul
					: null;

			// Fetch haul.
			fetch(apiHaul)
				.then((response) => {
					if (response.status > 400) {
						setFetchError("Something went wrong!");
					}
					return response.json();
				})
				.then((haul) => {
					setThisHaul(haul);
					setBackupThisHaul(haul);
				});
		}
	}, [detail, apiHydrographyHaul, apiTrawlHaul, haul.sampler_id]);

	const renderContent = () => {
		if (Number(haul.sampler_id) === 1) {
			if (edit === false) {
				return (
					<form className="form--wide" disabled>
						<div className="form__row">
							<ViewMeteorology haul={thisHaul} />
						</div>
						<div className="form__row">
							<ViewTrawl haul={thisHaul} />
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
						<div className="form__row">
							<MeteorologyFormEdit haul={thisHaul} handleChangeMeteorology={handleChangeMeteorology} />
						</div>

						<div className="form__row">
							<TrawlFormEdit haul={thisHaul} handleChangeTrawl={handleChangeTrawl} />
						</div>

						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonSave buttonText="Save Haul" />
									{/* <UiButtonCancel buttonText="Cancel" handleMethod={setEdit} /> */}
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
							<ViewHydrography haul={thisHaul} />
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
						<EditHydrography haul={thisHaul} handleChangeHydrography={handleChangeHydrography} />
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

	return renderContent();
};

export default HaulDetails;
