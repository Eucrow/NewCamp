import React, { Component } from "react";


import { Link } from "react-router-dom";

class ComponentsSurveysOptions extends Component {
    /**
	 * Component with option of every survey
	 * @param {number} props.survey_id
	 */
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         }
        this.api = "/Survey/" + this.props.survey_id;
    }
    
    render() { 
        return ( 
            <ul>
                <li><Link to={this.api}> detail </Link></li>
                <li>edit</li>
                <li>remove</li>
                <li>select</li>
            </ul>

         );
    }
}
 
export default ComponentsSurveysOptions;