import React, { Component, Fragment } from "react";

class ViewCommonDetail extends Component {
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
						className="input__noSpinner"
						disabled
						min="1"
						max="99"
						maxLength="2"
						size={2}
						value={this.props.haul.haul}
					/>
				</label>

				<label className="form__cell">
					Stratum:
					<select
						id="stratum_id"
						name="stratum"
						className="select__largeWidth"
						disabled
					>
						<option
							key={this.props.haul.stratum.id}
							value={this.props.haul.stratum.id}
						>
							{this.props.haul.stratum.stratum}
						</option>
					</select>
				</label>

				<label className="form__cell">
					Sampler:
					<select
						id="sampler_id"
						name="sampler"
						className="select__normalWidth"
						disabled
					>
						<option
							key={this.props.haul.sampler.id}
							value={this.props.haul.sampler.id}
						>
							{this.props.haul.sampler.sampler}
						</option>
					</select>
				</label>

				<label className="form__cell">
					Gear:
					<select id="gear_id" name="gear" disabled>
						<option
							key={this.props.haul.gear}
							value={this.props.haul.gear}
						>
							{this.props.haul.gear}
						</option>
					</select>
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

			// <Fragment>
			// 	<div className="form__cell">
			// 		<label htmlFor="haul">Haul:</label>
			// 		<input
			// 			type="number"
			// 			name="haul"
			// 			id="haul"
			// 			disabled
			// 			min="1"
			// 			max="99"
			// 			maxLength="2"
			// 			size={2}
			// 			value={this.props.haul.haul || ""}
			// 		/>
			// 	</div>

			// 	<div className="form__cell">
			// 		<label htmlFor="sampler">Sampler:</label>
			// 		<input
			// 			name="sampler"
			// 			id="sampler"
			// 			disabled
			// 			value={this.props.haul.sampler.sampler}
			// 		/>
			// 	</div>

			// 	<div className="form__cell">
			// 		<label htmlFor="valid">Valid:</label>
			// 		<input
			// 			type="checkbox"
			// 			name="valid"
			// 			id="valid"
			// 			disabled
			// 			defaultChecked={this.props.haul.valid}
			// 		/>
			// 	</div>
			// </Fragment>
		);
	}
}

export default ViewCommonDetail;
