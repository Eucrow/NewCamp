import React from "react";

const SurveyButtonBar = ({ props, edit }) => {
	var ButtonBar = "";

	if (edit === true) {
		ButtonBar = (
			<div className="survey__cell survey__cell--right">
				<div className="buttonsWrapper">
					<button
						type="submit"
						className="buttonsWrapper__button"
						onClick={(e) => {
							props.updateSurvey(e, props.survey.id);
							props.changeEdit(false);
						}}
					>
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
							props.deleteSurvey(e, props.survey.id);
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
