import React, { Component } from "react";

import ComponentsSurveysOptions from "./options/Options.js";

class ComponentsSurveys extends Component {
	/**
	 * List of surveys
	 * @param {*} props 
	 */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
			fetch("http://127.0.0.1:8000/api/1.0/surveys")
				.then(response => {
					if(response.status > 400){
						return this.setState(() => {
							return { placeholder: "Something went wrong!"}
						});
					}
					return response.json();
				})
				.then(data => {
					this.setState(() => {
						return {
							data,
							loaded: true
						};
					});
				});
        
	}
	
	render() {
		return (
			<ul>
				{this.state.data.map(survey => {
					return(
						<li key={survey.id}>
							{survey.description} <ComponentsSurveysOptions survey_id={survey.id} />
						</li>
					)
				})}
			</ul>
		)
	}
}



export default ComponentsSurveys;