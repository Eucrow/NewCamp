import React, { Component } from "react";

class EditCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {number} props.haul
	 * @param {function} props.handleChangeCommon
	 * @param {function} props.handleChangeCommonValid
	 */

	render() {
		const haul = this.props.haul;

		return (
			<div key={haul.id}>
				<label htmlFor="haul">Haul:</label>
				<input
					type="text"
					name="haul"
					id="haul"
					value={haul.haul || ""}
					onChange={this.props.handleChangeCommon}
				/>

				{/* TODO: station and sampler can't be changed here becasue they are foreing keys*/}
				<label htmlFor="station">Station:</label>
				{haul.station.station}
				<label htmlFor="sampler">sampler:</label>
				{haul.sampler.sampler}
				<label htmlFor="gear">Gear:</label>
				<select
					id="gear"
					name="gear"
					value={haul.gear || "choose"}
					onChange={this.props.handleChangeCommon}
				>
					{this.props.gears.map((gear) => {
						return (
							<option key={gear} value={gear.name}>
								{gear.name}
							</option>
						);
					})}
				</select>

				<label htmlFor="valid">Valid:</label>
				<input
					type="checkbox"
					name="valid"
					id="valid"
					defaultChecked={haul.valid}
					onChange={this.props.handleChangeCommonValid}
				/>
			</div>
		);
	}
}

export default EditCommon;
