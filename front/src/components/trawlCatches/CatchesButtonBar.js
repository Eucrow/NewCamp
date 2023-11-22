import React from "react";

import Catch from "./Catch";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSexes from "../ui/UiButtonSexes";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";

/**
 * Lengths button bar component.
 */
const CatchesButtonBar = ({
	catch_status,
	createCatch,
	group,
	sp_id,
	category,
	weight,
	editCatchStatus,
	handleChangeAdd,
}) => {
	var ButtonBar = null;

	if (catch_status !== "add") {
		ButtonBar = (
			<button
				className="buttonsWrapper__button"
				onClick={(e) => {
					createCatch(e, {
						group: group,
						sp_id: sp_id,
						category: category,
						weight: weight,
					});
				}}
			>
				Add catch
			</button>
		);
	} else if (catch_status === "add") {
		ButtonBar = (
			<UiButtonStatusHandle handleMethod={handleChangeAdd} buttonText={"Add catch"} newStatus={false}>
				Add catch
			</UiButtonStatusHandle>
		);
	}

	return ButtonBar;
};

export default CatchesButtonBar;
