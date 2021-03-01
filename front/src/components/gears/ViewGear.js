import React, { Component } from "react";

import UiButtonUpdateGear from "./UiButtonUpdateGear";
import UiButtonDeleteGear from "./UiButtonDeleteGear";
/**
 * Gear component
 * @param {objetc} props.gear: gear object
 * @param {method} props.handleEdit:
 * @param {method} props.deleteGear:
 */
class ViewGear extends Component {
	renderContent() {
		let content = "";

		content = (
			<div>
				Gear:{this.props.gear.name} -- Gear type:{this.props.gear.gear_type} -- Otter boards type:
				{this.props.gear.otter_boards_type} -- Otter boards area:{this.props.gear.otter_boards_area} -- Otter
				boards weight:{this.props.gear.otter_boards_weight} -- Groundgear length:
				{this.props.gear.groundgear_length} -- Groundgear weight:{this.props.gear.groundgear_weight} -- Headline
				length:{this.props.gear.headline_length} -- Headline floats number:
				{this.props.gear.headline_floats_number} -- Wing length:{this.props.gear.wing_length} -- Square meshes:
				{this.props.gear.square_meshes} -- Top panel meshes:{this.props.gear.top_panel_meshes} -- Bottom panel
				meshes:{this.props.gear.bottom_panel_meshes} -- Codend nets meshes:{this.props.gear.codend_nets_meshes}{" "}
				-- Inner linner meshes:{this.props.gear.inner_linner_meshes} -- Otter boards distance:
				{this.props.gear.otter_boards_distance} -- Horizontal aperture:{this.props.gear.horizontal_aperture} --
				Vertical aperture:{this.props.gear.vertical_aperture} -- Comment:{this.props.gear.comment}
				<UiButtonUpdateGear handleEdit={this.props.handleEdit} gear_id={this.props.gear.id} />
				<UiButtonDeleteGear deleteGear={this.props.deleteGear} gear_id={this.props.gear.id} />
			</div>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default ViewGear;
