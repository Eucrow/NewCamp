import React, { Component } from 'react';

import ComponentsLengths from './Lengths.js';

class ComponentsCatches extends Component {
    constructor(props) {
        super(props);
    }

    render() { 

        const catches = this.props.catches
                                
        const sampled_weight = catches.samples && catches.samples.sampled_weight? catches.samples.sampled_weight : null;
        const sexes = catches.sexes ? catches.sexes : null

        return ( 
            <li key={ catches.id }>
                Code: { catches.group } { catches.sp_code} - 
                Name: { catches.sp_name } - 
                Category: { catches.category } - 
                Total Weight: { catches.weight } -
                Samples: { sampled_weight } -
                Sexes: <ul>
                    { sexes.map(s=>{
                        return ( 
                            <li key={ s.id }> 
                                { s.sex }
                                <ComponentsLengths sex_id={ s.id } isVisible={ false }/>
                            </li>
                        )
                    }) }
                </ul>
                
            </li>
        );
    }
}
 
export default ComponentsCatches;