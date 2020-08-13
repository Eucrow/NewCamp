import React, { Component } from "react";


import { Link } from "react-router-dom";

class ComponentsUiNewHaulButton extends Component {
    /**
     * Button to create new haul
     */

    constructor(props) {
        super(props);
        this.api = "/Hauls/new"
    }

    render() {
		return (
            <div><Link to={{pathname: this.api, state: {toShow: "new" }}}> Add new haul </Link></div>
		)
	}
}

export default ComponentsUiNewHaulButton