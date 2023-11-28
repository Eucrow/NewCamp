import React from "react";

import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * Catches button bar component.
 */
const CatchesButtonBar = ({ add, handleChangeAdd }) => {
	var ButtonBar = null;

	if (add === false) {
		ButtonBar = (
			<UiButtonStatusHandle handleMethod={handleChangeAdd} buttonText={"Add catch"} newStatus={false}>
				Add catch
			</UiButtonStatusHandle>
		);
	}

	return ButtonBar;
};

export default CatchesButtonBar;
