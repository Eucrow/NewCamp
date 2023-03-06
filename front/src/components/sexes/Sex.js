import React, { Fragment, useState, useEffect } from "react";
import SexButtonBar from "./SexButtonBar.js";
import ComponentLengths from "../lengths/Lengths.js";

/**
 * Sex component.
 * @param {string} sex_status "view", "edit" or "add".
 * @param {number} sex_id Id of sex.
 * @param {string} sex Sex.
 * @param {numeric} unit Measurement unit: "1" or "2". "1" is centimeters and "2" is milimeters.
 * @param {numeric} increment Increment of measurement unit.
 * @param {method} handleChangeSex Method to handle the change of sex value.
 * @param {numeric} catch_id Id of catch.
 * @param {method} addSex Method to add sex.
 * @param {method} handleAddSexStatus Method to handle sex status.
 * @returns JSX of sex component.
 */
const Sex = ({
	sex_status,
	sex_id,
	sex,
	deleteSex,
	unit,
	increment,
	handleChangeSex,
	catch_id,
	addSex,
	handleAddSexStatus,
	sexes,
}) => {
	const [newSex, setNewSex] = useState("");
	const [lengthsStatus, setLengthsStatus] = useState("hide");
	const [sexStatus, setSexStatus] = useState(sex_status ? sex_status : "view");
	const [validSex, setValidSex] = useState(true);

	const apiSex = "http://127.0.0.1:8000/api/1.0/sexes/";

	/**
	 * Get a lengths array and update the property "is_valid" propertly:
	 * set to "false" in all the repeated lengths and "true" where doesn't.
	 * @param {array of objects} lengthsToValidate Lengths to validate.
	 * @returns Array with lengths with "is_valid" property updated.
	 */

	const validateSex = (e) => {
		if (sexes.some((p) => p.sex === Number(e.target.value))) {
			e.target.setCustomValidity("The sex already exists.");
			setValidSex(false);
			return e.target.reportValidity();
		} else {
			e.target.setCustomValidity("");
			setValidSex(true);
		}
	};

	/**
	 * Save the sex stored in state to database.
	 * @param {event} event
	 */
	const updateSex = (event) => {
		event.preventDefault();
		const newSexData = {
			id: sex_id,
			sex: newSex,
		};

		fetch(apiSex, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newSexData),
		})
			.then((response) => response.json())
			.catch((error) => console.log("Error"));
	};

	var content = null;

	if (sexStatus === "view") {
		content = (
			<Fragment>
				<div className="form__row form--wide buttonsWrapper">
					<label className="form__cell">
						Sex:
						<select id="sex" name="sex" disabled>
							<option key={sex}>{sex}</option>
						</select>
					</label>
					<div className="form__cell buttonsWrapper">
						<SexButtonBar
							sex_id={sex_id}
							sex_status={sexStatus}
							setSexStatus={setSexStatus}
							updateSex={updateSex}
							deleteSex={deleteSex}
							lengths_status={lengthsStatus}
							setLengthsStatus={setLengthsStatus}
						/>
					</div>
				</div>
				<ComponentLengths
					sex_id={sex_id}
					lengths_status={lengthsStatus}
					unit={unit}
					increment={increment}
					setLengthsStatus={setLengthsStatus}
				/>
			</Fragment>
		);
	} else if (sexStatus === "edit") {
		content = (
			<div className="form__row form--wide buttonsWrapper">
				<label className="form__cell">
					Sex:
					<select
						onChange={(e) => {
							handleChangeSex(e, sex_id, catch_id);
							validateSex(e);
							if (e.target.checkValidity() === false) {
								e.target.reportValidity("Repeated sex.");
							} else {
								setNewSex(e);
							}
						}}
						id={sex_id}
						name={sex_id}
						value={sex}
					>
						<option value="3">Undetermined</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
					</select>
				</label>
				<div className="form__cell buttonsWrapper">
					<SexButtonBar
						sex_id={sex_id}
						sex_status={"edit"}
						setSexStatus={setSexStatus}
						updateSex={updateSex}
						deleteSex={deleteSex}
						lengths_status={lengthsStatus}
						setLengthsStatus={setLengthsStatus}
						saveSexButtonStatus={validSex}
					/>
				</div>
			</div>
		);
	} else if (sexStatus === "add") {
		content = (
			<div className="form__row form--wide buttonsWrapper">
				<label className="form__cell">
					Sex:
					<select
						onChange={(e) => {
							setNewSex(e.target.value);
						}}
					>
						<option></option>
						<option value="3">Undetermined</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
					</select>
				</label>

				<SexButtonBar
					sex_status={"add"}
					newSex={newSex}
					catch_id={catch_id}
					addSex={addSex}
					handleAddSexStatus={handleAddSexStatus}
					updateSex={updateSex}
					setSexStatus={setSexStatus}
				/>
			</div>
		);
	}

	return content;
};

export default Sex;
// import React, { Component, Fragment } from "react";

// import SexButtonBar from "./SexButtonBar.js";
// import ComponentLengths from "../lengths/Lengths.js";

// // convert Sex component to class component

