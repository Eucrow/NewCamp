import React from "react";

const StationButtonBar = ({ props, edit }) => {
	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="station__cell station__cell--right">
				<div className="buttonsWrapper">
					<button
						type="submit"
						className="buttonsWrapper__button"
						onClick={(e) => {
							props.handleSubmitEditStation(e, props.station.id);
							props.changeEdit(false);
						}}
					>
						Save Station
					</button>
					<button
						className="buttonsWrapper__button"
						onClick={(e) => {
							props.changeEdit(false);
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
					<button
						className="buttonsWrapper__button"
						onClick={(e) => {
							props.changeEdit(true);
						}}
					>
						Edit Station
					</button>
					<button
						className="buttonsWrapper__button"
						onClick={(e) => {
							if (window.confirm("Delete the station?")) {
								props.deleteStation(e, props.station.id);
							}
						}}
					>
						Delete Station
					</button>
				</div>
			</div>
		);
	}

	return ButtonBar;
};

export default StationButtonBar;
