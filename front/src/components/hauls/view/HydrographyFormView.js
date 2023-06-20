import React from "react";

const HydrographyFormView = ({ hydrography, latitude, longitude }) => {
	/**
	 * Component of hydrography form of haul.
	 * @param {object} haul
	 */

	const renderContent = () => {
		return (
			<fieldset className="wrapper">
				<legend>Hydrography characteristics</legend>

				<div className="form__row">
					<label className="field">
						Date time:
						<input
							type="datetime-local"
							disabled
							name="hydrography_date_time"
							id="hydrography_date_time"
							value={hydrography.date_time || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
						/>
					</label>

					<div className="field">
						Latitude:
						<input
							type="number"
							disabled
							className="coordinates"
							name="latitude_degrees"
							id="latitude_degrees"
							min={-90}
							max={90}
							value={latitude["degrees"] || ""}
							// onChange={(e) => {
							// 	handleCoordinatesChange(e);
							// }}
							aria-label="Degrees latitude"
						/>
						º{" "}
						<input
							type="number"
							disabled
							className="coordinates"
							name="latitude_minutes"
							id="latitude_minutes"
							min={0}
							max={60}
							step={0.001}
							pattern="[0-9]+(\,[0-9]{3})?"
							value={latitude["minutes"] || ""}
							// onChange={(e) => {
							// 	handleCoordinatesChange(e);
							// }}
							aria-label="Minutes latitude"
						/>
						'
					</div>

					<div className="field">
						Longitude:
						<input
							type="number"
							disabled
							className="coordinates"
							name="longitude_degrees"
							id="longitude_degrees"
							min={-90}
							max={90}
							value={longitude["degrees"] || ""}
							// onChange={(e) => {
							// 	handleCoordinatesChange(e);
							// }}
							aria-label="Degrees longitude"
						/>
						º{" "}
						<input
							type="number"
							disabled
							className="coordinates"
							name="longitude_minutes"
							id="longitude_minutes"
							min={0}
							max={60}
							step={0.001}
							pattern="[0-9]+(\,[0-9]{3})?"
							value={longitude["minutes"] || ""}
							// onChange={(e) => {
							// 	handleCoordinatesChange(e);
							// }}
							aria-label="Minutes longitude"
						/>
						'
					</div>
					<div className="form__row">
						<label className="field">
							Depth probe (m):
							<input
								type="text"
								disabled
								id="depth_probe"
								name="depth_probe"
								min={0}
								max={999}
								maxLength={3}
								size={3}
								value={hydrography.depth_probe || ""}
								// onChange={(e) => {
								// 	handleChangeHydrography(e);
								// }}
							/>
						</label>
						<label className="field">
							Cable (m):
							<input
								type="text"
								disabled
								id="cable"
								name="cable"
								min={0}
								max={999}
								maxLength={3}
								size={3}
								value={hydrography.cable || ""}
								// onChange={(e) => {
								// 	handleChangeHydrography(e);
								// }}
							/>
						</label>
						<label className="field">
							Depth (m):
							<input
								type="text"
								disabled
								id="depth"
								name="depth"
								min={0}
								max={999}
								maxLength={3}
								size={3}
								value={hydrography.depth || ""}
								// onChange={(e) => {
								// 	handleChangeHydrography(e);
								// }}
							/>
						</label>
					</div>
				</div>

				<div className="characteristicsGrid characteristicsGrid--hydrography form__row">
					{/* first row */}
					<div></div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						temperature (ºC)
					</div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						salinity (???)
					</div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						sigma (???)
					</div>
					{/* <div></div> */}

					{/* second row */}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						0 m.
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="temperature_0"
							name="temperature_0"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.temperature_0 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="ºC temperature at 0 m."
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="salinity_0"
							name="salinity_0"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.salinity_0 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="??? salinity at 0 m."
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="sigma_0"
							name="sigma_0"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.sigma_0 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="??? sigma at 0 m."
						/>
					</div>

					{/*third row*/}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						50 m.
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="temperature_50"
							name="temperature_50"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.temperature_50 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="ºC temperature at 50 m."
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="salinity_50"
							name="salinity_50"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.salinity_50 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="??? salinity at 50 m."
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="sigma_50"
							name="sigma_50"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.sigma_50 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="??? sigma at 50 m."
						/>
					</div>

					{/*fourth row*/}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						100 m.
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="temperature_100"
							name="temperature_100"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.temperature_100 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="ºC temperature at 100 m."
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="salinity_100"
							name="salinity_100"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.salinity_100 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="??? salinity at 100 m."
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="sigma_100"
							name="sigma_100"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.sigma_100 || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="??? sigma at 100 m."
						/>
					</div>

					{/*fifth row*/}
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Bottom
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="temperature"
							name="temperature"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.temperature || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
							aria-label="ºC temperature at bottom depth."
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="salinity"
							name="salinity"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.salinity || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="number"
							disabled
							id="sigma"
							name="sigma"
							min={0}
							max={99.999}
							maxLength={6}
							size={6}
							step={0.001}
							value={hydrography.sigma || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
						/>
					</div>
				</div>
				<div className="form__row">
					<label className="field__comment">
						Comment:
						<textarea
							disabled
							id="comment"
							name="comment"
							value={hydrography.comment || ""}
							// onChange={(e) => {
							// 	handleChangeHydrography(e);
							// }}
						/>
					</label>
				</div>
			</fieldset>
			// <fieldset className="wrapper form__row">
			// 	<legend>Hydrography characteristics</legend>
			// 	<label htmlFor="comment">Latitude</label>
			// 	<input type="text" id="latitude" name="latitude" disabled value={haul.latitude || ""} />
			// 	<label htmlFor="comment">Longitude</label>
			// 	<input type="text" id="longitude" name="longitude" disabled value={haul.longitude || ""} />
			// 	<label htmlFor="comment">Date time</label>
			// 	<input type="text" id="date_time" name="date_time" disabled value={haul.date_time || ""} />
			// 	<label htmlFor="comment">Depth probe</label>
			// 	<input type="text" id="depth_probe" name="depth_probe" disabled value={haul.depth_probe || ""} />
			// 	<label htmlFor="comment">Cable</label>
			// 	<input type="text" id="cable" name="cable" disabled value={haul.cable || ""} />
			// 	<label htmlFor="comment">Depth</label>
			// 	<input type="text" id="depth" name="depth" disabled value={haul.depth || ""} />
			// 	<label htmlFor="comment">Temperature 0</label>
			// 	<input type="text" id="temperature_0" name="temperature_0" disabled value={haul.temperature_0 || ""} />
			// 	<label htmlFor="comment">Salinity 0</label>
			// 	<input type="text" id="salinity_0" name="salinity_0" disabled value={haul.salinity_0 || ""} />
			// 	<label htmlFor="comment">Sigma 0</label>
			// 	<input type="text" id="sigma_0" name="sigma_0" disabled value={haul.sigma_0 || ""} />
			// 	<label htmlFor="comment">Temperature 50</label>
			// 	<input
			// 		type="text"
			// 		id="temperature_50"
			// 		name="temperature_50"
			// 		disabled
			// 		value={haul.temperature_50 || ""}
			// 	/>
			// 	<label htmlFor="comment">Salinity 50</label>
			// 	<input type="text" id="salinity_50" name="salinity_50" disabled value={haul.salinity_50 || ""} />
			// 	<label htmlFor="comment">Sigma 50</label>
			// 	<input type="text" id="sigma_50" name="sigma_50" disabled value={haul.sigma_50 || ""} />
			// 	<label htmlFor="comment">Temperature 100</label>
			// 	<input
			// 		type="text"
			// 		id="temperature_100"
			// 		name="temperature_100"
			// 		disabled
			// 		value={haul.temperature_100 || ""}
			// 	/>
			// 	<label htmlFor="comment">Salinity 100</label>
			// 	<input type="text" id="salinity_100" name="salinity_100" disabled value={haul.salinity_100 || ""} />
			// 	<label htmlFor="comment">Sigma 100</label>
			// 	<input type="text" id="sigma_100" name="sigma_100" disabled value={haul.sigma_100 || ""} />
			// 	<label htmlFor="comment">Temperature</label>
			// 	<input type="text" id="temperature" name="temperature" disabled value={haul.temperature || ""} />
			// 	<label htmlFor="comment">Salinity</label>
			// 	<input type="text" id="salinity" name="salinity" disabled value={haul.salinity || ""} />
			// 	<label htmlFor="comment">Sigma</label>
			// 	<input type="text" id="sigma" name="sigma" disabled value={haul.sigma || ""} />
			// 	<label htmlFor="comment">Comment</label>
			// 	<input type="text" id="comment" name="comment" disabled value={haul.comment || ""} />
			// </fieldset>
		);
		// return (
		// 	<fieldset>
		// 		<legend>Hydrography characteristics</legend>
		// 		Latitude: {haul.latitude || ""}
		// 		Longitude: {haul.longitude || ""}
		// 		Date time: {haul.date_time || ""}
		// 		Depth probe: {haul.depth_probe || ""}
		// 		Cable: {haul.cable || ""}
		// 		Depth: {haul.depth || ""}
		// 		Temperature 0: {haul.temperature_0 || ""}
		// 		Salinity 0: {haul.salinity_0 || ""}
		// 		Sigma 0: {haul.sigma_0 || ""}
		// 		Temperature 50: {haul.temperature_50 || ""}
		// 		Salinity 50: {haul.salinity_50 || ""}
		// 		Sigma 50: {haul.sigma_50 || ""}
		// 		Temperature 100: {haul.temperature_100 || ""}
		// 		Salinity 100: {haul.salinity_100 || ""}
		// 		Sigma 100: {haul.sigma_100 || ""}
		// 		Temperature: {haul.temperature || ""}
		// 		Salinity: {haul.salinity || ""}
		// 		Sigma: {haul.sigma || ""}
		// 		Comment: {haul.comment || ""}
		// 	</fieldset>
		// );
	};

	return renderContent();
};

export default HydrographyFormView;
