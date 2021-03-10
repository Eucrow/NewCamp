import React, { Component } from "react";

class ViewHydrography extends Component {
	/**
	 * Component of hydrography form of haul.
	 * @param {object} props.haul
	 */

	render() {
		const haul = this.props.haul;
		return (
			<fieldset>
				<legend>Hydrography characteristics</legend>
				Latitude: {haul.hydrography_characteristics.latitude || ""}
				Longitude: {haul.hydrography_characteristics.longitude || ""}
				Date time: {haul.hydrography_characteristics.date_time || ""}
				Depth probe:{" "}
				{haul.hydrography_characteristics.depth_probe || ""}
				Cable: {haul.hydrography_characteristics.cable || ""}
				Depth: {haul.hydrography_characteristics.depth || ""}
				Temperature 0:{" "}
				{haul.hydrography_characteristics.temperature_0 || ""}
				Salinity 0: {haul.hydrography_characteristics.salinity_0 || ""}
				Sigma 0: {haul.hydrography_characteristics.sigma_0 || ""}
				Temperature 50:{" "}
				{haul.hydrography_characteristics.temperature_50 || ""}
				Salinity 50:{" "}
				{haul.hydrography_characteristics.salinity_50 || ""}
				Sigma 50: {haul.hydrography_characteristics.sigma_50 || ""}
				Temperature 100:{" "}
				{haul.hydrography_characteristics.temperature_100 || ""}
				Salinity 100:{" "}
				{haul.hydrography_characteristics.salinity_100 || ""}
				Sigma 100: {haul.hydrography_characteristics.sigma_100 || ""}
				Temperature:{" "}
				{haul.hydrography_characteristics.temperature || ""}
				Salinity: {haul.hydrography_characteristics.salinity || ""}
				Sigma: {haul.hydrography_characteristics.sigma || ""}
				Comment: {haul.hydrography_characteristics.comment || ""}
			</fieldset>
		);
	}
}

export default ViewHydrography;
