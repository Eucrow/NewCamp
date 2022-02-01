import React, { useContext } from "react";

import SurveysContext from "../../contexts/SuverysContext";

const SurveyButtonBar = ({ props, edit }) => {
	const surveysContext = useContext(SurveysContext);

	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="survey__cell survey__cell--right">
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
			<div className="survey__cell survey__cell--right buttonsWrapper">
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						props.changeEdit(true);
					}}
				>
					Edit Survey
				</button>
				<button
					type="button"
					className="buttonsWrapper__button"
					onClick={(e) => {
						if (window.confirm("Delete the survey?")) {
							surveysContext.deleteSurvey(e, props.survey.id);
						}
					}}
				>
					Delete Survey
				</button>
			</div>
		);
	}

	return ButtonBar;
};

export default SurveyButtonBar;
