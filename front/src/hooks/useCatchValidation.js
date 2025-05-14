import { useState, useEffect, useCallback, useContext } from "react";
import CatchesContext from "../contexts/CatchesContext";

/**
 * Custom hook for handling form validation in the NewCatchForm component.
 * Validates weight relationships and required fields, and manages species selection state.
 * Prevents creating duplicate catches with the same species and category combination.
 *
 * @param {Object} newCatch - The catch form data object
 * @param {string} newCatch.group - The group number (1-5)
 * @param {string} newCatch.sp_id - The selected species ID
 * @param {string} newCatch.category - The category number
 * @param {string} newCatch.weight - The total weight
 * @param {string} newCatch.sampled_weight - The sampled weight (must be <= weight)
 * @param {string} newCatch.catch_id - The unique identifier of the catch (used for duplicate validation)
 *
 * @returns {Object} Validation state and errors
 * @returns {Object} validationErrors - Object containing error messages for weight and sampled weight
 * @returns {boolean} isFormValid - Whether the entire form is valid
 * @returns {boolean} isSpeciesValid - Whether a species has been selected
 * @returns {boolean} existsCatch - Whether a catch with same species and category already exists
 */
export const useCatchValidation = (newCatch) => {
	// State to hold all validation-related values
	const [validationState, setValidationState] = useState({
		isFormValid: false,
		errors: {
			weight: "",
			sampledWeight: "",
			category: "",
		},
		isSpeciesValid: false,
		existsCatch: true,
	});

	const catchesContext = useContext(CatchesContext);

	/**
	 * Validates the weight and sampled weight relationship.
	 * The total weight must be greater than or equal to the sampled weight.
	 *
	 * @returns {boolean} Whether the weight validation passed
	 */
	const validateWeight = useCallback(() => {
		const isValid = Number(newCatch.weight) >= Number(newCatch.sampled_weight);

		setValidationState((prev) => ({
			...prev,
			errors: {
				weight: isValid ? "" : "Weight must be greater than sampled weight",
				sampledWeight: isValid ? "" : "Sampled weight must be less than weight",
			},
		}));

		return isValid;
	}, [newCatch.weight, newCatch.sampled_weight]);

	/**
	 * Validates that all required fields are filled.
	 * Checks group, species, category and weight.
	 *
	 * @returns {boolean} Whether all required fields are valid
	 */
	const validateRequiredFields = useCallback(() => {
		const requiredFields = {
			group: newCatch.group,
			sp_id: newCatch.sp_id,
			category: newCatch.category,
			weight: newCatch.weight,
		};

		const isValid = Object.values(requiredFields).every(
			(value) => value !== null && value !== "" && value !== "Select species..."
		);

		return isValid;
	}, [newCatch.group, newCatch.sp_id, newCatch.category, newCatch.weight]);

	// Effect hook that handles form validation on every change.
	useEffect(() => {
		// Update species validation state when species selection changes
		setValidationState((prev) => ({
			...prev,
			isSpeciesValid: newCatch.sp_id !== "" && newCatch.sp_id !== undefined,
		}));

		// Check if the catch already exists
		const existsCatch = catchesContext.existsCatch(
			newCatch.sp_id,
			newCatch.category,
			newCatch.catch_id
		);
		console.log("existsCatch", existsCatch);
		console.log("sp_id", newCatch.sp_id);
		console.log("sp_name", newCatch.sp_name);

		const isValid = validateWeight() && validateRequiredFields() && !existsCatch;

		setValidationState((prev) => ({
			...prev,
			existsCatch: existsCatch,
			isFormValid: isValid,
			errors: {
				...prev.errors,
				category: existsCatch ? "Category of the species already exists." : "",
			},
		}));
	}, [
		validateWeight,
		validateRequiredFields,
		newCatch.sp_id,
		newCatch.sp_code,
		newCatch.sp_name,
		newCatch.category,
		newCatch.catch_id,
	]);

	return {
		validationErrors: validationState.errors,
		isFormValid: validationState.isFormValid,
		isSpeciesValid: validationState.isSpeciesValid,
		existsCatch: validationState.existsCatch,
	};
};
