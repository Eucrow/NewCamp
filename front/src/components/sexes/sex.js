import React, { Component, Fragment } from "react";

import SexButtonBar from "./SexButtonBar.js";
import ComponentLengths from "../lengths/Lengths.js";

class Sex extends Component {
	/**
	 *
	 * @param {number} props.sex_id
	 * @param {number} props.sex
	 * @param {number} props.catch_id
	 * @param {string} props.sex_status: contains the state of the component: "view", "edit", "delete" or "add".
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
			sex_status: this.props.sex_status ? this.props.sex_status : "view",
			lengths_status: "hide",
		};

		this.apiSex = "http://127.0.0.1:8000/api/1.0/sexes/";

		// this.editSexStatus = this.editSexStatus.bind(this);
		this.handleSexStatus = this.handleSexStatus.bind(this);
		this.handleNewSex = this.handleNewSex.bind(this);
		this.updateSex = this.updateSex.bind(this);
		this.handleLengthsStatus = this.handleLengthsStatus.bind(this);
	}

	/**
	 * Change the state of sex_status variable.
	 * @param {character} status This variable contains the state of the component: "view", "edit", "delete" or "add".
	 */
	// editSexStatus(status) {
	// 	this.setState(() => {
	// 		return {
	// 			catch_id: "",
	// 			sex: "",
	// 			sex_status: status,
	// 		};
	// 	});
	// }

	handleSexStatus(status) {
		this.setState({ sex_status: status });
	}

	handleNewSex(e) {
		/**
		 * Change the state of new_sex variable.
		 * This variable contains the value of the new sex which will be saved in database.
		 */

		this.setState({ new_sex: e.target.value });
	}

	/**
	 * Change the state of lengths_status variable.
	 * @param {character} status:  "view", "edit" or "hide"
	 */
	handleLengthsStatus(status) {
		this.setState({ lengths_status: status });
	}

	/**
	 * Save the sex stored in state to database.
	 * @param {event} event
	 */
	updateSex(event) {
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
		if (this.state.sex_status === "view") {
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
							<SexButtonBar
								sex_id={this.props.sex_id}
								sex_status={this.state.sex_status}
								handleSexStatus={this.handleSexStatus}
								updateSex={this.updateSex}
								deleteSex={this.props.deleteSex}
								lengths_status={this.state.lengths_status}
								handleLengthsStatus={this.handleLengthsStatus}
							/>
						</div>
					</div>

					<ComponentLengths
						sex_id={this.props.sex_id}
						lengths_status={this.state.lengths_status}
						unit={this.props.unit}
						increment={this.props.increment}
						handleLengthsStatus={this.handleLengthsStatus}
					/>
				</Fragment>
			);
		} else if (this.state.sex_status === "edit") {
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
					<div className="form__cell buttonsWrapper">
						<SexButtonBar
							sex_id={this.props.sex_id}
							sex_status={"edit"}
							handleSexStatus={this.handleSexStatus}
							updateSex={this.updateSex}
							deleteSex={this.props.deleteSex}
							lengths_status={this.state.lengths_status}
							handleLengthsStatus={this.handleLengthsStatus}
						/>
					</div>
				</div>
			);
		} else if (this.state.sex_status === "add") {
			return (
				<div className="form__row">
					<label className="form__cell">
						Sex:
						<select
							onChange={(e) => {
								this.handleNewSex(e);
							}}
						>
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

export default Sex;
