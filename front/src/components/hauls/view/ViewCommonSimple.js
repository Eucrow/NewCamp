import React, { Component, Fragment } from "react";

class ViewCommonSimple extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 */

	render() {
		return (
			<Fragment>
				<label className="form__cell">
					Haul:
					<input
						type="number"
						name="haul"
						id="haul"
						disabled
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={this.props.haul.haul}
					/>
					{console.log(this.props.haul)}
				</label>

				<label className="form__cell">
					Sampler:
					<input
						id="sampler_id"
						name="sampler"
						className="select__normalWidth"
						disabled
						value={this.props.haul.sampler.sampler}
					/>
				</label>

				<label className="form__cell">
					Valid:
					<input
						type="checkbox"
						name="valid"
						id="valid"
						disabled
						defaultChecked={this.props.haul.valid}
					/>
				</label>
			</Fragment>
		);
	}
}

export default ViewCommonSimple;
