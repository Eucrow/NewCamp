import React, { Component, Fragment } from 'react';

// import ComponentsUiRemoveLengthButton from "./ui/RemoveLengthButton.js";
import FormLengths from "./FormLengths.js";

class ComponentsLengths extends Component {
    /**
	* Component of lengths. This component is for every species-category-sex of a haul.
    * @param {number} props.sex_id: sex id of lengths.
    * @param {string} props.status_lengths: must be "view", "edit", "hide" or "add"
    * @param {method} props.saveSexAndLengths
    */
    
    constructor(props) {
        super(props);
        this.state = { 
            lengths : [
                {
                    length : "",
                    number_individuals : ""
                }
            ],
            isEdit : false,
            // status_lengths : ''
            status_lengths :"hide"

        }

        this.apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/"

        this.handleShowLengths = this.handleShowLengths.bind(this)
        this.handleHideLengths = this.handleHideLengths.bind(this)
        // this.removeLength = this.removeLength.bind(this)
        // this.handleChangeLengths = this.handleChangeLengths.bind(this)
        // this.handleChangeIndividuals = this.handleChangeIndividuals.bind(this)
        this.saveLengths = this.saveLengths.bind(this)    
        this.editLengths = this.editLengths.bind(this)
        this.cancelLengths = this.cancelLengths.bind(this)
        this.handleAddLengthsButton = this.handleAddLengthsButton.bind(this)

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

    handleStatusLengths(status){
        this.setState(() => {
            return{ status_lengths : status }

        })
    }

    handleShowLengths(event){
        /**
         * Show lengths.
         */
        // TODO: Detect if the legths are already in state and doesn't fetcth if it is the case.
        // In this case the legths has been hide by css.
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

    handleHideLengths(event){
        /** Hide legths
         * 
         */
        //TODO: Maybe use css to hide the lenghts when they are fetched from the backend?

        this.setState(() => {
            return {
                lengths: [],
                status_lengths: "hide"
            };
        });

    }

    editLengths(){
        /**
         * Change the state of isEdit to true.
         */
        this.setState(() => {
            return {
                status_lengths : "edit"
            };
        });
    }

    cancelLengths(){
        /**
         * Cancel the edition of the lengths. Set isEdit state to false.
         */
        this.setState(() => {
            return {
                status_lengths : "view"
            };
        });
    }

    handleAddLengthsButton(){
        /**
        * To show the form to create lengths.
        */
        this.setState(() => {
            return {
                status_lengths : "edit"
            };
        });
    }

    saveLengths(event){
        /**
        * Save the lengths of state to database.
        */
        
        event.preventDefault();

        const apiLengths = this.apiLengths + this.props.sex_id;

        console.log(JSON.stringify(this.state.lengths))
        fetch(apiLengths, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(this.state.lengths)
        })
        .then(response => {
            if(response.status > 400){
                // return this.setState(() => {
                //     return { placeholder: "Something went wrong!" }
                // });
                alert("Error: maybe the length already exists.")
            }
            return response.json();
        })
        .then(() => {
            this.setState(() => {
                return{status_lengths : "view"}
            })
        })
        .catch(error => console.log('Error'))

    }

        
    render() {

        if (this.state.status_lengths === "hide") {

            return(
                <button onClick={ this.handleShowLengths }>Show lengths</button>
            )

        } else if (this.state.status_lengths === "view"){
            return(
                <FormLengths
                    lengths={ this.state.lengths }
                    status_lengths={ this.state.status_lengths }
                    handleHideLengths = { this.handleHideLengths }
                    editLengths={ this.editLengths }
                />
            )
        } else if (this.state.status_lengths === "edit"){
            return(
                <FormLengths
                    lengths={ this.state.lengths }
                    status_lengths={ this.state.status_lengths }
                    sex_id={ this.props.sex_id }
                    sex= {this.props.sex }
                    saveSexAndLengths={ this.props.saveSexAndLengths }
                    handleShowLengths = { this.handleShowLengths }
                    handleHideLengths = { this.handleHideLengths }
                    handleRemoveLength= { this.handleRemoveLength }
                    handleAddLength={ this.handleAddLength } 
                    handleNumberIndividualsChange={ this.handleNumberIndividualsChange } 
                    handleLenghtNameChange={ this.handleLenghtNameChange }
                    handleAddLengthsButton={ this.handleAddLengthsButton }
                    handleSex={ this.handleSex }
                    saveLengths={ this.saveLengths }
                    editLengths={ this.editLengths }
                    cancelLengths={ this.cancelLengths }
                />
            )
        } else if (this.state.status_lengths === "remove"){

        }

        // return(
        //     <Fragment>
        //         <FormLengths
        //             lengths={ this.state.lengths }
        //             status_lengths={ this.props.status_lengths }
        //             sex_id={ this.props.sex_id }
        //             sex= {this.props.sex }
        //             saveSexAndLengths={ this.props.saveSexAndLengths }
        //             handleShowLengths = { this.handleShowLengths }
        //             handleHideLengths = { this.handleHideLengths }
        //             handleRemoveLength= { this.handleRemoveLength }
        //             handleAddLength={ this.handleAddLength } 
        //             handleNumberIndividualsChange={ this.handleNumberIndividualsChange} 
        //             handleLenghtNameChange={ this.handleLenghtNameChange }
        //             handleAddLengthsButton={ this.handleAddLengthsButton }
        //             handleSex={ this.handleSex }
        //             saveLengths={ this.saveLengths }
        //             editLengths={ this.editLengths }
        //             cancelLengths={ this.cancelLengths }/>

        //     </Fragment>
        // )
    }
}
 
export default ComponentsLengths;