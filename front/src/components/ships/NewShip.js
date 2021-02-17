import React, { Component } from "react";

class NewShip extends Component {
	/**
	 * Ship component
	 * @param {object} props.ship: ship object
	 * @param {method} props.handleAdd:
	 * @param {method} props.handleChange:
	 * @param {method} props.createShip:
	 */

	constructor(props) {
		super(props);

		this.state = {
			ship: [],
		};
	}

	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			ship: {
				...this.state.ship,
				[name]: value,
			},
		});

		this.handleChange = this.handleChange.bind(this);
	}

	renderContent() {
		var content = "";

		content = (
			<form
				onSubmit={(e) => {
					this.props.createShip(e, this.state.ship);
					this.props.handleAdd(false);
				}}
			>
				<div>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="datras_id">DATRAS code:</label>
					<input type="text" id="datras_id" name="datras_id" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="length">Length:</label>
					<input type="text" id="length" name="length" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="main_power">Main Power:</label>
					<input type="text" id="main_power" name="main_power" onChange={(e) => this.handleChange(e)} />
					<label htmlFor="year_built">Year built:</label>
					<input type="text" id="year_built" name="year_built" onChange={(e) => this.handleChange(e)} />
					<input type="submit" value="Save" />
				</div>
			</form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewShip;
