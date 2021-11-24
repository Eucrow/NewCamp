import React from "react";

import StationButtonBar from "./StationButtonBar";

const StationForm = ({ props, edit }) => {
	const is_disabled = edit === true ? false : true;

	const renderedStation = (
		<form className="station__row">
			<div className="station__cell">
				<label htmlFor="station">Station:</label>
				<input
					type="number"
					min="0"
					max="20"
					maxLength="2"
					disabled={is_disabled}
					className="station_number"
					id="station"
					name="station"
					value={props.station.station || ""}
					onChange={(e) =>
						props.handleChangeStationFields(e, props.station.id)
					}
				/>
			</div>
			<div className="station__cell">
				<label htmlFor="comment">Comment:</label>
				<input
					type="text"
					disabled={is_disabled}
					id="comment"
					name="comment"
					value={props.station.comment || ""}
					onChange={(e) =>
						props.handleChangeStationFields(e, props.station.id)
					}
				/>
			</div>
			<div className="station__cell station__cell--right">
				<StationButtonBar props={props} edit={edit} />
				{/* <div className="buttonsWrapper">
					<button
						type="submit"
						disabled={is_disabled}
						onClick={(e) => {
							props.handleSubmitEditStation(e, props.station.id);
							props.changeEdit(false);
						}}
					>
						Save Station
					</button>
				</div> */}
			</div>
		</form>
	);

	return renderedStation;
};

export default StationForm;
