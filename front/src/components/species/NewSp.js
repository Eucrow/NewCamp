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

	renderContent() {
		var content = "";
		if (this.props.add === true) {
			content = (
				<form
					className="wrapper"
					onSubmit={(e) => {
						this.props.createSp(e, this.state.sp);
						this.props.handleAdd(false);
					}}
				>
					<div className="form__row">
						<span className="field">Group:</span>
						<span className="field">Code:</span>
					</div>
					<div className="form__row">
						<span className="field">
							<label htmlFor="haul">Name:</label>
							<input
								type="text"
								id="sp_name"
								name="sp_name"
								onChange={(e) =>
									this.context.handleChange(
										e,
										this.props.sp.id
									)
								}
							/>
						</span>

						<span className="field">
							<label htmlFor="haul">Spanish name:</label>
							<input
								type="text"
								id="spanish_name"
								name="spanish_name"
								onChange={(e) =>
									this.context.handleChange(
										e,
										this.props.sp.id
									)
								}
							/>
						</span>
						<span className="field">
							<label htmlFor="haul">AphiaID:</label>
							<input
								type="text"
								id="APHIA"
								name="APHIA"
								onChange={(e) =>
									this.context.handleChange(
										e,
										this.props.sp.id
									)
								}
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
								onChange={(e) =>
									this.context.handleChange(
										e,
										this.props.sp.id
									)
								}
							/>
						</span>
						<span className="field">
							<label htmlFor="haul">b param:</label>
							<input
								type="text"
								id="b_param"
								name="b_param"
								onChange={(e) =>
									this.context.handleChange(
										e,
										this.props.sp.id
									)
								}
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
								onChange={(e) =>
									this.context.handleChange(
										e,
										this.props.sp.id
									)
								}
							/>
						</span>

						<span className="field">
							<label htmlFor="haul">Increment:</label>
							<input
								type="text"
								id="increment"
								name="increment"
								onChange={(e) =>
									this.context.handleChange(
										e,
										this.props.sp.id
									)
								}
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
