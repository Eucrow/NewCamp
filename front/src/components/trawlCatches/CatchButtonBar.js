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
			<div className="form__cell form__cell--right">
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
			<div className="form__cell form__cell--right">
				<UiButtonStatusHandle handleMethod={editCatchStatus} buttonText={"Edit catch"} newStatus={"edit"}>
					<UiIconEdit />
				</UiButtonStatusHandle>

				<UiButtonDelete
					id={catchId}
					deleteMethod={deleteCatch}
					buttonText={"Delete Catch"}
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
			<div className="form__cell form__cell--right">
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
