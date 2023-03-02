import React, { Component, Fragment } from "react";

import Sex from "./Sex";
import SexesButtonBar from "./SexesButtonBar";

class Sexes extends Component {
	/**
	 * @param {object} props.sexes: sexes of the catch.
	 * @param {number} props.catch_id: id of the catch.
	 * @param {number} props.unit: measure unit of the species.
	 * @param {number} props.increment: measure increment of the species.
	 * @param {method} props.deleteSex: delete sex of database.
	 * @param {method} props.handleChangeSex:
	 * @param {method} props.addSex
	 */

	constructor(props) {
		super(props);
		this.state = {
			add_sex_status: false, //Manage if the button 'Add sex' is showed.
		};

		this.handleAddSexStatus = this.handleAddSexStatus.bind(this);
	}

	/**
	 * Manage if the button 'Add sex' is showed.
	 * @param {boolean} status
	 */
	handleAddSexStatus(status) {
		this.setState({
			add_sex_status: status,
		});
	}

	render() {
		const sexes = this.props.sexes ? this.props.sexes : [];

		return (
			<Fragment>
				{sexes.map((s) => {
					return (
						<Sex
							key={s.id}
							sex_id={s.id}
							sex={s.sex}
							catch_id={this.props.catch_id}
							unit={this.props.unit}
							increment={this.props.increment}
							handleChangeSex={this.props.handleChangeSex}
							deleteSex={this.props.deleteSex}
						/>
					);
				})}

				{this.state.add_sex_status === true ? (
					<Sex
						catch_id={this.props.catch_id}
						sex_status={"add"}
						handleChangeSex={this.props.handleChangeSex}
						addSex={this.props.addSex}
						handleAddSexStatus={this.handleAddSexStatus}
					/>
				) : (
					<SexesButtonBar
						add_sex_status={"view"}
						handleAddSexStatus={this.handleAddSexStatus}
					/>
				)}
			</Fragment>
		);
	}
}

export default Sexes;
