import React, { useState, useEffect } from "react";

import MeteorologyFormView from "./view/MeteorologyFormView";
import TrawlFormView from "./view/TrawlFormView";
import HydrographyFormView from "./view/HydrographyFormView";
import MeteorologyFormEdit from "./edit/MeteorologyFormEdit";
import TrawlFormEdit from "./edit/TrawlFormEdit";
import HydrographyFormEdit from "./edit/HydrographyFormEdit";

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

	const handleSubmit = (e) => {
		e.preventDefault();

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
			body: JSON.stringify(trawl),
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

	useEffect(() => {
		const apiMeteorology = apiMeteorologyPartial + haul.id;
		const apiHydrography = apiHydrographyPartial + haul.id;
		const apiTrawl = apiTrawlPartial + haul.id;

		if (detail === true) {
			if (haul.sampler_id === 1) {
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
						<div className="form__row">
							<MeteorologyFormEdit
								meteorology={meteorology}
								handleChangeMeteorology={handleChangeMeteorology}
							/>
						</div>

						<div className="form__row">
							<TrawlFormEdit trawl={trawl} handleChangeTrawl={handleChangeTrawl} />
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

	return renderContent();
};

export default HaulDetails;
