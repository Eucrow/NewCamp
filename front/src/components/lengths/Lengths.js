import React, { Component } from "react";

import LengthsForm from "./LengthsForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";
import LengthsRangeForm from "./LengthsRangeForm.js";

class ComponentsLengths extends Component {
	/**
	 * Component of lengths. This component is for every species-category-sex of a haul.
	 * @param {number} props.sex_id: sex id of lengths.
	 * @param {string} props.status_lengths: must be "view", "edit", "hide" or "add"
	 * @param {method} props.saveSexAndLengths
	 */

	constructor(props) {
		super(props);
		this.state = {
			lengths: [
				{
					length: "",
					number_individuals: "",
				},
			],
			status_lengths: "hide",
		};

		this.apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/";

		this.handleShowLengths = this.handleShowLengths.bind(this);
		this.handleHideLengths = this.handleHideLengths.bind(this);
		this.handleEditLengths = this.handleEditLengths.bind(this);
		this.handleCancelLengths = this.handleCancelLengths.bind(this);
		this.getLengths = this.getLengths.bind(this);
		this.deleteLengths = this.deleteLengths.bind(this);
		this.saveLengths = this.saveLengths.bind(this);
		this.saveOrUpdateLengths = this.saveOrUpdateLengths.bind(this);
		this.checkForLengthsDuplicated =
			this.checkForLengthsDuplicated.bind(this);
		this.createRangeLengths = this.createRangeLengths.bind(this);

		this.handleAddLengthFromRange =
			this.handleAddLengthFromRange.bind(this);
	}

	/**
	 * Create length range.
	 * @param {number} minLength Minimun length.
	 * @param {number} maxLength Maximum length.
	 */
	createRangeLengths = (minLength, maxLength) => {
		var newLengths = [];

		for (var l = minLength; l <= maxLength; l++) {
			newLengths.push({
				length: l,
				number_individuals: "",
			});
		}

		this.setState({ lengths: newLengths, status_lengths: "edit" });
	};

	handleAddLengthFromRange = (length_name) => {
		this.setState({
			lengths: this.state.lengths.concat([
				{ length: length_name, number_individuals: 0 },
			]),
		});
	};

	handleDeleteLength = (idx) => () => {
		this.setState({
			lengths: this.state.lengths.filter((s, sidx) => idx !== sidx),
		});
	};
	// **** end handle of legnths form

	handleShowLengths(event) {
		/**
		 * Show lengths.
		 */
		// TODO: Detect if the legths are already in state and doesn't fetcth if it is the case.
		// In this case the legths has been hide by css.
		this.getLengths().then((lengths) => {
			this.setState(() => {
				return {
					lengths: lengths,
					status_lengths: "view",
				};
			});
		});
	}

	handleHideLengths(event) {
		/**
		 * Hide legths.
		 */
		//TODO: Maybe use css to hide the lenghts when they are fetched from the backend?

		this.setState(() => {
			return {
				lengths: [],
				status_lengths: "hide",
			};
		});
	}

	handleEditLengths() {
		/**
		 * Change the state of status_lengths to "edit".
		 */
		this.setState(() => {
			return {
				status_lengths: "edit",
			};
		});
	}

	handleCancelLengths() {
		/**
		 * Cancel the edition of the lengths. Set status_lengths state to "view".
		 */
		this.setState(() => {
			return {
				status_lengths: "view",
			};
		});
	}

	/**
	 * Get all lengths of a sex_id from database.
	 */
	getLengths() {
		const apiLengths = this.apiLengths + this.props.sex_id;

		return fetch(apiLengths).then((response) => {
			if (response.status > 400) {
				return this.setState(() => {
					return { placeholder: "Something went wrong!" };
				});
			}
			return response.json();
		});
	}

	deleteLengths() {
		/**
		 * Delete all lengths of a sex_id in database.
		 */

		const apiLengths = this.apiLengths + this.props.sex_id;

		return fetch(apiLengths, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status > 400) {
				return this.setState(() => {
					return { placeholder: "Something went wrong!" };
				});
			}
		});
	}

	checkForLengthsDuplicated(lengths) {
		/**
		 * Check if the lengths array contains duplicated lengths.
		 * Return true if there are any duplicates.
		 */

		var vals = [];

		for (var i = 0; i < lengths.length; i++) {
			vals.push(lengths[i].length);
		}

		return new Set(vals).size !== lengths.length;
	}

	saveLengths(lengths) {
		/**
		 * Save lengths of a sex_id in database.
		 */

		const apiLengths = this.apiLengths + this.props.sex_id;

		return fetch(apiLengths, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(lengths),
		})
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.catch((error) => console.log(error));
	}

	saveOrUpdateLengths(event, lengths) {
		/**
		 * Save the lengths of state to database.
		 */

		event.preventDefault();

		// Firstly, check if exists duplicated lengths
		// TODO: check this in validation form
		if (this.checkForLengthsDuplicated(lengths) === true) {
			alert("Duplicated lengths");
		} else {
			this.getLengths()
				.then((lengthts_in_database) => {
					if (Object.keys(lengthts_in_database).length === 0) {
						// if there are not lengths already saved, save the new lengths:
						this.saveLengths(lengths).catch((error) =>
							console.log(error)
						);
					} else {
						// if there are lengths, first delete it, and then save the updated lengths.
						this.deleteLengths()
							.then(() => {
								this.saveLengths(lengths);
							})
							.catch((error) => console.log(error));
					}
				})

				.then(() => {
					this.setState(() => {
						return { status_lengths: "view" };
					});
				})
				.catch((error) => console.log("Error"));
		}
	}

	render() {
		if (this.state.status_lengths === "hide") {
			return (
				<div>
					<LengthsButtonBar
						status_lengths={this.state.status_lengths}
						handleShowLengths={this.handleShowLengths}
					/>
				</div>
			);
		} else if (
			this.state.status_lengths === "view" &&
			this.state.lengths.length !== 0
		) {
			return (
				<div>
					<LengthsForm
						lengths={this.state.lengths}
						status_lengths={this.state.status_lengths}
						handleHideLengths={this.handleHideLengths}
						handleEditLengths={this.handleEditLengths}
					/>
					<LengthsButtonBar
						status_lengths={this.state.status_lengths}
						handleEditLengths={this.handleEditLengths}
						handleHideLengths={this.handleHideLengths}
					/>
				</div>
			);
		} else if (
			this.state.status_lengths === "view" &&
			this.state.lengths.length === 0
		) {
			return (
				<div>
					<LengthsRangeForm
						createRangeLengths={this.createRangeLengths}
					/>
					<LengthsButtonBar
						status_lengths={this.state.status_lengths}
						handleEditLengths={this.handleEditLengths}
						handleHideLengths={this.handleHideLengths}
					/>
				</div>
			);
		} else if (this.state.status_lengths === "edit") {
			return (
				<div>
					<LengthsForm
						lengths={this.state.lengths}
						status_lengths={this.state.status_lengths}
						handleCancelLengths={this.handleCancelLengths}
						saveOrUpdateLengths={this.saveOrUpdateLengths}
						// handleHideLengths={this.handleHideLengths}
					/>
				</div>
			);
		} else if (this.state.status_lengths === "remove") {
		}
	}
}

export default ComponentsLengths;
