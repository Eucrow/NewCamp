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
            placeholder: "Loading",
            // formControls:{
            //     id: {value: ''},
            //     acronym: {value: ''},
            //     description: {value: ''},
            //     // start_date: {value: ''},
            //     // end_date: {value: ''},
            //     // width_x: {value: ''},
            //     // width_y: {value: ''},
            //     // origin_x: {value: ''},
            //     // origin_y: {value: ''},
            //     // ship: {value: ''},
            //     // hauls_duration: {value: ''},
            //     // unit_sample: {value: ''},
            //     // comment: {value: ''}
            // }
            formControls: []
        }
        this.api = "http://127.0.0.1:8000/api/1.0/surveys/" + this.props.match.params.survey_id

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange (event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                ...this.state.formControls[name],
                value
                }
            }
        });
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
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
                        formControls: data,
                        loaded: true
                    };
                });
            });
    }

	render() {
		return (
            <form>
                <label htmlFor="id">id: </label>
                <input type="text" id="id" name="id" value={this.state.formControls.id} onChange={this.handleChange} />
                <label htmlFor="start_date">acronym: </label>
                <input type="text" id="acronym" name="acronym" value={this.state.formControls.acronym} onChange={this.handleChange} />
                <label htmlFor="start_date">description: </label>
                <input type="text" id="description" name="description" value={this.state.formControls.description} onChange={this.handleChange} />
                {/* <label for="start_date">start_date: </label>
                <input type="text" id="start_date" name="start_date" value={this.state.formControls.start_date} onChange={this.handleChange} />
                <label for="end_date">end_date: </label>
                <input type="text" id="end_date" name="end_date" value={this.state.formControls.end_date} onChange={this.handleChange} />
                <label for="width_x">width_x: </label>
                <input type="text" id="width_x" name="width_x" value={this.state.formControls.width_x} onChange={this.handleChange} />
                <label for="width_y">width_y: </label>
                <input type="text" id="width_y" name="width_y" value={this.state.formControls.width_y} onChange={this.handleChange} />
                <label for="origin_x">origin_x: </label>
                <input type="text" id="origin_x" name="origin_x" value={this.state.formControls.origin_x} onChange={this.handleChange} />
                <label for="origin_y">origin_y: </label>
                <input type="text" id="origin_y" name="origin_y" value={this.state.formControls.origin_y} onChange={this.handleChange} />
                <label for="ship">ship: </label>
                <input type="text" id="ship" name="ship" value={this.state.formControls.ship} onChange={this.handleChange} /> */}
                {/* <label for="hauls_duration">hauls_duration: </label>
                <input type="text" id="hauls_duration" name="hauls_duration" value={this.state.formControls.hauls_duration.value} onChange={this.handleChange} /> */}
                {/* <label for="unit_sample">unit_sample: </label>
                <input type="text" id="unit_sample" name="unit_sample" value={this.state.formControls.unit_sample} onChange={this.handleChange} /> */}
                {/* <label for="comment">comment: </label>
                <input type="text" id="comment" name="comment" value={this.state.formControls.comment.value} onChange={this.handleChange} /> */}
                {/* <label for="stratification_id">stratification_id: </label>
                <input type="text" id="stratification_id" name="stratification_id" value={this.state.formControls.stratification_id} /> */}
                <input type="submit" value="Save Survey" />
            </form>
        )
	}
}
 
export default componentsSurveyEdit;