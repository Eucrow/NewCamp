import React, { Component } from "react";

import SpeciesContext from "../../contexts/SpeciesContext";

import SpButtonBar from "./SpButtonBar";

/**
 * NewSp form.
 */

class NewSpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sp: {},
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeGroupSpCode = this.handleChangeGroupSpCode.bind(this);
	}

	static contextType = SpeciesContext;

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
		const content = (
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
						<label htmlFor="sp_name">Name:</label>
						<input
							type="text"
							id="sp_name"
							name="sp_name"
							size={50}
							pattern="^[a-zA-Z\s]{1,50}$"
							required
							onChange={(e) => this.handleChange(e)}
						/>
					</span>

					<span className="field">
						<label htmlFor="spanish_name">Spanish name:</label>
						<input
							type="text"
							id="spanish_name"
							name="spanish_name"
							size={50}
							pattern="^[a-zA-Z\s]{1,50}$"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="APHIA">AphiaID:</label>
						<input
							type="number"
							id="APHIA"
							name="APHIA"
							className="input__noSpinner"
							min={0}
							max={999999}
							size={6}
							step={1}
							pattern="^[0-9]{1,6}$"
							onChange={(e) => this.handleChange(e)}
							onKeyDown={this.context.preventNegativeE}
						/>
					</span>
				</div>
				<fieldset className="wrapper ">
					<legend>Params</legend>

					<span className="field">
						<label htmlFor="a_param">a param:</label>
						<input
							type="number"
							id="a_param"
							name="a_param"
							className="input__noSpinner"
							min="0"
							max="9.999999"
							size={8}
							step={0.000001}
							onChange={(e) => this.handleChange(e)}
							onKeyDown={this.context.preventNegativeE}
						/>
					</span>
					<span className="field">
						<label htmlFor="b_param">b param:</label>
						<input
							type="number"
							id="b_param"
							name="b_param"
							className="input__noSpinner"
							min="0"
							max="9.999999"
							size={8}
							step={0.000001}
							onChange={(e) => this.handleChange(e)}
							onKeyDown={this.context.preventNegativeE}
						/>
					</span>
				</fieldset>
				<fieldset className="wrapper">
					<legend>Measurement</legend>
					<span className="field">
						<label htmlFor="unit">Measure unit:</label>
						<select id="unit" name="unit" required onChange={(e) => this.handleChange(e)}>
							<option selected></option>
							<option value="1">mm</option>
							<option value="2">cm</option>
						</select>
					</span>

					<span className="field">
						<label htmlFor="increment">Increment:</label>
						<input
							type="numeric"
							id="increment"
							name="increment"
							className="input__noSpinner"
							required
							min="0"
							max="9"
							size={1}
							step={1}
							onChange={(e) => this.handleChange(e)}
							onKeyDown={this.context.preventNegativeE}
						/>
					</span>
				</fieldset>
				<div className="form__row">
					<SpButtonBar
						// edit={this.props.edit}
						add={true}
						// changeDetail={this.props.changeDetail}
						handleEdit={this.props.handleEdit}
						changeAdd={this.props.changeAdd}
					/>
				</div>
			</form>
		);
		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewSpForm;
