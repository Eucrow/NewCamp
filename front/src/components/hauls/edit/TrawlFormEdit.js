import React from "react";

const TrawlFormEdit = ({
	trawl,
	shootingLatitude,
	shootingLongitude,
	haulingLatitude,
	haulingLongitude,
	bottomLatitude,
	bottomLongitude,
	handleChangeTrawl,
	handleCoordinatesChange,
}) => {
	/**
	 * Component of trawl form of haul.
	 * @param {object} trawl
	 * @param {function} handleChangeTrawl
	 */

	const renderContent = () => {
		const shooting_date_time = trawl.shooting_date_time ? trawl.shooting_date_time.replace("Z", "") : "";

		const hauling_date_time = trawl.hauling_date_time ? trawl.hauling_date_time.replace("Z", "") : "";

		const bottom_date_time = trawl.bottom_date_time ? trawl.bottom_date_time.replace("Z", "") : "";

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
						<input
							type="datetime-local"
							name="shooting_date_time"
							id="shooting_date_time"
							value={shooting_date_time}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Shooting date and time"
						/>
					</div>

					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="shooting_latitude_degrees"
							id="shooting_latitude_degrees"
							min={-90}
							max={90}
							value={shootingLatitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees shooting latitude"
						/>
						º{" "}
						<input
							type="number"
							name="shooting_latitude_minutes"
							id="shooting_latitude_minutes"
							min={0}
							max={60}
							step={0.001}
							pattern="[0-9]+(\,[0-9]{3})?"
							value={shootingLatitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes shooting latitude"
						/>
						'
					</div>

					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="shooting_longitude_degrees"
							id="shooting_longitude_degrees"
							min={-90}
							max={90}
							value={shootingLongitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees shooting longitude"
						/>
						º{" "}
						<input
							type="number"
							name="shooting_longitude_minutes"
							id="shooting_longitude_minutes"
							min={0}
							max={60}
							step={0.001}
							value={shootingLongitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes shooting longitude"
						/>
						'
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="shooting_depth"
							id="shooting_depth"
							min={0}
							max={9999}
							size={4}
							step={1}
							value={trawl.shooting_depth || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Shooting depth"
						/>
					</div>

					{/* third row */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Hauling:
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="datetime-local"
							name="hauling_date_time"
							id="hauling_date_time"
							value={hauling_date_time}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Hauling date and time"
						/>
					</div>

					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="hauling_latitude_degrees"
							id="hauling_latitude_degrees"
							min={-90}
							max={90}
							value={haulingLatitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees hauling latitude"
						/>
						º{" "}
						<input
							type="number"
							name="hauling_latitude_minutes"
							id="hauling_latitude_minutes"
							min={0}
							max={60}
							step={0.001}
							value={haulingLatitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes hauling latitude"
						/>
						'
					</div>

					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="hauling_longitude_degrees"
							id="hauling_longitude_degrees"
							min={-90}
							max={90}
							value={haulingLongitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees hauling longitude"
						/>
						º{" "}
						<input
							type="number"
							name="hauling_longitude_minutes"
							id="hauling_longitude_minutes"
							min={0}
							max={60}
							step={0.001}
							value={haulingLongitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes hauling longitude"
						/>
						'
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="hauling_depth"
							id="hauling_depth"
							min={0}
							max={9999}
							size={4}
							step={1}
							value={trawl.hauling_depth || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Hauling depth"
						/>
					</div>

					{/* fourth row */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Bottom:
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="datetime-local"
							name="bottom_date_time"
							id="bottom_date_time"
							value={bottom_date_time}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Bottom date and time"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="bottom_latitude_degrees"
							id="bottom_latitude_degrees"
							min={-90}
							max={90}
							value={bottomLatitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees bottom latitude"
						/>
						º{" "}
						<input
							type="number"
							name="bottom_latitude_minutes"
							id="bottom_latitude_minutes"
							min={0}
							max={60}
							step={0.001}
							value={bottomLatitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes bottom latitude"
						/>
						'
					</div>

					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="bottom_longitude_degrees"
							id="bottom_longitude_degrees"
							min={-90}
							max={90}
							value={bottomLongitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees bottom longitude"
						/>
						º{" "}
						<input
							type="number"
							name="bottom_longitude_minutes"
							id="bottom_longitude_minutes"
							min={0}
							max={60}
							step={0.001}
							value={bottomLongitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes bottom longitude"
						/>
						'
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="bottom_depth"
							id="bottom_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.bottom_depth || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Bottom depth"
						/>
					</div>
				</div>

				<div className="form__row">
					<label className="field">
						Course (degrees):
						<input
							type="number"
							name="course"
							id="course"
							min={0}
							max={360}
							maxLength={3}
							size={3}
							step={1}
							value={trawl.course || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
					<label className="field">
						Velocity (m/s):
						<input
							type="number"
							name="velocity"
							id="velocity"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.velocity || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
					<label className="field">
						Cable (m):
						<input
							type="number"
							name="cable"
							id="cable"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.cable || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
					<label className="field">
						Sweep (m):
						<input
							type="number"
							name="sweep"
							id="sweep"
							min={0}
							max={999}
							maxLength={3}
							size={3}
							step={1}
							value={trawl.sweep || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field">
						Otter Boards Distance (m):
						<input
							type="number"
							name="otter_boards_distance"
							id="otter_boards_distance"
							min={0}
							max={999}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.otter_boards_distance || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
					<label className="field">
						Horizontal Aperture (m):
						<input
							type="number"
							name="horizontal_aperture"
							id="horizontal_aperture"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.horizontal_aperture || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
					<label className="field">
						Vertical Aperture (m):
						<input
							type="number"
							name="vertical_aperture"
							id="vertical_aperture"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={trawl.vertical_aperture || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field">
						Grid (m):
						<input
							type="number"
							name="grid"
							id="grid"
							min={0}
							max={99}
							maxLength={2}
							size={2}
							step={1}
							value={trawl.grid || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
					<label className="field">
						Track (m):
						<input
							type="number"
							name="track"
							id="track"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={trawl.track || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field__comment">
						Comment:
						<textarea
							name="comment"
							id="comment"
							value={trawl.comment || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
						/>
					</label>
				</div>
			</fieldset>
		);
	};

	return renderContent();
};

export default TrawlFormEdit;
