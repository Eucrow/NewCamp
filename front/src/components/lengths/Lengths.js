import React, { useEffect, useState } from "react";
import LengthsContext from "../../contexts/LengthsContext";

import LengthsForm from "./LengthsForm.js";

/**
 * Manages and displays lengths data of a sex.
 * @component
 * @param {number} sexId The ID of the sex for which lengths data should be fetched.
 * @param {number} sex Sex.
 * @param {number} catchId The ID of the catch for which lengths data should be fetched.
 * @param {number} unit The unit of measurement for the lengths. 1 represents cm, 2 represents mm.
 * @param {number} increment The increment value for lengths.
 * @param {Function} createSex A function to create a sex.
 *
 * @returns {JSX.Element} A JSX element that renders the lengths data and provides interfaces for manipulating it.
 */
const Lengths = ({ sex, catchId, unit, increment }) => {
	const [backupLengths, setBackupLengths] = useState([
		{
			length: "",
			number_individuals: "",
		},
	]);

	const [lengths, setLengths] = useState([]);

	const [lengthsStatus, setLengthsStatus] = useState("view");

	const [responseError, setResponseError] = useState("none");

	const [validLengths, setValidLengths] = useState(true);

	const apiLengthsSex = "http://127.0.0.1:8000/api/1.0/lengths/";

	const getUnit = (u) => {
		if (Number(u) === 1) {
			return "cm";
		} else if (Number(u) === 2) {
			return "mm";
		} else {
			return "no unit";
		}
	};

	const [measureUnit, setMeasureUnit] = useState(getUnit(unit));

	useEffect(() => {
		if (responseError !== "none") {
			alert(responseError);
		}
	}, [responseError]);

	useEffect(() => {
		getLengths().then((lens) => {
			lens = fillLengths(lens);
			// lens = transformUnitsFromMm(lens);
			setBackupLengths(lens);
			setLengths(lens);
			if (lens.length === 0) {
				setLengthsStatus("empty");
			}
		});
	}, []);

	/**
	 * Get all lengths of a sexId from database.
	 * When the lengths are fetched, they are transformed to the unit of measurement specified in the unit prop.
	 * @returns JSON with lengths.
	 */
	const getLengths = async () => {
		const api = apiLengthsSex + catchId + "/" + sex;
		const response = await fetch(api);
		if (response.status > 400) {
			setResponseError("Something went wrong! (getLengths)");
		}
		const data = await response.json();

		const updatedData = transformUnitsFromMm(data);

		return updatedData;
	};

	/**
	 * Delete all lengths of a sexId in database. The sexId variable is taken from parent component via props.
	 * @returns JSON
	 */
	const deleteLengths = async () => {
		const api = apiLengthsSex + catchId + "/" + sex;
		const response = await fetch(api, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		setLengthsStatus("empty");

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

		var newLengths = [];

		// to calculate the increment in lengths, in case the unit is cm (unit=1)
		// simply multiply the increment by 10... TODO: Try to do it in a more global way.
		var totalIncrement = increment;

		if (unit === 1) {
			totalIncrement = 10 * Number(increment);
		}

		// for (let i = minimumLength; i <= maximumLength; i++) {
		for (let i = minimumLength; i <= maximumLength; i += totalIncrement) {
			let originalLength = lengths.filter((e) => e.length === i);

			if (originalLength.length !== 0) {
				newLengths.push({
					id: originalLength[0].id,
					length: originalLength[0].length,
					number_individuals: originalLength[0].number_individuals,
				});
			} else {
				newLengths.push({
					id: 0,
					length: i,
					number_individuals: 0,
				});
			}
		}

		return newLengths;
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
	 * Remove useless elements of lengths array and maintain only lenght and number of individuals.
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
	const removeZeroTailsInState = (lengths) => {
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
	 * Transform units to millimeters.
	 * @param {array} lengths to transform.
	 */
	const transformUnitsToMm = (lengths) => {
		var newLengths = lengths;

		if (Number(unit) === 1) {
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

		if (Number(unit) === 1) {
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
	 * Save lengths database.
	 * Before saving the lengths, the units are transformed to millimeters, and the response
	 * is transformed back to the unit of measurement specified in the unit prop.
	 * @param {array} lengths Array of dictionaries with lengths to save or update.
	 * @return JSON response or error.
	 */
	const saveLengths = async (lengths) => {
		const api = apiLengthsSex + catchId + "/" + sex;

		lengths = transformUnitsToMm(lengths);

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
			let data = await response.json();
			data = transformUnitsFromMm(data);
			return data;
		} catch (error) {
			return console.log(error);
		}
	};

	/**
	 * Handles the form submission event to save a sex and its associated lengths.
	 * If the sexId is undefined, it creates a new sex and saves the lengths.
	 * If the sexId is defined, it deletes the existing lengths and saves the new lengths.
	 *
	 * @param {Event} e - The event object, typically from a form submission.
	 * @param {string} sex - The sex to be saved.
	 * @param {Array} lengths - The lengths to be saved.
	 * @returns {undefined} This function does not have a return value.
	 * @throws {Error} If there's an error during the fetch requests, the error is logged to the console.
	 */
	const saveSexAndLengths = (e, lengths) => {
		e.preventDefault();

		lengths = removeUselessElementsLengths(lengths);
		lengths = removeZeroNumberIndividuals(lengths);

		deleteLengths().then(() => {
			saveLengths(lengths)
				.then((lengths) => {
					setLengths(fillLengths(lengths));
				})
				.then(() => {
					setLengthsStatus("view");
				})
				.catch((error) => console.log(error));
		});
	};

	/**
	 * Create length range.
	 * @param {number} minLength Minimum length.
	 * @param {number} maxLength Maximum length.
	 */
	const createRangeLengths = (minLength, maxLength) => {
		var newLengths = [];

		for (var l = Number(minLength); l <= Number(maxLength); l += Number(increment)) {
			newLengths.push({
				length: l,
				number_individuals: "",
			});
		}

		setLengths(newLengths);
		setLengthsStatus("edit");
	};

	/**
	 * Get a lengths array and update the property "is_valid" properly:
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

		let newLength = Number(l) + Number(increment);

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
		return (
			<LengthsContext.Provider
				value={{
					lengths: lengths,
					sex: sex,
					measureUnit: measureUnit,
					increment: increment,
					lengthsStatus: lengthsStatus,
					setLengthsStatus: setLengthsStatus,
					validLengths: validLengths,
					setValidLengths: setValidLengths,
					addLength: addLength,
					editLength: editLength,
					cancelEditLengths: cancelEditLengths,
					deleteLength: deleteLength,
					deleteLengths: deleteLengths,
					saveSexAndLengths: saveSexAndLengths,
					createRangeLengths: createRangeLengths,
				}}
			>
				<LengthsForm />
			</LengthsContext.Provider>
		);
	};

	return renderContent();
};

export default Lengths;
