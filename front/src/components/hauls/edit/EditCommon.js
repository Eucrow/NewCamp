import React, { Component, Fragment } from "react";

class EditCommon extends Component {
	/**
	 * Component of the common part of the haul form.
	 * @param {object} props.haul
	 * @param {object} props.gears
	 * @param {function} props.handleChangeCommon
	 * @param {function} props.handleChangeCommonValid
	 */

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		samplers: [],
	// 	};

	// 	this.apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";
	// }

	// When the component is rendered, get the samplers data to modify the field
	// TODO: remove it:
	// componentDidMount() {
	// 	fetch(this.apiSamplers)
	// 		.then((response) => {
	// 			if (response.status > 400) {
	// 				return this.setState(() => {
	// 					return { placeholder: "Something went wrong!" };
	// 				});
	// 			}
	// 			return response.json();
	// 		})
	// 		.then((samplers) => {
	// 			this.setState(() => {
	// 				return {
	// 					samplers: samplers,
	// 				};
	// 			});
	// 		});
	// }

	render() {
		const haul = this.props.haul;

		return (
			<Fragment>
				<div className="form__cell">
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

				<div className="form__cell">
					<label htmlFor="sampler">Sampler:</label>
					<input
						name="sampler"
						id="sampler"
						disabled
						value={haul.sampler.sampler}
					/>
				</div>

				{/* TODO: station and gear can't be changed here becasue they are foreing keys*/}
				{/* <div className="form__cell">
					<label htmlFor="sampler">Sampler:</label>
					<select
						name="sampler"
						id="sampler"
						value={haul.sampler.sampler}
						onChange={this.props.handleChangeCommon}
					>
						{this.state.samplers.map((sampler) => {
							return (
								<option key={sampler.id} value={sampler.id}>
									{sampler.sampler}
								</option>
							);
						})}
					</select>
				</div> */}

				{/* <div className="form__cell">
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

				<div className="form__cell">
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
