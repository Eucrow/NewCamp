import React, { Component } from "react";

class FormTrawl extends Component {
	/**
	 *
	 * @param {method} props.handleChangeTrawl
	 */

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<fieldset>
				<legend>Trawl characteristics</legend>
				<label htmlFor="shooting_date_time">Shooting_date_time:</label>
				<input
					type="text"
					id="shooting_date_time"
					name="shooting_date_time"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="shooting_latitude">Shooting_latitude:</label>
				<input
					type="text"
					id="shooting_latitude"
					name="shooting_latitude"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="shooting_longitude">Shooting_longitude:</label>
				<input
					type="text"
					id="shooting_longitude"
					name="shooting_longitude"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="shooting_depth">Shooting_depth:</label>
				<input
					type="text"
					id="shooting_depth"
					name="shooting_depth"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_date_time">Hauling_date_time:</label>
				<input
					type="text"
					id="hauling_date_time"
					name="hauling_date_time"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_latitude">Hauling_latitude:</label>
				<input
					type="text"
					id="hauling_latitude"
					name="hauling_latitude"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_longitude">Hauling_longitude:</label>
				<input
					type="text"
					id="hauling_longitude"
					name="hauling_longitude"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="hauling_depth">Hauling_depth:</label>
				<input
					type="text"
					id="hauling_depth"
					name="hauling_depth"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_date_time">Bottom_date_time:</label>
				<input
					type="text"
					id="bottom_date_time"
					name="bottom_date_time"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_latitude">Bottom_latitude:</label>
				<input
					type="text"
					id="bottom_latitude"
					name="bottom_latitude"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_longitude">Bottom_longitude:</label>
				<input
					type="text"
					id="bottom_longitude"
					name="bottom_longitude"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="bottom_depth">Bottom_depth:</label>
				<input
					type="text"
					id="bottom_depth"
					name="bottom_depth"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="course">Course:</label>
				<input
					type="text"
					id="course"
					name="course"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="velocity">Velocity:</label>
				<input
					type="text"
					id="velocity"
					name="velocity"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="cable">Cable:</label>
				<input
					type="text"
					id="cable"
					name="cable"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="sweep">Sweep:</label>
				<input
					type="text"
					id="sweep"
					name="sweep"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="otter_boards_distance">
					Otter_boards_distance:
				</label>
				<input
					type="text"
					id="otter_boards_distance"
					name="otter_boards_distance"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="horizontal_aperture">
					Horizontal_aperture:
				</label>
				<input
					type="text"
					id="horizontal_aperture"
					name="horizontal_aperture"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="vertical_aperture">Vertical_aperture:</label>
				<input
					type="text"
					id="vertical_aperture"
					name="vertical_aperture"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="grid">Grid:</label>
				<input
					type="text"
					id="grid"
					name="grid"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="track">Track:</label>
				<input
					type="text"
					id="track"
					name="track"
					onChange={this.props.handleChangeTrawl}
				/>
				<label htmlFor="comment">Comment:</label>
				<input
					type="text"
					id="comment"
					name="comment"
					onChange={this.props.handleChangeTrawl}
				/>
			</fieldset>
		);
	}
}

export default FormTrawl;
