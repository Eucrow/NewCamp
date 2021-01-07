import React, { Component, Fragment } from "react";

import SelectSurveyButton from "../../components/ui/SelectSurveyButton.js";
import UnselectSurveyButton from "../../components/ui/UnselectSurveyButton.js";
import SurveyContext from "../../contexts/SurveyContext.js";

class ComponentsSurveySelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			surveys: [],
			loaded: false,
			placeholder: "Loading",
		};

		this.apiSurveys = "http://127.0.0.1:8000/api/1.0/surveys/";

		this.ShowUnselectButton = this.ShowUnselectButton.bind(this);
	}

	static contextType = SurveyContext;

	ShowUnselectButton() {
		if (this.context.surveySelector === null) {
			return null;
		} else {
			return (
				<li key={"unselect"}>
					<UnselectSurveyButton />
				</li>
			);
		}
	}

	componentDidMount() {
		fetch(this.apiSurveys)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((surveys) => {
				this.setState(() => {
					return {
						surveys,
						loaded: true,
					};
				});
			});
	}

	render() {
		return (
			<Fragment>
				<ul>
					<this.ShowUnselectButton />
					{this.state.surveys.map((sur) => {
						return (
							<li key={sur.id}>
								{sur.description} <SelectSurveyButton survey_id={sur.id} />
							</li>
						);
					})}
				</ul>
			</Fragment>
		);
	}
}

export default ComponentsSurveySelect;
