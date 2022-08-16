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
				<form>
					<div className="formLengths__row">
						<div className="formLengths__cell">Length (mm)</div>
						<div className="formLengths__cell">N. individuals</div>
					</div>
					{lengths.map((l) => {
						return (
							<div className="formLengths__row" key={l.id}>
								<div className="formLengths__cell">
									<input
										type="number"
										id="length"
										name="length"
										min="0"
										max="9999"
										value={l.length}
										disabled
									/>
								</div>
								<div className="formLengths__cell">
									<input
										type="number"
										id="number_individuals"
										name="number_individuals"
										min="0"
										max="9999"
										value={l.number_individuals}
										disabled
									/>
								</div>
							</div>
						);
					})}
				</form>
			);
		} else if (this.props.status_lengths === "edit") {
			return (
				<form>
					<div className="formLengths__row">
						<div className="formLengths__cell">Length (mm)</div>
						<div className="formLengths__cell">N. individuals</div>
					</div>
					{lengths.map((l, idx) => {
						return (
							<div className="formLengths__row" key={l.id}>
								<div className="formLengths__cell">
									<input
										type="number"
										id="length"
										name="length"
										min="0"
										max="9999"
										value={l.length}
										onChange={this.props.handleLenghtNameChange(
											idx
										)}
									/>
								</div>

								<div className="formLengths__cell">
									<input
										type="number"
										id="number_individuals"
										name="number_individuals"
										min="0"
										max="9999"
										value={l.number_individuals}
										onChange={this.props.handleNumberIndividualsChange(
											idx
										)}
									/>
								</div>

								{/* <button
									type="button"
									onClick={this.props.handleDeleteLength(idx)}
								>
									Delete length{" "}
								</button> */}
							</div>
						);
					})}
				</form>
			);
		}
	}
}

export default LengthsForm;
