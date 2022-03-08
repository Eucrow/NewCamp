import React, { useContext } from "react";

import SurveysContext from "../../contexts/SuverysContext";

import UiButtonDeleteSurvey from "./UiButtonDeleteSurvey";

const SurveyButtonBar = ({ props, edit }) => {
	const surveysContext = useContext(SurveysContext);

	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="form__cell form__cell--right">
				<div className="buttonsWrapper">
					<button type="submit" className="buttonsWrapper__button">
						Save Survey
					</button>
					<button
						type="button"
						className="buttonsWrapper__button"
						onClick={(e) => {
							props.changeEdit(false);
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		);
	}

	if (edit === false) {
		ButtonBar = (
			<div className="form__cell form__cell--right buttonsWrapper">
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						props.changeEdit(true);
					}}
				>
					Edit Survey
				</button>
				<UiButtonDeleteSurvey survey_id={props.survey.id} />
			</div>
		);
	}

	return ButtonBar;
};

export default SurveyButtonBar;
