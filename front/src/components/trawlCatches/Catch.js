import React, { Component, Fragment } from "react";

import ComponentSexes from "../sexes/SexesList.js";
import ComponentCategory from "./Category.js";

class Catch extends Component {
	/**
	 * Catch form.
	 * @param {object} props.this_catch: catch managed by this component.
	 * @param {object} props.species: species list.
	 * @param {method} props.deleteSex: delete sex of database.
	 * @param {method} props.handleChangeGroup: managing of group state and field.
	 * @param {method} props.handleChangeSpecies: managing of species state and field.
	 * @param {method} props.handleChangeCategory: managing of category state and field.
	 * @param {method} props.handleChangeWeight: managing of weight state and field.
	 * @param {method} props.updateCatch: update catch in database.
	 * @param {method} props.removeCatch: delete catch of database.
	 * @param {method} props.handleChangeSex: manage sex state.
	 * @param {method} props.handleNewSexSubmit: handle the new sex form.
	 */

	constructor(props) {
		super(props);
		this.state = {
			// status_catch: "", // State of Catch component: "", "view" or "edit".
			status_catch: this.props.status_catch || "view",
		};

		this.editCatchStatus = this.editCatchStatus.bind(this);
	}

	editCatchStatus(status) {
		this.setState({
			["status_catch"]: status,
		});
	}

	renderContent = () => {
		if (this.state.status_catch === "add") {
			// console.log(this.props);
			return (
				// <tr>
				<ComponentCategory
					status_catch={this.state.status_catch}
					species={this.props.species}
					createCatch={this.props.createCatch}
					existsCatch={this.props.existsCatch}
				/>
				// </tr>
			);
		} else if (this.state.status_catch === "view") {
			const this_catch = this.props.this_catch;
			const sexes = this_catch.sexes ? this_catch.sexes : null;

			return (
				<div className="form__row form--wide">
					<ComponentCategory
						status_catch={this.state.status_catch}
						this_catch={this.props.this_catch}
						handleChangeSampledWeight={
							this.props.handleChangeSampledWeight
						}
						updateSampledWeight={this.props.updateSampledWeight}
						createSampledWeight={this.props.createSampledWeight}
						deleteSampledWeight={this.props.deleteSampledWeight}
					/>
					<button
						onClick={() => {
							this.editCatchStatus("edit");
						}}
					>
						Edit catch
					</button>
					<button onClick={this.props.removeCatch(this_catch.id)}>
						Remove catch
					</button>
					{/* <ComponentSexes
						sexes={sexes}
						catch_id={this.props.this_catch.id}
						handleChangeSex={this.props.handleChangeSex}
						editCatchStatus={this.editCatchStatus}
						handleNewSexSubmit={this.props.handleNewSexSubmit}
						deleteSex={this.props.deleteSex}
					/> */}
				</div>
			);
		} else if (this.state.status_catch === "edit") {
			const this_catch = this.props.this_catch;

			return (
				<div className="form__row">
					<ComponentCategory
						status_catch={this.state.status_catch}
						this_catch={this.props.this_catch}
						species={this.props.species}
						handleChangeGroup={this.props.handleChangeGroup}
						handleChangeSpecies={this.props.handleChangeSpecies}
						handleChangeCategory={this.props.handleChangeCategory}
						handleChangeWeight={this.props.handleChangeWeight}
						deleteSampledWeight={this.props.deleteSampledWeight}
					/>

					<button
						onClick={() => {
							this.props.updateCatch(this_catch.id);
							this.editCatchStatus("view");
						}}
					>
						Save
					</button>
					{/* <input type="submit" value="Save catch" /> */}
				</div>
			);
		}
	};

	render() {
		// const this_catch = this.props.this_catch;
		// const sampled_weight =
		// 	this_catch.samples && this_catch.samples.sampled_weight ? this_catch.samples.sampled_weight : null;
		// const sexes = this_catch.sexes ? this_catch.sexes : null;
		// if (this.state.status_catch === "view" || this.state.status_catch === "") {
		// 	return (
		// 		<Fragment>
		// 			<tr style={{ verticalAlign: "top" }} key={this_catch.id}>
		// 				<ComponentCategory
		// 					status_catch={this.state.status_catch}
		// 					this_catch={this.props.this_catch}
		// 					handleChangeSampledWeight={this.props.handleChangeSampledWeight}
		// 					updateSampledWeight={this.props.updateSampledWeight}
		// 					createSampledWeight={this.props.createSampledWeight}
		// 				/>
		// 				<td>
		// 					<button
		// 						onClick={() => {
		// 							this.editCatchStatus("edit");
		// 						}}
		// 					>
		// 						Edit catch
		// 					</button>
		// 					<button onClick={this.props.removeCatch(this_catch.id)}>Remove catch</button>
		// 				</td>
		// 				<td>
		// 					<ComponentSexes
		// 						sexes={sexes}
		// 						catch_id={this.props.this_catch.id}
		// 						handleChangeSex={this.props.handleChangeSex}
		// 						editCatchStatus={this.editCatchStatus}
		// 						handleNewSexSubmit={this.props.handleNewSexSubmit}
		// 						deleteSex={this.props.deleteSex}
		// 					/>
		// 				</td>
		// 			</tr>
		// 		</Fragment>
		// 	);
		// } else if (this.state.status_catch === "edit") {
		// 	return (
		// 		<Fragment>
		// 			<tr style={{ verticalAlign: "top" }} key={this_catch.id}>
		// 				<ComponentCategory
		// 					status_catch={this.state.status_catch}
		// 					this_catch={this.props.this_catch}
		// 					species={this.props.species}
		// 					handleChangeGroup={this.props.handleChangeGroup}
		// 					handleChangeSpecies={this.props.handleChangeSpecies}
		// 					handleChangeCategory={this.props.handleChangeCategory}
		// 					handleChangeWeight={this.props.handleChangeWeight}
		// 				/>
		// 				<td>
		// 					<button
		// 						onClick={() => {
		// 							this.props.updateCatch(this_catch.id);
		// 							this.editCatchStatus("view");
		// 						}}
		// 					>
		// 						Save
		// 					</button>
		// 					<input type="submit" value="Save catch" />
		// 				</td>
		// 			</tr>
		// 		</Fragment>
		// 	);
		// }
		return this.renderContent();
	}
}

export default Catch;
