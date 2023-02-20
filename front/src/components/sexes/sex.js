import React, { Component, Fragment } from "react";

import ComponentLengths from "../lengths/Lengths.js";

class ComponentSex extends Component {
	/**
	 *
	 * @param {number} props.sex_id
	 * @param {number} props.sex
	 * @param {number} props.catch_id
	 * @param {string} props.status_sex: contains the state of the component: "view", "edit", "delete" or "add".
	 * @param {number} props.unit: measurement unit of the species.
	 * @param {number} props.increment: measurement increment of the species.
	 * @param {method} props.handleChangeSex
	 * @param {method} props.handleNewSexSubmit
	 * @param {method} props.handleAddSexButton
	 * @param {method} props.deleteSex: delete sex of database.
	 */

	constructor(props) {
		super(props);
		this.state = {
			new_sex: "", //contains the value of the new/updated sex which will be saved in database.
			lengths: [
				{
					length: "",
					number_individuals: "",
				},
			],
			status_sex: this.props.status_sex ? this.props.status_sex : "view",
			status_lengths: "hide",
			// status_lengths: "lll",
		};

		// this.apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/";
		// this.apiSexAndLengths = "http://127.0.0.1:8000/api/1.0/sex/lengths/";
		this.apiSex = "http://127.0.0.1:8000/api/1.0/sexes/";

		this.editSexStatus = this.editSexStatus.bind(this);
		// this.saveSexAndLengths = this.saveSexAndLengths.bind(this);
		this.handleNewSex = this.handleNewSex.bind(this);
		this.updateSex = this.updateSex.bind(this);
		this.handleStatusLengths = this.handleStatusLengths.bind(this);
	}

	/**
	 * Change the state of status_sex variable.
	 * @param {character} status This variable contains the state of the component: "view", "edit", "delete" or "add".
	 */
	editSexStatus(status) {
		this.setState(() => {
			return {
				catch_id: "",
				sex: "",
				status_sex: status,
			};
		});
	}

	// saveSexAndLengths(event){
	//     /**
	//     * Save the sex and lengths of state to database.
	//     */

	//     event.preventDefault();

	//     console.log(JSON.stringify(this.state.sex))
	//     fetch(this.apiSexAndLengths, {
	//         method: 'POST',
	//         headers: {
	//             'Content-Type': 'application/json',
	//             },
	//         body: JSON.stringify(this.state.sex)
	//     })
	//     .then(() => {
	//         this.setState(() => {
	//             return{status_lengths : "view"}
	//         })
	//     })
	//     .catch(error => console.log('Error'))
	// }

	handleNewSex(e) {
		/**
		 * Change the state of new_sex variable.
		 * This variable contains the value of the new sex which will be saved in database.
		 */

		this.setState({ new_sex: e.target.value });
	}

	/**
	 *
	 * @param {character} status: "view", "edit" or "hide"
	 */
	handleStatusLengths(status) {
		this.setState({ status_lengths: status });
	}

	updateSex(event) {
		/**
		 * Save the sex of state to database.
		 */

		event.preventDefault();

		// get the sex of the catch which has been changed
		const newSex = {
			id: this.props.sex_id,
			sex: this.state.new_sex,
		};

		fetch(this.apiSex, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newSex),
		})
			.then((response) => response.json())
			.catch((error) => console.log("Error"));
	}

	render() {
		if (this.state.status_sex === "view" || this.state.status_sex === "") {
			return (
				<Fragment>
					<div className="form__row">
						<label className="form__cell">
							Sex:
							<select id="sex" name="sex" disabled>
								<option key={this.props.sex}>
									{this.props.sex}
								</option>
							</select>
						</label>
						<div className="form__cell buttonsWrapper">
							<button
								className="buttonsWrapper__button"
								type="button"
								onClick={() => {
									this.editSexStatus("edit");
								}}
							>
								Edit sex
							</button>
							<button
								className="buttonsWrapper__button"
								type="button"
								onClick={() => {
									this.props.deleteSex(this.props.sex_id);
								}}
							>
								Delete sex
							</button>

							{this.state.status_lengths === "view" ? (
								<button
									className="buttonsWrapper__button"
									type="button"
									onClick={() => {
										this.handleStatusLengths("hide");
									}}
								>
									Hide Lengths
								</button>
							) : (
								<button
									className="buttonsWrapper__button"
									type="button"
									onClick={() => {
										this.handleStatusLengths("view");
									}}
								>
									Show Lengths
								</button>
							)}
						</div>
					</div>

					<ComponentLengths
						sex_id={this.props.sex_id}
						status_lengths={this.state.status_lengths}
						unit={this.props.unit}
						increment={this.props.increment}
						handleStatusLengths={this.handleStatusLengths}
					/>
				</Fragment>
			);
		} else if (this.state.status_sex === "edit") {
			return (
				<div className="form__row form--wide buttonsWrapper">
					<label className="form__cell">
						Sex:
						<select
							onChange={(e) => {
								this.props.handleChangeSex(
									e,
									this.props.sex_id,
									this.props.catch_id
								);
								this.handleNewSex(e);
							}}
							id={this.props.sex_id}
							name={this.props.sex_id}
							value={this.props.sex}
						>
							<option value="3">Undetermined</option>
							<option value="1">Male</option>
							<option value="2">Female</option>
						</select>
					</label>
					<button
						className="buttonsWrapper__button"
						type="button"
						onClick={(e) => {
							this.updateSex(e);
							this.editSexStatus("view");
						}}
					>
						Save sex
					</button>
				</div>
			);
		} else if (this.state.status_sex === "add") {
			return (
				<div className="form__row">
					<label className="form__cell">
						Sex:
						<select onChange={this.handleNewSex}>
							<option></option>
							<option value="3">Undetermined</option>
							<option value="1">Male</option>
							<option value="2">Female</option>
						</select>
					</label>

					<button
						type="button"
						onClick={(e) => {
							this.props.handleNewSexSubmit(
								e,
								this.state.new_sex,
								this.props.catch_id
							);
							this.props.handleAddSexButton(false);
						}}
					>
						Save new sex
					</button>
				</div>
			);
		}
	}
}

export default ComponentSex;
