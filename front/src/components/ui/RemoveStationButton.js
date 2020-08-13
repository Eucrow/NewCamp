import React, { Component } from "react";

class ComponentsUiRemoveStationButton extends Component {
    /**
     * Button to remove one Station.
     * @param {number} props.station_id
     * @param {function} props.onDelete: pass onDelete function to remove the station from parent state.
     */

    constructor(props) {
        super(props);
        this.apiRemoveStation = "http://127.0.0.1:8000/api/1.0/stations/remove/" + this.props.station_id;
        this.onDelete = this.props.onDelete;
    }

    removeStation(station_id){
        fetch(this.apiRemoveStation, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(station_id)
        })
        .then(this.props.onDelete(this.props.station_id))
        .catch(error => console.log('Error'))
        
        this.forceUpdate();
    }

    render() {
		return (
           <button onClick={() => {
                if(window.confirm('Delete the station?')){
                    this.removeStation(this.props.station_id)
                };
            }}> Remove </button>
		)
	}
}

export default ComponentsUiRemoveStationButton;