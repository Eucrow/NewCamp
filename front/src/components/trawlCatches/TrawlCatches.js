import React, { Component } from 'react';

import ComponentsLengths from './Lengths.js';

class ComponentsTrawlCatches extends Component {
     /**
	 * Component show all the catches and related data of a haul
	 * @param {number} params.haul_id
	 */
    constructor(props) {
        super(props);
        this.state = { 
            catches: [],
            samples: [],
            loaded: false,
            placeholder: "Loading"
         }

        this.apiCatches = "http://127.0.0.1:8000/api/1.0/catches/" 
    }

    componentDidMount() {
        
        const apiCatches = this.apiCatches + this.props.match.params.haul_id;
        console.log (apiCatches)

        fetch(apiCatches)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
			.then(catches => {
				this.setState(() => {
					return {
                        catches: catches,
						loaded: true
					};
				});
			});
    }

    
    render() { 
        return(
            <ul>
                {this.state.catches.map(c => {

                    const sampled_weight = c.samples && c.samples.sampled_weight? c.samples.sampled_weight : null;
                    const sexes = c.sexes ? c.sexes : null

                    return(
                        <li key={ c.id }>
                            Code: { c.group } { c.sp_code} - 
                            Name: { c.sp_name } - 
                            Category: { c.category } - 
                            Total Weight: { c.weight } -
                            Samples: { sampled_weight } -
                            Sexes: <ul>
                                { sexes.map(s=>{
                                    return ( 
                                        <li key={ s.id }> 
                                            { s.sex }
                                            Lengths: { s.id } <ComponentsLengths sex_id={ s.id }/>
                                        </li>
                                    )
                                }) }
                            </ul>
                            
                        </li>
                    )
                })}
            </ul>
        )
    }
}
 
export default ComponentsTrawlCatches;