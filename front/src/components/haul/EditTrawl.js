import React, { Component } from "react";

class EditTrawl extends Component {
	/**
	 * Component of trawl form of haul.
	 * @param {number} props.haul
	 * @param {function} props.handleChangeTrawl
	 */

	render() {
		const haul = this.props.haul;

		return (
			<fieldset>
				<legend>Trawl characteristics:</legend>
				<label htmlFor="shooting_date_time">shooting_date_time:</label>
				<input
					type="text"
					name="shooting_date_time"
					id="shooting_date_time"
					value={haul.trawl_characteristics.shooting_date_time || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="shooting_latitude">shooting_latitude:</label>
				<input
					type="text"
					name="shooting_latitude"
					id="shooting_latitude"
					value={haul.trawl_characteristics.shooting_latitude || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="shooting_longitude">shooting_longitude:</label>
				<input
					type="text"
					name="shooting_longitude"
					id="shooting_longitude"
					value={haul.trawl_characteristics.shooting_longitude || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="shooting_depth">shooting_depth:</label>
				<input
					type="text"
					name="shooting_depth"
					id="shooting_depth"
					value={haul.trawl_characteristics.shooting_depth || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_date_time">hauling_date_time:</label>
				<input
					type="text"
					name="hauling_date_time"
					id="hauling_date_time"
					value={haul.trawl_characteristics.hauling_date_time || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_latitude">hauling_latitude:</label>
				<input
					type="text"
					name="hauling_latitude"
					id="hauling_latitude"
					value={haul.trawl_characteristics.hauling_latitude || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_longitude">hauling_longitude:</label>
				<input
					type="text"
					name="hauling_longitude"
					id="hauling_longitude"
					value={haul.trawl_characteristics.hauling_longitude || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_depth">hauling_depth:</label>
				<input
					type="text"
					name="hauling_depth"
					id="hauling_depth"
					value={haul.trawl_characteristics.hauling_depth || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_date_time">bottom_date_time:</label>
				<input
					type="text"
					name="bottom_date_time"
					id="bottom_date_time"
					value={haul.trawl_characteristics.bottom_date_time || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_latitude">bottom_latitude:</label>
				<input
					type="text"
					name="bottom_latitude"
					id="bottom_latitude"
					value={haul.trawl_characteristics.bottom_latitude || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_longitude">bottom_longitude:</label>
				<input
					type="text"
					name="bottom_longitude"
					id="bottom_longitude"
					value={haul.trawl_characteristics.bottom_longitude || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_depth">bottom_depth:</label>
				<input
					type="text"
					name="bottom_depth"
					id="bottom_depth"
					value={haul.trawl_characteristics.bottom_depth || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="course">course:</label>
				<input
					type="text"
					name="course"
					id="course"
					value={haul.trawl_characteristics.course || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="velocity">velocity:</label>
				<input
					type="text"
					name="velocity"
					id="velocity"
					value={haul.trawl_characteristics.velocity || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="cable">cable:</label>
				<input
					type="text"
					name="cable"
					id="cable"
					value={haul.trawl_characteristics.cable || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="sweep">sweep:</label>
				<input
					type="text"
					name="sweep"
					id="sweep"
					value={haul.trawl_characteristics.sweep || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="otter_boards_distance">otter_boards_distance:</label>
				<input
					type="text"
					name="otter_boards_distance"
					id="otter_boards_distance"
					value={haul.trawl_characteristics.otter_boards_distance || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="horizontal_aperture">horizontal_aperture:</label>
				<input
					type="text"
					name="horizontal_aperture"
					id="horizontal_aperture"
					value={haul.trawl_characteristics.horizontal_aperture || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="vertical_aperture">vertical_aperture:</label>
				<input
					type="text"
					name="vertical_aperture"
					id="vertical_aperture"
					value={haul.trawl_characteristics.vertical_aperture || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="grid">grid:</label>
				<input
					type="text"
					name="grid"
					id="grid"
					value={haul.trawl_characteristics.grid || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="track">track:</label>
				<input
					type="text"
					name="track"
					id="track"
					value={haul.trawl_characteristics.track || ""}
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="comment">comment:</label>
				<input
					type="text"
					name="comment"
					id="comment"
					value={haul.trawl_characteristics.comment || ""}
					onChange={this.props.handleChangeTrawl}
				/>
			</fieldset>
		);
	}
}

export default EditTrawl;
