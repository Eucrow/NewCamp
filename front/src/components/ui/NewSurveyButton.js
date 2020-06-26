import React, { Component } from "react";


import { Link } from "react-router-dom";

class ComponentsUiNewSurveyButton extends Component {
    /**
     * Button to create new survey
     */

    constructor(props) {
        super(props);
        this.api = "/Survey/new"
    }

    render() {
		return (
            <div><Link to={{pathname: this.api, state: {toShow: "new" }}}> Add new survey </Link></div>
		)
	}
}

export default ComponentsUiNewSurveyButton