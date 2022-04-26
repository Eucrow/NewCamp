import React, { Component, Fragment } from "react";

import Haul from "./Haul";
import NewHaul from "./new/NewHaul";

import UiButtonAdd from "../ui/UiButtonAdd";
import UiButtonCancel from "../ui/UiButtonCancel";

class Hauls extends Component {
	/**
	 * List of hauls
	 * @param {object} props.hauls
	 * @param {object} props.haul_id
	 * @param {object} props.sampler_id
	 * @param {method} props.deleteHaul
	 */

	constructor(props) {
		super(props);
		this.state = {
			add: false,
		};

		this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/";

		this.changeAdd = this.changeAdd.bind(this);
	}

	/**
	 * Build url api of all the hauls of a survey, using apiHauls and context.
	 * @returns {character} url api.
	 */
	getHaulsApi() {
		return this.context.surveySelector === null
			? this.apiHauls
			: this.apiHauls + this.context.surveySelector;
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
	 * Method to render list of hauls
	 * @returns {character} List of hauls in html.
	 */
	renderHauls() {
		if (this.props.hauls) {
			return (
				<div className="wrapper">
					{this.props.hauls.map((haul) => {
						return (
							<Haul
								key={haul.id}
								haul={haul}
								deleteHaul={this.props.deleteHaul}
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
