import React from "react";

const TrawlFormEdit = ({ haul, handleChangeTrawl }) => {
	/**
	 * Component of trawl form of haul.
	 * @param {object} haul
	 * @param {function} handleChangeTrawl
	 */

	const renderContent = () => {
		const shooting_date_time =
			haul.trawl_characteristics.shooting_date_time === null
				? ""
				: haul.trawl_characteristics.shooting_date_time.replace("Z", "");

		const hauling_date_time =
			haul.trawl_characteristics.hauling_date_time === null
				? ""
				: haul.trawl_characteristics.hauling_date_time.replace("Z", "");

		const bottom_date_time =
			haul.trawl_characteristics.bottom_date_time === null
				? ""
				: haul.trawl_characteristics.bottom_date_time.replace("Z", "");

		return (
			<fieldset className="wrapper">
				<legend>Trawl characteristics:</legend>
				<div className="characteristicsGrid form__row">
					{/* first row */}
					<div></div>
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
					<div></div>

					{/* second row */}
					<div></div>
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
							name="shooting_latitude"
							id="shooting_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={haul.trawl_characteristics.shooting_latitude || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Shooting latitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="shooting_longitude"
							id="shooting_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={haul.trawl_characteristics.shooting_longitude || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Shooting longitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="shooting_depth"
							id="shooting_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={haul.trawl_characteristics.shooting_depth || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Shooting depth"
						/>
					</div>
					<div></div>

					{/* third row */}
					<div></div>
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
							name="hauling_latitude"
							id="hauling_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={haul.trawl_characteristics.hauling_latitude || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Hauling latitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="hauling_longitude"
							id="hauling_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={haul.trawl_characteristics.hauling_longitude || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Hauling longitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="hauling_depth"
							id="hauling_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={haul.trawl_characteristics.hauling_depth || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Hauling depth"
						/>
					</div>
					<div></div>

					{/* fourth row */}
					<div></div>
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
							name="bottom_latitude"
							id="bottom_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={haul.trawl_characteristics.bottom_latitude || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Bottom latitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							name="bottom_longitude"
							id="bottom_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={haul.trawl_characteristics.bottom_longitude || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Bottom longitude"
						/>
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
							value={haul.trawl_characteristics.bottom_depth || ""}
							onChange={(e) => {
								handleChangeTrawl(e);
							}}
							aria-label="Bottom depth"
						/>
					</div>
					<div></div>
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
							value={haul.trawl_characteristics.course || ""}
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
							value={haul.trawl_characteristics.velocity || ""}
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
							value={haul.trawl_characteristics.cable || ""}
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
							value={haul.trawl_characteristics.sweep || ""}
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
							value={haul.trawl_characteristics.otter_boards_distance || ""}
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
							value={haul.trawl_characteristics.horizontal_aperture || ""}
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
							value={haul.trawl_characteristics.vertical_aperture || ""}
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
							value={haul.trawl_characteristics.grid || ""}
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
							value={haul.trawl_characteristics.track || ""}
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
							value={haul.trawl_characteristics.comment || ""}
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
