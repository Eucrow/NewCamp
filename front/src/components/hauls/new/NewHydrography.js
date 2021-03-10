import React, { Component } from "react";

class NewHydrography extends Component {
	/**
	 *
	 * @param {method} props.handleChangeHydrography : manager of the event handler
	 */
	render() {
		return (
			<fieldset>
				<legend>Hydrography characteristics</legend>
				<label htmlFor="comment">Latitude</label>
				<input
					type="text"
					id="latitude"
					name="latitude"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Longitude</label>
				<input
					type="text"
					id="longitude"
					name="longitude"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Date time</label>
				<input
					type="text"
					id="date_time"
					name="date_time"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Depth probe</label>
				<input
					type="text"
					id="depth_probe"
					name="depth_probe"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Cable</label>
				<input
					type="text"
					id="cable"
					name="cable"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Depth</label>
				<input
					type="text"
					id="depth"
					name="depth"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Temperature 0</label>
				<input
					type="text"
					id="temperature_0"
					name="temperature_0"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Salinity 0</label>
				<input
					type="text"
					id="salinity_0"
					name="salinity_0"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Sigma 0</label>
				<input
					type="text"
					id="sigma_0"
					name="sigma_0"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Temperature 50</label>
				<input
					type="text"
					id="temperature_50"
					name="temperature_50"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Salinity 50</label>
				<input
					type="text"
					id="salinity_50"
					name="salinity_50"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Sigma 50</label>
				<input
					type="text"
					id="sigma_50"
					name="sigma_50"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Temperature 100</label>
				<input
					type="text"
					id="temperature_100"
					name="temperature_100"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Salinity 100</label>
				<input
					type="text"
					id="salinity_100"
					name="salinity_100"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Sigma 100</label>
				<input
					type="text"
					id="sigma_100"
					name="sigma_100"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Temperature</label>
				<input
					type="text"
					id="temperature"
					name="temperature"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Salinity</label>
				<input
					type="text"
					id="salinity"
					name="salinity"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Sigma</label>
				<input
					type="text"
					id="sigma"
					name="sigma"
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Comment</label>
				<input
					type="text"
					id="comment"
					name="comment"
					onChange={this.props.handleChangeHydrography}
				/>
			</fieldset>
		);
	}
}

export default NewHydrography;
