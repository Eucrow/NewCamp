import React from "react";

/**
 * Lengths button bar component.
 */
const SexButtonBar = ({
	add_sex_status,
	handleAddSexStatus,
	handleSexStatus,
}) => {
	var ButtonBar = null;

	if (add_sex_status === "view") {
		ButtonBar = (
			<div className="buttonsWrapper">
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						handleAddSexStatus(true);
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

export default SexButtonBar;
