import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

import SurveyContext from "../../contexts/SurveyContext.js";
import Haul from "../haul/Haul";
import NewHaul from "../haul/NewHaul";

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

			stations: [],

			add: false,
		};

		// The next api retrieve all the hauls. If a survey id is added at the end, retrieve only the
		// hauls of this survey
		this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/";
		this.apiDeleteHaul = "http://127.0.0.1:8000/api/1.0/haul/";

		this.apiTrawlForm = "http://127.0.0.1:8000/api/1.0/haul/trawl/new/";
		this.apiHydrographyForm = "http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";

		this.routeTrawlCatches = "Catches/haul/";

		this.changeAdd = this.changeAdd.bind(this);

		this.createHaul = this.createHaul.bind(this);

		this.deleteHaul = this.deleteHaul.bind(this);
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

	createHaul(event, haul) {
		/**
		 * Method to create haul
		 * */
		event.preventDefault();

		const apiForm =
			haul.sampler.id === "1" ? this.apiTrawlForm : haul.sampler.id === "2" ? this.apiHydrographyForm : null;

		console.log(JSON.stringify(haul));

		fetch(apiForm, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(haul),
		})
			.then((response) => response.json())
			.then((c) => {
				const new_hauls = [...this.state.hauls, c];
				this.setState(() => {
					return {
						hauls: new_hauls,
					};
				});
			})
			.then(() => this.changeAdd(false))
			.catch((error) => console.log(error));
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
			.then(() =>
				this.setState({
					hauls: this.state.hauls.filter((haul) => haul.id !== ids),
				})
			)
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

	renderHauls() {
		/**
		 * Method to render list of hauls
		 */
		return (
			<ul>
				{this.state.hauls.map((haul) => {
					return (
						<div key={haul.id}>
							<Haul haul={haul} style={{ display: "inline" }} />
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
		);
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
					<NewHaul changeAdd={this.changeAdd} createHaul={this.createHaul} />
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

export default ComponentsHauls;
