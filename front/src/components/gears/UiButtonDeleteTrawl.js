import React, { Component } from "react";
/**
 * Component of button to add a new trawl
 * @param {number} props.trawl_id: id of the trawl.
 * @param {method} props.deleteTrawl: method to delete trawl.
 */
class UiButtonDeleteTrawl extends Component {
	render() {
		return (
			<button
				onClick={(e) => {
					if (window.confirm("Delete the trawl?")) {
						this.props.deleteTrawl(e, this.props.trawl_id);
					}
				}}
			>
				Delete
			</button>
		);
	}
}

export default UiButtonDeleteTrawl;
