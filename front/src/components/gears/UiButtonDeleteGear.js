import React, { Component } from "react";
/**
 * Component of button to add a new gear
 * @param {number} props.gear_id: id of the gear.
 * @param {method} props.deleteGear: method to delete gear.
 */
class UiButtonDeleteGear extends Component {
	render() {
		return (
			<button
				onClick={(e) => {
					if (window.confirm("Delete the gear?")) {
						this.props.deleteGear(e, this.props.gear_id);
					}
				}}
			>
				Delete
			</button>
		);
	}
}

export default UiButtonDeleteGear;
