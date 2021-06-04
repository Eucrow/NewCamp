import React, { Component } from "react";

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
				<UnselectSurveyButton
					className="selectSurvey__row"
					setSelectedSurvey={this.props.setSelectedSurvey}
				/>
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
			<main>
				<header>
					<h1 className="title">Survey selection</h1>
				</header>
				<form className="wrapper selectSurvey">
					{this.state.surveys.map((s) => {
						return (
							<div className="selectSurvey__row">
								<label
									className="selectSurvey__element"
									for={s.description}
								>
									{s.description}
								</label>
								<SelectSurveyButton
									survey_id={s.id}
									survey_description={s.description}
								/>
							</div>
						);
					})}
					<div className="selectSurvey__row">
						<this.ShowUnselectButton />
					</div>
				</form>
			</main>
		);
	}
}

export default ComponentsSurveySelect;
