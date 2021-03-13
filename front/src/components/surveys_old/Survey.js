import React, { Component } from "react";

class Survey extends Component {
	/**
	 * Survey component.
	 * Show survey to view or edit it.
	 * @param {numeric} props.survey_id
	 */

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading",
			isEdit: this.props.location.state.isEdit,
		};
		this.api =
			"http://127.0.0.1:8000/api/1.0/surveys/" +
			this.props.match.params.survey_id;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			data: {
				...this.state.data,
				[name]: value,
			},
		});
	}

	handleSubmit(event) {
		fetch(this.api, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.state.data),
		})
			.then(() => {
				this.setState(() => {
					return { isEdit: false };
				});
			})
			.catch((error) => console.log("Error"));

		event.preventDefault();
	}

	componentDidMount() {
		fetch(this.api)
			.then((response) => {
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.setState(() => {
					return {
						data: data,
						loaded: true,
					};
				});
			});
	}

	render() {
		const isEdit = this.state.isEdit;

		if (isEdit === true) {
			return (
				<form>
					<label htmlFor="id">id: </label>
					<input
						type="text"
						id="id"
						name="id"
						value={this.state.data.id || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="start_date">acronym: </label>
					<input
						type="text"
						id="acronym"
						name="acronym"
						value={this.state.data.acronym || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="start_date">description: </label>
					<input
						type="text"
						id="description"
						name="description"
						value={this.state.data.description || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="start_date">start_date: </label>
					<input
						type="text"
						id="start_date"
						name="start_date"
						value={this.state.data.start_date || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="end_date">end_date: </label>
					<input
						type="text"
						id="end_date"
						name="end_date"
						value={this.state.data.end_date || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="width_x">width_x: </label>
					<input
						type="text"
						id="width_x"
						name="width_x"
						value={this.state.data.width_x || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="width_y">width_y: </label>
					<input
						type="text"
						id="width_y"
						name="width_y"
						value={this.state.data.width_y || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="origin_x">origin_x: </label>
					<input
						type="text"
						id="origin_x"
						name="origin_x"
						value={this.state.data.origin_x || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="origin_y">origin_y: </label>
					<input
						type="text"
						id="origin_y"
						name="origin_y"
						value={this.state.data.origin_y || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="ship">ship: </label>
					<input
						type="text"
						id="ship"
						name="ship"
						value={this.state.data.ship || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="hauls_duration">hauls_duration: </label>
					<input
						type="text"
						id="hauls_duration"
						name="hauls_duration"
						value={this.state.data.hauls_duration || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="unit_sample">unit_sample: </label>
					<input
						type="text"
						id="unit_sample"
						name="unit_sample"
						value={this.state.data.unit_sample || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="comment">comment: </label>
					<input
						type="text"
						id="comment"
						name="comment"
						value={this.state.data.comment || ""}
						onChange={this.handleChange}
					/>
					<label htmlFor="stratification_id">
						stratification_id:{" "}
					</label>
					<input
						type="text"
						id="stratification_id"
						name="stratification_id"
						value={this.state.data.stratification_id || ""}
					/>
					<input
						type="submit"
						value="Save Survey"
						onClick={this.handleSubmit}
					/>
				</form>
			);
		} else if (isEdit === false) {
			return (
				<ul>
					<li>id: {this.state.data.id}</li>
					<li>acronym: {this.state.data.acronym}</li>
					<li>description: {this.state.data.description}</li>
					<li>start_date: {this.state.data.start_date}</li>
					<li>end_date: {this.state.data.end_date}</li>
					<li>width_x: {this.state.data.width_x}</li>
					<li>width_y: {this.state.data.width_y}</li>
					<li>origin_x: {this.state.data.origin_x}</li>
					<li>origin_y: {this.state.data.origin_y}</li>
					<li>ship: {this.state.data.ship}</li>
					<li>hauls_duration: {this.state.data.hauls_duration}</li>
					<li>unit_sample: {this.state.data.unit_sample}</li>
					<li>survey comment: {this.state.data.comment}</li>
					{/* <li>stratification_id: {this.state.data.stratification_id}</li> */}
					{/* <li>{toString(this.state.data.stratification.comment)}</li> */}
					{/* {this.state.data.stratification.map(home => <div>{home.stratification}</div>)} */}
					{/* {this.state.data.stratification.map(function(strat){
                        return <Fragment><li>strat.stratification</li>
                                <li>strat.comment</li></Fragment>
                    })} */}
				</ul>
			);
		}
	}
}

export default Survey;
