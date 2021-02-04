import React, { Component } from "react";

import Sp from "./Sp";

class ViewSpeciesList extends Component {
	/**
	 * @param {object} props.species
	 * @param {method} props.handleChange
	 * @param {method} props.handleUpdate
	 */
	render() {
		return this.props.species.map((sp) => {
			return (
				<Sp
					key={sp.id}
					sp={sp}
					handleChange={this.props.handleChange}
					handleUpdateSp={this.props.handleUpdateSp}
				/>
			);
		});
	}
}
export default ViewSpeciesList;
