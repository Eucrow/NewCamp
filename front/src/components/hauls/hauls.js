import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import SurveyContext from "../../contexts/SurveyContext.js";
import ComponentsUiNewHaulButton from "../ui/NewHaulButton.js";
import Haul from "../haul/Haul";

class ComponentsHauls extends Component {
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
			hauls: [],
			loaded: false,
			placeholder: "Loading",
		};

		// The next api retrieve all the hauls. If a survey id is added at the end, retrieve only the
		// hauls of this survey
		this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/";
		this.apiDeleteHaul = "http://127.0.0.1:8000/api/1.0/haul/";

		this.routeTrawlCatches = "Catches/haul/";

		this.deleteHaul = this.deleteHaul.bind(this);
		this.deleteHaulFromState = this.deleteHaulFromState.bind(this);
	}

	getHaulsApi() {
		/**
		 * Build url api of all the hauls of a survey, using apiHauls and context
		 */
		return this.context.surveySelector === null ? this.apiHauls : this.apiHauls + this.context.surveySelector;
	}

	deleteHaulFromState(haul_id) {
		// state, before delete anything
		const currentHauls = this.state.hauls;

		// Remove deleted item from state.
		this.setState({
			hauls: currentHauls.filter((haul) => haul.id !== haul_id),
		});
	}

	deleteHaul(e, ids) {
		/**
		 * Method to delete haul.
		 */

		const api = this.apiDeleteHaul + ids;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(() => this.deleteHaulFromState(ids))
			.catch((error) => alert(error));
	}

	componentDidMount() {
		const APIHauls = this.getHaulsApi();

		fetch(APIHauls)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((hauls) => {
				this.setState(() => {
					return {
						hauls,
						loaded: true,
					};
				});
			});
	}

	render() {
		return (
			<Fragment>
				<div>
					<ComponentsUiNewHaulButton />
				</div>
				<ul>
					{this.state.hauls.map((haul) => {
						return (
							<div>
								<Haul key={haul.id} haul={haul} style={{ display: "inline" }} />
								<button
									style={{ display: "inline" }}
									onClick={(e) => {
										this.deleteHaul(e, haul.id);
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
									{" "}
									view catches{" "}
								</Link>
							</div>
						);
					})}
				</ul>
			</Fragment>
		);
	}
}

export default ComponentsHauls;
