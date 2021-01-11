import React, { Component, Fragment } from "react";

class LengthsForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<fieldset>
					<legend>Lengths</legend>
					<table>
						<thead>
							<tr>
								<td>Length</td>
								<td>Number individuals</td>
							</tr>
						</thead>
						<tbody>
							{this.props.lengths.map((l, idx) => {
								return (
									<tr>
										<td>
											<input
												type="number"
												id="length"
												name="length"
												value={l.name_length}
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
											<button type="button" onClick={this.props.handleAddLength}>
												{" "}
												Add length{" "}
											</button>
										</td>
										<td>
											<button type="button" onClick={this.props.handleRemoveLength(idx)}>
												{" "}
												Remove length{" "}
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</fieldset>
			</Fragment>
		);
	}
}

export default LengthsForm;
