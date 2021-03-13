import React, { Component } from "react";
/**
 * Survey component
 * @param {object} props.survey: survey object
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

		this.handleChange = this.handleChange.bind(this);
	}

	renderContent() {
		var content = "";

		content = (
			<form
				onSubmit={(e) => {
					this.props.createSurvey(e, this.state.survey);
					this.props.handleAdd(false);
				}}
			>
				<div>
					<label htmlFor="start_date">acronym: </label>
					<input
						type="text"
						id="acronym"
						name="acronym"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="start_date">description: </label>
					<input
						type="text"
						id="description"
						name="description"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="start_date">start_date: </label>
					<input
						type="text"
						id="start_date"
						name="start_date"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="end_date">end_date: </label>
					<input
						type="text"
						id="end_date"
						name="end_date"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="width_x">width_x: </label>
					<input
						type="text"
						id="width_x"
						name="width_x"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="width_y">width_y: </label>
					<input
						type="text"
						id="width_y"
						name="width_y"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="origin_x">origin_x: </label>
					<input
						type="text"
						id="origin_x"
						name="origin_x"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="origin_y">origin_y: </label>
					<input
						type="text"
						id="origin_y"
						name="origin_y"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="ship">ship: </label>
					<input
						type="text"
						id="ship"
						name="ship"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="hauls_duration">hauls_duration: </label>
					<input
						type="text"
						id="hauls_duration"
						name="hauls_duration"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="unit_sample">unit_sample: </label>
					<input
						type="text"
						id="unit_sample"
						name="unit_sample"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="comment">comment: </label>
					<input
						type="text"
						id="comment"
						name="comment"
						onChange={(e) => this.handleChange(e)}
					/>
					<label htmlFor="stratification">stratification: </label>
					<input
						type="number"
						id="stratification"
						name="stratification"
						onChange={(e) => this.handleChange(e)}
					/>

					{/* <select id="stratification_id" name="stratification_id">
                    {this.state.stratification.map((st, idx) => {
                        return (
                            <option value={st.id} key={idx}>{st.stratification}</option>
                        )
                    })}
                </select>

                <input type="button" value="Add Strata" onClick={this.onNewStratumClick}/>

                {this.state.inputStratum} */}

					<input type="submit" value="Save Survey" />
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

export default NewSurvey;
