import React, { Component } from "react";

/**
 * Survey component
 * @param {object} props.survey: survey object
 * @param {object} props.stratifications: stratifications object
 * @param {method} props.handleAdd:
 * @param {method} props.handleChange:
 * @param {method} props.createSurvey:
 */
class NewSurvey extends Component {
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
			<form
				onSubmit={(e) => {
					console.log(this.state);
					this.props.createSurvey(e, this.state.survey);
					this.props.handleAdd(false);
				}}
			>
				<div className="survey__row">
					<span className="field">
						<label htmlFor="description">description: </label>
						<input
							type="text"
							id="description"
							name="description"
							className="station_number"
							// value={props.survey.description || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="acronym">acronym: </label>
						<input
							type="text"
							id="acronym"
							name="acronym"
							// value={props.survey.acronym || ""}
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
							// value={props.survey.start_date || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="end_date">end_date: </label>
						<input
							type="text"
							id="end_date"
							name="end_date"
							// value={props.survey.end_date || ""}
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
							// value={props.survey.width_x || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="width_y">width_y: </label>
						<input
							type="text"
							id="width_y"
							name="width_y"
							// value={props.survey.width_y || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_x">origin_x: </label>
						<input
							type="text"
							id="origin_x"
							name="origin_x"
							// value={props.survey.origin_x || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="origin_y">origin_y: </label>
						<input
							type="text"
							id="origin_y"
							name="origin_y"
							// value={props.survey.origin_y || ""}
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
							// value={props.survey.ship || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="hauls_duration">hauls_duration: </label>
						<input
							type="text"
							id="hauls_duration"
							name="hauls_duration"
							// value={props.survey.hauls_duration || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="unit_sample">unit_sample: </label>
						<input
							type="text"
							id="unit_sample"
							name="unit_sample"
							// value={props.survey.unit_sample || ""}
							onChange={(e) => this.handleChange(e)}
						/>
					</span>
					<span className="field">
						<label htmlFor="stratification">
							stratification_id: PENDIENTE
						</label>
						{/* <input
							type="text"
							id="stratification"
							name="stratification"
							onChange={(e) => this.handleChange(e)}
						/> */}
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
						// value={props.survey.comment || ""}
						onChange={(e) => this.handleChange(e)}
					/>
				</div>
				<div className="survey__row">
					<div className="survey__cell survey__cell--right">
						<input type="submit" value="Save Station" />
					</div>
				</div>
				{/* <input type="submit" value="Save" /> */}
				{/* <UiButtonCancelEditSurvey handleEdit={props.handleEdit} /> */}
			</form>

			// <form
			// 	onSubmit={(e) => {
			// 		this.props.createSurvey(e, this.state.survey);
			// 		this.props.handleAdd(false);
			// 	}}
			// >
			// 	<div>

			// 		<label htmlFor="start_date">acronym: </label>
			// 		<input
			// 			type="text"
			// 			id="acronym"
			// 			name="acronym"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="start_date">description: </label>
			// 		<input
			// 			type="text"
			// 			id="description"
			// 			name="description"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="start_date">start_date: </label>
			// 		<input
			// 			type="text"
			// 			id="start_date"
			// 			name="start_date"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="end_date">end_date: </label>
			// 		<input
			// 			type="text"
			// 			id="end_date"
			// 			name="end_date"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="width_x">width_x: </label>
			// 		<input
			// 			type="text"
			// 			id="width_x"
			// 			name="width_x"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="width_y">width_y: </label>
			// 		<input
			// 			type="text"
			// 			id="width_y"
			// 			name="width_y"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="origin_x">origin_x: </label>
			// 		<input
			// 			type="text"
			// 			id="origin_x"
			// 			name="origin_x"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="origin_y">origin_y: </label>
			// 		<input
			// 			type="text"
			// 			id="origin_y"
			// 			name="origin_y"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="ship">ship: </label>
			// 		<input
			// 			type="text"
			// 			id="ship"
			// 			name="ship"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="hauls_duration">hauls_duration: </label>
			// 		<input
			// 			type="text"
			// 			id="hauls_duration"
			// 			name="hauls_duration"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="unit_sample">unit_sample: </label>
			// 		<input
			// 			type="text"
			// 			id="unit_sample"
			// 			name="unit_sample"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="comment">comment: </label>
			// 		<input
			// 			type="text"
			// 			id="comment"
			// 			name="comment"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		<label htmlFor="stratification">stratification: </label>
			// 		<input
			// 			type="number"
			// 			id="stratification"
			// 			name="stratification"
			// 			onChange={(e) => this.handleChange(e)}
			// 		/>

			// 		{/* <select id="stratification_id" name="stratification_id">
			//         {this.state.stratification.map((st, idx) => {
			//             return (
			//                 <option value={st.id} key={idx}>{st.stratification}</option>
			//             )
			//         })}
			//     </select>

			//     <input type="button" value="Add Strata" onClick={this.onNewStratumClick}/>

			//     {this.state.inputStratum} */}

			// 		<input type="submit" value="Save Survey" />
			// 	</div>
			// </form>
		);

		return content;
	}

	render() {
		return this.renderContent();
	}
}

export default NewSurvey;
