import React, { Component } from 'react';

class ComponentsStation extends Component {
    /**
     * Station component.
     * Show Station component to view or to edit it.
     * @param {numeric} props.station_id
     */

    constructor(props){

        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
            isEdit: this.props.location.state.isEdit
        };
        this.apiStation = "http://127.0.0.1:8000/api/1.0/station/" + this.props.match.params.station_id;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {

        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            data: {
              ...this.state.data,
              [name] : value
            }
          });

    }

    handleSubmit(event) {
        fetch(this.apiStation, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(this.state.data)
        })
        .then(() => {
            this.setState(() => {
                return{isEdit: false}
            })
        })
        .catch(error => console.log('Error'))
        
        event.preventDefault();
    }

    componentDidMount(){
        fetch(this.apiStation)
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
                        data:data,
                        loaded: true
                    };
                });
            });
    }

    render() {

        const isEdit = this.state.isEdit;

        if (isEdit === true){
            return(
                <form>
                    <label htmlFor="survey_id">Survey_id:</label>
                    <input type="text" id="survey_id" name="survey_id"value={this.state.data.survey_id || ""} onChange={this.handleChange} />
                    <label htmlFor="station">Station:</label>
                    <input type="text" id="station" name="station"value={this.state.data.station || ""} onChange={this.handleChange} />
                    <label htmlFor="comment">Comment:</label>
                    <input type="text" id="comment" name="comment"value={this.state.data.comment || ""} onChange={this.handleChange} />

                    <input type="submit" value="Save Station" onClick={this.handleSubmit} />
                </form>
            )

        } else if (isEdit === false){
            return (
                <ul>
                    <li>Survey id: { this.state.data.survey_id }</li>
                    <li>Station: { this.state.data.station }</li>
                    <li>Comments: { this.state.data.comment }</li>
                </ul>
                );
        }
        
    }

}

export default ComponentsStation