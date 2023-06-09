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

	const renderDateTime = (dateTime, id, aria_label) => {
		if (dateTime) {
			return (
				<input
					disabled
					type="datetime-local"
					name={id}
					id={id}
					value={trawl.shooting_date_time || ""}
					aria-label={aria_label}
				/>
			);
		}
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
					<div className="characteristicsGrid__colName characteristicsGrid--span2" aria-hidden="true">
						Latitude:
					</div>

					<div className="characteristicsGrid__colName characteristicsGrid--span2" aria-hidden="true">
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
						{/* <input
							disabled
							type="datetime-local"
							name="shooting_date_time"
							id="shooting_date_time"
							value={trawl.shooting_date_time || ""}
							aria-label="Shooting date and time"
						/> */}
						{renderDateTime(trawl.shooting_date_time, "shooting_date_time", "Shooting date and time")}
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="number"
							name="degrees_shooting_latitude"
							id="degrees_shooting_latitude"
							min={-90}
							max={90}
							maxLength={3}
							size={3}
							step={1}
							value={degrees_shooting_latitude || ""}
							aria-label="Degrees shooting latitude"
						/> */}
						{/* {degrees_shooting_latitude || ""}º {" "} */}
						{degrees_shooting_latitude ? degrees_shooting_latitude + "º " : ""}
						{/* </div>
					<div className="characteristicsGrid__field"> */}
						{/* <input
							disabled
							type="number"
							name="minutes_shooting_latitude"
							id="minutes_shooting_latitude"
							min={0}
							max={60}
							maxLength={6}
							size={6}
							step={0.001}
							value={minutes_shooting_latitude || ""}
							aria-label="Minutes shooting latitude"
						/> */}
						{/* {minutes_shooting_latitude || ""}' */}
						{minutes_shooting_latitude ? minutes_shooting_latitude + "'" : ""}
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="number"
							name="degrees_shooting_longitude"
							id="degrees_shooting_longitude"
							min={-180}
							max={180}
							maxLength={4}
							size={4}
							step={0.0001}
							value={degrees_shooting_longitude || ""}
							aria-label="Degrees shooting longitude"
						/> */}
						{/* {degrees_shooting_longitude || ""}º {" "} */}
						{degrees_shooting_longitude ? degrees_shooting_longitude + "º " : ""}
						{/* </div>
					<div className="characteristicsGrid__field"> */}
						{/* <input
							disabled
							type="number"
							name="minutes_shooting_longitude"
							id="minutes_shooting_longitude"
							min={0}
							max={60}
							maxLength={6}
							size={6}
							step={0.001}
							value={minutes_shooting_longitude || ""}
							aria-label="Minutes shooting longitude"
						/> */}
						{/* {minutes_shooting_longitude || ""}' */}
						{minutes_shooting_longitude ? minutes_shooting_longitude + "'" : ""}
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
					{/* <div></div> */}
					{/* </div> */}

					{/* third row */}
					{/* <div className="characteristicsGrid characteristicsGrid--trawl form__row"> */}
					{/* <div></div> */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Hauling:
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="datetime-local"
							name="hauling_date_time"
							id="hauling_date_time"
							value={trawl.hauling_date_time || ""}
							aria-label="Hauling date and time"
						/> */}
						{renderDateTime(trawl.hauling_date_time, "hauling_date_time", "Hauling date and time")}
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="number"
							name="degree_hauling_latitude"
							id="degree_hauling_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={degrees_hauling_latitude || ""}
							aria-label="Degrees hauling latitude"
						/> */}
						{/* {degrees_hauling_latitude || ""}º {" "} */}
						{degrees_hauling_latitude ? degrees_hauling_latitude + "º " : ""}
						{/* </div>
					<div className="characteristicsGrid__field"> */}
						{/* <input
							disabled
							type="number"
							name="minutes_hauling_latitude"
							id="minutes_hauling_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={minutes_hauling_latitude || ""}
							aria-label="Minutes hauling latitude"
						/> */}
						{/* {minutes_hauling_latitude || ""}' */}
						{minutes_hauling_latitude ? minutes_hauling_latitude + "'" : ""}
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="number"
							name="degrees_hauling_longitude"
							id="degrees_hauling_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={degrees_hauling_longitude || ""}
							aria-label="Degrees Hauling longitude"
						/> */}
						{/* {degrees_hauling_longitude || ""}º {" "} */}
						{degrees_hauling_longitude ? degrees_hauling_longitude + "º " : ""}
						{/* </div>
					<div className="characteristicsGrid__field"> */}
						{/* <input
							disabled
							type="number"
							name="minutes_hauling_longitude"
							id="minutes_hauling_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={minutes_hauling_longitude || ""}
							aria-label="Minutes Hauling longitude"
						/> */}
						{/* {minutes_hauling_longitude || ""}' */}
						{minutes_hauling_longitude ? minutes_hauling_longitude + "'" : ""}
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
					{/* <div></div> */}
					{/* </div> */}

					{/* fourth row */}
					{/* <div className="characteristicsGrid characteristicsGrid--trawl form__row"> */}
					{/* <div></div> */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Bottom:
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="datetime-local"
							name="bottom_date_time"
							id="bottom_date_time"
							value={trawl.bottom_date_time || ""}
							aria-label="Bottom date and time"
						/> */}
						{renderDateTime(trawl.bottom_date_time, "bottom_date_time", "Bottom date and time")}
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="number"
							name="degrees_bottom_latitude"
							id="degrees_bottom_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={degrees_bottom_latitude || ""}
							aria-label="Degrees bottom latitude"
						/> */}
						{/* {degrees_bottom_latitude || ""}º {" "} */}
						{degrees_bottom_latitude ? degrees_bottom_latitude + "º " : ""}
						{/* </div>
					<div className="characteristicsGrid__field"> */}
						{/* <input
							disabled
							type="number"
							name="minutes_bottom_latitude"
							id="minutes_bottom_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={minutes_bottom_latitude || ""}
							aria-label="Minutes bottom latitude"
						/> */}
						{/* {minutes_bottom_latitude || ""}' */}
						{minutes_bottom_latitude ? minutes_bottom_latitude + "'" : ""}
					</div>
					<div className="characteristicsGrid__field">
						{/* <input
							disabled
							type="number"
							name="degrees_bottom_longitude"
							id="degrees_bottom_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={degrees_bottom_longitude || ""}
							aria-label="Degrees bottom longitude"
						/> */}
						{/* {degrees_bottom_longitude || ""}º {" "} */}
						{degrees_bottom_longitude ? degrees_bottom_longitude + "º " : ""}
						{/* </div>
					<div className="characteristicsGrid__field"> */}
						{/* <input
							disabled
							type="number"
							name="minutes_bottom_longitude"
							id="minutes_bottom_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={minutes_bottom_longitude || ""}
							aria-label="Minutes bottom longitude"
						/> */}
						{/* {minutes_bottom_longitude || ""}' */}
						{minutes_bottom_longitude ? minutes_bottom_longitude + "'" : ""}
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
