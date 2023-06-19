import React from "react";

import { convertDecimalToDMCoordinate } from "C:/Users/ieoma/Desktop/NewCamp/front/src/utils/Coordinates";

const TrawlFormView = ({ trawl }) => {
	/**
	 * Component of trawl form of haul.
	 * @param {object} trawl
	 */

	const [degrees_shooting_latitude, minutes_shooting_latitude] = convertDecimalToDMCoordinate(
		trawl.shooting_latitude
	);
	const [degrees_shooting_longitude, minutes_shooting_longitude] = convertDecimalToDMCoordinate(
		trawl.shooting_longitude
	);
	const [degrees_hauling_latitude, minutes_hauling_latitude] = convertDecimalToDMCoordinate(trawl.hauling_latitude);
	const [degrees_hauling_longitude, minutes_hauling_longitude] = convertDecimalToDMCoordinate(
		trawl.hauling_longitude
	);
	const [degrees_bottom_latitude, minutes_bottom_latitude] = convertDecimalToDMCoordinate(trawl.bottom_latitude);
	const [degrees_bottom_longitude, minutes_bottom_longitude] = convertDecimalToDMCoordinate(trawl.bottom_longitude);

	const renderDateTime = (element, id, aria_label) => {
		if (trawl[element]) {
			const dateTime = trawl[element] || "";
			return (
				<input
					disabled
					type="datetime-local"
					name={id}
					id={id}
					defaultValue={dateTime}
					aria-label={aria_label}
				/>
			);
		} else {
			return <input disabled type="datetime-local" />;
		}
	};

	const renderCoordinates = (degrees, minutes, operation, coordinateType) => {
		const nameDegrees = `${operation}_${coordinateType}_degrees`;
		const nameMinutes = `${operation}_${coordinateType}_minutes`;
		const ariaLabelDegrees = `Degrees ${operation} ${coordinateType}`;
		const ariaLabelMinutes = `Minutes ${operation} ${coordinateType}`;
		return (
			<div className="characteristicsGrid__field">
				<input
					type="number"
					className="coordinates"
					disabled
					name={nameDegrees}
					id={nameDegrees}
					min={-90}
					max={90}
					defaultValue={degrees || ""}
					aria-label={ariaLabelDegrees}
				/>
				º{" "}
				<input
					type="number"
					className="coordinates"
					disabled
					name={nameMinutes}
					id={nameMinutes}
					min={0}
					max={60}
					step={0.001}
					pattern="[0-9]+(\,[0-9]{3})?"
					defaultValue={minutes || ""}
					aria-label={ariaLabelMinutes}
				/>
				'
			</div>
		);
	};

	const renderContent = () => {
		return (
			<fieldset className="wrapper">
				<legend>Trawl characteristics:</legend>
				<div className="characteristicsGrid characteristicsGrid--trawl form__row">
					{/* first row */}
					<div></div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						Date/time:
					</div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						Latitude:
					</div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						Longitude:
					</div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						Depth (m):
					</div>

					{/* second row */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Shooting:
					</div>
					<div className="characteristicsGrid__field">
						{renderDateTime("shooting_date_time", "shooting_date_time", "Shooting date and time")}
					</div>
					<div className="characteristicsGrid__field">
						{renderCoordinates(
							degrees_shooting_latitude,
							minutes_shooting_latitude,
							"shooting",
							"latitude"
						)}
					</div>
					<div className="characteristicsGrid__field">
						{renderCoordinates(
							degrees_shooting_longitude,
							minutes_shooting_longitude,
							"shooting",
							"latitude"
						)}
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="shooting_depth"
							id="shooting_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.shooting_depth || ""}
							aria-label="Shooting depth"
						/>
					</div>

					{/* third row */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Hauling:
					</div>
					<div className="characteristicsGrid__field">
						{renderDateTime("hauling_date_time", "hauling_date_time", "Hauling date and time")}
					</div>
					<div className="characteristicsGrid__field">
						{renderCoordinates(degrees_hauling_latitude, minutes_hauling_latitude, "hauling", "latitude")}
					</div>
					<div className="characteristicsGrid__field">
						{renderCoordinates(
							degrees_hauling_longitude,
							minutes_hauling_longitude,
							"hauling",
							"longitude"
						)}
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="hauling_depth"
							id="hauling_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.hauling_depth || ""}
							aria-label="Hauling depth"
						/>
					</div>

					{/* fourth row */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Bottom:
					</div>
					<div className="characteristicsGrid__field">
						{renderDateTime("bottom_date_time", "bottom_date_time", "Bottom date and time")}
					</div>
					<div className="characteristicsGrid__field">
						{renderCoordinates(degrees_bottom_latitude, minutes_bottom_latitude, "bottom", "latitude")}
					</div>
					<div className="characteristicsGrid__field">
						{renderCoordinates(degrees_bottom_longitude, minutes_bottom_longitude, "bottom", "longitude")}
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="bottom_depth"
							id="bottom_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.bottom_depth || ""}
							aria-label="Bottom depth"
						/>
					</div>
				</div>

				<div className="form__row">
					<label className="field">
						Course (degrees):
						<input
							disabled
							type="number"
							name="course"
							id="course"
							min={0}
							max={360}
							maxLength={3}
							size={3}
							step={1}
							value={trawl.course || ""}
						/>
					</label>
					<label className="field">
						Velocity (m/s):
						<input
							disabled
							type="number"
							name="velocity"
							id="velocity"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.velocity || ""}
						/>
					</label>
					<label className="field">
						Cable (m):
						<input
							disabled
							type="number"
							name="cable"
							id="cable"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.cable || ""}
						/>
					</label>
					<label className="field">
						Sweep (m):
						<input
							disabled
							type="number"
							name="sweep"
							id="sweep"
							min={0}
							max={999}
							maxLength={3}
							size={3}
							step={1}
							value={trawl.sweep || ""}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field">
						Otter Boards Distance (m):
						<input
							disabled
							type="number"
							name="otter_boards_distance"
							id="otter_boards_distance"
							min={0}
							max={999}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.otter_boards_distance || ""}
						/>
					</label>
					<label className="field">
						Horizontal Aperture (m):
						<input
							disabled
							type="number"
							name="horizontal_aperture"
							id="horizontal_aperture"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.horizontal_aperture || ""}
						/>
					</label>
					<label className="field">
						Vertical Aperture (m):
						<input
							disabled
							type="number"
							name="vertical_aperture"
							id="vertical_aperture"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.vertical_aperture || ""}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field">
						Grid (m):
						<input
							disabled
							type="number"
							name="grid"
							id="grid"
							min={0}
							max={99}
							maxLength={2}
							size={2}
							step={1}
							value={trawl.grid || ""}
						/>
					</label>
					<label className="field">
						Track (m):
						<input
							disabled
							type="number"
							name="track"
							id="track"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.track || ""}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field__comment">
						Comment:
						<textarea disabled name="comment" id="comment" value={trawl.comment || ""} />
					</label>
				</div>
			</fieldset>
		);
	};

	return renderContent();
};

export default TrawlFormView;
