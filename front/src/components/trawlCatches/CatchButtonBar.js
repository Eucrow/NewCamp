import React, { useContext } from "react";

import CatchesContext from "../../contexts/CatchesContext";

import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonSexes from "../ui/UiButtonSexes";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";
import UiIconDelete from "../ui/UiIconDelete";
import UiButtonSave from "../ui/UiButtonSave";

/**
 * Catch button bar component.
 */
const CatchButtonBar = ({
	catchId,
	catchStatus,
	viewSexes,
	handleViewSexes,
	handleCancel,
	handleChangeAdd,
	allowedSexes,
	editCatchStatus,
}) => {
	var ButtonBar = null;

	const catchesContext = useContext(CatchesContext);

	if (catchStatus === "add") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonSave buttonText={"Save"} />
				<UiButtonStatusHandle
					handleMethod={handleChangeAdd}
					buttonText={"Done"}
					newStatus={false}
				/>
			</div>
		);
	}

	if (catchStatus === "view") {
		ButtonBar = (
			<div className="catches__table__buttonBar">
				<UiButtonStatusHandle
					handleMethod={editCatchStatus}
					buttonText={"Edit species"}
					newStatus={"edit"}
				>
					<UiIconEdit />
				</UiButtonStatusHandle>
				<UiButtonDelete
					id={catchId}
					deleteMethod={catchesContext.deleteCatch}
					buttonText={"Delete species"}
					confirmMessage={
						"Are you sure to delete this catch? This delete the catch and its sexes and lengths."
					}
					children={<UiIconDelete />}
				/>

				{allowedSexes === false ? (
					<UiButtonSexes disabled={true} />
				) : viewSexes === false ? (
					<UiButtonSexes
						handleMethod={handleViewSexes}
						newStatus={true}
						disabled={false}
					/>
				) : (
					<UiButtonSexes
						handleMethod={handleViewSexes}
						newStatus={false}
						disabled={false}
					/>
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
						catchesContext.editCatchStatus("view");
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
