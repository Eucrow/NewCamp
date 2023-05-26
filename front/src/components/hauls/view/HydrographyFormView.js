import React from "react";

const HydrographyFormView = ({ haul }) => {
	/**
	 * Component of hydrography form of haul.
	 * @param {object} haul
	 */

	const renderContent = () => {
		return (
			<fieldset className="wrapper form__row">
				<legend>Hydrography characteristics</legend>
				<label htmlFor="comment">Latitude</label>
				<input type="text" id="latitude" name="latitude" disabled value={haul.latitude || ""} />
				<label htmlFor="comment">Longitude</label>
				<input type="text" id="longitude" name="longitude" disabled value={haul.longitude || ""} />
				<label htmlFor="comment">Date time</label>
				<input type="text" id="date_time" name="date_time" disabled value={haul.date_time || ""} />
				<label htmlFor="comment">Depth probe</label>
				<input type="text" id="depth_probe" name="depth_probe" disabled value={haul.depth_probe || ""} />
				<label htmlFor="comment">Cable</label>
				<input type="text" id="cable" name="cable" disabled value={haul.cable || ""} />
				<label htmlFor="comment">Depth</label>
				<input type="text" id="depth" name="depth" disabled value={haul.depth || ""} />
				<label htmlFor="comment">Temperature 0</label>
				<input type="text" id="temperature_0" name="temperature_0" disabled value={haul.temperature_0 || ""} />
				<label htmlFor="comment">Salinity 0</label>
				<input type="text" id="salinity_0" name="salinity_0" disabled value={haul.salinity_0 || ""} />
				<label htmlFor="comment">Sigma 0</label>
				<input type="text" id="sigma_0" name="sigma_0" disabled value={haul.sigma_0 || ""} />
				<label htmlFor="comment">Temperature 50</label>
				<input
					type="text"
					id="temperature_50"
					name="temperature_50"
					disabled
					value={haul.temperature_50 || ""}
				/>
				<label htmlFor="comment">Salinity 50</label>
				<input type="text" id="salinity_50" name="salinity_50" disabled value={haul.salinity_50 || ""} />
				<label htmlFor="comment">Sigma 50</label>
				<input type="text" id="sigma_50" name="sigma_50" disabled value={haul.sigma_50 || ""} />
				<label htmlFor="comment">Temperature 100</label>
				<input
					type="text"
					id="temperature_100"
					name="temperature_100"
					disabled
					value={haul.temperature_100 || ""}
				/>
				<label htmlFor="comment">Salinity 100</label>
				<input type="text" id="salinity_100" name="salinity_100" disabled value={haul.salinity_100 || ""} />
				<label htmlFor="comment">Sigma 100</label>
				<input type="text" id="sigma_100" name="sigma_100" disabled value={haul.sigma_100 || ""} />
				<label htmlFor="comment">Temperature</label>
				<input type="text" id="temperature" name="temperature" disabled value={haul.temperature || ""} />
				<label htmlFor="comment">Salinity</label>
				<input type="text" id="salinity" name="salinity" disabled value={haul.salinity || ""} />
				<label htmlFor="comment">Sigma</label>
				<input type="text" id="sigma" name="sigma" disabled value={haul.sigma || ""} />
				<label htmlFor="comment">Comment</label>
				<input type="text" id="comment" name="comment" disabled value={haul.comment || ""} />
			</fieldset>
		);
		return (
			<fieldset>
				<legend>Hydrography characteristics</legend>
				Latitude: {haul.latitude || ""}
				Longitude: {haul.longitude || ""}
				Date time: {haul.date_time || ""}
				Depth probe: {haul.depth_probe || ""}
				Cable: {haul.cable || ""}
				Depth: {haul.depth || ""}
				Temperature 0: {haul.temperature_0 || ""}
				Salinity 0: {haul.salinity_0 || ""}
				Sigma 0: {haul.sigma_0 || ""}
				Temperature 50: {haul.temperature_50 || ""}
				Salinity 50: {haul.salinity_50 || ""}
				Sigma 50: {haul.sigma_50 || ""}
				Temperature 100: {haul.temperature_100 || ""}
				Salinity 100: {haul.salinity_100 || ""}
				Sigma 100: {haul.sigma_100 || ""}
				Temperature: {haul.temperature || ""}
				Salinity: {haul.salinity || ""}
				Sigma: {haul.sigma || ""}
				Comment: {haul.comment || ""}
			</fieldset>
		);
	};

	return renderContent();
};

export default HydrographyFormView;
