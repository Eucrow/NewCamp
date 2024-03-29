import React, { Fragment, useEffect, useState, useReducer } from "react";
import LengthsContext from "../../contexts/LengthsContext";

import LengthsForm from "./LengthsForm.js";
import LengthsButtonBar from "./LengthsButtonBar.js";
import LengthsRangeForm from "./LengthsRangeForm.js";

/**
 * Lengths component.
 * @param {number} sexId
 * @param {string} lengths Posible values: "view", "edit", "hide".
 * @returns
 */
const ComponentLengths = ({ sexId, lengthsStatus, unit, increment, setLengthsStatus }) => {
	const [backupLengths, setBackupLengths] = useState([
		{
			length: "",
			number_individuals: "",
		},
	]);

	const [lengths, setLengths] = useState([]);

	const [responseError, setResponseError] = useState("none");

	const apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/";

	const getUnit = (u) => {
		if (u === 1) {
			return "cm";
		} else if (u === 2) {
			return "mm";
		} else {
			return "no unit";
		}
	};

	const [measureUnit, setMeasureUnit] = useReducer(getUnit, unit);

	useEffect(() => {
		if (responseError !== "none") {
			alert(responseError);
		}
	}, [responseError]);

	// useEffect(() => {
	// 	handleShowLengths();

	// 	setMeasureUnit(unit);
	// }, [lengthsStatus]);

	useEffect(() => {
		handleShowLengths();

		setMeasureUnit(unit);
	}, []);

	/**
	 * Get all lengths of a sexId from database.
	 * @returns JSON with lengths.
	 */
	const getLengths = async () => {
		const api = apiLengths + sexId;

		const response = await fetch(api);
		if (response.status > 400) {
			setResponseError("Something went wrong! (getLengths)");
		}
		return response.json();
	};

	/**
	 * Show lengths.
	 */
	const handleShowLengths = () => {
		getLengths().then((lengths) => {
			var filledLengths = fillLengths(lengths);
			filledLengths = transformUnitsFromMm(filledLengths);
			setBackupLengths(filledLengths);
			setLengths(filledLengths);
			setLengthsStatus(lengthsStatus);

			// a deep copy is mandatory because the data to be modified is nested:
			let newLengths = JSON.parse(JSON.stringify(filledLengths));
			newLengths.forEach((el) => {
				el["is_valid"] = true;
			});
			setLengths(newLengths);
		});
	};

	/**
	 * Delete all lengths of a sexId in database. The sexId variable is taken from parent component via props.
	 * @returns JSON
	 */
	const deleteLengths = async () => {
		const api = apiLengths + sexId;

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
	 * Fill lengths array with the lengths that are missing.
	 * @param {array} lengths to fill.
	 * @returns array with filled lengths.
	 */
	const fillLengths = (lengths) => {
		var len = Array.from(lengths, (length) => length.length);

		var minimumLength = Math.min(...len);
		var maximumLength = Math.max(...len);

		var newLenghts = [];

		// to calculate the increment in lengths, in case the unit is cm
		// simply multiply the increment by 10... TODO: Try to do it in a more global way.
		var totalIncrement = 1;

		if (unit === 1) {
			totalIncrement = 10 * Number(increment);
		}

		// for (let i = minimumLength; i <= maximumLength; i++) {
		for (let i = minimumLength; i <= maximumLength; i += totalIncrement) {
			let originalLength = lengths.filter((e) => e.length === i);

			if (originalLength.length !== 0) {
				newLenghts.push({
					id: originalLength[0].id,
					length: originalLength[0].length,
					number_individuals: originalLength[0].number_individuals,
				});
			} else {
				newLenghts.push({
					id: 0,
					length: i,
					number_individuals: 0,
				});
			}
		}

		return newLenghts;
	};

	/**
	 * Remove zero number individuals from lengths array.
	 * @param {array of objec} lengths to remove zero number individuals.
	 */
	const removeZeroNumberIndividuals = (lengths) => {
		var newLengths = lengths.filter((e) => e.number_individuals !== 0 && e.number_individuals !== "");
		return newLengths;
	};

	/**
	 * Remove useless elements of lengths array.
	 * @param {array} lengths to clean.
	 */
	const removeUselessElementsLengths = (lengths) => {
		var newLengths = lengths.map((l) => {
			return {
				length: l.length,
				number_individuals: l.number_individuals,
			};
		});
		return newLengths;
	};

	/**
	 * Remove zero tails from lengths array.
	 * @param {array} lengths to remove zero tails.
	 */
	const removeZeroTails = (lengths) => {
		if (lengths.length !== 0) {
			var newLengths = lengths;

			while (newLengths[0]["number_individuals"] === 0) {
				newLengths.shift();
			}

			while (newLengths[newLengths.length - 1]["number_individuals"] === 0) {
				newLengths.pop();
			}

			setLengths(newLengths);
		}
	};

	/**
	 * Transform units to milimeters.
	 * @param {array} lengths to transform.
	 */
	const transformUnitsToMm = (lengths) => {
		var newLengths = lengths;

		if (unit === 1) {
			newLengths = newLengths.map((l) => {
				return {
					length: l.length * 10,
					number_individuals: l.number_individuals,
				};
			});
		}

		return newLengths;
	};

	/**
	 * Transform units from milimeters to measure unit in state.
	 * @param {array} lengths to transform.
	 */
	const transformUnitsFromMm = (lengths) => {
		var newLengths = lengths;

		if (unit === 1) {
			newLengths = newLengths.map((l) => {
				return {
					length: l.length / 10,
					number_individuals: l.number_individuals,
				};
			});
		}

		return newLengths;
	};

	/**
	 * Save lengths of a sexId in database. The sexId variable is taken from parent component via props.
	 * @param {array} lengths Array of dictionaries with lengths to save or update.
	 * @return JSON response or error.
	 */
	const saveLengths = async (lengths) => {
		const api = apiLengths + sexId;

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
			setResponseError("Duplicated lengths!");
		} else {
			getLengths()
				.then((lengthts_in_database) => {
					lengths = removeZeroNumberIndividuals(lengths);
					lengths = removeUselessElementsLengths(lengths);
					lengths = transformUnitsToMm(lengths);
					if (Object.keys(lengthts_in_database).length === 0) {
						// if there are not lengths already saved, save the new lengths:
						saveLengths(lengths).catch((error) => console.log(error));
						setBackupLengths(lengths);
					} else {
						// if there are lengths, first delete it, and then save the updated lengths.
						deleteLengths()
							.then(() => {
								saveLengths(lengths);
								setBackupLengths(lengths);
							})
							.catch((error) => console.log(error));
					}
				})

				.then(() => {
					setLengthsStatus("view");
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
		setLengthsStatus("edit");
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
		setLengthsStatus("view");
	};

	// render content
	const renderContent = () => {
		const partialContent = () => {
			if (lengthsStatus === "hide") {
				return null;
			} else if (lengthsStatus === "view" && lengths.length !== 0) {
				return <LengthsForm lengthsStatus={lengthsStatus} />;
			} else if (lengthsStatus === "view" && lengths.length === 0) {
				return (
					<Fragment>
						<LengthsRangeForm createRangeLengths={createRangeLengths} />
						<LengthsButtonBar />
					</Fragment>
				);
			} else if (lengthsStatus === "edit") {
				return <LengthsForm lengthsStatus={lengthsStatus} />;
			}
		};

		return (
			<LengthsContext.Provider
				value={{
					lengths: lengths,
					measureUnit: measureUnit,
					lengthsStatus: lengthsStatus,
					setLengthsStatus: setLengthsStatus,
					saveOrUpdateLengths: saveOrUpdateLengths,
					removeZeroTails: removeZeroTails,
					editLength: editLength,
					deleteLength: deleteLength,
					addLength: addLength,
					handleShowLengths: handleShowLengths,
					cancelEditLengths: cancelEditLengths,
				}}
			>
				<Fragment>{partialContent()}</Fragment>
			</LengthsContext.Provider>
		);
	};

	return renderContent();
};

export default ComponentLengths;
