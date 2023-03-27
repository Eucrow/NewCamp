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
	//  else if (add_sex_status === "add") {
	// 	ButtonBar = (
	// 		<div className="form__cell buttonsWrapper--center">
	// 			<button
	// 				type="button"
	// 				onClick={(e) => {
	// 					addSex(
	// 						e,
	// 						new_sex,
	// 						catch_id
	// 					);
	// 					handleAddSexButton(false);
	// 				}}
	// 			>
	// 				Save new sex
	// 			</button>
	// 			<button
	// 				className="buttonsWrapper__button"
	// 				type="button"
	// 				onClick={() => {
	// 					handleSexStatus("view");
	// 				}}
	// 			>
	// 				Cancel
	// 			</button>

	// 		</div>
	// 	);
	// }

	return ButtonBar;
};

export default SexesButtonBar;
