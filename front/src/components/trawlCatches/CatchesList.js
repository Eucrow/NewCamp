import React, { Component } from "react";

import Catch from "./Catch.js";
import CatchesButtonBar from "./CatchesButtonBar.js";

class CatchesList extends Component {
	/**
	 * Component to print all the caches of the haul.
	 * @param {number} props.haul_id: id of haul.
	 */

	constructor(props) {
		super(props);
		this.state = {
			catches: [],
			species: [],
			loaded: false,
			placeholder: "Loading",
			add: false,
		};

		this.apiCatches = "http://127.0.0.1:8000/api/1.0/catches/";
		this.apiCatch = "http://127.0.0.1:8000/api/1.0/catch/";
		this.apiCreateCatch = "http://127.0.0.1:8000/api/1.0/catches/new";
		// TODO: change the apiSpecies api to only return the id, sp_name, group and sp_code variables.
		this.apiSpecies = "http://127.0.0.1:8000/api/1.0/species";
		// this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
		this.apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path // To edit and remove catches
		this.apiSampledWeight = "http://127.0.0.1:8000/api/1.0/sampled_weight/";
		this.apiCreateSampledWeight = "http://127.0.0.1:8000/api/1.0/sampled_weight/new";

		this.handleChangeAdd = this.handleChangeAdd.bind(this);
		this.handleChangeGroup = this.handleChangeGroup.bind(this);
		this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
		this.handleChangeCategory = this.handleChangeCategory.bind(this);
		this.handleChangeWeight = this.handleChangeWeight.bind(this);
		this.handleCancelEditCatch = this.handleCancelEditCatch.bind(this);
		this.updateCatch = this.updateCatch.bind(this);
		this.deleteCatch = this.deleteCatch.bind(this);
		this.createCatch = this.createCatch.bind(this);
	}

