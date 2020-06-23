import React, { Component, Fragment } from "react";

import ComponentsSurveysOptions from "./options/Options.js";
import ComponentsUiNewSurveyButton from "../ui/NewSurveyButton.js"

class ComponentsSurveys extends Component {
	/**
	 * List of surveys
	 * @param {*} props 
	 */
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            loaded: false,
            placeholder: "Loading"
		}

		this.onDelete = this.onDelete.bind(this);
	}

	onDelete(survey_id){

		// state, before delete anything
		const currentSurvey = this.state.surveys;

		// Remove deleted item from state.
		this.setState({
			surveys: currentSurvey.filter(survey => survey.id !== survey_id),
			});

	}
	
    componentDidMount() {

		fetch("http://127.0.0.1:8000/api/1.0/surveys/")
			.then(response => {
				if(response.status > 400){
					return this.setState(() => {
						return { placeholder: "Something went wrong!" }
					});
				}
				return response.json();
			})
			.then(surveys => {
				this.setState(() => {
					return {
						surveys,
						loaded: true
					};
				});
			});
	}
	
	render() {
		return (

			<Fragment>
				<div><ComponentsUiNewSurveyButton /></div>
				<ul>		
					{/* <li>{this.state.surveys}</li> */}
					{this.state.surveys.map(sur => {
						return(
							<li key={sur.id}>
								survey: {sur.description} -
								<ComponentsSurveysOptions survey_id={sur.id} onDelete= {this.onDelete} />
							</li>
						)
					})}
				</ul>
			</Fragment>
			
		)
	}
}



export default ComponentsSurveys;