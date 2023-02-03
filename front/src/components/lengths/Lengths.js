import React, { useEffect, useState } from "react";
import LengthsContext from "../../contexts/LengthsContext";

import LengthsForm from "./LengthsForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";
import LengthsRangeForm from "./LengthsRangeForm.js";

/**
 * Lengths component.
 * @param {number} sex_id
 * @param {string} lengths Posible values: "view", "edit", "hide".
 * @returns
 */
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
			is_valid: true,
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

			// a deep copy is mandatory because the data to be modified is nested:
			let newLengths = JSON.parse(JSON.stringify(lengths));
			// newLengths[index][e.target.name] = Number(e.target.value);
			newLengths.forEach((el) => {
				el["is_valid"] = true;
			});
			setLengths(newLengths);
		});
	};

	/**
	 * Hide lengths.
	 */
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
	 * Get a lengths array and update the property "is_valid" propertly:
	 * set to "false" in all the repeated lengths and "true" where doesn't.
	 * @param {array of objects} lengthsToValidate Lengths to validate.
	 * @returns Array with lengths with "is_valid" property updated.
	 */
	const validateLengths = (lengthsToValidate) => {
		lengthsToValidate.forEach((element, i, a) => {
			if (a.filter((el) => el.length === element.length).length > 1) {
				lengthsToValidate[i]["is_valid"] = false;
			} else {
				lengthsToValidate[i]["is_valid"] = true;
			}
		});

		return lengthsToValidate;
	};

	/**
	 * Edit length of lengths state.
	 * In case the length already exists in the lengths state, its is_valid variable
	 * is changed to "false". If doesn't, is changed to "true",
	 * @param {number} index index of length in the dictionary.
	 * @param {event} e
	 */
	const editLength = (index, e) => {
		// a deep copy is mandatory because the data to be modified is nested:
		let newLengths = JSON.parse(JSON.stringify(lengths));

		newLengths[index][e.target.name] = Number(e.target.value);

		newLengths = validateLengths(newLengths);

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

		newLengths = validateLengths(newLengths);

		setLengths(newLengths);
	};

	/**
	 * Cancel edition of lengths, restoring the original lengths.
	 */
	const cancelEditLengths = () => {
		setLengths(backupLengths);
		handleCancelLengths();
	};

	// render content
	const renderContent = () => {
		const partialContent = () => {
			if (statusLengths === "hide") {
				return (
					<div>
						<LengthsButtonBar />
					</div>
				);
			} else if (statusLengths === "view" && lengths.length !== 0) {
				return (
					<div>
						<LengthsForm />
						<LengthsButtonBar />
					</div>
				);
			} else if (statusLengths === "view" && lengths.length === 0) {
				return (
					<div>
						<LengthsRangeForm
							createRangeLengths={createRangeLengths}
						/>
						<LengthsButtonBar />
					</div>
				);
			} else if (statusLengths === "edit") {
				return (
					<div>
						<LengthsForm />
						<LengthsButtonBar />
					</div>
				);
			}
		};

		return (
			<LengthsContext.Provider
				value={{
					lengths: lengths,
					statusLengths: statusLengths,
					saveOrUpdateLengths: saveOrUpdateLengths,
					editLength: editLength,
					deleteLength: deleteLength,
					addLength: addLength,
					handleEditLengths: handleEditLengths,
					handleShowLengths: handleShowLengths,
					cancelEditLengths: cancelEditLengths,
					handleHideLengths: handleHideLengths,
				}}
			>
				<div>{partialContent()}</div>
			</LengthsContext.Provider>
		);
	};

	return renderContent();
};

export default ComponentLengths;
