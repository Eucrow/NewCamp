import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'

import ComponentsUiRemoveHaulButton from '../../ui/RemoveHaulButton.js';

class ComponentsHaulsOptions extends Component {
     /**
	 * Component with option of every haul
	 * @param {number} props.haul_id
     * @param {number} props.sampler_id
     * @param {function} props.onDelete: pass onDelete function to remove the station from parent state.
	 */
    
    constructor(props) {
        super(props);
        this.state = {  };
        this.routeHaul = "Hauls/haul/" + this.props.haul_id
        this.onDelete = this.props.onDelete;
    }

    render() { 
        return ( 
            <Fragment>hhh{this.props.haul_id}
                <Link style={{"display": "inline"}} to={{pathname: this.routeHaul,
                                                         sampler_id: this.props.sampler_id,
                                                         haul_id: this.props.haul_id,
                                                         state: {isEdit: false}}}> detail</Link>
                -
                <Link style={{"display": "inline"}} to={{pathname: this.routeHaul,
                                                         sampler_id: this.props.sampler_id,
                                                         haul_id: this.props.haul_id,
                                                         state: {isEdit: true}}}> edit </Link>
                <ComponentsUiRemoveHaulButton style={{"display": "inline"}} haul_id={ this.props.haul_id } onDelete={ this.onDelete } />
            </Fragment>
        );
    }
}
 


export default ComponentsHaulsOptions;