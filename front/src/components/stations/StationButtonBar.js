import React, { useContext } from "react";

import StationsContext from "../../contexts/StationsContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonDelete from "../ui/UiButtonDelete";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";
import UiIconEdit from "../ui/UiIconEdit";

const StationButtonBar = ({ stationId, handleEdit, edit }) => {
	const stationsContext = useContext(StationsContext);
	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="station__cell station__cell--right">
				<div className="buttonsWrapper">
					<UiButtonSave buttonText={"Save Station"} />
					<button
						className="buttonsWrapper__button"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							stationsContext.restoreStations(stationId);
							handleEdit(false);
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}

	if (edit === false) {
		ButtonBar = (
			<div className="station__cell station__cell--right">
				<div className="buttonsWrapper">
					<UiButtonStatusHandle handleMethod={handleEdit} buttonText={"Edit sex"} newStatus={true}>
						<UiIconEdit />
					</UiButtonStatusHandle>
					<UiButtonDelete
						id={stationId}
						deleteMethod={stationsContext.deleteStation}
						buttonText={"Delete Station"}
						confirmMessage={
							"All the data of the station, including hauls, catches, lengths... will be removed, are you sure?"
						}
					/>
				</div>
			</div>
		);
	}
	return ButtonBar;
};

export default StationButtonBar;
