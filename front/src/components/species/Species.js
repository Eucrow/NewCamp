import React, { Component } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import Sp from "./Sp";
import NewSpForm from "./NewSpForm";
import SpeciesButtonBar from "./SpeciesButtonBar";

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

		this.renderContent = this.renderContent.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.handleUpdateSp = this.handleUpdateSp.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createSp = this.createSp.bind(this);
		this.deleteSp = this.deleteSp.bind(this);

		this.getEmptySpCode = this.getEmptySpCode.bind(this);
		this.preventNegativeE = this.preventNegativeE.bind(this);
	}

	/**
	 * Get the first code unused of a group of the list of species.
	 * @param {numeric} group Group os species
	 * @returns {numeric} Code unused in the list of species.
	 */
	getEmptySpCode(group) {
		const sps = this.state.species.filter((sp) => sp.group === group);

		const codes = sps.map((sp) => sp.sp_code);

		codes.sort();

		const correlative = Array.from(codes, (v, i) => i + 1);

		const emptyCode = correlative.find((x) => !codes.includes(x));

		return emptyCode;
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

	// VALIDATIONS
	/**
	 * Prevent 'e' and '-' in numeric input
	 * @param {e} onKeyDown event
	 */
	preventNegativeE(e) {
		if (e.key === "e" || e.key === "-") {
			e.preventDefault();
		}
	}

	renderContent() {
		var content = "";

		content = (
			<SpeciesContext.Provider
				value={{
					handleChange: this.handleChange,
					handleUpdateSp: this.handleUpdateSp,
					createSp: this.createSp,
					deleteSp: this.deleteSp,
					handleAdd: this.handleAdd,
					getEmptySpCode: this.getEmptySpCode,
					preventNegativeE: this.preventNegativeE,
				}}
			>
				<main>
					<header>
						<h1 className="title">Species</h1>
					</header>

					<div className="wrapper surveysWrapper">
						<SpeciesButtonBar
							add={this.state.add}
							handleAdd={this.handleAdd}
						/>

						{this.state.add === true ? <NewSpForm /> : ""}

						{this.state.species.map((sp) => {
							return <Sp key={sp.id} sp={sp} />;
						})}
					</div>
				</main>
			</SpeciesContext.Provider>
		);

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
