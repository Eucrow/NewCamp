import React, { Component } from "react";

class ComponentsHaulTrawl extends Component {
	/**
	 * Component of trawl form of haul.
	 * @param {object} props.haul
	 */

	render() {
		const haul = this.props.haul;
		return (
			<fieldset className="wrapper">
				<legend>Trawl characteristics:</legend>
				<div className="characteristicsGrid form__row">
					{/* first row */}
					<div></div>
					<div></div>
					<div
						className="characteristicsGrid__colName"
						aria-hidden="true"
					>
						Date/time:
					</div>
					<div
						className="characteristicsGrid__colName"
						aria-hidden="true"
					>
						Latitude:
					</div>
					<div
						className="characteristicsGrid__colName"
						aria-hidden="true"
					>
						Longitude:
					</div>
					<div
						className="characteristicsGrid__colName"
						aria-hidden="true"
					>
						Depth (m):
					</div>
					<div></div>

					{/* second row */}
					<div></div>
					<div
						className="characteristicsGrid__rowName"
						aria-hidden="true"
					>
						Shooting:
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="datetime-local"
							name="shooting_date_time"
							id="shooting_date_time"
							value={
								haul.trawl_characteristics.shooting_date_time ||
								""
							}
							aria-label="Shooting date and time"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="shooting_latitude"
							id="shooting_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={
								haul.trawl_characteristics.shooting_latitude ||
								""
							}
							aria-label="Shooting latitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="shooting_longitude"
							id="shooting_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={
								haul.trawl_characteristics.shooting_longitude ||
								""
							}
							aria-label="Shooting longitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="shooting_depth"
							id="shooting_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={
								haul.trawl_characteristics.shooting_depth || ""
							}
							aria-label="Shooting depth"
						/>
					</div>
					<div></div>

					{/* third row */}
					<div></div>
					<div
						className="characteristicsGrid__rowName"
						aria-hidden="true"
					>
						Hauling:
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="datetime-local"
							name="hauling_date_time"
							id="hauling_date_time"
							value={
								haul.trawl_characteristics.hauling_date_time ||
								""
							}
							aria-label="Hauling date and time"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="hauling_latitude"
							id="hauling_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={
								haul.trawl_characteristics.hauling_latitude ||
								""
							}
							aria-label="Hauling latitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="hauling_longitude"
							id="hauling_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={
								haul.trawl_characteristics.hauling_longitude ||
								""
							}
							aria-label="Hauling longitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="hauling_depth"
							id="hauling_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={
								haul.trawl_characteristics.hauling_depth || ""
							}
							aria-label="Hauling depth"
						/>
					</div>
					<div></div>

					{/* fourth row */}
					<div></div>
					<div
						className="characteristicsGrid__rowName"
						aria-hidden="true"
					>
						Bottom:
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="datetime-local"
							name="bottom_date_time"
							id="bottom_date_time"
							value={
								haul.trawl_characteristics.bottom_date_time ||
								""
							}
							aria-label="Bottom date and time"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="bottom_latitude"
							id="bottom_latitude"
							min={0}
							max={90}
							maxLength={6}
							size={6}
							step={0.0001}
							value={
								haul.trawl_characteristics.bottom_latitude || ""
							}
							aria-label="Bottom latitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="bottom_longitude"
							id="bottom_longitude"
							min={-180}
							max={180}
							maxLength={7}
							size={7}
							step={0.0001}
							value={
								haul.trawl_characteristics.bottom_longitude ||
								""
							}
							aria-label="Bottom longitude"
						/>
					</div>
					<div className="characteristicsGrid__field">
						<input
							disabled
							type="number"
							name="bottom_depth"
							id="bottom_depth"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={
								haul.trawl_characteristics.bottom_depth || ""
							}
							aria-label="Bottom depth"
						/>
					</div>
					<div></div>
				</div>

				<div className="form__row">
					<label className="field">
						Course (degrees):
						<input
							disabled
							type="number"
							name="course"
							id="course"
							min={0}
							max={360}
							maxLength={3}
							size={3}
							step={1}
							value={haul.trawl_characteristics.course || ""}
						/>
					</label>
					<label className="field">
						Velocity (m/s):
						<input
							disabled
							type="number"
							name="velocity"
							id="velocity"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={haul.trawl_characteristics.velocity || ""}
						/>
					</label>
					<label className="field">
						Cable (m):
						<input
							disabled
							type="number"
							name="cable"
							id="cable"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={haul.trawl_characteristics.cable || ""}
						/>
					</label>
					<label className="field">
						Sweep (m):
						<input
							disabled
							type="number"
							name="sweep"
							id="sweep"
							min={0}
							max={999}
							maxLength={3}
							size={3}
							step={1}
							value={haul.trawl_characteristics.sweep || ""}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field">
						Otter Boards Distance (m):
						<input
							disabled
							type="number"
							name="otter_boards_distance"
							id="otter_boards_distance"
							min={0}
							max={999}
							maxLength={4}
							size={4}
							step={0.1}
							value={
								haul.trawl_characteristics
									.otter_boards_distance || ""
							}
						/>
					</label>
					<label className="field">
						Horizontal Aperture (m):
						<input
							disabled
							type="number"
							name="horizontal_aperture"
							id="horizontal_aperture"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={
								haul.trawl_characteristics
									.horizontal_aperture || ""
							}
						/>
					</label>
					<label className="field">
						Vertical Aperture (m):
						<input
							disabled
							type="number"
							name="vertical_aperture"
							id="vertical_aperture"
							min={0}
							max={99}
							maxLength={4}
							size={4}
							step={0.1}
							value={
								haul.trawl_characteristics.vertical_aperture ||
								""
							}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field">
						Grid (m):
						<input
							disabled
							type="number"
							name="grid"
							id="grid"
							min={0}
							max={99}
							maxLength={2}
							size={2}
							step={1}
							value={haul.trawl_characteristics.grid || ""}
						/>
					</label>
					<label className="field">
						Track (m):
						<input
							disabled
							type="number"
							name="track"
							id="track"
							min={0}
							max={9999}
							maxLength={4}
							size={4}
							step={1}
							value={haul.trawl_characteristics.track || ""}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field__comment">
						Comment:
						<textarea
							disabled
							name="comment"
							id="comment"
							value={haul.trawl_characteristics.comment || ""}
						/>
					</label>
				</div>
			</fieldset>

			// <fieldset className="wrapper haul__row">
			// 	<legend>Trawl characteristics</legend>
			// 	<fieldset className="wrapper haul__row">
			// 		<legend>Shooting</legend>
			// 		<div className="form__cell">
			// 			<div className="haul__label">Date:</div>
			// 			<time
			// 				dateTime={
			// 					haul.trawl_characteristics.shooting_date_time ||
			// 					""
			// 				}
			// 			>
			// 				{/* {new Intl.DateTimeFormat("es-ES", {
			// 					year: "numeric",
			// 					month: "2-digit",
			// 					day: "2-digit",
			// 					hour: "numeric",
			// 					minute: "numeric",
			// 					second: "numeric",
			// 					timeZone: "UTC",
			// 					timeZoneName: "short",
			// 				}).format(
			// 					new Date(
			// 						haul.trawl_characteristics.shooting_date_time
			// 					)
			// 				)} */}
			// 			</time>
			// 		</div>
			// 		<div className="form__cell">
			// 			<div className="haul__label">Latitude:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.shooting_latitude || ""}
			// 			</div>
			// 		</div>
			// 		<div className="form__cell">
			// 			<div className="haul__label">Longitude:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.shooting_longitude ||
			// 					""}
			// 			</div>
			// 		</div>
			// 		<div className="form__cell">
			// 			<div className="haul__label">Depth:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.shooting_depth || ""}
			// 			</div>
			// 		</div>
			// 	</fieldset>
			// 	<fieldset className="wrapper haul__row">
			// 		<legend>Hauling</legend>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Date:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.hauling_date_time || ""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Latitude:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.hauling_latitude || ""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Longitude:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.hauling_longitude || ""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Depth:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.hauling_depth || ""}
			// 			</div>
			// 		</div>
			// 	</fieldset>

			// 	<fieldset className="wrapper haul__row">
			// 		<legend>Bottom</legend>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Date:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.bottom_date_time || ""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Latitude:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.bottom_latitude || ""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Longitude:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.bottom_longitude || ""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Depth:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.bottom_depth || ""}
			// 			</div>
			// 		</div>
			// 	</fieldset>
			// 	<fieldset className="wrapper haul__row">
			// 		<div className="form__cell">
			// 			<div className="haul__label">Course:</div>
			// 			<div>{haul.trawl_characteristics.course || ""}</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Velocity:</div>
			// 			<div>{haul.trawl_characteristics.velocity || ""}</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Cable:</div>
			// 			<div>{haul.trawl_characteristics.cable || ""}</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Sweep:</div>
			// 			<div>{haul.trawl_characteristics.sweep || ""}</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">
			// 				Otter_boards_distance:
			// 			</div>
			// 			<div>
			// 				{haul.trawl_characteristics.otter_boards_distance ||
			// 					""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Horizontal_aperture:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.horizontal_aperture ||
			// 					""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Vertical_aperture:</div>
			// 			<div>
			// 				{haul.trawl_characteristics.vertical_aperture || ""}
			// 			</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Grid:</div>
			// 			<div>{haul.trawl_characteristics.grid || ""}</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Track:</div>
			// 			<div>{haul.trawl_characteristics.track || ""}</div>
			// 		</div>

			// 		<div className="form__cell">
			// 			<div className="haul__label">Comment:</div>
			// 			<div>{haul.trawl_characteristics.comment || ""}</div>
			// 		</div>
			// 	</fieldset>
			// 	{/* </div> */}
			// </fieldset>
		);
	}
}

export default ComponentsHaulTrawl;
