import React, { Component, Fragment } from 'react';

class ComponentsFormLengths extends Component {
    /**
     * Component with the form of lengths.
     * @param {number} props.lengths
     * @param {number} props.sex: sex of lengths.
     * @param {string} props.status_lengths: must be "view", "edit", "hidden" or "add". "edit" if for
     * edit the saved lengths and add new lengths.
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

        if(lengths.length == 0){

            return(
                <button onClick={ this.props.handleAddLengthsButton }>Add lengths</button>
            )

        } else if(this.props.status_lengths === "view"){

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
                <button onClick={ this.props.editLengths }>Edit lengths</button>
                <button onClick={ this.props.handleHideLengths}>Hide</button>
                </Fragment>
            );

        } else if (this.props.status_lengths === "edit"){
            return(
                <Fragment>
                <ul>
                    {lengths.map((l, idx) => {
                        return(
                            <tr>
                                <td><input type="number" id="length" name="length" value={ l.length }
                                onChange={ this.props.handleLenghtNameChange(idx) } /></td>
                                <td><input type="number" id="number_individuals" name="number_individuals" value={ l.number_individuals }
                                onChange={ this.props.handleNumberIndividualsChange(idx) }></input></td>
                                <td><button type="button" onClick={ this.props.handleAddLength }> Add length </button></td>
                                <td><button type="button" onClick={ this.props.handleRemoveLength(idx) }> Remove length </button></td>
                            </tr>
                        )
                    })}
                </ul>
                <button onClick={ this.props.saveLengths }>Save</button>
                <button onClick={ this.props.saveSexAndLengths }>Save Sex and Lengths</button>
                <button onClick={ this.props.cancelLengths }>Cancel</button>
                </Fragment>
            )
        } else if (this.props.status_lengths === "hidden"){
            return(
                <button onClick= { this.props.handleShowLengths }>Show lengths</button>
                )
            
        } else if (this.props.status_lengths === "add"){
            return(
                <button onClick= { this.props.handleAddLengthsButton }>Add lengths</button>
            )
        }

    }
}
 
export default ComponentsFormLengths;
