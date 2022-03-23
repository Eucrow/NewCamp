import React, { Component, Fragment } from "react";

class ViewCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 */

	render() {
		return (
			<Fragment>
				<div className="haul__cell">
					<label htmlFor="haul">Haul:</label>
					<input
						type="number"
						name="haul"
						id="haul"
						disabled
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={this.props.haul.haul || ""}
					/>
				</div>

				<div className="haul__cell">
					<label htmlFor="sampler">Sampler:</label>
					<input
						name="sampler"
						id="sampler"
						disabled
						value={this.props.haul.sampler.sampler}
					/>
				</div>

				<div className="haul__cell">
					<label htmlFor="valid">Valid:</label>
					<input
						type="checkbox"
						name="valid"
						id="valid"
						disabled
						defaultChecked={this.props.haul.valid}
					/>
				</div>
			</Fragment>
		);
	}
}

export default ViewCommon;
