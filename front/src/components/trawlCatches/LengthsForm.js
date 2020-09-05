import React, { Component, Fragment } from 'react';

import LengthInput from "./LengthInput.js";

class LengthsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_length : "",
            lengths : [
                {
                    name_length : "",
                    number_individuals : ""
                }
            ]
        }

        // this.handleLenghtNameChange = this.handleLenghtNameChange.bind(this);
        // this.handleNumberIndividualsChange = this.handleNumberIndividualsChange.bind(this);
        // this.handleAddLength = this.handleAddLength.bind(this)

    }

    handleLenghtNameChange = idx => evt => {
        const newLenght = this.state.lengths.map((length, lidx) => {
            if (idx !== lidx) return length;
            return { ...length, name_length: evt.target.value };
        });
    
        this.setState({ lengths: newLenght });
    };

    handleNumberIndividualsChange = idx => evt => {
        const newNumberIndividuals = this.state.lengths.map((length, lidx) => {
            if (idx !== lidx) return length;
            return { ...length, number_individuals: evt.target.value };
        });
    
        this.setState({ lengths: newNumberIndividuals });
    };

    handleAddLength = () => {
        this.setState({
          lengths: this.state.lengths.concat([{ name_length: "", number_individuals: 0 }])
        });
    };

    handleRemoveLength = idx => () => {
        this.setState({
          lengths: this.state.lengths.filter((s, sidx) => idx !== sidx)
        });
    };

    render() { 
        return (
            <Fragment>
                <fieldset>
                    <legend>Lengths</legend>
                    <table>
                        <thead><tr><td>Length</td><td>Number individuals</td></tr></thead>
                        <tbody>
                        {this.state.lengths.map((l, idx) => {
                            return(
                                <tr>
                                    <td><input type="number" id="length" name="length" value={ l.name_length }
                                    onChange={ this.handleLenghtNameChange(idx) } /></td>
                                    <td><input type="number" id="number_individuals" name="number_individuals" value={ l.number_individuals }
                                    onChange={ this.handleNumberIndividualsChange(idx) }></input></td>
                                    <td><button type="button" onClick={ this.handleAddLength }> Add length </button></td>
                                    <td><button type="button" onClick={ this.handleRemoveLength(idx) }> Remove length </button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </fieldset>

            </Fragment>
        );
    }
}

export default LengthsForm;