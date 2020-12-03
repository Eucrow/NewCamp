import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';
import ShowLengthsButton from '../lengths/ButtonShowLengths.js';


class ComponentSex extends Component {
    /**
     * 
     * @param {number} sex_id
     * @param {number} sex
     * @param {method} updateSex
     * @param {string} status_sex: contains the state of the component: "view", "edit", "delete" or "add".
     */

    constructor(props) {
        super(props);
        this.state = {
            new_sex : "", //contains the value of the new sex which will be saved in database.
            lengths : [
                {
                    length : "",
                    number_individuals : ""
                }
            ],
            status_lengths : '',
            status_sex: this.props.status_sex? this.props.status_sex: "view",
        }

        this.apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/"
        this.apiSexAndLengths = "http://127.0.0.1:8000/api/1.0/sex/lengths/"

        this.editSexStatus = this.editSexStatus.bind(this);
        this.saveSexAndLengths = this.saveSexAndLengths.bind(this);
        this.handleShowLengths = this.handleShowLengths.bind(this);
        this.handleNewSex = this.handleNewSex.bind(this);
    }

    editSexStatus(status){
        /**
        * Change the state of status_sex variable.
        * This variable contains the state of the component: "view", "edit", "delete" or "add".
        */
        this.setState(()=>{
            return(
                {
                    "catch_id" : "",
                    "sex" : "",
                    "status_sex" : status
                }
            )
        })
    }

    handleShowLengths(event){
        /**
         * Show lengths.
         */
        // TODO: Detect if the legths are already in state and doesn't fetcth if it is the case.
        // In this case the lengths has been hidden by css.
        const apiLengths = this.apiLengths + this.props.sex_id;

        fetch(apiLengths)
        .then(response => {
            if(response.status > 400){
                return this.setState(() => {
                    return { placeholder: "Something went wrong!" }
                });
            }
            return response.json();
        })
        .then(lengths => {
            this.setState(() => {
                return {
                    lengths: lengths,
                    status_lengths: "view"
                };
            });
        });

    }
    
    saveSexAndLengths(event){
        /**
        * Save the sex and lengths of state to database.
        */
        
        event.preventDefault();

        console.log(JSON.stringify(this.state.sex))
        fetch(this.apiSexAndLengths, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(this.state.sex)
        })
        .then(() => {
            this.setState(() => {
                return{status_lengths : "view"}
            })
        })
        .catch(error => console.log('Error'))        
    }

    handleNewSex(evt){
        /**
         * Change the state of new_sex variable.
         * This variable contains the value of the new sex which will be saved in database.
         */

        this.setState({"new_sex" : evt.target.value})

    }
   
    render() { 
        if (this.state.status_sex === "view" || this.state.status_sex === "" ) {
            return(
                <table><tbody><tr style={{verticalAlign: "top"}}><td>
                    { this.props.sex }
                    <button onClick={() => { this.editSexStatus("edit") } }>Edit sex</button>
                    <ShowLengthsButton handleShowLengths = { this.handleShowLengths } />
                </td></tr></tbody></table>
            )

        } else if (this.state.status_sex === "edit") {
            return (
                <Fragment>
                <select onChange={ this.props.updateSex(this.props.sex_id, this.props.catch_id) }
                        id={ this.props.sex_id }
                        name={ this.props.sex_id } 
                        value={ this.props.sex } >
                    <option value="3">Undetermined</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
                <button type="button" onClick={(e) => {
                        this.props.updateSex(e, this.props.sex_id)
                        this.editSexStatus("view")
                        }
                    }> Save sex </button> 
                {/* <ComponentsLengths status_lengths={ "hidden" }
                                   sex_id={ this.props.sex_id }
                                   sex={ this.props.sex } /> */}
                </Fragment>
            );

        } else if (this.state.status_sex === "delete") {

        } else if (this.state.status_sex === "add") {
            return (
                <Fragment>
                    <form onSubmit={ (e) => {
                        this.props.handleNewSexSubmit(e, this.state.new_sex, this.props.catch_id);
                        this.props.handleAddSexButton(false);
                        }}>
                        <select onChange={ this.handleNewSex }>
                            <option disabled selected value> -- select a sex -- </option>
                            <option value="3">Undetermined</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>

                        <input type="submit" disabled={!this.state.new_sex} value="Save new sex" />
                        {/* <ComponentsLengths status_lengths={ "hidden" }
                                        sex_id={ this.props.sex_id }
                                        sex={ this.props.sex } /> */}
                    </form>
                </Fragment>
            );
        }
    }
}
 
export default ComponentSex;