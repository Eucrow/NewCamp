import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import SurveyContext from "../../contexts/SurveyContext.js";
import Haul from "../haul/Haul";
import NewHaul from "../haul/NewHaul";

class Hauls extends Component {
	/**
	 * List of hauls
	 */

	// The contextType property on a class can be assigned a Context object created by React.createContext().
	// This lets you consume the nearest current value of that Context type using this.context. You can reference
	// this in any of the lifecycle methods including the render function.
	static contextType = SurveyContext;

	constructor(props) {
		super(props);
		this.state = {
			add: false,
		};

		// The next api retrieve all the hauls. If a survey id is added at the end, retrieve only the
		// hauls of this survey
		this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/";

		this.routeTrawlCatches = "Catches/haul/";

		this.changeAdd = this.changeAdd.bind(this);
	}

	getHaulsApi() {
		/**
		 * Build url api of all the hauls of a survey, using apiHauls and context
		 */
		return this.context.surveySelector === null ? this.apiHauls : this.apiHauls + this.context.surveySelector;
	}

	changeAdd(add) {
		this.setState(() => {
			return {
				add: add,
			};
		});
	}

	renderHauls() {
		/**
		 * Method to render list of hauls
		 */

		if (this.props.hauls) {
			return (
				<ul>
					{this.props.hauls.map((haul) => {
						return (
							<div key={haul.id}>
								<Haul haul={haul} style={{ display: "inline" }} />
								<button
									style={{ display: "inline" }}
									onClick={(e) => {
										this.props.deleteHaul(e, haul.station.id, haul.id);
									}}
								>
									Delete haul
								</button>
								<Link
									style={{ display: "inline" }}
									to={{
										pathname: this.routeTrawlCatches + haul.id,
										sampler_id: this.props.sampler_id,
										haul_id: this.props.haul_id,
									}}
								>
									view catches
								</Link>
							</div>
						);
					})}
				</ul>
			);
		} else {
			return "there are not hauls";
		}
	}

	renderContent() {
		if (this.state.add === false) {
			return (
				<Fragment>
					<div>
						<button
							style={{ display: "inline" }}
							onClick={() => {
								this.changeAdd(true);
							}}
						>
							Add haul
						</button>
					</div>
					{this.renderHauls()}
				</Fragment>
			);
		} else if (this.state.add === true) {
			return (
				<Fragment>
					<NewHaul changeAdd={this.changeAdd} createHaul={this.props.createHaul} />
					<button
						onClick={() => {
							this.changeAdd(false);
						}}
					>
						Cancel
					</button>
					{this.renderHauls()}
				</Fragment>
			);
		}
	}

	render() {
		return this.renderContent();
	}
}

export default Hauls;
