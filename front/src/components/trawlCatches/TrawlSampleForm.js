import React, { Component, Fragment } from 'react';

import LengthsForm from "./LengthsForm"

class TrawlSampleForm extends Component {
    /**
     * 
     * @param {number} props.catch_id: id of the catch.
     */
    constructor(props) {
        super(props);
        this.state = {
            sample: [],
            sampled: false,
            sex: [],
            sex_id: "",
            name_length : "",
            lengths : [
                {
                    length : "",
                    number_individuals : ""
                }
            ]
        }

        this.apiAddSample = "http://127.0.0.1:8000/api/1.0/samples/new";
        this.apiAddSex = "http://127.0.0.1:8000/api/1.0/sexes/new"
        this.apiAddLengths = "http://127.0.0.1:8000/api/1.0/lengths/new"

        this.handleAddSample = this.handleAddSample.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.handleChangeSampleWeigth = this.handleChangeSampleWeigth.bind(this);
        this.submitSampleWeight = this.submitSampleWeight.bind(this);
        this.submitSex = this.submitSex.bind(this);
        this.submitLengths = this.submitLengths.bind(this);
    }

    handleAddSample(event){
        this.setState({sampled: true});
    }

    handleSex(event){
        const value = event.target.value; 
        this.setState({
            sex: {
                ["catch_id"] : this.props.catch_id,
                ["sex"]: value
            }
        });
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
        const newLenght = this.state.lengths.map((l, lidx) => {
            if (idx !== lidx) return l;
            return { ...l, length: evt.target.value };
        });
    
        this.setState({ lengths: newLenght });
    };

    handleNumberIndividualsChange = idx => evt => {
        const newNumberIndividuals = this.state.lengths.map((l, lidx) => {
            if (idx !== lidx) return l;
            return { ...l, number_individuals: evt.target.value };
        });
    
        this.setState({ lengths: newNumberIndividuals });
    };

    handleAddLength = () => {
        this.setState({
          lengths: this.state.lengths.concat([{ length: "", number_individuals: 0 }])
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


    async submitSex(){  
        /**
         * Save sex to database
         */
        const response = await fetch(this.apiAddSex, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.sex)
        });
        // TODO: detect if sex already exists
        if (response > 400) {
            return this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        }
        const r = await response.json();
        this.setState(() => {
            return {
                ["sex_id"]: r.id
            };
        });
    }

    submitLengths(event){
        /**
        Save lengths to database. Previously save sex and change state of it.
        */        

        event.preventDefault();
        this.submitSex()
        .then( response => {
            fetch(this.apiAddLengths + "/" + this.state.sex_id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(this.state.lengths)
            })
            .then(response => {
                // TODO: detect if length already exists
                    if(response > 400){
                        return this.setState(() => {
                            return { placeholder: "Something went wrong!" }
                        });
                    }
                    return response.json(); 
                })
        }
            
            
        )
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
                    <select id="sex" name="sex" onClick={ this.handleSex }>
                        <option>choose sex</option>
                        <option value="3">Undetermined</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                    </select>
                    <LengthsForm lengths={ this.state.lengths }
                                 handleRemoveLength= { this.handleRemoveLength }
                                 handleAddLength={ this.handleAddLength } 
                                 handleNumberIndividualsChange={ this.handleNumberIndividualsChange} 
                                 handleLenghtNameChange={ this.handleLenghtNameChange }/>
                    <button onClick={ this.submitLengths }>Save lengths</button>
                </fieldset>
                }
            </Fragment>
        )

    }
}
 
export default TrawlSampleForm;