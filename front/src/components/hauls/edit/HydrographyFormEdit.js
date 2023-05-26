import React from "react";

const HydrographyFormEdit = ({ hydrography, handleChangeHydrography }) => {
	/**
	 * Component of hydrography form of haul.
	 * @param {object} props.haul
	 * @param {function} props.handleChangeHydrography
	 */

	const renderContent = () => {
		return (
			<fieldset className="wrapper">
				<legend>Hydrography characteristics</legend>
				<div className="form__row">
					<label htmlFor="date_time">
						Date time:
						<input
							type="datetime-local"
							name="hydrography_date_time"
							id="hydrography_date_time"
							value={hydrography.date_time}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>{" "}
					</label>

					<label htmlFor="latitude">Latitude: </label>
					<input
						type="text"
						id="latitude"
						name="latitude"
						value={hydrography.latitude}
						onChange={(e) => {
							handleChangeHydrography(e);
						}}
					/>
					<label htmlFor="longitude">Longitude: </label>
					<input
						type="text"
						id="longitude"
						name="longitude"
						value={hydrography.longitude}
						onChange={(e) => {
							handleChangeHydrography(e);
						}}
					/>

					<div className="form__row">
						<label htmlFor="depth_probe">Depth probe: </label>
						<input
							type="text"
							id="depth_probe"
							name="depth_probe"
							value={hydrography.depth_probe}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
						<label htmlFor="cable">Cable: </label>
						<input
							type="text"
							id="cable"
							name="cable"
							value={hydrography.cable}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
						<label htmlFor="depth">Depth: </label>
						<input
							type="text"
							id="depth"
							name="depth"
							value={hydrography.depth}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
				</div>

				<div className="characteristicsGrid characteristicsGrid--hydrography form__row">
					{/* first row */}
					<div></div>
					<div></div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						temperature
					</div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						salinity
					</div>
					<div className="characteristicsGrid__colName" aria-hidden="true">
						sigma
					</div>
					{/* <div></div> */}

					{/* second row */}
					<div></div>
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						0 m.
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="temperature_0"
							name="temperature_0"
							value={hydrography.temperature_0}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="salinity_0"
							name="salinity_0"
							value={hydrography.salinity_0}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="sigma_0"
							name="sigma_0"
							value={hydrography.sigma_0}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>

					{/*third row*/}
					<div></div>
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						50 m.
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="temperature_50"
							name="temperature_50"
							value={hydrography.temperature_50}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="salinity_50"
							name="salinity_50"
							value={hydrography.salinity_50}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="sigma_50"
							name="sigma_50"
							value={hydrography.sigma_50}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>

					{/*fourth row*/}
					<div></div>
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						100 m.
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="temperature_100"
							name="temperature_100"
							value={hydrography.temperature_100}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="salinity_100"
							name="salinity_100"
							value={hydrography.salinity_100}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="sigma_100"
							name="sigma_100"
							value={hydrography.sigma_100}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>

					{/*fifth row*/}
					<div></div>
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						Bottom
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="temperature"
							name="temperature"
							value={hydrography.temperature}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="salinity"
							name="salinity"
							value={hydrography.salinity}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="sigma"
							name="sigma"
							value={hydrography.sigma}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
				</div>

				<label htmlFor="comment">Comment: </label>
				<input
					type="text"
					id="comment"
					name="comment"
					value={hydrography.comment}
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
			</fieldset>
		);
	};

	return renderContent();
};

export default HydrographyFormEdit;
