import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonEditHandle from "../ui/UiButtonEditHandle";
import UiButtonSexes from "../ui/UiButtonSexes";
// import UiButtonIconSexes from "../ui/UiButtonIconSexes";

/**
 * Lengths button bar component.
 */
const CatchButtonBar = ({
	catch_id,
	catch_status,
	view_sexes,
	editCatchStatus,
	deleteCatch,
	handleViewSexes,
	updateCatch,
	handleCancel,
}) => {
	var ButtonBar = null;

	if (catch_status === "view") {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<UiButtonEditHandle buttonText={"Edit catch"} editMethod={editCatchStatus} newStatus={"edit"} />

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
	} else if (catch_status === "edit") {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<button
					onClick={() => {
						updateCatch(catch_id);
						editCatchStatus("view");
					}}
				>
					Save
				</button>

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