	deleteCatch = (idx) => {
		/**
		 * Remove catch to database.
		 */

		const request = { id: idx };

		fetch(this.apiEditRemoveCatch, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(request),
		})
			.then(() => {
				this.setState({
					catches: this.state.catches.filter((c) => {
						return idx !== c.id;
					}),
				});
			})
			.catch((error) => alert(error));
	};

	handleChangeAdd = () => {
		this.setState({
			add: !this.state.add,
		});
	};

	handleChangeGroup = (idx) => (evt) => {
		/**
		 * Method to manage the group field. When it is changed, get the species of the group.
		 * Then, update de state.
		 */

		const value = evt.target.value;

		const newCatches = this.state.catches.map((c) => {
			if (idx !== c.id) return c;
			return { ...c, group: value };
		});

		this.setState(() => {
			return {
				catches: newCatches,
			};
		});
	};

	handleChangeSpecies = (idx) => (evt) => {
		/**
		 * Method to get categories of the species, when the 'species' field is modified.
		 * Then, update de state.
		 */

		const value = evt.target.value;
		const val = value.split("--");
		const sp = val[0];
		const sp_code = val[1];
		const sp_name = val[2];

		// const apiCategoriesSpecies = this.apiCategoriesSpecies + sp;

		const newCatches = this.state.catches.map((c) => {
			if (idx !== c.id) return c;
			return {
				...c,
				sp_id: sp,
				sp_code: sp_code,
				sp_name: sp_name,
			};
		});

		this.setState(() => {
			return {
				catches: newCatches,
			};
		});

		// fetch(apiCategoriesSpecies)
		// 	.then((response) => {
		// 		if (response.status > 400) {
		// 			return this.setState(() => {
		// 				return { placeholder: "Something went wrong!" };
		// 			});
		// 		}
		// 		return response.json();
		// 	})
		// 	.then((categories) => {
		// 		this.setState(() => {
		// 			return {
		// 				categories: categories,
		// 			};
		// 		});
		// 	})
		// 	.then(() => {
		// 		this.setState(() => {
		// 			return {
		// 				catches: newCatches,
		// 			};
		// 		});
		// 	});
	};

	handleChangeCategory = (idx) => (evt) => {
		/**
		 * Handle change of new catch form.
		 */

		const value = evt.target.value;

		// Firstly, get the data of catch to modify
		const thisCatch = this.state.catches.find((c) => {
			if (c.id === idx) return c;
		});

		// Secondly, check if exists another catch whith the same species and category
		const repeatedCatch = this.state.catches.some(
			(c) =>
				//the comparison between c.category and value must be with == instead of ===
				//TODO: check why
				(c.group === thisCatch.group) & (c.sp_code === thisCatch.sp_code) & (c.category == value)
		);

		// And finally save the state or thrown an alert.
		if (repeatedCatch === true) {
			alert("This category of the species already exists");
		} else if (repeatedCatch === false) {
			const newCatches = this.state.catches.map((c) => {
				if (c.id !== idx) return c;
				return {
					...c,
					category: value,
				};
			});

			this.setState({
				catches: newCatches,
			});
		}
	};

	handleChangeWeight = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = this.state.catches.map((c) => {
			if (c.id !== idx) return c;
			return {
				...c,
				weight: value,
			};
		});

		this.setState({
			catches: newCatches,
		});
	};

	handleChangeSampledWeight = (idx) => (evt) => {
		const value = evt.target.value;

		const newCatches = this.state.catches.map((c) => {
			if (c.id !== idx) return c;
			return {
				...c,
				sampled_weight: value,
			};
		});

		this.setState({
			catches: newCatches,
		});
	};

	/**
	 * Manage cancellation of catch edition.
	 * @param {number} idx haul id.
	 * @param {object} old_state catch state previous to the edition.
	 */
	handleCancelEditCatch = (idx, old_state) => {
		const newCatches = this.state.catches.map((c) => {
			if (c.id !== idx) return c;
			return {
				...c,
				id: old_state.id,
				weight: old_state.weight,
				sampled_weight: old_state.sampled_weight,
				category: old_state.category,
				sp_code: old_state.sp_code,
				sp_id: old_state.sp_id,
				sp_name: old_state.sp_name,
			};
		});

		this.setState({
			catches: newCatches,
		});
	};

	updateCatch = (idx) => {
		/**
		 * Update catch in database.
		 */

		const updatedCatch = this.state.catches.find(function (c) {
			return idx === c.id;
		});

		const request = {
			catch_id: updatedCatch.id,
			haul_id: updatedCatch.haul,
			sp_code: updatedCatch.sp_code,
			group: updatedCatch.group,
			category: updatedCatch.category,
			weight: updatedCatch.weight,
			sampled_weight: updatedCatch.sampled_weight,
		};

		fetch(this.apiEditRemoveCatch, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		})
			.then((response) => response.json())
			.catch((error) => alert(error));
	};

	existsCatch = (haul_id, sp_id, category) => {
		/**
		 * Method to check if a catch exists in database.
		 * @param {number} haul_id: id of haul.
		 * @param {number} category_id: id of category.
		 */

		const apiCatch = this.apiCatch + haul_id + "/" + sp_id + "/" + category;

		return fetch(apiCatch).then((response) => {
			if (response.status === 200) {
				return true;
			} else {
				return false;
			}
		});
	};

	createCatch = (e, new_catch) => {
		/**
		 * Save catch to database.
		 */

		e.preventDefault();

		// add haul id to data request:
		new_catch["haul_id"] = this.props.haul_id;

		this.existsCatch(new_catch.haul_id, new_catch.sp_id, new_catch.category).then((response) => {
			if (response === true) {
				alert("Catch already exists");
			} else {
				fetch(this.apiCreateCatch, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(new_catch),
				})
					.then((response) => response.json())
					.then((c) => {
						const new_catches = [...this.state.catches, c];
						this.setState(() => {
							return {
								catches: new_catches,
								status_catch: "add",
								add: false,
							};
						});
					})
					.catch((error) => console.log(error));
			}
		});
	};

	componentDidMount() {
		const apiCatches = this.apiCatches + this.props.haul_id;

		fetch(apiCatches)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((catches) => {
				this.setState(() => {
					return {
						catches: catches,
						loaded: true,
					};
				});
			});

		fetch(this.apiSpecies)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((species) => {
				this.setState(() => {
					return {
						species: species,
					};
				});
			});
	}

	render() {
		if (this.state.catches.length === 0) {
			return (
				<div className="wrapper form__row form--wide catchesList">
					<div className="form__row form--wide">There aren't catches yet</div>
					<div className="form__row form--wide">
						{/* <Catch status_catch="add" species={this.state.species} createCatch={this.createCatch} /> */}
					</div>
				</div>
			);
		} else {
			return (
				<fieldset className="wrapper form__row form--wide catchesList">
					<legend>Biometric sampling</legend>
					<CatchesButtonBar catch_status="add" handleChangeAdd={this.handleChangeAdd} />
					{this.state.add === true ? (
						<Catch status_catch="add" species={this.state.species} createCatch={this.createCatch} />
					) : null}
					{this.state.catches.map((c) => {
						return (
							<Catch
								key={c.id}
								this_catch={c}
								species={this.state.species}
								handleChangeSampledWeight={this.handleChangeSampledWeight}
								updateSampledWeight={this.updateSampledWeight}
								handleChangeGroup={this.handleChangeGroup}
								handleChangeSpecies={this.handleChangeSpecies}
								handleChangeCategory={this.handleChangeCategory}
								handleChangeWeight={this.handleChangeWeight}
								handleCancelChangeWeight={this.handleCancelChangeWeight}
								handleCancelEditCatch={this.handleCancelEditCatch}
								updateCatch={this.updateCatch}
								deleteCatch={this.deleteCatch}
								createSampledWeight={this.createSampledWeight}
								deleteSampledWeight={this.deleteSampledWeight}
							/>
						);
					})}
				</fieldset>
			);
		}
	}
}

export default CatchesList;
