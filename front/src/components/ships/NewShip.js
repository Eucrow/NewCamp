import React, { Component } from "react";

import ShipsContext from "../../contexts/ShipsContext";

import UiButtonSaveNewShip from "./UiButtonSaveNewShip";
import UiButtonCancel from "../ui/UiButtonCancel";

/**
 * Ship component
 * @param {object} props.ship: ship object
 */
class NewShip extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ship: [],
		};
		this.handleChange = this.handleChange.bind(this);
	}

	static contextType = ShipsContext;

	/**
	 * Manage fields change in 'ship' state.
	 * @param {event} e - Event.
	 */
	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			ship: {
				...this.state.ship,
				[name]: value,
			},
		});
	}

	renderContent() {
		var content = "";

		if (this.props.add === true) {
			content = (
				<form
					className="wrapper"
					onSubmit={(e) => {
						this.context.createShip(e, this.state.ship);
						this.context.handleAdd(false);
					}}
				>
					<div className="form__row">
						<span className="field">
							<label htmlFor="name">Name:</label>
							<input
								type="text"
								id="name"
								name="name"
								className="survey_description"
								required
								size={30}
								autoFocus
								onChange={this.handleChange}
							/>
						</span>
					</div>
					<div className="form__row">
						<span className="field">
							<label htmlFor="datras_id">DATRAS code:</label>
							<input
								type="text"
								id="datras_id"
								name="datras_id"
								size={4}
								pattern="^[\w|\d]{2,4}$"
								onChange={this.handleChange}
							/>
						</span>
						<span className="field">
							<label htmlFor="length">Length (m):</label>
							<input
								type="number"
								id="length"
								name="length"
								min={0}
								max={999}
								size={5}
								step={0.01}
								onChange={this.handleChange}
								onKeyDown={this.context.preventNegativeE}
							/>
						</span>
						<span className="field">
							<label htmlFor="beam">Beam (m):</label>
							<input
								type="number"
								id="beam"
								name="beam"
								min={0}
								max={99}
								size={4}
								step={0.01}
								onChange={this.handleChange}
								onKeyDown={this.context.preventNegativeE}
							/>
						</span>
						<span className="field">
							<label htmlFor="main_power">Main Power (kW):</label>
							<input
								type="number"
								id="main_power"
								name="main_power"
								min={0}
								max={9999}
								size={4}
								onChange={this.handleChange}
								onKeyDown={this.context.preventNegativeE}
							/>
						</span>
						<span className="field">
							<label htmlFor="year_built">Year built:</label>
							<input
								type="number"
								id="year_built"
								name="year_built"
								min={1900}
								max={9999}
								size={4}
								onChange={this.handleChange}
								onKeyDown={this.context.preventNegativeE}
							/>
						</span>
					</div>
					<div className="form__row">
						<span className="field__comment">
							<label htmlFor="comment">Comment:</label>
							<textarea
								id="comment"
								name="comment"
								className="comment"
								size={500}
								onChange={this.handleChange}
							></textarea>
						</span>
					</div>
					<div className="form__row">
						<div className="survey__cell survey__cell--right buttonsWrapper">
							<UiButtonSaveNewShip />
							<UiButtonCancel
								handleMethod={this.context.handleAdd}
							/>
						</div>
					</div>
				</form>
				// <form
				// 	onSubmit={(e) => {
				// 		this.props.createShip(e, this.state.ship);
				// 		this.props.handleAdd(false);
				// 	}}
				// >
				// 	<div>
				// 		<label htmlFor="name">Name:</label>
				// 		<input
				// 			type="text"
				// 			id="name"
				// 			name="name"
				// 			onChange={(e) => this.handleChange(e)}
				// 		/>
				// 		<label htmlFor="datras_id">DATRAS code:</label>
				// 		<input
				// 			type="text"
				// 			id="datras_id"
				// 			name="datras_id"
				// 			onChange={(e) => this.handleChange(e)}
				// 		/>
				// 		<label htmlFor="length">Length:</label>
				// 		<input
				// 			type="text"
				// 			id="length"
				// 			name="length"
				// 			onChange={(e) => this.handleChange(e)}
				// 		/>
				// 		<label htmlFor="main_power">Main Power:</label>
				// 		<input
				// 			type="text"
				// 			id="main_power"
				// 			name="main_power"
				// 			onChange={(e) => this.handleChange(e)}
				// 		/>
				// 		<label htmlFor="year_built">Year built:</label>
				// 		<input
				// 			type="text"
				// 			id="year_built"
				// 			name="year_built"
				// 			onChange={(e) => this.handleChange(e)}
				// 		/>
				// 		<input type="submit" value="Save" />
				// 	</div>
				// </form>
			);
		}

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewShip;
