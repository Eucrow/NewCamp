import React, { Component, Fragment } from 'react';

import SurveyContext from "../../contexts/SurveyContext.js";

import FormMeteorology from "./meteorology/FormMeteorology.js";
import FormSpecific from './FormSpecific.js';

class ComponentsHaulNew extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = { 
            data: {
                station_id: '',
                stratum_id: '',
                sampler_id: null,
                meteo: {
                }
            },
            trawl_characteristics: {
                // shooting_date_time: '',
                // shooting_latitude: '',
                // shooting_longitude: '',
                // shooting_depth: '',
                // hauling_date_time: '',
                // hauling_latitude: '',
                // hauling_longitude: '',
                // hauling_depth: '',
                // bottom_date_time: '',
                // bottom_latitude: '',
                // bottom_longitude: '',
                // bottom_depth: '',
                // course: '',
                // velocity: '',
                // cable: '',
                // sweep: '',
                // otter_boards_distance: '',
                // horizontal_aperture: '',
                // vertical_aperture: '',
                // grid: '',
                // track: '',
                // comment: ''
            },
            hydrography_characteristics: {
                // latitude: '',
                // longitude: '',
                // date_time: '',
                // depth_probe: '',
                // cable: '',  
                // depth: '',
                // temperature_0: '',
                // salinity_0: '',
                // sigma_0: '',
                // temperature_50: '',
                // salinity_50: '',
                // sigma_50: '',
                // temperature_100: '',
                // salinity_100: '',
                // sigma_100: '',
                // temperature: '',
                // salinity: '',
                // sigma: '',
                // comment: '',
                // haul_id: ''
            },
            stations: [],
            strata: [],
            samplers:[]
        }
        
        this.apiTrawlForm = "http://127.0.0.1:8000/api/1.0/haul/trawl/new/";
        this.apiHydrographyForm = "http://127.0.0.1:8000/api/1.0/haul/hydrography/new/";
        this.apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";
        this.apiStrataPartial = "http://127.0.0.1:8000/api/1.0/strata/";
        this.apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMeteo = this.handleChangeMeteo.bind(this);
        this.handleChangeTrawl = this.handleChangeTrawl.bind(this);
        this.handleChangeHydrography = this.handleChangeHydrography.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    static contextType = SurveyContext;

    handleChange (event) {        
        const name = event.target.name;
        const value = event.target.value;
        console.log(value);
        

        this.setState({
            data: {
              ...this.state.data,
              [name] : value
            }
        });
    }

    handleChangeMeteo (event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log("value in handleChangeMeteo: " + value);
        

        this.setState({
            data: {
              ...this.state.data,
              meteo:{
                ...this.state.data.meteo,
                [name] : value
              }
            }
        });
    }

    handleChangeTrawl (event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log("value in handleChangeTrawl: " + value);
        

        this.setState({
            data: {
              ...this.state.data,
              trawl_characteristics:{
                ...this.state.data.trawl_characteristics,
                [name] : value
              }
            }
        });

    }

    handleChangeHydrography (event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log("value in handleChangeHydrography: " + value);
        

        this.setState({
            data: {
              ...this.state.data,
              hydrography_characteristics:{
                ...this.state.data.hydrography_characteristics,
                [name] : value
              }
            }
        });

    }
    
    handleSubmit(event) {

        event.preventDefault();

        var data = this.state.data

        const apiForm = this.state.data.sampler_id=== "1"? this.apiTrawlForm
                      : this.state.data.sampler_id=== "2" ? this.apiHydrographyForm
                      : null;

        console.log(JSON.stringify(data))

        fetch(apiForm, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
        .catch(error => console.log('Error'))
        

    }

    componentDidMount() {
        /**
         * First, check if a survey is selected. If doesn't, redirec to hauls page.
         */
        if (this.context.surveySelector === null){

            this.setState(() => {
                this.context.surveySelector = 1
            })
            this.forceUpdate()
            
        } else {
            /**
             * When the component is mounted, retrieve the posible stratum and sampler and save in state
             */
            const apiStations = this.apiStationsPartial + this.context.surveySelector;
            const apiStrata = this.apiStrataPartial + this.context.surveySelector;
            const apiSamplers = this.apiSamplers;
            
            // TODO: Optimize fetchs
            // Fetch stations
            fetch(apiStations)
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
            .then(stations => {
                this.setState(() => {
                    return {
                        stations: stations,
                        // by default, the first station is selected:
                        data: {
                            ...this.state.data,
                            station_id: stations[0].station
                        }
                    };
                });
            });

            // Fetch strata
            fetch(apiStrata)
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
            .then(strata => {
                this.setState(() => {
                    // console.log (strata);
                    return {
                        strata: strata,
                        // by default, the first stratum is selected:
                        data: {
                            ...this.state.data,
                            strata_id: strata[0].stratum
                        }
                    };
                });
            });

            // Fetch samplers
            fetch(apiSamplers)
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
            .then(samplers => {
                this.setState(() => {
                    return {
                        samplers: samplers
                    };
                });
            });
        }
    }
    
    render() { 
        return ( 
            <Fragment>
            <form>
            {/* TODO: factorize common part of the form. */}
                <fieldset>
                <legend>Common information:</legend>
                <label htmlFor="station_id">Station: </label>
                <select id="station_id" name="station_id" onChange={this.handleChange} >
                    <option disabled selected value="">--chose a station--</option>
                    {this.state.stations.map(station => {
                        return(
                            <option key={ station.id } value ={ station.id }>{ station.station }</option>
                        )
                    }
                    )}
                </select>
                
                <label htmlFor="stratum_id">Stratum: </label>
                <select id="stratum_id" name="stratum_id" onChange={this.handleChange} >
                    <option disabled selected value="">--chose a stratum--</option>
                    {this.state.strata.map(stratum => {
                        return(
                            <option key={ stratum.id } value ={ stratum.id }>{ stratum.stratum }</option>
                        )
                    }
                    )}
                </select>
                
                <label htmlFor="sampler_id">Sampler: </label>
                <select id="sampler_id" name="sampler_id" onChange={this.handleChange} >
                    <option disabled selected value="">--chose a sampler--</option>
                    {this.state.samplers.map(sampler => {
                        return(
                            <option key={ sampler.id } value ={ sampler.id }>{ sampler.sampler }</option>
                        )
                    }
                    )}
                    
                </select>
                <label htmlFor="haul">Haul:</label>
                <input type="text" id="haul" name="haul" onChange={this.handleChange} />
               
                <label htmlFor="gear">Gear:</label>
                <input type="text" id="gear" name="gear" onChange={this.handleChange} />
                
                <label htmlFor="valid">Valid:</label>
                <input type="checkbox" id="valid" name="valid" onChange={this.handleChange} />
                
                </fieldset>

                <FormMeteorology handleChangeMeteo={ this.handleChangeMeteo }/>
                <FormSpecific handleChangeTrawl={ this.handleChangeTrawl }
                              handleChangeHydrography={ this.handleChangeHydrography }
                              sampler_id={ this.state.data.sampler_id }/>

                <input type="submit" value="Save Haul" onClick={ this.handleSubmit } />

            </form>
            </Fragment>
         );
    }
}
 
export default ComponentsHaulNew;