import React, { Component, Fragment } from 'react';

import LengthsForm from "./LengthsForm"

class TrawlSample extends Component {
    /**
     * 
     * @param {number} props.catch_id: id of the catch.
     */
    constructor(props) {
        super(props);
        this.state = {
            sample: [],
            sampled: false,
            name_length : "",
            lengths : [
                {
                    name_length : "",
                    number_individuals : ""
                }
            ]
        }

        this.apiAddSample = "http://127.0.0.1:8000/api/1.0/samples/new";

        this.handleAddSample = this.handleAddSample.bind(this);
        this.handleChangeSampleWeigth = this.handleChangeSampleWeigth.bind(this);
        this.submitSampleWeight = this.submitSampleWeight.bind(this);
    }

    handleAddSample(event){
        this.setState({sampled: true});
    }

    handleChangeSampleWeigth (event) { 
        /**
         * Handle change of new catch form.
         */       
        const name = event.target.name;
        const value = event.target.value;        

        this.setState({
            sample: {
                ["catch_id"] : this.props.catch_id,
                [name] : value
            }
        });
    }

    // **** start handle of legnths form
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
    // **** end handle of legnths form

    submitSampleWeight(event){
        event.preventDefault();

        fetch(this.apiAddSample, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(this.state.sample)
        })
        .then(response => {
            if(response > 400){
                return this.setState(() => {
                    return { placeholder: "Something went wrong!" }
                });
            }
            return response.json();
        })

    }

    render() { 
        return(
            <Fragment>
                {this.state.sampled === false?
                <button onClick={ this.handleAddSample }>Add sample</button>:
                <fieldset>
                    <legend>Sample</legend>
                    <label for="sampled_weight">Sampled weight:</label>
                    <input type="number" id="sampled_weight" name="sampled_weight" onChange={ this.handleChangeSampleWeigth }></input>
                    <button onClick={ this.submitSampleWeight }>Save sample weight</button>
                    <label htmlFor="sex">Sex: </label>
                    <select id="sex" name="sex" onClick={ this.handleAddSample }>
                        <option value="3">Undetermined</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                    <LengthsForm lengths={ this.state.lengths }
                                    handleRemoveLength= { this.handleRemoveLength }
                                    handleAddLength={ this.handleAddLength } 
                                    handleNumberIndividualsChange={ this.handleNumberIndividualsChange} 
                                    handleLenghtNameChange={ this.handleLenghtNameChange }/>
                </fieldset>
                }
            </Fragment>
        )

    }
}
 
export default TrawlSample;