import React, { Component } from "react";

import SurveyContext from "../../contexts/SurveyContext.js";

class NewStation extends Component {
	/**
	 *
	 * @param {method} props.handleAdd
	 * @param {method} props.createStation
	 */

	constructor(props) {
		super(props);
		this.state = {
			station: {},
		};

		this.handleChange = this.handleChange.bind(this);
	}

	static contextType = SurveyContext;

	handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			station: {
				...this.state.station,
				[name]: value,
			},
		});
	}

	componentDidMount() {
		this.setState({
			station: {
				survey_id: this.context.surveySelector,
			},
		});
	}

	render() {
		return (
			<form
				onSubmit={(e) => {
					this.props.createStation(e, this.state.station);
					this.props.handleAdd(false);
				}}
			>
				<label htmlFor="station">Station:</label>
				<input type="text" id="station" name="station" onChange={(e) => this.handleChange(e)} />
				<label htmlFor="comment">Comment:</label>
				<input type="text" id="comment" name="comment" onChange={(e) => this.handleChange(e)} />

				<input type="submit" value="Save Station" />
			</form>
		);
	}
}

export default NewStation;
