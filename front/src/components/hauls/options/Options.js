import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'

class ComponentsHaulsOptions extends Component {
     /**
	 * Component with option of every haul
	 * @param {number} props.haul_id
	 */
    
    constructor(props) {
        super(props);
        this.state = {  };
        this.apiHaul = "Hauls/haul/" + this.props.haul_id
    }

    render() { 
        return ( 
            <Fragment>
                <Link style={{"display": "inline"}} to={{pathname: this.apiHaul, state: {isEdit: false}}}> detail</Link>
                -
                <Link style={{"display": "inline"}} to={{pathname: this.apiHaul, state: {isEdit: true}}}> edit </Link>
                {/* <ComponentsUiRemoveStationButton style={{"display": "inline"}} station_id={ this.props.station_id } onDelete={ this.onDelete } /> */}
                Remove
            </Fragment>
        );
    }
}
 


export default ComponentsHaulsOptions;