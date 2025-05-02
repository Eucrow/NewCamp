import React, { useContext } from "react";

import CatchesContext from "../../contexts/CatchesContext";
import CatchContext from "../../contexts/CatchContext";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSexes from "../ui/UiButtonSexes";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";
import UiButtonSave from "../ui/UiButtonSave";

/**
 * Catch button bar component.
 */
const CatchButtonBar = (
	{
		// catchId,
		// catchStatus,
		// viewSexes,
		// setViewSexes,
		// handleCancel,
		// handleChangeAdd,
		// allowedSexes,
		// editCatchStatus,
	}
) => {
	var ButtonBar = null;

	const catchesContext = useContext(CatchesContext);
	const catchContext = useContext(CatchContext);

	const isDisabled = () => {
		return (
			catchesContext.add === true ||
			(catchesContext.editingCatchId !== null &&
				catchesContext.editingCatchId !== catchContext.catchId)
		);
	};

	if (catchContext.catchStatus === "add") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonSave buttonText={"Save"} />
				<UiButtonStatusHandle
					handleMethod={catchContext.handleChangeAdd}
					buttonText={"Cancel"}
					newStatus={false}
				/>
			</div>
		);
	}

	if (catchContext.catchStatus === "view") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonStatusHandle
					handleMethod={catchContext.editCatchStatus}
					buttonText={"Edit species"}
					newStatus={"edit"}
					disabled={isDisabled()}
				>
					<UiIconEdit />
				</UiButtonStatusHandle>

				<UiButtonDelete
					id={catchContext.thisCatch.catch_id}
					deleteMethod={catchesContext.deleteCatch}
					buttonText={"Delete species"}
					confirmMessage={
						"Are you sure to delete this catch? This delete the catch and its sexes and lengths."
					}
					children={<UiIconDelete />}
					disabled={isDisabled()}
				/>

				{catchContext.allowedSexes === false || isDisabled() === true ? (
					<UiButtonSexes disabled={true} />
				) : catchContext.viewSexes === false ? (
					<UiButtonSexes
						handleMethod={catchContext.setViewSexes}
						newStatus={true}
						disabled={false}
					/>
				) : (
					<UiButtonSexes
						handleMethod={catchContext.setViewSexes}
						newStatus={false}
						disabled={false}
					/>
				)}
			</div>
		);
	}

	if (catchContext.catchStatus === "edit") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonSave buttonText={"Save"} />

				<button
					onClick={(e) => {
						e.preventDefault();
						catchContext.handleCancel();
					}}
				>
					Cancel
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default CatchButtonBar;
