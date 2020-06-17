import React, { Component, Fragment } from 'react';

import ComponentsHaulsOptions from './options/Options.js';

import SurveyContext from "../../contexts/SurveyContext.js";

class ComponentsHauls extends Component {

    // The contextType property on a class can be assigned a Context object created by React.createContext().
	// This lets you consume the nearest current value of that Context type using this.context. You can reference
	// this in any of the lifecycle methods including the render function.
    static contextType = SurveyContext;
    
    constructor(props) {
        super(props);
        this.state = { 
            hauls: [],
            loaded: false,
            placeholder: "Loading"
         }
        
        // TODO: SELECT SURVEY
        // this is the partial api. The survey_id must be add to the url
        this.apiHaulsPartial = "http://127.0.0.1:8000/api/1.0/hauls/" 

        this.onDelete = this.onDelete.bind(this);

    }



    onDelete(haul_id){

		// state, before delete anything
		const currentHauls = this.state.hauls;

		// Remove deleted item from state.
		this.setState({
			hauls: currentHauls.filter(haul => haul.id !== haul_id),
			});

    }
    
    getHaulsApi(){
        /**
         * Build url api from apiHaulsPartial and context
         */
        return (this.context? this.apiHaulsPartial + this.context : this.apiHaulsPartial);
    }

    componentDidMount() {

        
        const APIHauls = this.getHaulsApi()
        console.log(APIHauls)

        // const completeAPIHauls = this.apiHaulsPartial + this.context;

        fetch(APIHauls)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
			.then(hauls => {
				this.setState(() => {
					return {
						hauls,
						loaded: true
					};
				});
			});
    }

    render() { 
        return ( 
            <Fragment>
                <ul>
                    {this.state.hauls.map(haul => {
                        return(
                            <li key={ haul.id }>
                                Sampler: { haul.sampler.sampler} -
                                Haul: { haul.haul } -
                                Station: { haul.station.station } -
                                <ComponentsHaulsOptions haul_id={ haul.id } onDelete= { this.onDelete }/>
                            </li>
                        )
                    })}
                </ul>
            </Fragment>
         );
    }
}
 
export default ComponentsHauls;