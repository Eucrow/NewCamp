import React from "react";

import TrawlSamplingPointView from "./TrawlSamplingPointView";

const TrawlFormView = ({ trawl }) => {
	const renderContent = () => {
		return (
			<fieldset className="wrapper">
				<legend>Trawl characteristics:</legend>
				<div className="characteristicsGrid characteristicsGrid--trawl form__row">
					{/* first row titles */}
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
				</div>

				<TrawlSamplingPointView
					nameSamplingPoint={"Shooting"}
					typeSamplingPoint={"shooting"}
					dateTime={trawl.shooting_date_time}
					latitude={trawl.shooting_latitude}
					longitude={trawl.shooting_longitude}
					depth={trawl.shooting_depth}
				/>
				<TrawlSamplingPointView
					nameSamplingPoint={"Bottom"}
					typeSamplingPoint={"bottom"}
					dateTime={trawl.bottom_date_time}
					latitude={trawl.bottom_latitude}
					longitude={trawl.bottom_longitude}
					depth={trawl.bottom_depth}
				/>

				<TrawlSamplingPointView
					nameSamplingPoint={"Trawling"}
					typeSamplingPoint={"trawling"}
					dateTime={trawl.trawling_date_time}
					latitude={trawl.trawling_latitude}
					longitude={trawl.trawling_longitude}
					depth={trawl.trawling_depth}
				/>

				<TrawlSamplingPointView
					nameSamplingPoint={"Hauling"}
					typeSamplingPoint={"hauling"}
					dateTime={trawl.hauling_date_time}
					latitude={trawl.hauling_latitude}
					longitude={trawl.hauling_longitude}
					depth={trawl.hauling_depth}
				/>

				<TrawlSamplingPointView
					nameSamplingPoint={"Take Off"}
					typeSamplingPoint={"take_off"}
					dateTime={trawl.take_off_date_time}
					latitude={trawl.take_off_latitude}
					longitude={trawl.take_off_longitude}
					depth={trawl.take_off_depth}
				/>

				<TrawlSamplingPointView
					nameSamplingPoint={"On Board"}
					typeSamplingPoint={"on_board"}
					dateTime={trawl.on_board_date_time}
					latitude={trawl.on_board_latitude}
					longitude={trawl.on_board_longitude}
					depth={trawl.on_board_depth}
				/>

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
							value={trawl.course || ""}
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
							value={trawl.velocity || ""}
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
							value={trawl.cable || ""}
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
							value={trawl.sweep || ""}
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
							value={trawl.otter_boards_distance || ""}
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
							value={trawl.horizontal_aperture || ""}
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
							value={trawl.vertical_aperture || ""}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field">
						Sampling rectangle:
						<input
							disabled
							type="number"
							name="sampling_rectangle"
							id="sampling_rectangle"
							min={0}
							max={99}
							maxLength={2}
							size={2}
							step={1}
							value={trawl.sampling_rectangle || ""}
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
							value={trawl.track || ""}
						/>
					</label>
				</div>
				<div className="form__row">
					<label className="field__comment">
						Comment:
						<textarea disabled name="comment" id="comment" value={trawl.comment || ""} />
					</label>
				</div>
			</fieldset>
		);
	};

	return renderContent();
};

export default TrawlFormView;
