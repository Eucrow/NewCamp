import React, { Component } from "react";

import update from "immutability-helper";

import ViewCommon from "./view/ViewCommon";
import ViewMeteorology from "./view/ViewMeteorology";
import ViewTrawl from "./view/ViewTrawl";
import ViewHydrography from "./view/ViewHydrography";
import EditMeteorology from "./edit/EditMeteorology";
import EditTrawl from "./edit/EditTrawl";
import EditHydrography from "./edit/EditHydrography";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

class HaulDetails extends Component {
	/**
	 * View haul detail component.
	 * @param {object} haul
	 * @param {method} validateHaulSampler
	 * @param {method} handleDetail
	 */

	constructor(props) {
		super(props);

		this.state = {
			haul: {
				meteo: {},
				trawl_characteristics: {},
				hydrography_characteristics: {},
				sampler: {},
			},
			edit: false,
		};

		//TODO: optimize requests: the request only need to return station_id, meteo,
		// trawl_characteristics and hydrograpy_characteristics
		this.apiTrawlHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/" + this.props.haul.id;
		this.apiHydrographyHaul = "http://127.0.0.1:8000/api/1.0/haul/hydrography/" + this.props.haul.id;

		this.changeIsEdit = this.changeIsEdit.bind(this);
		this.handleChangeMeteorology = this.handleChangeMeteorology.bind(this);
		this.handleChangeTrawl = this.handleChangeTrawl.bind(this);
		this.handleChangeHydrography = this.handleChangeHydrography.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.renderContent = this.renderContent.bind(this);
	}

	changeIsEdit(edit) {
		this.setState(() => {
			return {
				edit: edit,
			};
		});
	}

	handleChangeMeteorology(event) {
		const name = event.target.name;
		const value = event.target.value;

		const newHaulMeteo = update(this.state.haul, {
			meteo: {
				[name]: { $set: value },
			},
		});

		this.setState({
			haul: newHaulMeteo,
		});
	}

	handleChangeTrawl(event) {
		const name = event.target.name;
		const value = event.target.value;

		const newHaulTrawl = update(this.state.haul, {
			trawl_characteristics: {
				[name]: { $set: value },
			},
		});

		this.setState({
			haul: newHaulTrawl,
		});
	}

	handleChangeHydrography(event) {
		const name = event.target.name;
		const value = event.target.value;

		const newHaulHydrography = update(this.state.haul, {
			hydrography_characteristics: {
				[name]: { $set: value },
			},
		});

		this.setState({
			haul: newHaulHydrography,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const apiHaul =
			this.state.haul.sampler_id === 1
				? this.apiTrawlHaul
				: this.state.haul.sampler_id === 2
				? this.apiHydrographyHaul
				: null;

		console.log(JSON.stringify(this.state.haul));

		fetch(apiHaul, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.state.haul),
		})
			.then(() => {
				this.setState(() => {
					return { edit: false };
				});
			})
			.catch((error) => console.log(error));
	}

	componentDidMount() {
		/**
		 * When the component is mounted, get the sampler_id from props, fetch the complete
		 * data of the haul and update the state with it.
		 */
		const apiHaul =
			parseInt(this.props.haul.sampler_id) === 1
				? this.apiTrawlHaul
				: parseInt(this.props.haul.sampler_id) === 2
				? this.apiHydrographyHaul
				: null;

		// Fetch haul.
		fetch(apiHaul)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((haul) => {
				this.setState(() => {
					return {
						haul,
					};
				});
			});
	}

	renderContent() {
		if (this.state.haul.sampler_id === 1) {
			if (this.state.edit === false) {
				return (
					<form className="form--wide" disabled>
						<div className="form__row">
							<ViewMeteorology haul={this.state.haul} />
						</div>
						<div className="form__row">
							<ViewTrawl haul={this.state.haul} />
						</div>
						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonStatusHandle
										buttonText={"Hide detail"}
										handleMethod={this.props.handleDetail}
										newStatus={false}
									/>

									<UiButtonStatusHandle
										buttonText={"Edit"}
										handleMethod={this.changeIsEdit}
										newStatus={true}
									/>
								</div>
							</div>
						</div>
					</form>
				);
			}

			if (this.state.edit === true) {
				return (
					<form
						className="form--wide"
						onSubmit={(e) => {
							this.handleSubmit(e);
							this.changeIsEdit(false);
						}}
					>
						<div className="form__row">
							<EditMeteorology
								haul={this.state.haul}
								handleChangeMeteorology={this.handleChangeMeteorology}
							/>
						</div>

						<div className="form__row">
							<EditTrawl haul={this.state.haul} handleChangeTrawl={this.handleChangeTrawl} />
						</div>

						<div className="form__row">
							<div className="form__cell form__cell--right">
								<div className="buttonsWrapper">
									<UiButtonSave buttonText="Save Haul" />
									<UiButtonCancel buttonText="Cancel" handleMethod={this.changeIsEdit} />
								</div>
							</div>
						</div>
					</form>
				);
			}
		}

		if (this.state.haul.sampler_id === 2) {
			if (this.state.edit === false) {
				return (
					<div>
						<ViewCommon haul={this.state.haul} />
						<ViewHydrography haul={this.state.haul} />
						<button type="submit" className="buttonsWrapper__button">
							Save
						</button>
						<button
							onClick={() => {
								this.props.handleDetail(false);
							}}
						>
							Hide detail
						</button>
					</div>
				);
			}

			if (this.state.edit === true) {
				return (
					<div>
						<EditHydrography
							haul={this.state.haul}
							handleChangeHydrography={this.handleChangeHydrography}
						/>
						<input type="submit" value="Save Haul" onClick={this.handleSubmit} />
						<button
							onClick={() => {
								this.changeIsEdit(false);
							}}
						>
							Cancel Edition
						</button>
					</div>
				);
			}
		}

		return null;
	}

	render() {
		return this.renderContent();
	}
}

export default HaulDetails;
