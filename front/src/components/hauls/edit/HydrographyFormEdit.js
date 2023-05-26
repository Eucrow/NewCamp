import React from "react";

const EditHydrography = ({ haul, handleChangeHydrography }) => {
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
							value={haul.date_time}
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
						value={haul.latitude}
						onChange={(e) => {
							handleChangeHydrography(e);
						}}
					/>
					<label htmlFor="longitude">Longitude: </label>
					<input
						type="text"
						id="longitude"
						name="longitude"
						value={haul.longitude}
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
							value={haul.depth_probe}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
						<label htmlFor="cable">Cable: </label>
						<input
							type="text"
							id="cable"
							name="cable"
							value={haul.cable}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
						<label htmlFor="depth">Depth: </label>
						<input
							type="text"
							id="depth"
							name="depth"
							value={haul.depth}
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
							value={haul.temperature_0}
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
							value={haul.salinity_0}
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
							value={haul.sigma_0}
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
							value={haul.temperature_50}
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
							value={haul.salinity_50}
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
							value={haul.sigma_50}
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
							value={haul.temperature_100}
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
							value={haul.salinity_100}
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
							value={haul.sigma_100}
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
							value={haul.temperature}
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
							value={haul.salinity}
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
							value={haul.sigma}
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
					value={haul.comment}
					onChange={(e) => {
						handleChangeHydrography(e);
					}}
				/>
			</fieldset>
		);
	};

	return renderContent();
};

export default EditHydrography;
