import React, { useContext, useState } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";
import StationsContext from "../../contexts/StationsContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonStatusHandle from "../ui/UiButtonStatusHandle";

/**
 * New station form component
 * @param {method} props.handleAdd
 * @param {method} props.createStation
 */
const NewStationForm = (props) => {
	const selectedSurveyContext = useContext(SelectedSurveyContext);
	const stationsContext = useContext(StationsContext);

	const [station, setStation] = useState({
		station: "",
		comment: "",
		survey_id: selectedSurveyContext.selectedSurveyId,
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setStation((prevStation) => ({
			...prevStation,
			[name]: value,
		}));
	};

	const renderedContent = (
		<form
			className="wrapper form__row"
			onSubmit={(e) => {
				props.createStation(e, station);
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
						autoFocus={true}
						id="station"
						name="station"
						onChange={(e) => {
							handleChange(e);
							stationsContext.validateStationNumber(e);
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
					<UiButtonStatusHandle buttonText="Cancel" handleMethod={props.handleAdd} newStatus={false} />
				</div>
			</div>
		</form>
	);

	return renderedContent;
};

export default NewStationForm;
