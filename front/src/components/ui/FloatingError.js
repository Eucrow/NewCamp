import React from "react";

const FloatingError = ({ message, show, inputRef }) => {
	if (!show || !message) return null;

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
