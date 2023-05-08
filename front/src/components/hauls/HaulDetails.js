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

const HaulDetails = ({ haul, detail, setDetail, validateHaulSampler }) => {
	/**
	 * View haul detail component.
	 * @param {object} haul
	 * @param {method} validateHaulSampler
	 * @param {method} setDetail
	 */

	const [thisHaul, setThisHaul] = useState({
		...haul,
		meteo: {},
		trawl_characteristics: {},
		hydrography_characteristics: {},
		sampler: {},
	});

	const [edit, setEdit] = useState(false);

	const [fecthError, setFetchError] = useState("");

	//TODO: optimize requests: the request only need to return station_id, meteo,
	// trawl_characteristics and hydrograpy_characteristics
	const apiTrawlHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/" + haul.id;
	const apiHydrographyHaul = "http://127.0.0.1:8000/api/1.0/haul/hydrography/" + haul.id;

	const handleChangeMeteorology = (event) => {
		var name = event.target.name;
		var value = event.target.value;

		setThisHaul((prevHaul) => ({
			...prevHaul,
			meteo: {
				...prevHaul.meteo,
				[name]: value,
			},
		}));
	};
	const handleChangeTrawl = (event) => {
		var name = event.target.name;
		var value = event.target.value;
		setThisHaul((prevHaul) => ({
			...prevHaul,
			trawl_characteristics: {
				...prevHaul.trawl_characteristics,
				[name]: value,
			},
		}));
	};

	const handleChangeHydrography = (event) => {
		var name = event.target.name;
		var value = event.target.value;
		setThisHaul((prevHaul) => ({
			...prevHaul,
			hydrography_characteristics: {
				...prevHaul.hydrography_characteristics,
				[name]: value,
			},
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const apiHaul = haul.sampler_id === 1 ? apiTrawlHaul : haul.sampler_id === 2 ? apiHydrographyHaul : null;

		// console.log(JSON.stringify(thisHaul));

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
									<UiButtonCancel buttonText="Cancel" handleMethod={setEdit} />
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
					<div>
						<ViewHydrography haul={thisHaul} />
						<button type="submit" className="buttonsWrapper__button">
							Save
						</button>
						<button
							onClick={() => {
								setDetail(false);
							}}
						>
							Hide detail
						</button>
					</div>
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

// class HaulDetails extends Component {
// 	/**
// 	 * View haul detail component.
// 	 * @param {object} haul
// 	 * @param {method} validateHaulSampler
// 	 * @param {method} handleDetail
// 	 */

// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			haul: {
// 				meteo: {},
// 				trawl_characteristics: {},
// 				hydrography_characteristics: {},
// 				sampler: {},
// 			},
// 			edit: false,
// 		};

// 		//TODO: optimize requests: the request only need to return station_id, meteo,
// 		// trawl_characteristics and hydrograpy_characteristics
// 		this.apiTrawlHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/" + haul.id;
// 		this.apiHydrographyHaul = "http://127.0.0.1:8000/api/1.0/haul/hydrography/" + haul.id;

// 		setEdit = setEdit.bind(this);
// 		this.handleChangeMeteorology = this.handleChangeMeteorology.bind(this);
// 		this.handleChangeTrawl = this.handleChangeTrawl.bind(this);
// 		this.handleChangeHydrography = this.handleChangeHydrography.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);

// 		this.renderContent = this.renderContent.bind(this);
// 	}

// 	changeIsEdit(edit) {
// 		this.setState(() => {
// 			return {
// 				edit: edit,
// 			};
// 		});
// 	}

// 	handleChangeMeteorology(event) {
// 		const name = event.target.name;
// 		const value = event.target.value;

// 		const newHaulMeteo = update(haul, {
// 			meteo: {
// 				[name]: { $set: value },
// 			},
// 		});

// 		this.setState({
// 			haul: newHaulMeteo,
// 		});
// 	}

// 	handleChangeTrawl(event) {
// 		const name = event.target.name;
// 		const value = event.target.value;

// 		const newHaulTrawl = update(haul, {
// 			trawl_characteristics: {
// 				[name]: { $set: value },
// 			},
// 		});

// 		this.setState({
// 			haul: newHaulTrawl,
// 		});
// 	}

// 	handleChangeHydrography(event) {
// 		const name = event.target.name;
// 		const value = event.target.value;

// 		const newHaulHydrography = update(haul, {
// 			hydrography_characteristics: {
// 				[name]: { $set: value },
// 			},
// 		});

// 		this.setState({
// 			haul: newHaulHydrography,
// 		});
// 	}

// 	handleSubmit(event) {
// 		event.preventDefault();

// 		const apiHaul =
// 			haul.sampler_id === 1
// 				? this.apiTrawlHaul
// 				: haul.sampler_id === 2
// 				? this.apiHydrographyHaul
// 				: null;

// 		console.log(JSON.stringify(haul));

// 		fetch(apiHaul, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(haul),
// 		})
// 			.then(() => {
// 				this.setState(() => {
// 					return { edit: false };
// 				});
// 			})
// 			.catch((error) => console.log(error));
// 	}

// 	componentDidMount() {
// 		/**
// 		 * When the component is mounted, get the sampler_id from props, fetch the complete
// 		 * data of the haul and update the state with it.
// 		 */
// 		const apiHaul =
// 			parseInt(haul.sampler_id) === 1
// 				? this.apiTrawlHaul
// 				: parseInt(haul.sampler_id) === 2
// 				? this.apiHydrographyHaul
// 				: null;

// 		// Fetch haul.
// 		fetch(apiHaul)
// 			.then((response) => {
// 				if (response.status > 400) {
// 					return this.setState(() => {
// 						return { placeholder: "Something went wrong!" };
// 					});
// 				}
// 				return response.json();
// 			})
// 			.then((haul) => {
// 				this.setState(() => {
// 					return {
// 						haul,
// 					};
// 				});
// 			});
// 	}

// 	renderContent() {
// 		if (haul.sampler_id === 1) {
// 			if (edit === false) {
// 				return (
// 					<form className="form--wide" disabled>
// 						<div className="form__row">
// 							<ViewMeteorology haul={haul} />
// 						</div>
// 						<div className="form__row">
// 							<ViewTrawl haul={haul} />
// 						</div>
// 						<div className="form__row">
// 							<div className="form__cell form__cell--right">
// 								<div className="buttonsWrapper">
// 									<UiButtonStatusHandle
// 										buttonText={"Hide detail"}
// 										handleMethod={handleDetail}
// 										newStatus={false}
// 									/>

// 									<UiButtonStatusHandle
// 										buttonText={"Edit"}
// 										handleMethod={setEdit}
// 										newStatus={true}
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 					</form>
// 				);
// 			}

// 			if (edit === true) {
// 				return (
// 					<form
// 						className="form--wide"
// 						onSubmit={(e) => {
// 							this.handleSubmit(e);
// 							setEdit(false);
// 						}}
// 					>
// 						<div className="form__row">
// 							<MeteorologyFormEdit
// 								haul={haul}
// 								handleChangeMeteorology={this.handleChangeMeteorology}
// 							/>
// 						</div>

// 						<div className="form__row">
// 							<TrawlFormEdit haul={haul} handleChangeTrawl={this.handleChangeTrawl} />
// 						</div>

// 						<div className="form__row">
// 							<div className="form__cell form__cell--right">
// 								<div className="buttonsWrapper">
// 									<UiButtonSave buttonText="Save Haul" />
// 									<UiButtonCancel buttonText="Cancel" handleMethod={setEdit} />
// 								</div>
// 							</div>
// 						</div>
// 					</form>
// 				);
// 			}
// 		}

// 		if (haul.sampler_id === 2) {
// 			if (edit === false) {
// 				return (
// 					<div>
// 						<HaulFormView haul={haul} />
// 						<ViewHydrography haul={haul} />
// 						<button type="submit" className="buttonsWrapper__button">
// 							Save
// 						</button>
// 						<button
// 							onClick={() => {
// 								handleDetail(false);
// 							}}
// 						>
// 							Hide detail
// 						</button>
// 					</div>
// 				);
// 			}

// 			if (edit === true) {
// 				return (
// 					<div>
// 						<EditHydrography
// 							haul={haul}
// 							handleChangeHydrography={this.handleChangeHydrography}
// 						/>
// 						<input type="submit" value="Save Haul" onClick={this.handleSubmit} />
// 						<button
// 							onClick={() => {
// 								setEdit(false);
// 							}}
// 						>
// 							Cancel Edition
// 						</button>
// 					</div>
// 				);
// 			}
// 		}

// 		return null;
// 	}

// 	render() {
// 		return this.renderContent();
// 	}
// }

export default HaulDetails;
