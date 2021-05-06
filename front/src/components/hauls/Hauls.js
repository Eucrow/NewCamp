import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import Haul from "./Haul";
import NewHaul from "./new/NewHaul";

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
		return this.context.surveySelector === null
			? this.apiHauls
			: this.apiHauls + this.context.surveySelector;
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
							<li key={haul.id}>
								<Haul haul={haul} />
								<button
									style={{ display: "inline" }}
									onClick={(e) => {
										this.props.deleteHaul(
											e,
											haul.station.id,
											haul.id
										);
									}}
								>
									Delete haul
								</button>
								<Link
									style={{ display: "inline" }}
									to={{
										pathname:
											this.routeTrawlCatches + haul.id,
										sampler_id: this.props.sampler_id,
										haul_id: this.props.haul_id,
									}}
								>
									view catches
								</Link>
							</li>
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
					{this.renderHauls()}
					<button
						onClick={() => {
							this.changeAdd(true);
						}}
					>
						Add haul
					</button>
				</Fragment>
			);
		} else if (this.state.add === true) {
			return (
				<Fragment>
					<NewHaul
						station_id={this.props.station_id}
						changeAdd={this.changeAdd}
						createHaul={this.props.createHaul}
					/>
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
