import React, { Component } from "react";

class EditHydrography extends Component {
	/**
	 * Component of hydrography form of haul.
	 * @param {number} props.haul
	 * @param {function} props.handleChangeHydrography
	 */

	render() {
		const haul = this.props.haul;

		return (
			<fieldset>
				<legend>Hydrography characteristics</legend>
				<label htmlFor="latitude">Latitude: </label>
				<input
					type="text"
					id="latitude"
					name="latitude"
					value={haul.hydrography_characteristics.latitude}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="longitude">Longitude: </label>
				<input
					type="text"
					id="longitude"
					name="longitude"
					value={haul.hydrography_characteristics.longitude}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="date_time">Date time: </label>
				<input
					type="text"
					id="date_time"
					name="date_time"
					value={haul.hydrography_characteristics.date_time}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="depth_probe">Depth probe: </label>
				<input
					type="text"
					id="depth_probe"
					name="depth_probe"
					value={haul.hydrography_characteristics.depth_probe}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="cable">Cable: </label>
				<input
					type="text"
					id="cable"
					name="cable"
					value={haul.hydrography_characteristics.cable}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="depth">Depth: </label>
				<input
					type="text"
					id="depth"
					name="depth"
					value={haul.hydrography_characteristics.depth}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="temperature_0">Temperature 0: </label>
				<input
					type="text"
					id="temperature_0"
					name="temperature_0"
					value={haul.hydrography_characteristics.temperature_0}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="salinity_0">Salinity 0: </label>
				<input
					type="text"
					id="salinity_0"
					name="salinity_0"
					value={haul.hydrography_characteristics.salinity_0}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="sigma_0">Sigma 0: </label>
				<input
					type="text"
					id="sigma_0"
					name="sigma_0"
					value={haul.hydrography_characteristics.sigma_0}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="temperature_50">Temperature 50: </label>
				<input
					type="text"
					id="temperature_50"
					name="temperature_50"
					value={haul.hydrography_characteristics.temperature_50}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="salinity_50">Salinity 50: </label>
				<input
					type="text"
					id="salinity_50"
					name="salinity_50"
					value={haul.hydrography_characteristics.salinity_50}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="sigma_50">Sigma 50: </label>
				<input
					type="text"
					id="sigma_50"
					name="sigma_50"
					value={haul.hydrography_characteristics.sigma_50}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="temperature_100">Temperature 100: </label>
				<input
					type="text"
					id="temperature_100"
					name="temperature_100"
					value={haul.hydrography_characteristics.temperature_100}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="salinity_100">Salinity 100: </label>
				<input
					type="text"
					id="salinity_100"
					name="salinity_100"
					value={haul.hydrography_characteristics.salinity_100}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="sigma_100">Sigma 100: </label>
				<input
					type="text"
					id="sigma_100"
					name="sigma_100"
					value={haul.hydrography_characteristics.sigma_100}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="temperature">Temperature: </label>
				<input
					type="text"
					id="temperature"
					name="temperature"
					value={haul.hydrography_characteristics.temperature}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="salinity">Salinity: </label>
				<input
					type="text"
					id="salinity"
					name="salinity"
					value={haul.hydrography_characteristics.salinity}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="sigma">Sigma: </label>
				<input
					type="text"
					id="sigma"
					name="sigma"
					value={haul.hydrography_characteristics.sigma}
					onChange={this.props.handleChangeHydrography}
				/>
				<label htmlFor="comment">Comment: </label>
				<input
					type="text"
					id="comment"
					name="comment"
					value={haul.hydrography_characteristics.comment}
					onChange={this.props.handleChangeHydrography}
				/>
			</fieldset>
		);
	}
}

export default EditHydrography;
