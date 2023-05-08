import React from "react";

const HydrographyFormNew = ({ handleChangeHydrography }) => {
	/**
	 * @param {method} handleChangeHydrography : manager of the event handler
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
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Longitude</label>
				<input
					type="text"
					id="longitude"
					name="longitude"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Date time</label>
				<input
					type="text"
					id="date_time"
					name="date_time"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Depth probe</label>
				<input
					type="text"
					id="depth_probe"
					name="depth_probe"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Cable</label>
				<input
					type="text"
					id="cable"
					name="cable"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Depth</label>
				<input
					type="text"
					id="depth"
					name="depth"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Temperature 0</label>
				<input
					type="text"
					id="temperature_0"
					name="temperature_0"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Salinity 0</label>
				<input
					type="text"
					id="salinity_0"
					name="salinity_0"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Sigma 0</label>
				<input
					type="text"
					id="sigma_0"
					name="sigma_0"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Temperature 50</label>
				<input
					type="text"
					id="temperature_50"
					name="temperature_50"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Salinity 50</label>
				<input
					type="text"
					id="salinity_50"
					name="salinity_50"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Sigma 50</label>
				<input
					type="text"
					id="sigma_50"
					name="sigma_50"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Temperature 100</label>
				<input
					type="text"
					id="temperature_100"
					name="temperature_100"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Salinity 100</label>
				<input
					type="text"
					id="salinity_100"
					name="salinity_100"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Sigma 100</label>
				<input
					type="text"
					id="sigma_100"
					name="sigma_100"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Temperature</label>
				<input
					type="text"
					id="temperature"
					name="temperature"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Salinity</label>
				<input
					type="text"
					id="salinity"
					name="salinity"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Sigma</label>
				<input
					type="text"
					id="sigma"
					name="sigma"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
				<label htmlFor="comment">Comment</label>
				<input
					type="text"
					id="comment"
					name="comment"
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
			</fieldset>
		);
	};

	return renderContent();
};

export default HydrographyFormNew;
