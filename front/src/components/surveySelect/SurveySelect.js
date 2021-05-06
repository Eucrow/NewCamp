import React, { Component, Fragment } from "react";

import SelectSurveyButton from "./UiSelectSurveyButton";
import UnselectSurveyButton from "./UiUnselectSurveyButton";

class ComponentsSurveySelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			surveys: [],
			loaded: false,
			placeholder: "Loading",
		};

		this.apiSurveys = "http://127.0.0.1:8000/api/1.0/survey/";

		this.ShowUnselectButton = this.ShowUnselectButton.bind(this);
	}

	ShowUnselectButton() {
		if (this.context.surveySelector === null) {
			return null;
		} else {
			return (
				<li key={"unselect"}>
					<UnselectSurveyButton
						setSelectedSurvey={this.props.setSelectedSurvey}
					/>
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
					{this.state.surveys.map((s) => {
						return (
							<li key={s.id}>
								{s.description}
								<SelectSurveyButton
									survey_id={s.id}
									survey_description={s.description}
								/>
							</li>
						);
					})}
				</ul>
			</Fragment>
		);
	}
}

export default ComponentsSurveySelect;
