import React, { Component, Fragment } from 'react';

import Catch from './Catch.js';

class CatchesList extends Component {
    /**
     * Component to print all the caches of the haul.
     * @param {dictionary} props.haul_id: id of haul.
     */
    
    constructor(props) {
        super(props);
        this.state = { 
            catches: [],
            loaded: false,
            placeholder: "Loading"
        }

        this.apiCatches = "http://127.0.0.1:8000/api/1.0/catches/"
    }

    componentDidMount() {
        
        const apiCatches = this.apiCatches + this.props.haul_id;
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
            })
    }

    render() { 
        if (this.state.catches.length == 0) {
            return ( 
                <Fragment>
                    <p>There aren't catches yet</p>
                </Fragment>
                )
        } else {
            return(
            <table>
            <thead>
            <tr style={{verticalAlign: "top"}}>
                <td>Code</td>
                <td>Name</td>
                <td>Category</td>
                <td>Total Weight</td>
                <td>Sampled Weight</td>
                <td>Sexes</td>
            </tr>
            </thead>
            <tbody>
                {
                    this.state.catches.map(c => {       
                        return(
                            <Catch this_catch={ c } catches={ this.state.catches }/>
                        )
                    })
                    
                }
            </tbody>
            </table>
            );
        }

    }
}
 
export default CatchesList;