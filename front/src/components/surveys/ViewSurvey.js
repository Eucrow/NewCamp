import React, { Component } from "react";

import UiButtonUpdateSurvey from "./UiButtonUpdateSurvey";
import UiButtonDeleteSurvey from "./UiButtonDeleteSurvey";
/**
 * Survey component
 * @param {objetc} props.survey: survey object
 * @param {method} props.handleEdit:
 * @param {method} props.deleteSurvey:
 */
class ViewSurvey extends Component {
	renderContent() {
		let content = "";

		content = (
			<div>
				<li>acronym: {this.props.survey.acronym}</li>
				<li>description: {this.props.survey.description}</li>
				<li>start_date: {this.props.survey.start_date}</li>
				<li>end_date: {this.props.survey.end_date}</li>
				<li>width_x: {this.props.survey.width_x}</li>
				<li>width_y: {this.props.survey.width_y}</li>
				<li>origin_x: {this.props.survey.origin_x}</li>
				<li>origin_y: {this.props.survey.origin_y}</li>
				<li>ship: {this.props.survey.ship}</li>
				<li>hauls_duration: {this.props.survey.hauls_duration}</li>
				<li>unit_sample: {this.props.survey.unit_sample}</li>
				<li>survey comment: {this.props.survey.comment}</li>
				<li>stratification: {this.props.survey.stratification}</li>
				{/* <li>{toString(this.props.survey.stratification.comment)}</li> */}
				{/* {this.props.survey.stratification.map(home => <div>{home.stratification}</div>)} */}
				{/* {this.props.survey.stratification.map(function(strat){
                        return <Fragment><li>strat.stratification</li>
                                <li>strat.comment</li></Fragment>
                    })} */}
				<UiButtonUpdateSurvey
					handleEdit={this.props.handleEdit}
					survey_id={this.props.survey.id}
				/>
				<UiButtonDeleteSurvey
					deleteSurvey={this.props.deleteSurvey}
					survey_id={this.props.survey.id}
				/>
			</div>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default ViewSurvey;
