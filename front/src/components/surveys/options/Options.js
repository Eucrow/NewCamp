import React, { Component } from "react";
import { Link } from "react-router-dom";

import ComponentsUiRemoveSurveyButton from "../../ui/RemoveSurveyButton.js";

class ComponentsSurveysOptions extends Component {
    /**
	 * Component with option of every survey
	 * @param {number} props.survey_id
	 */
    constructor(props) {
        super(props);
        // this.state = { 
        //     data: []
        //  }
        this.onDelete = this.props.onDelete;
        this.api = "/Survey/survey/" + this.props.survey_id;
    }

    render() { 
        return ( 
            <ul>
                <li><Link to={{pathname: this.api, state: {isEdit: false }}}> detail </Link></li>
                <li><Link to={{pathname: this.api, state: {isEdit: true }}}> edit </Link></li>
                <li><ComponentsUiRemoveSurveyButton style={{"display": "inline"}} survey_id={ this.props.survey_id } onDelete={ this.onDelete } /></li>
                <li>select</li>
            </ul>

         );
    }
}
 
export default ComponentsSurveysOptions;