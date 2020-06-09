import React, { Component } from "react";

import { Link } from "react-router-dom";

class ComponentsStationOptions extends Component {
    /**
	 * Component with option of every survey
	 * @param {number} props.survey_id
	 */
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         }
        this.apiStation = "Stations/station/" + this.props.station_id;
    }

    render() { 
        return ( 
            <ul>
                <li><Link to={{pathname: this.apiStation, state: {isEdit: true }}}> edit </Link></li>
                {/* <li><Link to={{pathname: this.api, state: {isEdit: false }}}> hauls </Link></li> */}
                <li>Hauls</li>
                <li>Remove</li>
            </ul>

         );
    }
}
 
export default ComponentsStationOptions;