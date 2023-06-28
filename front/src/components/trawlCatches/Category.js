import React, { Component, Fragment } from "react";

import SampledWeight from "../sampledWeight/SampledWeight";

class ComponentCategory extends Component {
	/**
	 * Category Component
	 * @param {string} props.status_catch: state of Catch component: "", "view" or "edit".
	 * @param {object} props.this_catch: catch managed by this component
	 * @param {object} props.species: species list.
	 * @param {method} props.handleChangeGroup: managing of group field.
	 * @param {method} props.handleChangeSpecies: managing of species field.
	 * @param {method} props.handleChangeCategory: managing of category field.
	 * @param {method} props.handleChangeWeight: managing of weight field.
	 */

	constructor(props) {
		super(props);

		this.state = {
			group: "",
			sp_id: "",
			category: "",
			weight: "",
		};
	}

	renderContent = () => {
		if (this.props.status_catch === "add") {
			return (
				<form>
					<label className="form__cell">
						Group:
						<input
							value={this.state.group}
							style={{ width: 5 + "ch" }}
							type="number"
							id="group"
							name="group"
							min="1"
							max="5"
							onChange={(e) => this.setState({ group: e.target.value })}
						/>
					</label>
					<label className="form__cell">
						Species:
						<select
							style={{ width: 30 + "ch" }}
							id="sp_code"
							name="sp_code"
							onChange={(e) => this.setState({ sp_id: e.target.value })}
						>
							<option>Select species...</option>
							{this.props.species.map((s) => {
								if (s.group === parseInt(this.state.group)) {
									return (
										<option value={s.id} key={s.id}>
											{s.sp_code}-{s.sp_name}
										</option>
									);
								} else {
									return null;
								}
							})}
						</select>
					</label>
					<label className="form__cell">
						Category:
						<input
							value={this.state.category}
							style={{ width: 4 + "ch" }}
							type="number"
							id="category"
							name="category"
							min="1"
							max="99"
							onChange={(e) => this.setState({ category: e.target.value })}
						/>
					</label>
					<label className="form__cell">
						Weight(g.):
						<input
							value={this.state.weight}
							style={{ width: 8 + "ch" }}
							type="number"
							id="weight"
							name="weight"
							min="1"
							max="99999999"
							onChange={(e) => this.setState({ weight: e.target.value })}
						/>
					</label>
					<button
						className="buttonsWrapper__button"
						onClick={(e) => {
							this.props.createCatch(e, this.state);
							this.setState({
								group: "",
								sp_id: "",
								category: "",
								weight: "",
							});
						}}
					>
						Add catch
					</button>
				</form>
			);
		} else if (this.props.status_catch === "view" || this.props.status_catch === "") {
			const sampled_weight = this.props.this_catch.sampled_weight ? this.props.this_catch.sampled_weight : null;
			const sampled_weight_id = this.props.this_catch.sampled_weight_id
				? this.props.this_catch.sampled_weight_id
				: null;

			return (
				<Fragment>
					<form>
						<label className="form__cell">
							Group:
							<input
								style={{ width: 5 + "ch" }}
								type="number"
								id="group"
								name="group"
								min="1"
								max="5"
								disabled
								value={this.props.this_catch.group}
							/>
						</label>
						<label className="form__cell">
							Species:
							<select style={{ width: 30 + "ch" }} id="sp_code" name="sp_code" disabled>
								<option
									key={this.props.this_catch.sp_id}
									// value={this.props.this_catch.sp_id}
								>
									{/* {this.props.species.find((s) => s.)} */}
									{this.props.this_catch.sp_name}
								</option>
							</select>
						</label>
						<label className="form__cell">
							Category:
							<input
								style={{ width: 4 + "ch" }}
								type="number"
								id="category"
								name="category"
								min="1"
								max="99"
								disabled
								value={this.props.this_catch.category}
							/>
						</label>
						<label className="form__cell">
							Weight(g.):
							<input
								style={{ width: 8 + "ch" }}
								type="number"
								id="weight"
								name="weight"
								min="1"
								max="99000000"
								disabled
								value={this.props.this_catch.weight}
							/>
						</label>

						{/* <button
						value="Save catch"
						onClick={(e) => {
							this.props.createCatch(e, this.state);
						}}
					>
						Save catch
					</button> */}
					</form>
					<SampledWeight
						sampled_weight_id={sampled_weight_id}
						sampled_weight={sampled_weight}
						catch_id={this.props.this_catch.id}
						handleChangeSampledWeight={this.props.handleChangeSampledWeight}
						updateSampledWeight={this.props.updateSampledWeight}
						createSampledWeight={this.props.createSampledWeight}
						deleteSampledWeight={this.props.deleteSampledWeight}
					/>
				</Fragment>
			);
		} else if (this.props.status_catch === "edit") {
			return (
				<form>
					<input type="hidden" id="haul_id" name="haul_id" value={this.props.this_catch.haul_id} />
					<label className="form__cell">
						Group:
						<input
							style={{ width: 5 + "ch" }}
							type="number"
							id="group"
							name="group"
							min="1"
							max="5"
							value={this.props.this_catch.group}
							onChange={this.props.handleChangeGroup(this.props.this_catch.id)}
						/>
					</label>
					<label className="form__cell">
						Species:
						<select
							style={{ width: 30 + "ch" }}
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
										<option
											key={s.id + "--" + s.sp_code + "--" + s.sp_name}
											value={s.id + "--" + s.sp_code + "--" + s.sp_name}
										>
											{s.sp_code}-{s.sp_name}
										</option>
									);
								} else {
									return null;
								}
							})}
						</select>
					</label>
					<label className="form__cell">
						Category:
						<input
							style={{ width: 4 + "ch" }}
							type="number"
							id="category"
							name="category"
							min="1"
							max="99"
							value={this.props.this_catch.category}
							onChange={this.props.handleChangeCategory(this.props.this_catch.id)}
						/>
					</label>
					<label className="form__cell">
						Weight(g.):
						<input
							style={{ width: 8 + "ch" }}
							type="number"
							id="weight"
							name="weight"
							min="1"
							max="99999999"
							value={this.props.this_catch.weight}
							onChange={this.props.handleChangeWeight(this.props.this_catch.id)}
						/>
					</label>
				</form>
			);
		}
	};

	render() {
		return this.renderContent();
	}
}

export default ComponentCategory;
