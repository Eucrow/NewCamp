import React from "react";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * Lengths button bar component.
 */
const CatchButtonBar = ({
	catch_id,
	catch_status,
	view_sexes,
	editCatchStatus,
	removeCatch,
	handleViewSexes,
	updateCatch,
	handleCancel,
}) => {
	var ButtonBar = null;

	if (catch_status === "view") {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						editCatchStatus("edit");
					}}
				>
					Edit catch
				</button>
				<button
					className="buttonsWrapper__button"
					onClick={() => {
						removeCatch(catch_id);
					}}
				>
					Delete catch
				</button>
				{view_sexes === false ? (
					<button className="buttonsWrapper__button" onClick={() => handleViewSexes(true)}>
						View sexes
					</button>
				) : (
					<button className="buttonsWrapper__button" onClick={() => handleViewSexes(false)}>
						Hide sexes
					</button>
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
