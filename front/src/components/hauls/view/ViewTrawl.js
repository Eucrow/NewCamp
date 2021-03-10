import React, { Component } from "react";

class ComponentsHaulTrawl extends Component {
	/**
	 * Component of trawl form of haul.
	 * @param {object} props.haul
	 */

	render() {
		const haul = this.props.haul;
		return (
			<fieldset>
				<legend>Trawl characteristics</legend>
				Shooting_date_time:{" "}
				{haul.trawl_characteristics.shooting_date_time || ""}
				Shooting_latitude:{" "}
				{haul.trawl_characteristics.shooting_latitude || ""}
				Shooting_longitude:{" "}
				{haul.trawl_characteristics.shooting_longitude || ""}
				Shooting_depth:{" "}
				{haul.trawl_characteristics.shooting_depth || ""}
				Hauling_date_time:{" "}
				{haul.trawl_characteristics.hauling_date_time || ""}
				Hauling_latitude:{" "}
				{haul.trawl_characteristics.hauling_latitude || ""}
				Hauling_longitude:{" "}
				{haul.trawl_characteristics.hauling_longitude || ""}
				Hauling_depth: {haul.trawl_characteristics.hauling_depth || ""}
				Bottom_date_time:{" "}
				{haul.trawl_characteristics.bottom_date_time || ""}
				Bottom_latitude:{" "}
				{haul.trawl_characteristics.bottom_latitude || ""}
				Bottom_longitude:{" "}
				{haul.trawl_characteristics.bottom_longitude || ""}
				Bottom_depth: {haul.trawl_characteristics.bottom_depth || ""}
				Course: {haul.trawl_characteristics.course || ""}
				Velocity: {haul.trawl_characteristics.velocity || ""}
				Cable: {haul.trawl_characteristics.cable || ""}
				Sweep: {haul.trawl_characteristics.sweep || ""}
				Otter_boards_distance:{" "}
				{haul.trawl_characteristics.otter_boards_distance || ""}
				Horizontal_aperture:{" "}
				{haul.trawl_characteristics.horizontal_aperture || ""}
				Vertical_aperture:{" "}
				{haul.trawl_characteristics.vertical_aperture || ""}
				Grid: {haul.trawl_characteristics.grid || ""}
				Track: {haul.trawl_characteristics.track || ""}
				Comment: {haul.trawl_characteristics.comment || ""}
			</fieldset>
		);
	}
}

export default ComponentsHaulTrawl;
