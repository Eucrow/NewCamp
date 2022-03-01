import React, { Component } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import Sp from "./Sp";
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

		this.apiSpecies = "http://127.0.0.1:8000/api/1.0/species/";
		// this.apiCreateSp = "http://127.0.0.1:8000/api/1.0/species/new/";

		this.renderContent = this.renderContent.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.handleUpdateSp = this.handleUpdateSp.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createSp = this.createSp.bind(this);
		this.deleteSp = this.deleteSp.bind(this);
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
	/**
	 * Update species database
	 */
	handleUpdateSp(e, sp_id) {
		e.preventDefault();

		const api = this.apiSpecies + sp_id;

		const updatedSp = this.state.species.filter((sp) => {
			return sp.id === sp_id;
		});

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedSp[0]),
		}).catch((error) => console.log(error));
	}

	deleteSp(e, sp_id) {
		e.preventDefault();

		const api = this.apiSpecies + sp_id;

		fetch(api, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		})
			.then(() => {
				const NewSpecies = this.state.species.filter(
					(sp) => sp.id !== sp_id
				);

				this.setState({
					species: NewSpecies,
				});
			})
			.catch((error) => alert(error));
	}

	/**
	 * Save species to database.
	 */
	createSp(e, new_sp) {
		e.preventDefault();

		fetch(this.apiSpecies, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
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
				<SpeciesContext.Provider
					value={{
						handleChange: this.handleChange,
						handleUpdateSp: this.handleUpdateSp,
						deleteSp: this.deleteSp,
					}}
				>
					<main>
						<header>
							<h1 className="title">Species</h1>
						</header>

						<div className="wrapper surveysWrapper">
							{this.AddButton("Add species", true)}

							{this.state.species.map((sp) => {
								return <Sp key={sp.id} sp={sp} />;
							})}
						</div>
					</main>
				</SpeciesContext.Provider>
			);
		} else if (this.state.add === true) {
			content = (
				<main>
					<header>
						<h1 className="title">Species</h1>
					</header>
					<div>
						<NewSp
							species={this.state.species}
							handleAdd={this.handleAdd}
							createSp={this.createSp}
						/>
						{this.state.species.map((sp) => {
							return (
								<Sp
									key={sp.id}
									sp={sp}
									handleChange={this.handleChange}
									handleUpdateSp={this.handleUpdateSp}
								/>
							);
						})}
					</div>
				</main>
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
