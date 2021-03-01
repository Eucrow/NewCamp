import React, { Component } from "react";

import ViewTrawl from "./ViewTrawl";
import EditTrawl from "./EditTrawl";

/**
 * Trawl component. Manage component logic.
 * @param {object} props - Trawl object
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateTrawl
 * @param {method} props.deleteTrawl
 */
class Trawl extends Component {
	renderContent() {
		let content = "";

		if (this.props.edit == this.props.trawl.id) {
			content = (
				<EditTrawl
					trawl={this.props.trawl}
					handleEdit={this.props.handleEdit}
					handleChange={this.props.handleChange}
					updateTrawl={this.props.updateTrawl}
				/>
			);
		} else {
			content = (
				<ViewTrawl
					trawl={this.props.trawl}
					handleEdit={this.props.handleEdit}
					deleteTrawl={this.props.deleteTrawl}
				/>
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default Trawl;
