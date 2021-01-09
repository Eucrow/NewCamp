import React, { Component, Fragment } from "react";

import ComponentsLengths from "../lengths/Lengths";
import ComponentSex from "./sex";

class ComponentSexes extends Component {
	/**
	 * por aquí
	 * @param {object} props.sexes: sexes of the catch.
	 * @param {number} props.catch_id: id of the catch.
	 * @param {method} props.removeSex: remove sex of database.
	 * @param {method} props.handleChangeSex:
	 * @param {method} props.handleNewSexSubmit
	 */

	constructor(props) {
		super(props);
		this.state = {
			showAddSexForm: false, //Manage if the button 'Add sex' is showed.
		};

		this.handleAddSexButton = this.handleAddSexButton.bind(this);
	}

	handleAddSexButton(status) {
		/**
		 * Manage if the button 'Add sex' is showed.
		 */
		this.setState({
			showAddSexForm: status,
		});
	}

	render() {
		const sexes = this.props.sexes ? this.props.sexes : [];

		return (
			<Fragment>
				{sexes.map((s) => {
					return (
						<ComponentSex
							key={s.id}
							sex_id={s.id}
							sex={s.sex}
							catch_id={this.props.catch_id}
							handleChangeSex={this.props.handleChangeSex}
							removeSex={this.props.removeSex}
						/>
					);
				})}

				{this.state.showAddSexForm === true ? (
					<ComponentSex
						catch_id={this.props.catch_id}
						status_sex={"add"}
						handleChangeSex={this.props.handleChangeSex}
						handleNewSexSubmit={this.props.handleNewSexSubmit}
						handleAddSexButton={this.handleAddSexButton}
					/>
				) : (
					<button
						onClick={() => {
							this.handleAddSexButton(true);
						}}
					>
						Add sex
					</button>
				)}
			</Fragment>
		);
	}
}

export default ComponentSexes;
