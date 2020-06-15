import React, { Component, Fragment } from 'react';

import ComponentsHaulsOptions from './options/Options.js';

class ComponentsHauls extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hauls: []
         }
        
        // TODO: SELECT SURVEY
        // this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/" +  this.props.match.params.survey_id;
        this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/N17";

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

    componentDidMount() {
        fetch(this.apiHauls)
            .then(response => {
                console.log(response);
                return response;})
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