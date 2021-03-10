import React, { Component } from "react";

import UiButtonAddTrawl from "./UiButtonAddTrawl";
import NewTrawl from "./NewTrawl";
import Trawl from "./Trawl";
/**
 * Component list of trawls.
 * List of all the trawls stored in database.
 */
class Trawls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trawls: [],
			add: false, // true to add new trawl; false to not to.
			edit: null, // null to not edit any trawl; trawl_id to edit that trawl_id.
		};

		this.apiTrawls = "http://127.0.0.1:8000/api/1.0/trawls/";
		this.apiTrawl = "http://127.0.0.1:8000/api/1.0/trawl/";

		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.createTrawl = this.createTrawl.bind(this);
		this.updateTrawl = this.updateTrawl.bind(this);
		this.deleteTrawl = this.deleteTrawl.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}
	/**
	 * Manage change in fields
	 * @param {event} e - Event.
	 * @param {numeric} trawl_id - Identification number of the trawl which fields are managed.
	 */
	handleChange(e, trawl_id) {
		const name = e.target.name;
		const value = e.target.value;

		e.preventDefault();
		const newTrawls = this.state.trawls.map((trawl) => {
			if (trawl.id === trawl_id) {
				var newTrawl = trawl;
				newTrawl[name] = value;
				return newTrawl;
			} else {
				return trawl;
			}
		});

		this.setState(() => {
			return {
				trawls: newTrawls,
			};
		});
	}

	/**
	 * Manage change of 'edit' state.
	 * @param {Event} e - Event.
	 * @param {(numeric|null)} status - Identification number of the trawl which fields are managed. If 'null', none is edited.
	 */
	handleEdit(status) {
		this.setState({
			edit: status,
		});
	}

	/**
	 * Manage change of 'add' state.
	 * @param {boolean} status - Identification number of the trawl which fields are managed.
	 */
	handleAdd(status) {
		this.setState(() => {
			return {
				add: status,
			};
		});
	}

	/**
	 * Create trawl in database and update the state.
	 * @param {event} e - Event
	 * @param {object} trawl - Trawl object to create.
	 */
	createTrawl(e, trawl) {
		e.preventDefault();

		fetch(this.apiTrawls, {
			method: "POST",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
			body: JSON.stringify(trawl),
		})
			.then((response) => {
				return response.json();
			})
			.then((trawl) => {
				const newTrawls = [...this.state.trawls, trawl];

				this.setState({
					trawls: newTrawls,
				});
			})
			.catch((error) => alert(error));
	}

	/**
	 * Update trawl from database and state.
	 * @param {event} e - Event.
	 * @param {numeric} trawl_id - Trawl identificator of trawl to update.
	 */
	updateTrawl(e, trawl_id) {
		e.preventDefault();
		const api = this.apiTrawl + trawl_id;

		const updatedTrawl = this.state.trawls.filter((trawl) => {
			return trawl.id === trawl_id;
		});

		fetch(api, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedTrawl[0]),
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
	 * Delete trawl from database and state.
	 * @param {event} e Event.
	 * @param {numeric} trawl_id Trawl identificator of trawl to delete.
	 */
	deleteTrawl(e, trawl_id) {
		e.preventDefault();

		const api = this.apiTrawl + trawl_id;

		fetch(api, {
			method: "DELETE",
			headers: {
				"Content-type": "Application/json",
				Accept: "Application/json",
			},
		})
			.then(() => {
				const newTrawls = this.state.trawls.filter((trawl) => trawl.id !== trawl_id);

				this.setState({
					trawls: newTrawls,
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
					<UiButtonAddTrawl handleAdd={this.handleAdd} />
					{this.state.trawls.map((trawl) => {
						return (
							<Trawl
								key={trawl.id}
								trawl={trawl}
								edit={this.state.edit}
								handleEdit={this.handleEdit}
								handleChange={this.handleChange}
								updateTrawl={this.updateTrawl}
								deleteTrawl={this.deleteTrawl}
							/>
						);
					})}
				</div>
			);
		} else if (this.state.add === true) {
			content = (
				<div>
					<NewTrawl
						handleChange={this.handleChange}
						handleAdd={this.handleAdd}
						createTrawl={this.createTrawl}
					/>
					{this.state.trawls.map((trawl) => {
						return (
							<Trawl
								key={trawl.id}
								ref={this.trawlElement}
								trawl={trawl}
								handleChange={this.handleChange}
								updateTrawl={this.updateTrawl}
								deleteTrawl={this.deleteTrawl}
							/>
						);
					})}
				</div>
			);
		}

		return content;
	}

	componentDidMount() {
		fetch(this.apiTrawls)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Sometrawl went wrong!" };
					});
				}
				return response.json();
			})
			.then((trawls) => {
				this.setState(() => {
					return { trawls };
				});
			})
			.catch((error) => console.log(error));
	}
	render() {
		return this.renderContent();
	}
}

export default Trawls;
