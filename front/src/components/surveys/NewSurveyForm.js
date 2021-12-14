import React, { Component } from "react";

import UiButtonCancelEditSurvey from "./UiButtonCancelEditSurvey";
import UiButtonSaveNewSurvey from "./UiButtonSaveNewSurvey";

/**
 * Survey component
 * @param {object} props.survey: survey object
 * @param {object} props.stratifications: stratifications object
 * @param {method} props.handleAdd:
 * @param {method} props.handleChange:
 * @param {method} props.createSurvey:
 */
class NewSurveyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			survey: [],
		};

		this.handleChange = this.handleChange.bind(this);
	}
	/**
	 * Manage fields change in 'survey' state.
	 * @param {event} e - Event.
	 */
	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			survey: {
				...this.state.survey,
				[name]: value,
			},
		});
	}

	renderContent() {
		var content = "";

		content = (
			<form>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="description">description: </label>
						<input
							type="text"
							id="description"
							name="description"
							className="station_number"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="acronym">acronym: </label>
						<input
							type="text"
							id="acronym"
							name="acronym"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="start_date">start_date: </label>
						<input
							type="text"
							id="start_date"
							name="start_date"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="end_date">end_date: </label>
						<input
							type="text"
							id="end_date"
							name="end_date"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="width_x">width_x: </label>
						<input
							type="text"
							id="width_x"
							name="width_x"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="width_y">width_y: </label>
						<input
							type="text"
							id="width_y"
							name="width_y"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_x">origin_x: </label>
						<input
							type="text"
							id="origin_x"
							name="origin_x"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_y">origin_y: </label>
						<input
							type="text"
							id="origin_y"
							name="origin_y"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
				</div>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="ship">ship: </label>
						<input
							type="text"
							id="ship"
							name="ship"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="hauls_duration">hauls_duration: </label>
						<input
							type="text"
							id="hauls_duration"
							name="hauls_duration"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="unit_sample">unit_sample: </label>
						<input
							type="text"
							id="unit_sample"
							name="unit_sample"
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="stratification">
							stratification_id: PENDIENTE
						</label>
						<select
							id="stratification"
							name="stratification"
							onChange={(e) => this.handleChange(e)}
						>
							<option />

							{this.props.stratifications.map((st, idx) => {
								return (
									<option value={st.id} key={idx}>
										{st.id} - {st.stratification}
									</option>
								);
							})}
						</select>
					</span>
				</div>
				<div className="survey__row">
					<label htmlFor="comment">comment: </label>
					<input
						type="text"
						id="comment"
						name="comment"
						onChange={(e) => this.handleChange(e)}
					/>
				</div>
				<div className="survey__row">
					<div className="survey__cell survey__cell--right buttonsWrapper">
						<UiButtonSaveNewSurvey
							survey={this.state.survey}
							createSurvey={this.props.createSurvey}
							handleAdd={this.props.handleAdd}
						/>
						<UiButtonCancelEditSurvey
							handleAdd={this.props.handleAdd}
						/>
					</div>
				</div>
			</form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewSurveyForm;
