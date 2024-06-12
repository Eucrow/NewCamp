import React from "react";

const TrawlSamplingPointEdit = ({
	handleChangeTrawl,
	handleCoordinatesChange,
	nameSamplingPoint,
	typeSamplingPoint,
	dateTime,
	latitude,
	longitude,
	depth,
	autofocus,
}) => {
	/**
	 * Component of trawl form of haul.
	 * @param {object} trawl
	 * @param {function} handleChangeTrawl
	 */

	const renderContent = () => {
		return (
			<div className="characteristicsGrid characteristicsGrid--trawl form__row">
				<div className="characteristicsGrid__rowName" aria-hidden="true">
					{nameSamplingPoint}:
				</div>
				<div className="characteristicsGrid__field">
					<input
						type="datetime-local"
						name={typeSamplingPoint + "_date_time"}
						id={typeSamplingPoint + "_date_time"}
						autoFocus={autofocus}
						value={dateTime || ""}
						onChange={(e) => {
							handleChangeTrawl(e);
						}}
						aria-label={typeSamplingPoint + " date and time"}
					/>
				</div>

				<div className="characteristicsGrid__field">
					<input
						type="number"
						className="coordinates"
						name={typeSamplingPoint + "_latitude_degrees"}
						id={typeSamplingPoint + "_latitude_degrees"}
						min={-90}
						max={90}
						value={latitude["degrees"] || ""}
						onChange={(e) => {
							handleCoordinatesChange(e);
						}}
						aria-label={"Degrees " + typeSamplingPoint + " latitude"}
					/>
					º{" "}
					<input
						type="number"
						className="coordinates"
						name={typeSamplingPoint + "_latitude_minutes"}
						id={typeSamplingPoint + "_latitude_minutes"}
						min={0}
						max={60}
						step={0.001}
						pattern="[0-9]+(\,[0-9]{3})?"
						value={latitude["minutes"] || ""}
						onChange={(e) => {
							handleCoordinatesChange(e);
						}}
						aria-label={"Minutes " + typeSamplingPoint + " latitude"}
					/>
					'
				</div>

				<div className="characteristicsGrid__field">
					<input
						type="number"
						className="coordinates"
						name={typeSamplingPoint + "_longitude_degrees"}
						id={typeSamplingPoint + "_longitude_degrees"}
						min={-90}
						max={90}
						value={longitude["degrees"] || ""}
						onChange={(e) => {
							handleCoordinatesChange(e);
						}}
						aria-label={"Degrees " + typeSamplingPoint + " longitude"}
					/>
					º{" "}
					<input
						type="number"
						className="coordinates"
						name={typeSamplingPoint + "_longitude_minutes"}
						id={typeSamplingPoint + "_longitude_minutes"}
						min={0}
						max={60}
						step={0.001}
						value={longitude["minutes"] || ""}
						onChange={(e) => {
							handleCoordinatesChange(e);
						}}
						aria-label={"Minutes " + typeSamplingPoint + " longitude"}
					/>
					'
				</div>
				<div className="characteristicsGrid__field">
					<input
						type="number"
						name={typeSamplingPoint + "_depth"}
						id={typeSamplingPoint + "_depth"}
						min={0}
						max={9999}
						size={4}
						step={1}
						value={depth || ""}
						onChange={(e) => {
							handleChangeTrawl(e);
						}}
						aria-label="Shooting depth"
					/>
				</div>
			</div>
		);
	};

	return renderContent();
};

export default TrawlSamplingPointEdit;
