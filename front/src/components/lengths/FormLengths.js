import React, { Component, Fragment } from "react";

class ComponentsFormLengths extends Component {
	/**
	 * Component with the form of lengths.
	 * @param {number} props.lengths
	 * @param {string} props.status_lengths: must be "view", "edit".
	 * @param {string} props.handleHideLengths
	 * @param {string} props.handleRemoveLength
	 * @param {string} props.handleNumberIndividualsChange
	 * @param {string} props.handleLenghtNameChange
	 * @param {method} props.removeLength
	 * @param {method} props.handleEditLengths
	 */

	render() {
		const lengths = this.props.lengths;

		if (this.props.status_lengths === "") {
			return null;
		}
		if (this.props.status_lengths === "view") {
			return (
				<Fragment>
					<ul>
						{lengths.map((l) => {
							return (
								<li key={l.length}>
									{l.length} : {l.number_individuals}
								</li>
							);
						})}
					</ul>
					<button onClick={this.props.handleEditLengths}>Edit lengths</button>
					<button onClick={this.props.handleHideLengths}>Hide lengths</button>
				</Fragment>
			);
		} else if (this.props.status_lengths === "edit") {
			return (
				<Fragment>
					<ul>
						{lengths.map((l, idx) => {
							return (
								<table>
									<tbody>
										<tr>
											<td>
												<input
													type="number"
													id="length"
													name="length"
													value={l.length}
													onChange={this.props.handleLenghtNameChange(idx)}
												/>
											</td>
											<td>
												<input
													type="number"
													id="number_individuals"
													name="number_individuals"
													value={l.number_individuals}
													onChange={this.props.handleNumberIndividualsChange(idx)}
												></input>
											</td>
											<td>
												<button type="button" onClick={this.props.handleRemoveLength(idx)}>
													{" "}
													Remove length{" "}
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							);
						})}
					</ul>
				</Fragment>
			);
		}
	}
}

export default ComponentsFormLengths;
