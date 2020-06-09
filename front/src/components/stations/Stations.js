import React, { Component, Fragment } from "react";

import ComponentsStationOptions from "./options/Options.js";
import ComponentsUiNewStationButton from "../ui/NewStationButton.js";

class ComponentsStations extends Component {
	/**
	 * List of stations
	 * @param {*} props 
	 */
    constructor(props) {
        super(props);
        this.state = {
            stations: [],
            loaded: false,
            placeholder: "Loading"
        };
		this.apiStations = "http://127.0.0.1:8000/api/1.0/stations/";
		this.onDelete = this.onDelete.bind(this);
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
			fetch(this.apiStations)
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
                            {station.station} - {station.comment} {<ComponentsStationOptions station_id={station.id} onDelete={ this.onDelete }/>}
						</li>
					)
				})}
			</ul>

			</Fragment>
			
		)
	}
}



export default ComponentsStations;