import React, { Component, Fragment } from 'react';

class ComponentsLengths extends Component {
    /**
	* Component of lengths
	* @param {number} props.sex_id: sex id of lengths.
	*/
    constructor(props) {
        super(props);
        this.state = { 
            lengths: []
        }
        this.apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/"
    }

    componentDidMount() {
        
        const apiLengths = this.apiLengths + this.props.sex_id;
        console.log (apiLengths)

        fetch(apiLengths)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
			.then(lengths => {
				this.setState(() => {
					return {
                        lengths: lengths,
						loaded: true
					};
				});
			});
    }

    render() { 
        return ( 
            <Fragment>
                Lengths:
                <ul>
                    {this.state.lengths.map(l=>{
                        return(
                            <li key= { l.length }>
                                    { l.length } : { l.number_individuals }
                            </li> 
                        )
                    })}
                </ul>

            </Fragment>
         );
    }
}
 
export default ComponentsLengths;