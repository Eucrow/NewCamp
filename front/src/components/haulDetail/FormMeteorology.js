import React, { Component } from 'react';

class ComponentsHaulMeteorology extends Component {
    /**
     * 
     * @param {number} props.haul
     * @param {boolean} props.isEdit
     */
    
    constructor(props) {
        super(props);
    }

    render() {
        const haul = this.props.haul;
        const isEdit = this.props.isEdit;
                
        if(isEdit===false){
            return (
                <fieldset>
                    <legend>Meteorology:</legend>
                    <p>Wind direction: {haul.meteo.wind_direction || ""}</p>
                    <p>Wind velocity: {haul.meteo.wind_velocity || ""}</p>
                    <p>Sea State: {haul.meteo.sea_state || ""}</p>
                </fieldset>
            );
        } else if (isEdit===true){
            return(
                <fieldset>
                <legend>Meteorology:</legend>
                <label htmlFor="wind_direction">Wind direction:</label> 
                <input type="text" name="wind_direction" id="wind_direction" value={haul.meteo.wind_direction || ""} onChange={this.props.handleChangeMeteorology} />
                <label htmlFor="wind_velocity">Wind Velocity:</label> 
                <input type="text" name="wind_velocity" id="wind_velocity" value={haul.meteo.wind_velocity || ""} onChange={this.props.handleChangeMeteorology} />
                <label htmlFor="sea_state">Sea State:</label> 
                <input type="text" name="sea_state" id="sea_state" value={haul.meteo.sea_state || ""} onChange={this.props.handleChangeMeteorology} />
                </fieldset>
            )
        }

    }
}
 
export default ComponentsHaulMeteorology;
