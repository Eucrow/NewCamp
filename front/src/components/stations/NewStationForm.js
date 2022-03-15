import React, { useContext, useEffect, useState } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * New station form component
 * @param {method} props.handleAdd
 * @param {method} props.createStation
 */
const NewStationForm = ({ props }) => {
	const selectedSurveyContext = useContext(SelectedSurveyContext);

	const [station, setStation] = useState();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setStation({
			station: {
				...station,
				[name]: value,
			},
		});
	};

	useEffect(() => {
		setStation({
			station: {
				...station,
				survey_id: selectedSurveyContext.selectedSurveyId,
			},
		});
	}, []);

	const renderedContent = (
		<form
			className="wrapper form__row"
			onSubmit={(e) => {
				props.createStation(e, this.state.station);
				props.handleAdd(false);
			}}
		>
			<div className="form__row">
				<div className="form__cell">
					<label htmlFor="station">Station:</label>
					<input
						type="number"
						min="0"
						max="9999"
						maxLength="4"
						size={4}
						className="station_number"
						id="station"
						name="station"
						onChange={(e) => {
							handleChange(e);
						}}
					/>
				</div>
				<div className="form__cell">
					<label htmlFor="comment">Comment:</label>
					<textarea
						type="text"
						id="comment"
						name="comment"
						rows={1}
						size={1000}
						onChange={(e) => handleChange(e)}
					/>
				</div>
			</div>
			<div className="form__row">
				<div className="survey__cell survey__cell--right buttonsWrapper">
					<UiButtonSave buttonText={"Save Station"} />
					<UiButtonCancel handleMethod={this.props.handleAdd} />
				</div>
			</div>
		</form>
	);

	return renderedContent;
};

export default NewStationForm;
