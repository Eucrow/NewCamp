import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for handling form validation in the NewCatchForm component.
 * Validates weight relationships and required fields, and manages species selection state.
 *
 * @param {Object} newCatch - The catch form data object
 * @param {string} newCatch.group - The group number (1-5)
 * @param {string} newCatch.sp_id - The selected species ID
 * @param {string} newCatch.category - The category number
 * @param {string} newCatch.weight - The total weight
 * @param {string} newCatch.sampled_weight - The sampled weight (must be <= weight)
 *
 * @returns {Object} Validation state and errors
 * @returns {Object} validationErrors - Object containing error messages for weight and sampled weight
 * @returns {boolean} isFormValid - Whether the entire form is valid
 * @returns {boolean} isSpeciesValid - Whether a species has been selected
 */
export const useCatchValidation = (newCatch) => {
	// State to hold all validation-related values
	const [validationState, setValidationState] = useState({
		isFormValid: false,
		errors: {
			weight: "",
			sampledWeight: "",
		},
		isSpeciesValid: "",
	});

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
	const validateRequired = useCallback(() => {
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

	// Validate form whenever weight validation or required fields change
	useEffect(() => {
		const isValid = validateWeight() && validateRequired();

		setValidationState((prev) => ({
			...prev,
			isFormValid: isValid,
		}));
	}, [validateWeight, validateRequired]);

	// Update species validation state when species selection changes
	useEffect(() => {
		setValidationState((prev) => ({
			...prev,
			isSpeciesValid: newCatch.sp_id !== "" && newCatch.sp_id !== undefined,
		}));
	}, [newCatch.sp_id]);

	return {
		validationErrors: validationState.errors,
		isFormValid: validationState.isFormValid,
		isSpeciesValid: validationState.isSpeciesValid,
	};
};
