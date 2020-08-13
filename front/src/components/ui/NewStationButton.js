import React, { Component } from "react";


import { Link } from "react-router-dom";

class ComponentsUiNewStationButton extends Component {
    /**
     * Button to create new Station
     */

    constructor(props) {
        super(props);
        this.api = "/Stations/new"
    }

    render() {
		return (
            <div><Link to={{pathname: this.api, state: {toShow: "new" }}}> Add new station </Link></div>
		)
	}
}

export default ComponentsUiNewStationButton