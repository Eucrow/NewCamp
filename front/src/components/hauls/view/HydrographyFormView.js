import React from "react";

const ViewHydrography = ({ haul }) => {
	/**
	 * Component of hydrography form of haul.
	 * @param {object} haul
	 */

	const renderContent = () => {
		return (
			<fieldset>
				<legend>Hydrography characteristics</legend>
				<label htmlFor="comment">Latitude</label>
				<input
					type="text"
					id="latitude"
					name="latitude"
					disabled
					value={haul.hydrography_characteristics.latitude || ""}
				/>
				<label htmlFor="comment">Longitude</label>
				<input
					type="text"
					id="longitude"
					name="longitude"
					disabled
					value={haul.hydrography_characteristics.longitude || ""}
				/>
				<label htmlFor="comment">Date time</label>
				<input
					type="text"
					id="date_time"
					name="date_time"
					disabled
					value={haul.hydrography_characteristics.date_time || ""}
				/>
				<label htmlFor="comment">Depth probe</label>
				<input
					type="text"
					id="depth_probe"
					name="depth_probe"
					disabled
					value={haul.hydrography_characteristics.depth_probe || ""}
				/>
				<label htmlFor="comment">Cable</label>
				<input
					type="text"
					id="cable"
					name="cable"
					disabled
					value={haul.hydrography_characteristics.cable || ""}
				/>
				<label htmlFor="comment">Depth</label>
				<input
					type="text"
					id="depth"
					name="depth"
					disabled
					value={haul.hydrography_characteristics.depth || ""}
				/>
				<label htmlFor="comment">Temperature 0</label>
				<input
					type="text"
					id="temperature_0"
					name="temperature_0"
					disabled
					value={haul.hydrography_characteristics.temperature_0 || ""}
				/>
				<label htmlFor="comment">Salinity 0</label>
				<input
					type="text"
					id="salinity_0"
					name="salinity_0"
					disabled
					value={haul.hydrography_characteristics.salinity_0 || ""}
				/>
				<label htmlFor="comment">Sigma 0</label>
				<input
					type="text"
					id="sigma_0"
					name="sigma_0"
					disabled
					value={haul.hydrography_characteristics.sigma_0 || ""}
				/>
				<label htmlFor="comment">Temperature 50</label>
				<input
					type="text"
					id="temperature_50"
					name="temperature_50"
					disabled
					value={haul.hydrography_characteristics.temperature_50 || ""}
				/>
				<label htmlFor="comment">Salinity 50</label>
				<input
					type="text"
					id="salinity_50"
					name="salinity_50"
					disabled
					value={haul.hydrography_characteristics.salinity_50 || ""}
				/>
				<label htmlFor="comment">Sigma 50</label>
				<input
					type="text"
					id="sigma_50"
					name="sigma_50"
					disabled
					value={haul.hydrography_characteristics.sigma_50 || ""}
				/>
				<label htmlFor="comment">Temperature 100</label>
				<input
					type="text"
					id="temperature_100"
					name="temperature_100"
					disabled
					value={haul.hydrography_characteristics.temperature_100 || ""}
				/>
				<label htmlFor="comment">Salinity 100</label>
				<input
					type="text"
					id="salinity_100"
					name="salinity_100"
					disabled
					value={haul.hydrography_characteristics.salinity_100 || ""}
				/>
				<label htmlFor="comment">Sigma 100</label>
				<input
					type="text"
					id="sigma_100"
					name="sigma_100"
					disabled
					value={haul.hydrography_characteristics.sigma_100 || ""}
				/>
				<label htmlFor="comment">Temperature</label>
				<input
					type="text"
					id="temperature"
					name="temperature"
					disabled
					value={haul.hydrography_characteristics.temperature || ""}
				/>
				<label htmlFor="comment">Salinity</label>
				<input
					type="text"
					id="salinity"
					name="salinity"
					disabled
					value={haul.hydrography_characteristics.salinity || ""}
				/>
				<label htmlFor="comment">Sigma</label>
				<input
					type="text"
					id="sigma"
					name="sigma"
					disabled
					value={haul.hydrography_characteristics.sigma || ""}
				/>
				<label htmlFor="comment">Comment</label>
				<input
					type="text"
					id="comment"
					name="comment"
					disabled
					value={haul.hydrography_characteristics.comment || ""}
				/>
			</fieldset>
		);
		return (
			<fieldset>
				<legend>Hydrography characteristics</legend>
				Latitude: {haul.hydrography_characteristics.latitude || ""}
				Longitude: {haul.hydrography_characteristics.longitude || ""}
				Date time: {haul.hydrography_characteristics.date_time || ""}
				Depth probe: {haul.hydrography_characteristics.depth_probe || ""}
				Cable: {haul.hydrography_characteristics.cable || ""}
				Depth: {haul.hydrography_characteristics.depth || ""}
				Temperature 0: {haul.hydrography_characteristics.temperature_0 || ""}
				Salinity 0: {haul.hydrography_characteristics.salinity_0 || ""}
				Sigma 0: {haul.hydrography_characteristics.sigma_0 || ""}
				Temperature 50: {haul.hydrography_characteristics.temperature_50 || ""}
				Salinity 50: {haul.hydrography_characteristics.salinity_50 || ""}
				Sigma 50: {haul.hydrography_characteristics.sigma_50 || ""}
				Temperature 100: {haul.hydrography_characteristics.temperature_100 || ""}
				Salinity 100: {haul.hydrography_characteristics.salinity_100 || ""}
				Sigma 100: {haul.hydrography_characteristics.sigma_100 || ""}
				Temperature: {haul.hydrography_characteristics.temperature || ""}
				Salinity: {haul.hydrography_characteristics.salinity || ""}
				Sigma: {haul.hydrography_characteristics.sigma || ""}
				Comment: {haul.hydrography_characteristics.comment || ""}
			</fieldset>
		);
	};

	return renderContent();
};

export default ViewHydrography;
