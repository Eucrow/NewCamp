import React from "react";

/**
 * Lengths button bar component.
 */
const SexesButtonBar = ({ sexStatus, setAddSex }) => {
	var ButtonBar = null;

	if (sexStatus === "view") {
		ButtonBar = (
			<div className="buttonsWrapper">
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						setAddSex(true);
					}}
				>
					Add sex
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default SexesButtonBar;
