import React, { Component } from "react";

import ViewSpeciesList from "./ViewSpeciesList";
import NewSp from "./NewSp";

class Species extends Component {
	/**
	 * List of species component.
	 * @param {} props
	 */
	constructor(props) {
		super(props);
		this.state = {
			species: [],
			add: false,
		};

		this.apiSpecies = "http://127.0.0.1:8000/api/1.0/species";
		this.apiCreateSp = "http://127.0.0.1:8000/api/1.0/species/new/";

		this.renderContent = this.renderContent.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.handleUpdateSp = this.handleUpdateSp.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createSp = this.createSp.bind(this);
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

	handleAdd(status) {
		this.setState(() => {
			return {
				add: status,
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

	createSp(e, new_sp) {
		/**
		 * Save catch to database.
		 */

		e.preventDefault();

		// TODO: detect if the species alraedy exists
		// this.existsCatch(new_sp.haul_id, new_sp.sp_id, new_sp.category).then((response) => {
		// 	if (response === true) {
		// 		alert("Catch already exists");
		// 	} else {
		fetch(this.apiCreateSp, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(new_sp),
		})
			.then((response) => response.json())
			.then((c) => {
				const new_species = [...this.state.species, c];
				this.setState(() => {
					return {
						species: new_species,
					};
				}).then(() => console.log(this.state));
			})
			.catch((error) => console.log(error));
		// 	}
		// });
	}

	AddButton(content, status) {
		return (
			<button
				onClick={() => {
					this.handleAdd(status);
				}}
			>
				{content}
			</button>
		);
	}

	renderContent() {
		var content = "";

		if (this.state.add === false) {
			content = (
				<div>
					{this.AddButton("Add species", true)}
					<ViewSpeciesList
						species={this.state.species}
						handleChange={this.handleChange}
						handleUpdateSp={this.handleUpdateSp}
					/>
				</div>
			);
		} else if (this.state.add === true) {
			content = (
				<div>
					<NewSp species={this.state.species} handleAdd={this.handleAdd} createSp={this.createSp} />
					<ViewSpeciesList
						species={this.state.species}
						handleChange={this.handleChange}
						handleUpdateSp={this.handleUpdateSp}
					/>
				</div>
			);
		}

		return content;
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
