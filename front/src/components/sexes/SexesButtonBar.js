import React from "react";

/**
 * Lengths button bar component.
 */
const SexesButtonBar = ({ add_sex_status, setAddSexStatus }) => {
	var ButtonBar = null;

	if (add_sex_status === "view") {
		ButtonBar = (
			<div className="buttonsWrapper">
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						setAddSexStatus(true);
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
