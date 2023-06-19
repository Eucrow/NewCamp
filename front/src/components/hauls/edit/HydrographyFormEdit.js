import React from "react";

const HydrographyFormEdit = ({
	hydrography,
	handleChangeHydrography,
	latitude,
	longitude,
	handleCoordinatesChange,
}) => {
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
					<label className="field">
						Date time:
						<input
							type="datetime-local"
							name="hydrography_date_time"
							id="hydrography_date_time"
							value={hydrography.date_time || ""}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>{" "}
					</label>

					<div className="field">
						Latitude:
						<input
							type="number"
							className="coordinates"
							name="latitude_degrees"
							id="latitude_degrees"
							min={-90}
							max={90}
							value={latitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees latitude"
						/>
						º{" "}
						<input
							type="number"
							className="coordinates"
							name="latitude_minutes"
							id="latitude_minutes"
							min={0}
							max={60}
							step={0.001}
							pattern="[0-9]+(\,[0-9]{3})?"
							value={latitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes latitude"
						/>
						'
					</div>

					<div className="field">
						Longitude:
						<input
							type="number"
							className="coordinates"
							name="longitude_degrees"
							id="longitude_degrees"
							min={-90}
							max={90}
							value={longitude["degrees"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Degrees longitude"
						/>
						º{" "}
						<input
							type="number"
							className="coordinates"
							name="longitude_minutes"
							id="longitude_minutes"
							min={0}
							max={60}
							step={0.001}
							pattern="[0-9]+(\,[0-9]{3})?"
							value={longitude["minutes"] || ""}
							onChange={(e) => {
								handleCoordinatesChange(e);
							}}
							aria-label="Minutes longitude"
						/>
						'
					</div>

					<div className="form__row">
						<label className="field">
							Depth probe (m):
							<input
								type="text"
								id="depth_probe"
								name="depth_probe"
								value={hydrography.depth_probe || ""}
								onChange={(e) => {
									handleChangeHydrography(e);
								}}
							/>
						</label>
						<label htmlFor="cable">
							Cable (m):
							<input
								type="text"
								id="cable"
								name="cable"
								value={hydrography.cable || ""}
								onChange={(e) => {
									handleChangeHydrography(e);
								}}
							/>
						</label>
						<label htmlFor="depth">
							Depth (m):
							<input
								type="text"
								id="depth"
								name="depth"
								value={hydrography.depth || ""}
								onChange={(e) => {
									handleChangeHydrography(e);
								}}
							/>
						</label>
					</div>
				</div>

				<div className="characteristicsGrid characteristicsGrid--hydrography form__row">
					{/* first row */}
					<div></div>
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
					<div></div>
					<div className="characteristicsGrid__rowName" aria-hidden="true">
						0 m.
					</div>
					<div className="characteristicsGrid__field">
						<input
							type="text"
							id="temperature_0"
							name="temperature_0"
							value={hydrography.temperature_0 || ""}
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
							value={hydrography.salinity_0 || ""}
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
							value={hydrography.sigma_0 || ""}
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
							value={hydrography.temperature_50 || ""}
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
							value={hydrography.salinity_50 || ""}
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
							value={hydrography.sigma_50 || ""}
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
							value={hydrography.temperature_100 || ""}
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
							value={hydrography.salinity_100 || ""}
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
							value={hydrography.sigma_100 || ""}
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
							value={hydrography.temperature || ""}
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
							value={hydrography.salinity || ""}
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
							value={hydrography.sigma || ""}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</div>
				</div>
				<div className="form__row">
					<label className="field__comment">
						Comment:
						<textarea
							id="comment"
							name="comment"
							value={hydrography.comment || ""}
							onChange={(e) => {
								handleChangeHydrography(e);
							}}
						/>
					</label>{" "}
				</div>
			</fieldset>
		);
	};

	return renderContent();
};

export default HydrographyFormEdit;
