import React, { Component } from "react";

import UiButtonAddGear from "./UiButtonAddGear";
import NewGear from "./NewGear";
import Gear from "./Gear";
/**
 * Component list of gears.
 * List of all the gears stored in database.
 */
class Gears extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gears: [],
			add: false, // true to add new gear; false to not to.
			edit: null, // null to not edit any gear; gear_id to edit that gear_id.
		};

		this.apiGears = "http://127.0.0.1:8000/api/1.0/gears/";
		this.apiGear = "http://127.0.0.1:8000/api/1.0/gear/";

		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createGear = this.createGear.bind(this);
		this.updateGear = this.updateGear.bind(this);
		this.deleteGear = this.deleteGear.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}
	/**
	 * Manage change in fields
	 * @param {event} e - Event.
	 * @param {numeric} gear_id - Identification number of the gear which fields are managed.
	 */
	handleChange(e, gear_id) {
		const name = e.target.name;
		const value = e.target.value;

		e.preventDefault();
		const newGears = this.state.gears.map((gear) => {
			if (gear.id === gear_id) {
				var newGear = gear;
				newGear[name] = value;
				return newGear;
			} else {
				return gear;
			}
		});

		this.setState(() => {
			return {
				gears: newGears,
			};
		});
	}

	/**
	 * Manage change of 'edit' state.
	 * @param {Event} e - Event.
	 * @param {(numeric|null)} status - Identification number of the gear which fields are managed. If 'null', none is edited.
	 */
	handleEdit(status) {
		this.setState({
			edit: status,
		});
	}

	/**
	 * Manage change of 'add' state.
	 * @param {boolean} status - Identification number of the gear which fields are managed.
	 */
	handleAdd(status) {
		this.setState(() => {
			return {
				add: status,
			};
		});
	}

	/**
	 * Create gear in database and update the state.
	 * @param {event} e - Event
	 * @param {object} gear - Gear object to create.
	 */
	createGear(e, gear) {
		e.preventDefault();

		fetch(this.apiGears, {
			method: "POST",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
			body: JSON.stringify(gear),
		})
			.then((response) => {
				return response.json();
			})
			.then((gear) => {
				const newGears = [...this.state.gears, gear];

				this.setState({
					gears: newGears,
				});
			})
			.catch((error) => alert(error));
	}

	/**
	 * Update gear from database and state.
	 * @param {event} e - Event.
	 * @param {numeric} gear_id - Gear identificator of gear to update.
	 */
	updateGear(e, gear_id) {
		e.preventDefault();
		const api = this.apiGear + gear_id;

		const updatedGear = this.state.gears.filter((gear) => {
			return gear.id === gear_id;
		});

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedGear[0]),
		})
			.then((response) => {
				if (response.status == 200) {
					this.handleEdit(null);
				} else {
					alert("Something is wrong.");
				}
			})
			.catch((error) => console.log(error));
	}

	/**
	 * Delete gear from database and state.
	 * @param {event} e Event.
	 * @param {numeric} gear_id Gear identificator of gear to delete.
	 */
	deleteGear(e, gear_id) {
		e.preventDefault();

		const api = this.apiGear + gear_id;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
		})
			.then(() => {
				const newGears = this.state.gears.filter((gear) => gear.id !== gear_id);

				this.setState({
					gears: newGears,
				});
			})
			.catch((error) => alert(error));
	}

	/**
	 * Create content to render.
	 * @private
	 */
	renderContent() {
		let content = "";

		if (this.state.add === false) {
			content = (
				<div>
					<UiButtonAddGear handleAdd={this.handleAdd} />
					{this.state.gears.map((gear) => {
						return (
							<Gear
								key={gear.id}
								gear={gear}
								edit={this.state.edit}
								handleEdit={this.handleEdit}
								handleChange={this.handleChange}
								updateGear={this.updateGear}
								deleteGear={this.deleteGear}
							/>
						);
					})}
				</div>
			);
		} else if (this.state.add === true) {
			content = (
				<div>
					<NewGear handleChange={this.handleChange} handleAdd={this.handleAdd} createGear={this.createGear} />
					{this.state.gears.map((gear) => {
						return (
							<Gear
								key={gear.id}
								ref={this.gearElement}
								gear={gear}
								handleChange={this.handleChange}
								updateGear={this.updateGear}
								deleteGear={this.deleteGear}
							/>
						);
					})}
				</div>
			);
		}

		return content;
	}

	componentDidMount() {
		fetch(this.apiGears)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Somegear went wrong!" };
					});
				}
				return response.json();
			})
			.then((gears) => {
				this.setState(() => {
					return { gears };
				});
			})
			.catch((error) => console.log(error));
	}
	render() {
		return this.renderContent();
	}
}

export default Gears;
