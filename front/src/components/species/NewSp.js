import React, { Component } from "react";

class NewSp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sp: {},
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			sp: {
				...this.state.sp,
				[name]: value,
			},
		});
	}

	render() {
		const sp = this.props.sp;
		return (
			<form
				onSubmit={(e) => {
					this.props.createSp(e, this.state.sp);
					this.props.handleAdd(false);
				}}
			>
				<label htmlFor="group">- group:</label>
				<input type="number" id="group" name="group" min="1" max="5" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">sp_name:</label>
				<input type="text" id="sp_name" name="sp_name" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">spanish_name:</label>
				<input type="text" id="spanish_name" name="spanish_name" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">a_param:</label>
				<input type="text" id="a_param" name="a_param" onChange={(e) => this.handleChange(e)} /> -
				<label htmlFor="haul">b_param:</label>
				<input type="text" id="b_param" name="b_param" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">l_infinity:</label>
				<input type="text" id="l_infinity" name="l_infinity" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">k:</label>
				<input type="text" id="k" name="k" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">t_zero:</label>
				<input type="text" id="t_zero" name="t_zero" onChange={(e) => this.handleChange(e)} /> -
				<label htmlFor="haul">unit:</label>
				<input type="text" id="unit" name="unit" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">increment:</label>
				<input type="text" id="increment" name="increment" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">trophic_group:</label>
				<input
					type="text"
					id="trophic_group"
					name="trophic_group"
					onChange={(e) => this.handleChange(e)}
				/>- <label htmlFor="haul">APHIA:</label>
				<input type="text" id="APHIA" name="APHIA" onChange={(e) => this.handleChange(e)} />-
				<label htmlFor="haul">comment:</label>
				<input type="text" id="comment" name="comment" onChange={(e) => this.handleChange(e)} />
				<input type="submit" value="Save" />
			</form>
		);
	}
}

export default NewSp;
