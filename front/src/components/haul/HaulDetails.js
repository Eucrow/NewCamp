import React, { Component } from "react";

import update from "immutability-helper";

import ViewCommon from "./ViewCommon";
import ViewMeteorology from "./ViewMeteorology";
import ViewTrawl from "./ViewTrawl";
import ViewHydrography from "./ViewHydrography";

import EditCommon from "./EditCommon";
import EditMeteorology from "./EditMeteorology";
import EditTrawl from "./EditTrawl";
import EditHydrography from "./EditHydrography";

class HaulDetails extends Component {
	/**
	 * View haul detail component.
	 */

	constructor(props) {
		super(props);

		this.state = {
			haul: {
				meteo: {},
				trawl_characteristics: {},
				hydrography_characteristics: {},
				station: {},
				sampler: {},
			},

			edit: false,
		};

		this.apiTrawlHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/" + this.props.haul.id;
		this.apiHydrographyHaul = "http://127.0.0.1:8000/api/1.0/haul/hydrography/" + this.props.haul.id;

		this.changeIsEdit = this.changeIsEdit.bind(this);
		this.handleChangeCommon = this.handleChangeCommon.bind(this);
		this.handleChangeCommonValid = this.handleChangeCommonValid.bind(this);
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

	handleChangeCommon(event) {
		const name = event.target.name;
		const value = event.target.value;

		const newHaulState = update(this.state.haul, {
			[name]: { $set: value },
		});

		this.setState({
			haul: newHaulState,
		});
	}

	handleChangeCommonValid(event) {
		const newHaulState = update(this.state.haul, {
			valid: { $set: !this.state.haul.valid },
		});

		this.setState({
			haul: newHaulState,
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
			this.state.haul.sampler.id === 1
				? this.apiTrawlHaul
				: this.state.haul.sampler.id === 2
				? this.apiHydrographyHaul
				: null;

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

	renderContent() {
		if (this.state.haul.sampler.id === 1) {
			if (this.state.edit === false) {
				return (
					<div>
						<ViewCommon haul={this.state.haul} />
						<ViewMeteorology haul={this.state.haul} />
						<ViewTrawl haul={this.state.haul} />
						<button
							onClick={() => {
								this.changeIsEdit(true);
							}}
						>
							Edit
						</button>
					</div>
				);
			}

			if (this.state.edit === true) {
				return (
					<div>
						<EditCommon
							haul={this.state.haul}
							handleChangeCommonValid={this.handleChangeCommonValid}
							handleChangeCommon={this.handleChangeCommon}
						/>
						<EditMeteorology
							haul={this.state.haul}
							handleChangeMeteorology={this.handleChangeMeteorology}
						/>
						<EditTrawl haul={this.state.haul} handleChangeTrawl={this.handleChangeTrawl} />
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

		if (this.state.haul.sampler.id === 2) {
			if (this.state.edit === false) {
				return (
					<div>
						<ViewCommon haul={this.state.haul} />
						<ViewHydrography haul={this.state.haul} />
						<button
							onClick={() => {
								this.changeIsEdit(true);
							}}
						>
							Edit
						</button>
					</div>
				);
			}

			if (this.state.edit === true) {
				return (
					<div>
						<EditCommon
							haul={this.state.haul}
							handleChangeCommonValid={this.handleChangeCommonValid}
							handleChangeCommon={this.handleChangeCommon}
						/>
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
		return "The type of sampler must be 1 or 2";
	}

	componentDidMount() {
		const apiHaul =
			this.props.haul.sampler.id === 1
				? this.apiTrawlHaul
				: this.props.haul.sampler.id === 2
				? this.apiHydrographyHaul
				: null;

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

	render() {
		return this.renderContent();
	}
}

export default HaulDetails;
