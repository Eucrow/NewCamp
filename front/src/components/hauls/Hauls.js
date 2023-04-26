import React, { Component, Fragment } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import Haul from "./Haul";
import HaulHandleNew from "./new/HaulHandleNew";
import UiButtonAdd from "../ui/UiButtonAdd";
import UiButtonCancel from "../ui/UiButtonCancel";

class Hauls extends Component {
	/**
	 * List of hauls
	 * @param {object} hauls
	 * @param {object} station_id
	 * @param {object} sampler_id
	 */

	static contextType = SelectedSurveyContext;

	constructor(props) {
		super(props);
		this.state = {
			add: false,
			survey: {},
		};

		this.changeAdd = this.changeAdd.bind(this);
		this.validateHaulSampler = this.validateHaulSampler.bind(this);
	}

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
			e.target.setCustomValidity("This combination of haul/sampler already exists.");
		} else {
			e.target.setCustomValidity("");
		}
		return e.target.reportValidity();
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
					<HaulHandleNew
						station_id={this.props.station_id}
						changeAdd={this.changeAdd}
						createHaul={this.props.createHaul}
						validateHaulSampler={this.validateHaulSampler}
					/>
					<UiButtonCancel handleMethod={this.changeAdd} text={"Cancel"} />
				</Fragment>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Hauls;
