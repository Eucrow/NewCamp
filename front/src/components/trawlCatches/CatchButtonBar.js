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
	catch_id,
	catch_status,
	view_sexes,
	editCatchStatus,
	deleteCatch,
	handleViewSexes,
	handleCancel,
	handleChangeAdd,
}) => {
	var ButtonBar = null;

	if (catch_status === "add") {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonSave buttonText={"Save"} />
				<button
					onClick={(e) => {
						handleChangeAdd();
					}}
				>
					Cancel
				</button>
			</div>
		);
	}

	if (catch_status === "view") {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonStatusHandle handleMethod={editCatchStatus} buttonText={"Edit catch"} newStatus={"edit"}>
					<UiIconEdit />
				</UiButtonStatusHandle>

				<UiButtonDelete
					id={catch_id}
					deleteMethod={deleteCatch}
					buttonText={"Delete Catch"}
					confirmMessage={
						"Are you sure to delete this catch? This delete the catch and its sexes and lengths."
					}
				/>

				{view_sexes === false ? (
					<UiButtonSexes handleMethod={handleViewSexes} newStatus={true} />
				) : (
					<UiButtonSexes handleMethod={handleViewSexes} newStatus={false} />
				)}
			</div>
		);
	}

	if (catch_status === "edit") {
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
