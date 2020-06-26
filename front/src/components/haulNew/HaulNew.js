import React, { Component, Fragment } from 'react';

import SurveyContext from "../../contexts/SurveyContext.js";

class ComponentsHaulNew extends Component {
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = { 
            stations: [],
            strata: [],
            samplers:[]
        }
        
        this.apiForm = "http://127.0.0.1:8000/api/1.0/haul/new/";
        this.apiStationsPartial = "http://127.0.0.1:8000/api/1.0/stations/";
        this.apiStrataPartial = "http://127.0.0.1:8000/api/1.0/strata/";
        this.apiSamplers = "http://127.0.0.1:8000/api/1.0/samplers/";
    }

    static contextType = SurveyContext;

    componentDidMount() {
        /**
         * First, check if a survey is selected. If doesn't, redirec to hauls page.
         */
        if (this.context.surveySelector === null){
            
            alert("Survey is not selected");
            
            this.props.history.push('/Hauls');
            
        } else {
            /**
             * When the component is mounted, retrieve the posible stratum and sampler and save in state
             */
            const apiStations = this.apiStationsPartial + this.context.surveySelector;
            const apiStrata = this.apiStrataPartial + this.context.surveySelector;
            const apiSamplers = this.apiSamplers;

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
                console.log(stations)
                this.setState(() => {
                    return {
                        stations: stations,
                        loaded: true
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
                console.log(strata)
                this.setState(() => {
                    return {
                        strata: strata,
                        loaded: true
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
                console.log(samplers)
                this.setState(() => {
                    return {
                        samplers: samplers,
                        loaded: true
                    };
                });
            });
        }
    }

    render() { 
        return ( 
            <Fragment>
            <form method="POST" action={this.apiForm}>
                <fieldset>
                <legend>Common information:</legend>
                <label htmlFor="station">Station: </label>
                <select id="station" name="station">
                    {this.state.stations.map(station => {
                        return(
                            <option key={ station.id } value ={ station.id }>{ station.station }</option>
                        )
                    }
                    )}
                </select>
                
                <label htmlFor="strata">Stratum: </label>
                <select id="strata" name="strata">
                    {this.state.strata.map(stratum => {
                        return(
                            <option key={ stratum.id } value ={ stratum.id }>{ stratum.stratum }</option>
                        )
                    }
                    )}
                </select>
                
                <label htmlFor="sampler">Sampler: </label>
                <select id="sampler" name="sampler">
                    {this.state.samplers.map(sampler => {
                        return(
                            <option key={ sampler.id } value ={ sampler.id }>{ sampler.sampler }</option>
                        )
                    }
                    )}
                    
                </select>

                <label htmlFor="gear">Gear:</label>
                <input type="text" id="gear" name="gear"/>
                
                <label htmlFor="valid">Valid:</label>
                <input type="checkbox" id="valid" name="valid" value="valid" />
                

                <input type="submit" value="Save Haul" />
                </fieldset>

            </form>
            </Fragment>
         );
    }
}
 
export default ComponentsHaulNew;