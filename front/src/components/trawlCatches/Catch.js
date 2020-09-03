import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';

class Catch extends Component {
    constructor(props) {
        super(props);
    }

    render() { 

        const catches = this.props.catches
                                
        const sampled_weight = catches.samples && catches.samples.sampled_weight? catches.samples.sampled_weight : null;
        const sexes = catches.sexes ? catches.sexes : null

        return ( 
            <Fragment>
            <tr style={{verticalAlign: "top"}} key={ catches.id }>
            <td>{ catches.group } { catches.sp_code}</td>
            <td>{ catches.sp_name }</td>
            <td>{ catches.category }</td>
            <td>{ catches.weight }</td>
            <td>{ sampled_weight }</td>
            <td>
                { sexes.map(s=>{
                    return ( 
                        <table><tbody><tr style={{verticalAlign: "top"}}><td>
                            { s.sex }
                            <ComponentsLengths sex_id={ s.id } isVisible={ false }/>
                        </td></tr></tbody></table>
                )
            }) }
            </td>
            </tr>
            </Fragment>
        );
    }
}
 
export default Catch;