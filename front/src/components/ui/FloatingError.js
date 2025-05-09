import React from "react";

/**
 * FloatingError component displays an error message in a floating div positioned
 * below the input field that triggered the error.
 *
 * @component
 * @param {string} message - The error message to display
 * @param {boolean} show - Controls visibility of the error message
 * @param {React.RefObject} inputRef - Reference to the input element that triggered the error
 * @returns {React.ReactElement|null} Returns the error component or null if not visible
 *
 * @example
 * <FloatingError
 *   message="Weight must be greater than sampled weight"
 *   show={activeField === "weight"}
 *   inputRef={weightRef}
 * />
 */
const FloatingError = ({ message, show, inputRef }) => {
	// Early return if component should not be shown
	if (!show || !message) return null;

	/**
	 * Calculates the position of the error message relative to the input element
	 * @returns {Object} CSS position properties
	 */
	const getPosition = () => {
		if (!inputRef.current) return {};
		const rect = inputRef.current.getBoundingClientRect();
		return {
			top: `${rect.bottom + window.scrollY + 5}px`,
			left: `${rect.left + window.scrollX}px`,
		};
	};

	return (
		<div className="floating-error" style={getPosition()}>
			{message}
		</div>
	);
};

export default FloatingError;
