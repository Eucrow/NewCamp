import React, { Component, Fragment } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";

import Haul from "./Haul";
import NewHaul from "./new/NewHaul";

import UiButtonAdd from "../ui/UiButtonAdd";
import UiButtonCancel from "../ui/UiButtonCancel";

class Hauls extends Component {
	/**
	 * List of hauls
	 * @param {object} props.hauls
	 * @param {object} props.station_id
	 * @param {object} props.sampler_id
	 * @param {method} props.deleteHaul
	 */

	static contextType = SelectedSurveyContext;

	constructor(props) {
		super(props);
		this.state = {
			add: false,
			survey: {},
			strata: [],
			samplers: [],
			gears: [],
		};

		// this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/";

		this.apiSurveyPartial = "http://127.0.0.1:8000/api/1.0/survey/";
		this.apiStrataPartial = "http://127.0.0.1:8000/api/1.0/strata/";
		this.apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";
		this.apiGears = "http://127.0.0.1:8000/api/1.0/trawl/basic/";

		this.changeAdd = this.changeAdd.bind(this);
		this.validateHaulSampler = this.validateHaulSampler.bind(this);
	}

	/**
	 * Build url api of all the hauls of a survey, using apiHauls and context.
	 * @returns {character} url api.
	 */
	// getHaulsApi() {
	// 	return this.context.surveySelector === null
	// 		? this.apiHauls
	// 		: this.apiHauls + this.context.surveySelector;
	// }

	/**
	 * Manage the state of variable 'add' to show or not he NewHaul component.
	 * @param {boolean} add True if NewHaul component must be showed. False if doesn't.
	 */
	changeAdd(add) {
		this.setState(() => {
			return {
				add: add,
			};
		});
	}

	/**
	 * Method to check if a combination of haul / sampler_id already exists in the hauls of this component.
	 * @param {string} haul haul to check if alreay exists.
	 * @param {string} sampler_id sampler_id to check if alreay exists.
	 * @returns True if exists, false if doesn't.
	 */
	haulSamplerExists(haul, sampler_id) {
		var sampler_exists = Object.keys(this.props.hauls).map((h) => {
			if (
				(this.props.hauls[h]["haul"] === parseInt(haul)) &
				(this.props.hauls[h]["sampler_id"] === parseInt(sampler_id))
			) {
				return true;
			} else {
				return false;
			}
		});

		return sampler_exists.some((s) => s === true);
	}

	/**
	 * Validate the combination of sampler_id / haul.
	 * @param {event} e event.
	 * @param {string} sampler_id sampler to check if is valid.
	 * @param {string} haul haul to check if is valid.
	 * @returns Throw reportValidity, showing an error when the validation is not passed.
	 */
	validateHaulSampler(e, haul, sampler_id) {
		const sampler_exists = this.haulSamplerExists(haul, sampler_id);

		if (sampler_exists === true) {
			e.target.setCustomValidity(
				"This combination of haul/sampler already exists."
			);
		} else {
			e.target.setCustomValidity("");
		}
		return e.target.reportValidity();
	}

	componentDidMount() {
		/**
		 * First, check if a survey is selected. If doesn't, redirec to hauls page.
		 */
		if (this.context.surveySelector === null) {
			//TODO: I think this is not working in the right way
			this.setState(() => {
				this.context.surveySelector = 1;
			});
			this.forceUpdate();
		} else {
			/**
			 * When the component is mounted, retrieve the posible stratum and sampler and save in state
			 */

			const apiSurvey =
				this.apiSurveyPartial + this.context.selectedSurveyId;

			const apiSamplers = this.apiSamplers;
			const apiGears = this.apiGears;

			// TODO: Optimize fetchs
			// Fetch strata (require previously fetch survey to get stratification).
			fetch(apiSurvey)
				.then((response) => {
					if (response.status > 400) {
						return this.setState(() => {
							return { placeholder: "Something went wrong!" };
						});
					}
					return response.json();
				})
				.then((survey) => {
					const apiStrata =
						this.apiStrataPartial + survey.stratification;
					fetch(apiStrata)
						.then((response) => {
							if (response.status > 400) {
								return this.setState(() => {
									return {
										placeholder: "Something went wrong!",
									};
								});
							}
							return response.json();
						})
						.then((strata) => {
							this.setState(() => {
								return {
									strata: strata,
								};
							});
						});
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
					this.setState(() => {
						return {
							samplers: samplers,
						};
					});
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
					this.setState(() => {
						return {
							gears: gears,
						};
					});
				});
		}
	}

	/**
	 * Method to render list of hauls
	 * @returns {character} List of hauls in html.
	 */
	renderHauls() {
		if (this.props.hauls) {
			return (
				<div>
					{this.props.hauls.map((haul) => {
						return (
							<Haul
								key={haul.id}
								haul={haul}
								station_id={this.props.station_id}
								deleteHaul={this.props.deleteHaul}
								strata={this.state.strata}
								samplers={this.state.samplers}
								gears={this.state.gears}
								validateHaulSampler={this.validateHaulSampler}
							/>
						);
					})}
				</div>
			);
		} else {
			return "there are not hauls";
		}
	}

	renderContent() {
		if (this.state.add === false) {
			return (
				<Fragment>
					{this.renderHauls()}
					<UiButtonAdd handleAdd={this.changeAdd} text={"Add haul"} />
				</Fragment>
			);
		} else if (this.state.add === true) {
			return (
				<Fragment>
					{this.renderHauls()}
					<NewHaul
						station_id={this.props.station_id}
						changeAdd={this.changeAdd}
						createHaul={this.props.createHaul}
						validateHaulSampler={this.validateHaulSampler}
					/>
					<UiButtonCancel
						handleMethod={this.changeAdd}
						text={"Cancel"}
					/>
				</Fragment>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Hauls;
