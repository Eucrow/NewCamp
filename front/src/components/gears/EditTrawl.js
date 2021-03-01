import React, { Component } from "react";

import UiButtonCancelEditTrawl from "./UiButtonCancelEditTrawl";

/**
 * Trawl component
 * @param {object} props.trawl - trawl object
 * @param {method} props.handleChange
 * @param {method} props.handleEdit
 * @param {method} props.updateTrawl
 */
class EditTrawl extends Component {
	renderContent() {
		var content = "";

		content = (
			<form
				onSubmit={(e) => {
					this.props.updateTrawl(e, this.props.trawl.id);
				}}
			>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						type="number"
						id="name"
						name="name"
						value={this.props.trawl.name || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="trawl_type">Trawl type:</label>
					<input
						type="text"
						id="trawl_type"
						name="trawl_type"
						value={this.props.trawl.trawl_type || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>{" "}
					--
					<label htmlFor="otter_boards_type">Otter boards type:</label>
					<input
						type="text"
						id="otter_boards_type"
						name="otter_boards_type"
						value={this.props.trawl.otter_boards_type || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>{" "}
					--
					<label htmlFor="otter_boards_area">Otter boards area:</label>
					<input
						type="number"
						id="otter_boards_area"
						name="otter_boards_area"
						value={this.props.trawl.otter_boards_area || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="otter_boards_weight">Otter boards weight:</label>
					<input
						type="number"
						id="otter_boards_weight"
						name="otter_boards_weight"
						value={this.props.trawl.otter_boards_weight || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="groundtrawl_length">Groundtrawl length:</label>
					<input
						type="number"
						id="groundtrawl_length"
						name="groundtrawl_length"
						value={this.props.trawl.groundtrawl_length || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="groundtrawl_weight">Groundtrawl weight:</label>
					<input
						type="number"
						id="groundtrawl_weight"
						name="groundtrawl_weight"
						value={this.props.trawl.groundtrawl_weight || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="headline_length">Headline length:</label>
					<input
						type="number"
						id="headline_length"
						name="headline_length"
						value={this.props.trawl.headline_length || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="headline_floats_number">Headline floats number:</label>
					<input
						type="number"
						id="headline_floats_number"
						name="headline_floats_number"
						value={this.props.trawl.headline_floats_number || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="wing_length">Wing length:</label>
					<input
						type="number"
						id="wing_length"
						name="wing_length"
						value={this.props.trawl.wing_length || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="square_meshes">Square meshes:</label>
					<input
						type="number"
						id="square_meshes"
						name="square_meshes"
						value={this.props.trawl.square_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="top_panel_meshes">Top panel meshes:</label>
					<input
						type="number"
						id="top_panel_meshes"
						name="top_panel_meshes"
						value={this.props.trawl.top_panel_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="bottom_panel_meshes">Bottom panel meshes:</label>
					<input
						type="number"
						id="bottom_panel_meshes"
						name="bottom_panel_meshes"
						value={this.props.trawl.bottom_panel_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="codend_nets_meshes">Codend nets meshes:</label>
					<input
						type="number"
						id="codend_nets_meshes"
						name="codend_nets_meshes"
						value={this.props.trawl.codend_nets_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>{" "}
					--
					<label htmlFor="inner_linner_meshes">Inner linner meshes:</label>
					<input
						type="number"
						id="inner_linner_meshes"
						name="inner_linner_meshes"
						value={this.props.trawl.inner_linner_meshes || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="otter_boards_distance">Otter boards distance:</label>
					<input
						type="number"
						id="otter_boards_distance"
						name="otter_boards_distance"
						value={this.props.trawl.otter_boards_distance || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					--
					<label htmlFor="horizontal_aperture">Horizontal aperture:</label>
					<input
						type="number"
						id="horizontal_aperture"
						name="horizontal_aperture"
						value={this.props.trawl.horizontal_aperture || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>{" "}
					--
					<label htmlFor="vertical_aperture">Vertical aperture:</label>
					<input
						type="number"
						id="vertical_aperture"
						name="vertical_aperture"
						value={this.props.trawl.vertical_aperture || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>{" "}
					--
					<label htmlFor="comment">Comment:</label>
					<input
						type="text"
						id="comment"
						name="comment"
						value={this.props.trawl.comment || ""}
						onChange={(e) => this.props.handleChange(e, this.props.trawl.id)}
					/>
					<input type="submit" value="Save" />
					<UiButtonCancelEditTrawl handleEdit={this.props.handleEdit} />
				</div>
			</form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default EditTrawl;
