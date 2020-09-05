import React, { Component, Fragment } from 'react';

import LengthsForm from "./LengthsForm"

class TrawlSample extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sampled: false,
        }

        this.handleAddSample = this.handleAddSample.bind(this);
    }

    handleAddSample(event){
        this.setState({sampled: true});
    }

    render() { 
        return(
            <Fragment>
                {this.state.sampled === false?
                <button onClick={ this.handleAddSample }>Add sample</button>:
                <Fragment>
                    <fieldset>
                        <legend>Sample</legend>
                        <label for="sampled_weight">Sampled weight:</label>
                        <input type="number" id="sampled_weight" name="sampled_weight" onClick={ this.props.handleChange }></input>
                        <label htmlFor="sex">Sex: </label>
                        <select id="sex" name="sex" onClick={ this.handleAddSample }>
                            <option value="3">Undetermined</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                        <LengthsForm />
                    </fieldset>
                </Fragment>
                }
            </Fragment>
        )

    }
}
 
export default TrawlSample;