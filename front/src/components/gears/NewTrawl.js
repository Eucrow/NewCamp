import React, { Component } from "react";
/**
 * Trawl component
 * @param {object} props.trawl: trawl object
 * @param {method} props.handleAdd:
 * @param {method} props.handleChange:
 * @param {method} props.createTrawl:
 */
class NewTrawl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			trawl: [],
		};
	}
	/**
	 * Manage fields change in 'trawl' state.
	 * @param {event} e - Event.
	 */
	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			trawl: {
				...this.state.trawl,
				[name]: value,
			},
		});

		this.handleChange = this.handleChange.bind(this);
	}

	renderContent() {
		var content = "";

		content = (
			<form
				onSubmit={(e) => {
					this.props.createTrawl(e, this.state.trawl);
					this.props.handleAdd(false);
				}}
			>
				<div>
					<label htmlFor="name">Name:</label>
					<input type="number" id="name" name="name" onChange={(e) => this.handleChange(e)} />
					--
					<label htmlFor="trawl_type">Trawl type:</label>
					<input type="text" id="trawl_type" name="trawl_type" onChange={(e) => this.handleChange(e)} /> --
					<label htmlFor="otter_boards_type">Otter boards type:</label>
					<input
						type="text"
						id="otter_boards_type"
						name="otter_boards_type"
						onChange={(e) => this.handleChange(e)}
					/>{" "}
					--
					<label htmlFor="otter_boards_area">Otter boards area:</label>
					<input
						type="number"
						id="otter_boards_area"
						name="otter_boards_area"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="otter_boards_weight">Otter boards weight:</label>
					<input
						type="number"
						id="otter_boards_weight"
						name="otter_boards_weight"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="groundtrawl_length">Groundtrawl length:</label>
					<input
						type="number"
						id="groundtrawl_length"
						name="groundtrawl_length"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="groundtrawl_weight">Groundtrawl weight:</label>
					<input
						type="number"
						id="groundtrawl_weight"
						name="groundtrawl_weight"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="headline_length">Headline length:</label>
					<input
						type="number"
						id="headline_length"
						name="headline_length"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="headline_floats_number">Headline floats number:</label>
					<input
						type="number"
						id="headline_floats_number"
						name="headline_floats_number"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="wing_length">Wing length:</label>
					<input type="number" id="wing_length" name="wing_length" onChange={(e) => this.handleChange(e)} />
					--
					<label htmlFor="square_meshes">Square meshes:</label>
					<input
						type="number"
						id="square_meshes"
						name="square_meshes"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="top_panel_meshes">Top panel meshes:</label>
					<input
						type="number"
						id="top_panel_meshes"
						name="top_panel_meshes"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="bottom_panel_meshes">Bottom panel meshes:</label>
					<input
						type="number"
						id="bottom_panel_meshes"
						name="bottom_panel_meshes"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="codend_nets_meshes">Codend nets meshes:</label>
					<input
						type="number"
						id="codend_nets_meshes"
						name="codend_nets_meshes"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="inner_linner_meshes">Inner linner meshes:</label>
					<input
						type="number"
						id="inner_linner_meshes"
						name="inner_linner_meshes"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="otter_boards_distance">Otter boards distance:</label>
					<input
						type="number"
						id="otter_boards_distance"
						name="otter_boards_distance"
						onChange={(e) => this.handleChange(e)}
					/>
					--
					<label htmlFor="horizontal_aperture">Horizontal aperture:</label>
					<input
						type="number"
						id="horizontal_aperture"
						name="horizontal_aperture"
						onChange={(e) => this.handleChange(e)}
					/>{" "}
					--
					<label htmlFor="vertical_aperture">Vertical aperture:</label>
					<input
						type="number"
						id="vertical_aperture"
						name="vertical_aperture"
						onChange={(e) => this.handleChange(e)}
					/>{" "}
					--
					<label htmlFor="comment">Comment:</label>
					<input type="text" id="comment" name="comment" onChange={(e) => this.handleChange(e)} />
					{/* <label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="datras_id">DATRAS code:</label>
					<input type="text" id="datras_id" name="datras_id" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="length">Length:</label>
					<input type="text" id="length" name="length" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="main_power">Main Power:</label>
					<input type="text" id="main_power" name="main_power" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="year_built">Year built:</label>
					<input type="text" id="year_built" name="year_built" onChange={(e) => this.handleChange(e)} /> */}
					<input type="submit" value="Save" />
				</div>
			</form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewTrawl;
