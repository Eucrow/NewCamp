import React, { Component, Fragment } from "react";

class EditCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 * @param {object} props.gears
	 * @param {function} props.handleChangeCommon
	 * @param {function} props.handleChangeCommonValid
	 */

	render() {
		const haul = this.props.haul;

		return (
			<Fragment>
				<div className="haul__cell">
					<label htmlFor="haul">Haul:</label>
					<input
						type="number"
						name="haul"
						id="haul"
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={haul.haul || ""}
						onChange={this.props.handleChangeCommon}
					/>
				</div>

				{/* TODO: station and sampler can't be changed here becasue they are foreing keys*/}

				<div className="haul__cell">
					<label htmlFor="sampler">Sampler:</label>
					{haul.sampler.sampler}
				</div>

				{/* <div className="haul__cell">
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
				</div> */}

				<div className="haul__cell">
					<label htmlFor="valid">Valid:</label>
					<input
						type="checkbox"
						name="valid"
						id="valid"
						defaultChecked={haul.valid}
						onChange={this.props.handleChangeCommonValid}
					/>
				</div>
			</Fragment>
		);
	}
}

export default EditCommon;
