import React, { Component } from "react";

import UiButtonCancelEditGear from "./UiButtonCancelEditGear";

/**
 * Gear component
 * @param {object} props.gear - gear object
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateGear
 */
class EditGear extends Component {
	renderContent() {
		var content = "";

		content = (
			<form
				onSubmit={(e) => {
					this.props.updateGear(e, this.props.gear.id);
				}}
			>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="number"
						id="name"
						name="name"
						value={this.props.gear.name || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="gear_type">Gear type:</label>
					<input
						type="text"
						id="gear_type"
						name="gear_type"
						value={this.props.gear.gear_type || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>{" "}
					--
					<label htmlFor="otter_boards_type">Otter boards type:</label>
					<input
						type="text"
						id="otter_boards_type"
						name="otter_boards_type"
						value={this.props.gear.otter_boards_type || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>{" "}
					--
					<label htmlFor="otter_boards_area">Otter boards area:</label>
					<input
						type="number"
						id="otter_boards_area"
						name="otter_boards_area"
						value={this.props.gear.otter_boards_area || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="otter_boards_weight">Otter boards weight:</label>
					<input
						type="number"
						id="otter_boards_weight"
						name="otter_boards_weight"
						value={this.props.gear.otter_boards_weight || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="groundgear_length">Groundgear length:</label>
					<input
						type="number"
						id="groundgear_length"
						name="groundgear_length"
						value={this.props.gear.groundgear_length || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="groundgear_weight">Groundgear weight:</label>
					<input
						type="number"
						id="groundgear_weight"
						name="groundgear_weight"
						value={this.props.gear.groundgear_weight || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="headline_length">Headline length:</label>
					<input
						type="number"
						id="headline_length"
						name="headline_length"
						value={this.props.gear.headline_length || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="headline_floats_number">Headline floats number:</label>
					<input
						type="number"
						id="headline_floats_number"
						name="headline_floats_number"
						value={this.props.gear.headline_floats_number || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="wing_length">Wing length:</label>
					<input
						type="number"
						id="wing_length"
						name="wing_length"
						value={this.props.gear.wing_length || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="square_meshes">Square meshes:</label>
					<input
						type="number"
						id="square_meshes"
						name="square_meshes"
						value={this.props.gear.square_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="top_panel_meshes">Top panel meshes:</label>
					<input
						type="number"
						id="top_panel_meshes"
						name="top_panel_meshes"
						value={this.props.gear.top_panel_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="bottom_panel_meshes">Bottom panel meshes:</label>
					<input
						type="number"
						id="bottom_panel_meshes"
						name="bottom_panel_meshes"
						value={this.props.gear.bottom_panel_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="codend_nets_meshes">Codend nets meshes:</label>
					<input
						type="number"
						id="codend_nets_meshes"
						name="codend_nets_meshes"
						value={this.props.gear.codend_nets_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>{" "}
					--
					<label htmlFor="inner_linner_meshes">Inner linner meshes:</label>
					<input
						type="number"
						id="inner_linner_meshes"
						name="inner_linner_meshes"
						value={this.props.gear.inner_linner_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="otter_boards_distance">Otter boards distance:</label>
					<input
						type="number"
						id="otter_boards_distance"
						name="otter_boards_distance"
						value={this.props.gear.otter_boards_distance || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					--
					<label htmlFor="horizontal_aperture">Horizontal aperture:</label>
					<input
						type="number"
						id="horizontal_aperture"
						name="horizontal_aperture"
						value={this.props.gear.horizontal_aperture || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>{" "}
					--
					<label htmlFor="vertical_aperture">Vertical aperture:</label>
					<input
						type="number"
						id="vertical_aperture"
						name="vertical_aperture"
						value={this.props.gear.vertical_aperture || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>{" "}
					--
					<label htmlFor="comment">Comment:</label>
					<input
						type="text"
						id="comment"
						name="comment"
						value={this.props.gear.comment || ""}
						onChange={(e) => this.props.handleChange(e, this.props.gear.id)}
					/>
					<input type="submit" value="Save" />
					<UiButtonCancelEditGear handleEdit={this.props.handleEdit} />
				</div>
			</form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default EditGear;
