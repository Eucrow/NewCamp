import React, { Component } from "react";
import LengthsButtonBar from "./LengthsButtonBar";

class LengthsForm extends Component {
	/**
	 * Component with the form of lengths.
	 * @param {number} props.lengths
	 * @param {string} props.status_lengths: must be "view", "edit".
	 * @param {string} props.handleHideLengths
	 * @param {string} props.handleDeleteLength
	 * @param {string} props.handleNumberIndividualsChange
	 * @param {string} props.handleLenghtNameChange
	 * @param {method} props.handleEditLengths
	 */

	render() {
		const lengths = this.props.lengths;

		if (this.props.status_lengths === "") {
			return null;
		}
		if (this.props.status_lengths === "view") {
			return (
				<div>
					{lengths.map((l) => {
						return (
							<div
								className="form__row form--wide"
								key={l.length}
							>
								<div className="form--cell">
									<input
										type="number"
										id="length"
										name="length"
										value={l.length}
										disabled
									/>
								</div>
								<div className="form--cell">
									<input
										type="number"
										id="number_individuals"
										name="number_individuals"
										value={l.number_individuals}
										disabled
									/>
								</div>
							</div>
						);
					})}
				</div>
			);
		} else if (this.props.status_lengths === "edit") {
			return (
				<div>
					{lengths.map((l, idx) => {
						return (
							<div className="form__row form--wide">
								<input
									type="number"
									id="length"
									name="length"
									value={l.length}
									onChange={this.props.handleLenghtNameChange(
										idx
									)}
								/>

								<input
									type="number"
									id="number_individuals"
									name="number_individuals"
									value={l.number_individuals}
									onChange={this.props.handleNumberIndividualsChange(
										idx
									)}
								></input>

								{/* <button
									type="button"
									onClick={this.props.handleDeleteLength(idx)}
								>
									Delete length{" "}
								</button> */}
							</div>
						);
					})}
				</div>
			);
		}
	}
}

export default LengthsForm;
