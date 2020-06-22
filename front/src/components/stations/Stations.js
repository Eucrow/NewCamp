import React, { Component, Fragment } from "react";

import ComponentsStationOptions from "./options/Options.js";
import ComponentsUiNewStationButton from "../ui/NewStationButton.js";
import ComponentsHaulsOptions from "../hauls/options/Options.js";

import SurveyContext from "../../contexts/SurveyContext.js";

class ComponentsStations extends Component {
	/**
	 * List of stations
	 * @param {*} props 
	 */

	// The contextType property on a class can be assigned a Context object created by React.createContext().
	// This lets you consume the nearest current value of that Context type using this.context. You can reference
	// this in any of the lifecycle methods including the render function.
	static contextType = SurveyContext;
	
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            loaded: false,
            placeholder: "Loading"
        };

		// The next api retrieve all the stations. If a 'hauls/survey_id' is added at the end, retrieve only the
        // stations of this survey
		this.apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";
		
		this.onDelete = this.onDelete.bind(this);
	}

	getStationsApi(){
        /**
         * Build url api of all the stations of a survey, using apiHauls and context
         */
		return (this.context.surveySelector === null?
					this.apiStationsPartial :
					this.apiStationsPartial + "hauls/"+  this.context.surveySelector);
    }
	
	onDelete(station_id){

		// state, before delete anything
		const currentStations = this.state.stations;

		// Remove deleted item from state.
		this.setState({
			stations: currentStations.filter(station => station.id !== station_id),
			});

	}

    componentDidMount() {
		
		const APIStations = this.getStationsApi()

		fetch(APIStations)
			.then(response => {
				if(response.status > 400){
					return this.setState(() => {
						return { placeholder: "Something went wrong!"}
					});
				}
				return response.json();
			})
			.then(stations => {
				this.setState(() => {
					return {
						stations,
						loaded: true
					};
				});
			});
        
	}
	
	render() {
		return (
			<Fragment>

			<div><ComponentsUiNewStationButton /></div>

			<ul>		
				{this.state.stations.map(station => {
					return(
						<li key={station.id}>
                            Station: {station.station} - Comments: {station.comment} - 
							{<ComponentsStationOptions station_id={station.id} onDelete={ this.onDelete }/>}
							<ul>
								{station.hauls.map(haul => {
									return(
										<li key={haul.id}>
											<p>Haul: {haul.haul}
											- Is valid?: {haul.valid}
											- Sampler: {haul.sampler.sampler}
											- <ComponentsHaulsOptions haul_id={haul.id} />
											</p>
										</li>
									)
								})}
							</ul>
						</li>
					)
				})}
			</ul>

			</Fragment>
			
		)
	}
}



export default ComponentsStations;