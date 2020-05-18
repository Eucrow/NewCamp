import React, { Component } from 'react';

class componentsSurveyEdit extends Component {
    /**
     * 
     * @param {numeric} props.survey_id
     */
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            loaded: false,
            placeholder: "Loading"
        }
        this.api = "http://127.0.0.1:8000/api/1.0/surveys/" + this.props.match.params.survey_id
    }

    componentDidMount() {

        fetch(this.api)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!"}
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

	render() {
		return (
            <form action="/http://127.0.0.1:8000/api/1.0/surveys/add/">
                <label for="description">description: </label>
                <input type="text" id="description" name="description" value={this.state.data.description} />
                <label for="start_date">start_date: </label>
                <input type="text" id="start_date" name="start_date" value={this.state.data.start_date} />
                <label for="end_date">end_date: </label>
                <input type="text" id="end_date" name="end_date" value={this.state.data.end_date} />
                <label for="width_x">width_x: </label>
                <input type="text" id="width_x" name="width_x" value={this.state.data.width_x} />
                <label for="width_y">width_y: </label>
                <input type="text" id="width_y" name="width_y" value={this.state.data.width_y} />
                <label for="origin_x">origin_x: </label>
                <input type="text" id="origin_x" name="origin_x" value={this.state.data.origin_x} />
                <label for="origin_y">origin_y: </label>
                <input type="text" id="origin_y" name="origin_y" value={this.state.data.origin_y} />
                <label for="ship">ship: </label>
                <input type="text" id="ship" name="ship" value={this.state.data.ship} />
                <label for="hauls_duration">hauls_duration: </label>
                <input type="text" id="hauls_duration" name="hauls_duration" value={this.state.data.hauls_duration} />
                <label for="unit_sample">unit_sample: </label>
                <input type="text" id="unit_sample" name="unit_sample" value={this.state.data.unit_sample} />
                <label for="comment">comment: </label>
                <input type="text" id="comment" name="comment" value={this.state.data.comment} />
                <input type="submit" value="Save Survey" />
            </form>
        )
	}
}
 
export default componentsSurveyEdit;