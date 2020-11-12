import React, { Component, Fragment } from 'react';

import CatchesList from './CatchesList.js';

import ComponentsUiNewTrawlsCatchButton from "../ui/NewTrawlCatchButton.js";

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
            newCatch: [],
            viewLengths: false,
            newSample: false,
            loaded: false,
            placeholder: "Loading"
         }

        this.apiCatches = "http://127.0.0.1:8000/api/1.0/catches/";

    }

    render() { 
        return(
            <Fragment>
            <ComponentsUiNewTrawlsCatchButton haul_id={ this.props.match.params.haul_id }/>
            <CatchesList haul_id={ this.props.match.params.haul_id } />
            </Fragment>
        )
    }

}
 
export default ComponentsTrawlCatches;