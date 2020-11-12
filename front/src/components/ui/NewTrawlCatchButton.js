import React, { Component } from "react";


import { Link } from "react-router-dom";

class ComponentsUiNewCatchTrawlButton extends Component {
    /**
     * Button to create new trawl catch.
     * @param {number} props.haul_id: id of haul.
     */

    constructor(props) {
        super(props);
        this.api = "/Catches/new/" + this.props.haul_id
    }

    render() {
		return (
            <div><Link to={{pathname: this.api}}> Add new catch </Link></div>
		)
	}
}

export default ComponentsUiNewCatchTrawlButton