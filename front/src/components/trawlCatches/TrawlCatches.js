import React, { Component } from 'react';

import ComponentsCatches from './Catches.js';

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
            viewLengths: false,
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
        if (this.state.catches.length == 0) {
            return ( <p>There aren't catches yet</p> )
        } else {
            return(
                <ul>
                {
                    this.state.catches.map(c => {       
                        return(
                            <ComponentsCatches catches={ c }/>
                        )
                    })
                    
                }
                </ul>
            )
        }
    }
}
 
export default ComponentsTrawlCatches;