import React, { Component } from "react";

import UiButtonUpdateTrawl from "./UiButtonUpdateTrawl";
import UiButtonDeleteTrawl from "./UiButtonDeleteTrawl";
/**
 * Trawl component
 * @param {objetc} props.trawl: trawl object
 * @param {method} props.handleEdit:
 * @param {method} props.deleteTrawl:
 */
class ViewTrawl extends Component {
	renderContent() {
		let content = "";

		content = (
			<div>
				Trawl:{this.props.trawl.name} -- Trawl type:{this.props.trawl.trawl_type} -- Otter boards type:
				{this.props.trawl.otter_boards_type} -- Otter boards area:{this.props.trawl.otter_boards_area} -- Otter
				boards weight:{this.props.trawl.otter_boards_weight} -- Groundtrawl length:
				{this.props.trawl.groundtrawl_length} -- Groundtrawl weight:{this.props.trawl.groundtrawl_weight} --
				Headline length:{this.props.trawl.headline_length} -- Headline floats number:
				{this.props.trawl.headline_floats_number} -- Wing length:{this.props.trawl.wing_length} -- Square
				meshes:
				{this.props.trawl.square_meshes} -- Top panel meshes:{this.props.trawl.top_panel_meshes} -- Bottom panel
				meshes:{this.props.trawl.bottom_panel_meshes} -- Codend nets meshes:
				{this.props.trawl.codend_meshes} -- Inner linner meshes:{this.props.trawl.inner_linner_meshes} -- Otter
				boards distance:
				{this.props.trawl.otter_boards_distance} -- Horizontal aperture:{this.props.trawl.horizontal_aperture}{" "}
				-- Vertical aperture:{this.props.trawl.vertical_aperture} -- Comment:{this.props.trawl.comment}
				<UiButtonUpdateTrawl handleEdit={this.props.handleEdit} trawl_id={this.props.trawl.id} />
				<UiButtonDeleteTrawl deleteTrawl={this.props.deleteTrawl} trawl_id={this.props.trawl.id} />
			</div>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default ViewTrawl;
