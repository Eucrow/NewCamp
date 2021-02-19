import React, { Component } from "react";

import UiButtonAddShip from "./UiButtonAddShip";
import NewShip from "./NewShip";
import Ship from "./Ship";

class Ships extends Component {
	/**
	 * List of Ships
	 */

	constructor(props) {
		super(props);
		this.state = {
			ships: [],
			add: false, // true to add new ship; false to not to.
			edit: null, // null to not edit any ship; ship_id to edit that ship_id.
		};

		this.apiShips = "http://127.0.0.1:8000/api/1.0/ships/";
		this.apiShip = "http://127.0.0.1:8000/api/1.0/ship/";

		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createShip = this.createShip.bind(this);
		this.updateShip = this.updateShip.bind(this);
		this.deleteShip = this.deleteShip.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	handleChange(e, ship_id) {
		const name = e.target.name;
		const value = e.target.value;

		e.preventDefault();
		const newShips = this.state.ships.map((ship) => {
			if (ship.id === ship_id) {
				var newShip = ship;
				newShip[name] = value;
				return newShip;
			} else {
				return ship;
			}
		});

		this.setState(() => {
			return {
				ships: newShips,
			};
		});
	}

	handleEdit(edit) {
		this.setState({
			edit: edit,
		});
	}

	handleAdd(status) {
		this.setState(() => {
			return {
				add: status,
			};
		});
	}

	createShip(e, ship) {
		e.preventDefault();

		fetch(this.apiShips, {
			method: "POST",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
			body: JSON.stringify(ship),
		})
			.then((response) => {
				return response.json();
			})
			.then((ship) => {
				const newShips = [...this.state.ships, ship];

				this.setState({
					ships: newShips,
				});
			})
			.catch((error) => alert(error));
	}

	updateShip(e, ship_id) {
		e.preventDefault();
		const api = this.apiShip + ship_id;

		const updatedShip = this.state.ships.filter((ship) => {
			return ship.id === ship_id;
		});

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedShip[0]),
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

	deleteShip(e, ship_id) {
		e.preventDefault();

		const api = this.apiShip + ship_id;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
		})
			.then(() => {
				const newShips = this.state.ships.filter((ship) => ship.id !== ship_id);

				this.setState({
					ships: newShips,
				});
			})
			.catch((error) => alert(error));
	}

	renderContent() {
		let content = "";

		if (this.state.add === false) {
			content = (
				<div>
					<UiButtonAddShip handleAdd={this.handleAdd} />
					{this.state.ships.map((ship) => {
						return (
							<Ship
								key={ship.id}
								ship={ship}
								edit={this.state.edit}
								handleEdit={this.handleEdit}
								handleChange={this.handleChange}
								updateShip={this.updateShip}
								deleteShip={this.deleteShip}
							/>
						);
					})}
				</div>
			);
		} else if (this.state.add === true) {
			content = (
				<div>
					<NewShip handleChange={this.handleChange} handleAdd={this.handleAdd} createShip={this.createShip} />
					{this.state.ships.map((ship) => {
						return (
							<Ship
								key={ship.id}
								ref={this.shipElement}
								ship={ship}
								handleChange={this.handleChange}
								updateShip={this.updateShip}
								deleteShip={this.deleteShip}
							/>
						);
					})}
				</div>
			);
		}

		return content;
	}

	componentDidMount() {
		fetch(this.apiShips)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((ships) => {
				this.setState(() => {
					return { ships };
				});
			})
			.catch((error) => console.log(error));
	}
	render() {
		return this.renderContent();
	}
}

export default Ships;
