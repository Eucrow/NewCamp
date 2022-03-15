import React, { Component } from "react";

import SelectedSurveyContext from "../../contexts/SelectedSuveryContext";

import UiButtonSave from "../ui/UiButtonSave";
import UiButtonCancel from "../ui/UiButtonCancel";

class NewStationForm extends Component {
	/**
	 * @param {method} props.handleAdd
	 * @param {method} props.createStation
	 */

	static contextType = SelectedSurveyContext;

	constructor(props) {
		super(props);
		this.state = {
			station: {},
		};

		this.handleChange = this.handleChange.bind(this);
	}

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
				survey_id: this.context.selectedSurveyId,
			},
		});
	}

	render() {
		return (
			<form
				className="wrapper form__row"
				onSubmit={(e) => {
					this.props.createStation(e, this.state.station);
					this.props.handleAdd(false);
				}}
			>
				<div className="form__row">
					<div className="form__cell">
						<label htmlFor="station">Station:</label>
						<input
							type="number"
							min="0"
							max="9999"
							maxLength="4"
							size={4}
							className="station_number"
							id="station"
							name="station"
							onChange={(e) => this.handleChange(e)}
						/>
					</div>
					<div className="form__cell">
						<label htmlFor="comment">Comment:</label>
						<textarea
							type="text"
							id="comment"
							name="comment"
							rows={1}
							size={1000}
							onChange={(e) => this.handleChange(e)}
						/>
					</div>
				</div>
				<div className="form__row">
					<div className="survey__cell survey__cell--right buttonsWrapper">
						<UiButtonSave buttonText={"Save Station"} />
						<UiButtonCancel handleMethod={this.props.handleAdd} />
					</div>
				</div>
			</form>
		);
	}
}

export default NewStationForm;
