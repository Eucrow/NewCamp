import React, { Component, Fragment } from 'react';

class LengthInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() { 
        return(
            <Fragment>
                <input type="number" id="length" name="length"></input>
                <input type="number" id="number_individuals" name="number_individuals"></input>
            </Fragment>
        )

    }
}
 
export default LengthInput;