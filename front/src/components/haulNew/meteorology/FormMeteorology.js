import React, { Component } from 'react';

class FormMeteorology extends Component {

    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <fieldset>
                <legend>Meteorology</legend>
                <label htmlFor="wind_direction">Wind direction:</label>
                <input type="text" id="wind_direction" name="wind_direction" onChange={this.props.handleChangeMeteo} />
                <label htmlFor="wind_velocity">Wind velocity:</label>
                <input type="text" id="wind_velocity" name="wind_velocity" onChange={this.props.handleChangeMeteo} />
                <label htmlFor="sea_state">Sea state:</label>
                <input type="text" id="sea_state" name="sea_state" onChange={this.props.handleChangeMeteo} />
            </fieldset>);
    }
}

export default FormMeteorology;