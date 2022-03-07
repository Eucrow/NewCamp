import React, { Component } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import SpButtonBar from "./SpButtonBar";

class NewSp extends Component {
	static contextType = SpeciesContext;

	constructor(props) {
		super(props);
		this.state = {
			sp: {},
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			sp: {
				...this.state.sp,
				[name]: value,
			},
		});
	}

	handleChangeGroupSpCode(e) {
		let freeSpCode = this.context.getEmptySpCode(Number(e.target.value));

		this.handleChange(e);
		this.setState({
			sp: {
				...this.state.sp,
				[e.target.name]: e.target.value,
				sp_code: freeSpCode,
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
						this.context.createSp(e, this.state.sp);
						this.context.handleAdd(false);
					}}
				>
					<div className="form__row">
						<span className="field">
							<label htmlFor="group">Group:</label>
							<select
								name="group"
								id="group"
								required
								autoFocus
								onChange={(e) => {
									this.handleChangeGroupSpCode(e);
								}}
							>
								<option value="" selected></option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
							</select>
						</span>
						<span className="field">
							<label htmlFor="sp_code">Species code:</label>
							<input
								type="text"
								id="sp_code"
								name="sp_code"
								disabled
								size={3}
								value={this.state.sp.sp_code || null}
							/>
							(species code will be generated automatically)
						</span>
					</div>
					<div className="form__row">
						<span className="field">
							<label htmlFor="haul">Name:</label>
							<input
								type="text"
								id="sp_name"
								name="sp_name"
								onChange={(e) => this.handleChange(e)}
							/>
						</span>

						<span className="field">
							<label htmlFor="haul">Spanish name:</label>
							<input
								type="text"
								id="spanish_name"
								name="spanish_name"
								onChange={(e) => this.handleChange(e)}
							/>
						</span>
						<span className="field">
							<label htmlFor="haul">AphiaID:</label>
							<input
								type="text"
								id="APHIA"
								name="APHIA"
								onChange={(e) => this.handleChange(e)}
							/>
						</span>
					</div>
					<fieldset className="wrapper ">
						<legend>Params</legend>

						<span className="field">
							<label htmlFor="haul">a param:</label>
							<input
								type="text"
								id="a_param"
								name="a_param"
								onChange={(e) => this.handleChange(e)}
							/>
						</span>
						<span className="field">
							<label htmlFor="haul">b param:</label>
							<input
								type="text"
								id="b_param"
								name="b_param"
								onChange={(e) => this.handleChange(e)}
							/>
						</span>
					</fieldset>
					<fieldset className="wrapper">
						<legend>Measurement</legend>
						<span className="field">
							<label htmlFor="haul">Measure unit:</label>
							<input
								type="text"
								id="unit"
								name="unit"
								onChange={(e) => this.handleChange(e)}
							/>
						</span>

						<span className="field">
							<label htmlFor="haul">Increment:</label>
							<input
								type="text"
								id="increment"
								name="increment"
								onChange={(e) => this.handleChange(e)}
							/>
						</span>
					</fieldset>
					<div className="form__row">
						<SpButtonBar
							edit={this.props.edit}
							add={this.props.add}
							changeDetail={this.props.changeDetail}
							changeEdit={this.props.changeEdit}
							changeAdd={this.props.changeAdd}
						/>
					</div>
				</form>
			);
		}
		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewSp;
