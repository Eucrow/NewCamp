import React, { Component } from 'react';

class componentsSurveyDetails extends Component {
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
			<ul>
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
                <li>comment: {this.state.data.comment}</li>
			</ul>
        )
	}
}
 
export default componentsSurveyDetails;