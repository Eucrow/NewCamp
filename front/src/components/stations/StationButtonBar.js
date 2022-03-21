import React, { useContext } from "react";

import StationsContext from "../../contexts/StationsContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";
import UiButtonDelete from "../ui/UiButtonDelete";

const StationButtonBar = ({ station_id, handleEdit, edit }) => {
	const stationsContext = useContext(StationsContext);
	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="station__cell station__cell--right">
				<div className="buttonsWrapper">
					<UiButtonSave buttonText={"Save Station"} />
					<UiButtonCancel handleMethod={handleEdit} />
				</div>
			</div>
		);
	}

	if (edit === false) {
		ButtonBar = (
			<div className="station__cell station__cell--right">
				<div className="buttonsWrapper">
					<button
						type="button"
						className="buttonsWrapper__button"
						onClick={(e) => {
							handleEdit(true);
						}}
					>
						Edit Station
					</button>
					<UiButtonDelete
						id={station_id}
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
