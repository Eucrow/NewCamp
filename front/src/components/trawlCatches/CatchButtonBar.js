import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSexes from "../ui/UiButtonSexes";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";

/**
 * Lengths button bar component.
 */
const CatchButtonBar = ({
	catch_id,
	catch_status,
	new_catch,
	view_sexes,
	editCatchStatus,
	createCatch,
	deleteCatch,
	handleViewSexes,
	updateCatch,
	handleCancel,
}) => {
	var ButtonBar = null;

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

	if (catch_status === "add") {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<button
					onClick={(e) => {
						// createCatch(e, {
						// 	group: group,
						// 	sp_id: sp_id,
						// 	category: category,
						// 	weight: weight,
						// });
						createCatch(e, new_catch);
					}}
				>
					Save
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default CatchButtonBar;
