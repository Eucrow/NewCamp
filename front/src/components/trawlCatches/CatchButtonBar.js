import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSexes from "../ui/UiButtonSexes";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";
import UiButtonSave from "../ui/UiButtonSave";

/**
 * Catch button bar component.
 */
const CatchButtonBar = ({
	catchId,
	catchStatus,
	viewSexes,
	editCatchStatus,
	deleteCatch,
	handleViewSexes,
	handleCancel,
	handleChangeAdd,
}) => {
	var ButtonBar = null;

	if (catchStatus === "add") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonSave buttonText={"Save"} />
				<button
					onClick={(e) => {
						e.preventDefault();
						handleChangeAdd(false);
					}}
				>
					Cancel
				</button>
			</div>
		);
	}

	if (catchStatus === "view") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonStatusHandle handleMethod={editCatchStatus} buttonText={"Edit species"} newStatus={"edit"}>
					<UiIconEdit />
				</UiButtonStatusHandle>

				<UiButtonDelete
					id={catchId}
					deleteMethod={deleteCatch}
					buttonText={"Delete species"}
					confirmMessage={
						"Are you sure to delete this catch? This delete the catch and its sexes and lengths."
					}
				/>

				{viewSexes === false ? (
					<UiButtonSexes handleMethod={handleViewSexes} newStatus={true} />
				) : (
					<UiButtonSexes handleMethod={handleViewSexes} newStatus={false} />
				)}
			</div>
		);
	}

	if (catchStatus === "edit") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonSave buttonText={"Save"} />

				<button
					onClick={() => {
						handleCancel();
						editCatchStatus("view");
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
