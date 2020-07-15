import React, { Component, Fragment } from 'react';
import update from 'immutability-helper';

class ComponentsHaulHydrography extends Component {
    /**
     * Component of hydrography form of haul.
     * @param {number} props.haul
     * @param {boolean} props.isEdit
     * @param {function} props.handleChangeHydrography
     */
    
    constructor(props) {
        super(props);
    }

    render() {
        const haul = this.props.haul;
        const isEdit = this.props.isEdit;
                
        if(isEdit === false ){
            return ( 
            <Fragment>
            <fieldset>
                <legend>Hydrography characteristics</legend>
                <p>Latitude: {haul.hydrography_characteristics.latitude || ""}</p>
                <p>Longitude: {haul.hydrography_characteristics.longitude || ""}</p>
                <p>Date time: {haul.hydrography_characteristics.date_time || ""}</p>
                <p>Depth probe: {haul.hydrography_characteristics.depth_probe || ""}</p>
                <p>Cable: {haul.hydrography_characteristics.cable || ""}</p>
                <p>Depth: {haul.hydrography_characteristics.depth || ""}</p>
                <p>Temperature 0: {haul.hydrography_characteristics.temperature_0 || ""}</p>
                <p>Salinity 0: {haul.hydrography_characteristics.salinity_0 || ""}</p>
                <p>Sigma 0: {haul.hydrography_characteristics.sigma_0 || ""}</p>
                <p>Temperature 50: {haul.hydrography_characteristics.temperature_50 || ""}</p>
                <p>Salinity 50: {haul.hydrography_characteristics.salinity_50 || ""}</p>
                <p>Sigma 50: {haul.hydrography_characteristics.sigma_50 || ""}</p>
                <p>Temperature 100: {haul.hydrography_characteristics.temperature_100 || ""}</p>
                <p>Salinity 100: {haul.hydrography_characteristics.salinity_100 || ""}</p>
                <p>Sigma 100: {haul.hydrography_characteristics.sigma_100 || ""}</p>
                <p>Temperature: {haul.hydrography_characteristics.temperature || ""}</p>
                <p>Salinity: {haul.hydrography_characteristics.salinity || ""}</p>
                <p>Sigma: {haul.hydrography_characteristics.sigma || ""}</p>
                <p>Comment: {haul.hydrography_characteristics.comment || ""}</p>
            </fieldset>
            </Fragment>
            );
        } else if (isEdit===true){
        return(
            <fieldset>
            <legend>Hydrography characteristics</legend>
            <label htmlFor="comment">Latitude: </label>
            <input type="text" id="latitude" name="latitude" value={ haul.hydrography_characteristics.latitude } onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Longitude: </label>
            <input type="text" id="longitude" name="longitude" value={ haul.hydrography_characteristics.longitude }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Date time: </label>
            <input type="text" id="date_time" name="date_time" value={ haul.hydrography_characteristics.date_time }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Depth probe: </label>
            <input type="text" id="depth_probe" name="depth_probe" value={ haul.hydrography_characteristics.depth_probe }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Cable: </label>
            <input type="text" id="cable" name="cable" value={ haul.hydrography_characteristics.cable }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Depth: </label>
            <input type="text" id="depth" name="depth" value={ haul.hydrography_characteristics.depth }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Temperature 0: </label>
            <input type="text" id="temperature_0" name="temperature_0" value={ haul.hydrography_characteristics.temperature_0 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Salinity 0: </label>
            <input type="text" id="salinity_0" name="salinity_0" value={ haul.hydrography_characteristics.salinity_0 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Sigma 0: </label>
            <input type="text" id="sigma_0" name="sigma_0" value={ haul.hydrography_characteristics.sigma_0 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Temperature 50: </label>
            <input type="text" id="temperature_50" name="temperature_50" value={ haul.hydrography_characteristics.temperature_50 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Salinity 50: </label>
            <input type="text" id="salinity_50" name="salinity_50" value={ haul.hydrography_characteristics.salinity_50 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Sigma 50: </label>
            <input type="text" id="sigma_50" name="sigma_50" value={ haul.hydrography_characteristics.sigma_50 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Temperature 100: </label>
            <input type="text" id="temperature_100" name="temperature_100" value={ haul.hydrography_characteristics.temperature_100 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Salinity 100: </label>
            <input type="text" id="salinity_100" name="salinity_100" value={ haul.hydrography_characteristics.salinity_100 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Sigma 100: </label>
            <input type="text" id="sigma_100" name="sigma_100" value={ haul.hydrography_characteristics.sigma_100 }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Temperature: </label>
            <input type="text" id="temperature" name="temperature" value={ haul.hydrography_characteristics.temperature }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Salinity: </label>
            <input type="text" id="salinity" name="salinity" value={ haul.hydrography_characteristics.salinity }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Sigma: </label>
            <input type="text" id="sigma" name="sigma" value={ haul.hydrography_characteristics.sigma }  onChange={this.props.handleChangeHydrography} />
            <label htmlFor="comment">Comment: </label>
            <input type="text" id="comment" name="comment" value={ haul.hydrography_characteristics.comment }  onChange={this.props.handleChangeHydrography} />
            </fieldset>
            )
        }

    }
}
 
export default ComponentsHaulHydrography;
