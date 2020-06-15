import React, { Component, Fragment } from 'react';

class ComponentsHauls extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            hauls: []
         }
        
        // TODO: SELECT SURVEY
        // this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/" +  this.props.match.params.survey_id;
        this.apiHauls = "http://127.0.0.1:8000/api/1.0/hauls/N17"
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
                                Trawl: { haul.sampler.sampler} - Station: { haul.station.station } - Haul: { haul.haul }
                            </li>
                        )
                    })}
                </ul>
            </Fragment>
         );
    }
}
 
export default ComponentsHauls;