import React, { Component } from "react";

class ComponentsUiRemoveSurveyButton extends Component {
    /**
     * Button to remove one Survey.
     * @param {number} props.survey_id
     * @param {function} props.onDelete: pass onDelete function to remove the station from parent state.
     */

    constructor(props) {
        super(props);
        this.apiRemoveSurvey = "http://127.0.0.1:8000/api/1.0/surveys/remove/" + this.props.survey_id;
        this.onDelete = this.props.onDelete;
    }

    removeSurvey(survey_id){
        fetch(this.apiRemoveSurvey, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(survey_id)
        })
        .then(this.props.onDelete(this.props.survey_id))
        .catch(error => console.log('Error'))
        
        this.forceUpdate();
    }

    render() {
		return (
           <button onClick={() => {
                if(window.confirm('Delete the survey?')){
                    this.removeSurvey(this.props.survey_id)
                };
            }}> Remove </button>
		)
	}
}

export default ComponentsUiRemoveSurveyButton;