// class Sex extends Component {
// 	/**
// 	 *
// 	 * @param {number} sex_id
// 	 * @param {number} sex
// 	 * @param {number} catch_id
// 	 * @param {string} sex_status: contains the state of the component: "view", "edit", "delete" or "add".
// 	 * @param {number} unit: measurement unit of the species.
// 	 * @param {number} increment: measurement increment of the species.
// 	 * @param {method} handleChangeSex
// 	 * @param {method} addSex
// 	 * @param {method} handleAddSexButton
// 	 * @param {method} deleteSex: delete sex of database.
// 	 */

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			new_sex: "", //contains the value of the new/updated sex which will be saved in database.
// 			lengths: [
// 				{
// 					length: "",
// 					number_individuals: "",
// 				},
// 			],
// 			sex_status: this.sex_status ? this.sex_status : "view",
// 			lengths_status: "hide",
// 		};

// 		this.apiSex = "http://127.0.0.1:8000/api/1.0/sexes/";

// 		this.setSexStatus = this.setSexStatus.bind(this);
// 		this.setNewSex = this.setNewSex.bind(this);
// 		this.updateSex = this.updateSex.bind(this);
// 		this.setLengthsStatus = this.setLengthsStatus.bind(this);
// 	}

// 	/**
// 	 * Change the state of sex_status variable.
// 	 * @param {character} status: "view", "edit" or "hide"
// 	 */
// 	setSexStatus(status) {
// 		this.setState({ sex_status: status });
// 	}

// 	/**
// 	 * Change the state of new_sex variable.
// 	 * This variable contains the value of the new sex which will be saved in database.
// 	 * @param {event} e: Click event
// 	 */
// 	setNewSex(e) {
// 		this.setState({ new_sex: e.target.value });
// 	}

// 	/**
// 	 * Change the state of lengths_status variable.
// 	 * @param {character} status:  "view", "edit" or "hide"
// 	 */
// 	setLengthsStatus(status) {
// 		this.setState({ lengths_status: status });
// 	}

// 	/**
// 	 * Save the sex stored in state to database.
// 	 * @param {event} event
// 	 */
// 	updateSex(event) {
// 		event.preventDefault();

// 		// get the sex of the catch which has been changed
// 		const newSex = {
// 			id: this.sex_id,
// 			sex: this.state.new_sex,
// 		};

// 		fetch(this.apiSex, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(newSex),
// 		})
// 			.then((response) => response.json())
// 			.catch((error) => console.log("Error"));
// 	}

// 	render() {
// 		if (this.state.sex_status === "view") {
// 			return (
// 				<Fragment>
// 					<div className="form__row">
// 						<label className="form__cell">
// 							Sex:
// 							<select id="sex" name="sex" disabled>
// 								<option key={this.sex}>
// 									{this.sex}
// 								</option>
// 							</select>
// 						</label>
// 						<div className="form__cell buttonsWrapper">
// 							<SexButtonBar
// 								sex_id={this.sex_id}
// 								sex_status={this.state.sex_status}
// 								setSexStatus={this.setSexStatus}
// 								updateSex={this.updateSex}
// 								deleteSex={this.deleteSex}
// 								lengths_status={this.state.lengths_status}
// 								setLengthsStatus={this.setLengthsStatus}
// 							/>
// 						</div>
// 					</div>

// 					<ComponentLengths
// 						sex_id={this.sex_id}
// 						lengths_status={this.state.lengths_status}
// 						unit={this.unit}
// 						increment={this.increment}
// 						setLengthsStatus={this.setLengthsStatus}
// 					/>
// 				</Fragment>
// 			);
// 		} else if (this.state.sex_status === "edit") {
// 			return (
// 				<div className="form__row form--wide buttonsWrapper">
// 					<label className="form__cell">
// 						Sex:
// 						<select
// 							onChange={(e) => {
// 								this.handleChangeSex(
// 									e,
// 									this.sex_id,
// 									this.catch_id
// 								);
// 								this.setNewSex(e);
// 							}}
// 							id={this.sex_id}
// 							name={this.sex_id}
// 							value={this.sex}
// 						>
// 							<option value="3">Undetermined</option>
// 							<option value="1">Male</option>
// 							<option value="2">Female</option>
// 						</select>
// 					</label>
// 					<div className="form__cell buttonsWrapper">
// 						<SexButtonBar
// 							sex_id={this.sex_id}
// 							sex_status={"edit"}
// 							setSexStatus={this.setSexStatus}
// 							updateSex={this.updateSex}
// 							deleteSex={this.deleteSex}
// 							lengths_status={this.state.lengths_status}
// 							setLengthsStatus={this.setLengthsStatus}
// 						/>
// 					</div>
// 				</div>
// 			);
// 		} else if (this.state.sex_status === "add") {
// 			return (
// 				<div className="form__row">
// 					<label className="form__cell">
// 						Sex:
// 						<select
// 							onChange={(e) => {
// 								this.setNewSex(e);
// 							}}
// 						>
// 							<option></option>
// 							<option value="3">Undetermined</option>
// 							<option value="1">Male</option>
// 							<option value="2">Female</option>
// 						</select>
// 					</label>

// 					<SexButtonBar
// 						sex_status={"add"}
// 						new_sex={this.state.new_sex}
// 						catch_id={this.catch_id}
// 						addSex={this.addSex}
// 						handleAddSexStatus={this.handleAddSexStatus}
// 						updateSex={this.updateSex}
// 						setSexStatus={this.setSexStatus}
// 					/>
// 				</div>
// 			);
// 		}
// 	}
// }

// export default Sex;
