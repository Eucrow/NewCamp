import React, { Component, Fragment } from "react";

class ComponentsStations extends Component {
	/**
	 * List of stations
	 * @param {*} props 
	 */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
        this.apiStations = "http://127.0.0.1:8000/api/1.0/stations/"
    }

    componentDidMount() {
			fetch(this.apiStations)
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
			<Fragment>

			{/* <div><ComponentsUiNewSurveyButton /></div> */}

			<ul>		
				{this.state.data.map(station => {
					return(
						<li key={station.id}>
							{/* {station.comment} <ComponentsSurveysOptions survey_id={survey.id} /> */}
                            {station.station - station.comment}
						</li>
					)
				})}
			</ul>

			</Fragment>
			
		)
	}
}



export default ComponentsStations;