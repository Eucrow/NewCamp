import React, { useEffect, useState } from "react";

import LengthsForm from "./LengthsForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";
import LengthsRangeForm from "./LengthsRangeForm.js";

const ComponentLengths = ({ sex_id, status_lengths }) => {
	const [backupLengths, setBackupLengths] = useState([
		{
			length: "",
			number_individuals: "",
		},
	]);

	const [lengths, setLengths] = useState([
		{
			length: "",
			number_individuals: "",
		},
	]);

	const [statusLengths, setStatusLengths] = useState(
		status_lengths || "hide"
	);

	const [responseError, setResponseError] = useState("none");

	const apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/";

	useEffect(() => {
		if (responseError !== "none") {
			alert(responseError);
		}
	}, [responseError]);

	/**
	 * Show lengths.
	 */
	const handleShowLengths = () => {
		getLengths().then((lengths) => {
			setBackupLengths(lengths);
			setLengths(lengths);
			setStatusLengths("view");
		});
	};

	/**
	 * Hide lengths.
	 */
	//TODO: Maybe use css to hide the lenghts when they are fetched from the backend?
	const handleHideLengths = () => {
		setLengths([]);
		setStatusLengths("hide");
	};

	/**
	 * Change the state of status_lengths to "edit".
	 */
	const handleEditLengths = () => {
		setStatusLengths("edit");
	};

	/**
	 *  Cancel the edition of the lengths. Set status_lengths state to "view".
	 */
	const handleCancelLengths = () => {
		setStatusLengths("view");
	};

	/**
	 * Get all lengths of a sex_id from database.
	 * @returns JSON with lengths.
	 */
	const getLengths = async () => {
		const api = apiLengths + sex_id;

		const response = await fetch(api);
		if (response.status > 400) {
			setResponseError("Something went wrong! (getLengths)");
		}
		return response.json();
	};

	/**
	 * Delete all lengths of a sex_id in database. The sex_id variable is taken from parent component via props.
	 * @returns JSON
	 */
	const deleteLengths = async () => {
		const api = apiLengths + sex_id;

		const response = await fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status > 400) {
			setResponseError("Something went wrong! (deleteLengths())");
		}
	};

	/**
	 * Method used in orderLengths to sort lengths.
	 */
	const orderLengthsFunction = (a, b) => {
		if (a.length < b.length) {
			return -1;
		}

		if (a.length > b.length) {
			return 1;
		}

		return 0;
	};

	/**
	 * Order lengths array.
	 */
	const orderLengths = () => {
		var newLengths = lengths;
		newLengths.sort(orderLengthsFunction);
		setLengths(newLengths);
	};

	/**
	 * Save lengths of a sex_id in database. The sex_id variable is taken from parent component via props.
	 * @param {array} lengths Array of dictionaries with lengths to save or update.
	 * @return JSON response or error.
	 */
	const saveLengths = async (lengths) => {
		const api = apiLengths + sex_id;

		try {
			const response = await fetch(api, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(lengths),
			});
			if (response.status > 400) {
				setResponseError("Something went wrong! (saveLengths())");
			}
			return await response.json();
		} catch (error) {
			return console.log(error);
		}
	};

	/**
	 * Save or Update lengths. Check if exists duplicated lengths in the array. If already exists
	 * lengths for this sex, delete it first and save the new lengths.
	 * TODO: make the length validation in the form, and not here.
	 * @param {event} e
	 * @param {array} lengths Array of dictionaries with lengths to save or update.
	 */
	const saveOrUpdateLengths = (e, lengths) => {
		e.preventDefault();

		orderLengths();

		// Firstly, check if exists duplicated lengths
		// TODO: check this in validation form
		if (checkForLengthsDuplicated(lengths) === true) {
			// alert("Duplicated lengths");
			setResponseError("Duplicated lengths!");
		} else {
			getLengths()
				.then((lengthts_in_database) => {
					if (Object.keys(lengthts_in_database).length === 0) {
						// if there are not lengths already saved, save the new lengths:
						saveLengths(lengths).catch((error) =>
							console.log(error)
						);
					} else {
						// if there are lengths, first delete it, and then save the updated lengths.
						deleteLengths()
							.then(() => {
								saveLengths(lengths);
							})
							.catch((error) => console.log(error));
					}
				})

				.then(() => {
					setStatusLengths("view");
				})
				.catch((error) => console.log("Error"));
		}
	};

	/**
	 * Check if the lengths array contains duplicated lengths.
	 * @param {array} lengths Array of dictionaries with lengths to save or update.
	 * @returns True if there are duplicates.
	 */
	const checkForLengthsDuplicated = (lengths) => {
		var vals = [];

		for (var i = 0; i < lengths.length; i++) {
			vals.push(lengths[i].length);
		}

		return new Set(vals).size !== lengths.length;
	};

	/**
	 * Create length range.
	 * @param {number} minLength Minimun length.
	 * @param {number} maxLength Maximum length.
	 */
	const createRangeLengths = (minLength, maxLength) => {
		var newLengths = [];

		for (var l = minLength; l <= maxLength; l++) {
			newLengths.push({
				length: l,
				number_individuals: "",
			});
		}

		setLengths(newLengths);
		setStatusLengths("edit");
	};

	/**
	 * Edit length of lengths state.
	 * @param {number} index index of length in the dictionary.
	 * @param {event} e
	 */
	const editLength = (index, e) => {
		// a deep copy is mandatory because the data to be modified is nested:
		let newLengths = JSON.parse(JSON.stringify(lengths));
		newLengths[index][e.target.name] = Number(e.target.value);
		setLengths(newLengths);
	};

	/**
	 * Delete length of lengths state.
	 * @param {number} index  index index of length in the dictionary.
	 */
	const deleteLength = (index) => {
		let newLengths = [...lengths];
		newLengths = newLengths.filter((l, lidx) => index !== lidx);
		setLengths(newLengths);
	};

	/**
	 * Add empty length to lengths state.
	 */
	const addLength = (l, index) => {
		let newLengths = [...lengths];
		let newLength = Number(l) + 1;
		newLengths.splice(index + 1, 0, {
			length: newLength,
			number_individuals: 0,
		});

		setLengths(newLengths);
	};

	/**
	 * Cancel edition of lengths, restoring the original lengths.
	 */
	const cancelEditLengths = () => {
		setLengths(backupLengths);
		handleCancelLengths();
	};

	/**
	 * Detect if already exists a length in the lengths state.
	 * @param {number} length Lenght to check if exists.
	 * @returns true if the length already exists in lengths state. false if doesn't.
	 */
	const lengthsExists = (length) => {
		if (lengths.find((l) => l.length === Number(length))) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 * Validate lenght
	 * @param {event} e onChange event
	 * @returns In case of errors in length, show report validity.
	 */
	const validateLength = (e) => {
		e.target.setCustomValidity("");

		if (lengthsExists(e.target.value) === true) {
			e.target.setCustomValidity("This length already exists.");
		}

		return e.target.reportValidity();
	};

	// render content
	const renderContent = () => {
		if (statusLengths === "hide") {
			return (
				<div>
					<LengthsButtonBar
						statusLengths={statusLengths}
						handleShowLengths={handleShowLengths}
					/>
				</div>
			);
		} else if (statusLengths === "view" && lengths.length !== 0) {
			return (
				<div>
					<LengthsForm
						lengths={lengths}
						statusLengths={statusLengths}
					/>
					<LengthsButtonBar
						statusLengths={statusLengths}
						handleEditLengths={handleEditLengths}
						handleHideLengths={handleHideLengths}
					/>
				</div>
			);
		} else if (statusLengths === "view" && lengths.length === 0) {
			return (
				<div>
					<LengthsRangeForm createRangeLengths={createRangeLengths} />
					<LengthsButtonBar
						statusLengths={statusLengths}
						handleEditLengths={handleEditLengths}
						handleHideLengths={handleHideLengths}
					/>
				</div>
			);
		} else if (statusLengths === "edit") {
			return (
				<div>
					<LengthsForm
						lengths={lengths}
						statusLengths={statusLengths}
						saveOrUpdateLengths={saveOrUpdateLengths}
						editLength={editLength}
						deleteLength={deleteLength}
						addLength={addLength}
						cancelEditLengths={cancelEditLengths}
						validateLength={validateLength}
					/>
				</div>
			);
		} else if (statusLengths === "remove") {
		}
	};

	return renderContent();
};

export default ComponentLengths;
