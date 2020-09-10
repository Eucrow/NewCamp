import React, { Component, Fragment } from 'react';

class ComponentsFormLengths extends Component {
    /**
     * Component with the form of lengths.
     * @param {number} props.lengths
     * @param {boolean} props.isEdit
     * @param {method} props.removeLength
     * @param {method} props.handleChangeIndividuals
     * @param {method} props.handleChangeLengths
     * @param {method} props.saveLengths
     * @param {method} props.editLengths
     * @param {method} props.cancelLengths
     */
    
    constructor(props) {
        super(props);
    }

    render() {
        const lengths = this.props.lengths;
        const isEdit = this.props.isEdit;
                
        if(isEdit===false){
            return (
                <Fragment>
                <ul>
                    {lengths.map(l=>{
                        return(
                            <li key= { l.length }>
                                    { l.length } : { l.number_individuals }
                            </li> 
                        )
                    })}
                </ul>
                <button onClick={ this.props.editLengths }>Edit Lengths</button>
                </Fragment>
            );
        } else if (isEdit===true){
            return(
                <Fragment>
                <ul>
                    {lengths.map(l=>{
                        return(
                            <li key= { l.id }>
                                <input type="number" name={ l.id } id={ l.id } value={l.length || ""} onChange={ this.props.handleChangeLengths } />:
                                <input type="number" name={ l.length } value={l.number_individuals || ""} onChange={ this.props.handleChangeIndividuals } />-
                                <button onClick={() => this.props.removeLength(l.length) }>Remove</button>
                            </li> 
                        )
                    })}
                </ul>
                <button onClick={ this.props.saveLengths }>Save</button>
                <button onClick={ this.props.cancelLengths }>Cancel</button>
                </Fragment>
            )
        }

    }
}
 
export default ComponentsFormLengths;
