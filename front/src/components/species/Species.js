import React, { Component } from "react";

import Sp from "./Sp.js";

class Species extends Component {
	/**
	 * List of species component.
	 * @param {} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			species: [],
		};

		this.apiSpecies = "http://127.0.0.1:8000/api/1.0/species";

		this.renderContent = this.renderContent.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.handleUpdateSp = this.handleUpdateSp.bind(this);
	}

	handleChange(e, sp_id) {
		const name = e.target.name;
		const value = e.target.value;

		e.preventDefault();
		const newSpecies = this.state.species.map((sp) => {
			if (sp.id === sp_id) {
				var newSp = sp;
				newSp[name] = value;
				return newSp;
			} else {
				return sp;
			}
		});

		this.setState(() => {
			return {
				species: newSpecies,
			};
		});
	}

	handleUpdateSp(e, sp_id) {
		/**
		 * Update species database
		 */

		e.preventDefault();

		const api = this.apiSpecies + "/" + sp_id;

		const updatedSp = this.state.species.filter((sp) => {
			return sp.id === sp_id;
		});

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedSp[0]),
		}).catch((error) => console.log(error));
	}

	renderContent() {
		return this.state.species.map((sp) => {
			return <Sp key={sp.id} sp={sp} handleChange={this.handleChange} handleUpdateSp={this.handleUpdateSp} />;
		});
	}

	componentDidMount() {
		fetch(this.apiSpecies)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((species) =>
				this.setState(() => {
					return { species };
				})
			)
			.catch((error) => console.log(error));
	}

	render() {
		return this.renderContent();
	}
}

export default Species;
