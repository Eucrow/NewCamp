import React, { Component, Fragment } from "react";

import SampledWeight from "../sampledWeight/SampledWeight";

class ComponentCategory extends Component {
	/**
	 * Category Component
	 * @param {string} props.status_catch: state of Catch component: "", "vier" or "edit".
	 * @param {object} props.this_catch: catch managed by this component
	 * @param {object} props.species: species list.
	 * @param {method} props.handleChangeGroup: managing of group field.
	 * @param {method} props.handleChangeSpecies: managing of species field.
	 * @param {method} props.handleChangeCategory: managing of category field.
	 * @param {method} props.handleChangeWeight: managing of weight field.
	 */
	constructor(props) {
		super(props);
	}

	render() {
		const sampled_weight = this.props.this_catch.sampled_weight ? this.props.this_catch.sampled_weight : null;

		let props_s = {
			sampled_weight_id: this.props.this_catch.sampled_weight_id,
			sampled_weight: sampled_weight,
			catch_id: this.props.this_catch.id,
			handleChangeSampledWeight: this.props.handleChangeSampledWeight,
			updateSampledWeight: this.props.updateSampledWeight,
			createSampledWeight: this.props.createSampledWeight,
			// handleNewSampledWeight: this.props.handleNewSampledWeight,
		};

		if (this.props.status_catch === "view" || this.props.status_catch === "") {
			return (
				<Fragment>
					<td>
						catch_id: {this.props.this_catch.id} -- {this.props.this_catch.group}{" "}
						{this.props.this_catch.sp_code}
					</td>
					<td>{this.props.this_catch.sp_name}</td>
					<td>{this.props.this_catch.category}</td>
					<td>{this.props.this_catch.weight}</td>
					<td>
						<SampledWeight
							sampled_weight_id={this.props.this_catch.sampled_weight_id}
							sampled_weight={sampled_weight}
							catch_id={this.props.this_catch.id}
							handleChangeSampledWeight={this.props.handleChangeSampledWeight}
							updateSampledWeight={this.props.updateSampledWeight}
							createSampledWeight={this.props.createSampledWeight}
						/>
					</td>
				</Fragment>
			);
		} else if (this.props.status_catch === "edit") {
			return (
				<Fragment>
					<td>
						<input type="hidden" id="haul_id" name="haul_id" value={this.props.this_catch.haul_id} />
						catch_id: {this.props.this_catch.id} --
						<input
							type="number"
							id="group"
							name="group"
							min="1"
							max="5"
							value={this.props.this_catch.group}
							onChange={this.props.handleChangeGroup(this.props.this_catch.id)}
						/>
						<select
							id="sp_code"
							name="sp_code"
							value={
								this.props.this_catch.sp_id +
								"--" +
								this.props.this_catch.sp_code +
								"--" +
								this.props.this_catch.sp_name
							}
							onChange={this.props.handleChangeSpecies(this.props.this_catch.id)}
						>
							<option>Select species...</option>
							{this.props.species.map((s) => {
								if (s.group === parseInt(this.props.this_catch.group)) {
									return (
										<option value={s.id + "--" + s.sp_code + "--" + s.sp_name}>
											{s.sp_code}-{s.sp_name}
										</option>
									);
								}
							})}
						</select>
					</td>
					<td></td>
					<td>
						<input
							type="number"
							id="category_id"
							name="category_id"
							value={this.props.this_catch.category}
							onChange={this.props.handleChangeCategory(this.props.this_catch.id)}
						/>
					</td>
					<td>
						<input
							type="number"
							id="weight"
							name="weight"
							value={this.props.this_catch.weight}
							onChange={this.props.handleChangeWeight(this.props.this_catch.id)}
						/>
					</td>
				</Fragment>
			);
		}
	}
}

export default ComponentCategory;
