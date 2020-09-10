import React, { Component, Fragment } from 'react';

// import ComponentsUiRemoveLengthButton from "./ui/RemoveLengthButton.js";
import FormLengths from "./FormLengths.js";

class ComponentsLengths extends Component {
    /**
	* Component of lengths. This component is for every species-category-sex of a haul.
    * @param {number} props.sex_id: sex id of lengths.
    * @param {boolean} props.isVisible: If this component is visible or not.
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
            isVisible: false,
            isEdit: false,
            status_lengths : "hidden"

        }
        this.apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/" + this.props.sex_id

        this.handleShowLengths = this.handleShowLengths.bind(this)
        this.handleHideLengths = this.handleHideLengths.bind(this)
        // this.removeLength = this.removeLength.bind(this)
        // this.handleChangeLengths = this.handleChangeLengths.bind(this)
        // this.handleChangeIndividuals = this.handleChangeIndividuals.bind(this)
        this.saveLengths = this.saveLengths.bind(this)    
        this.editLengths = this.editLengths.bind(this)
        this.cancelLengths = this.cancelLengths.bind(this)
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
        // In this case the legths has been hidden by css.
        const apiLengths = this.apiLengths + this.props.sex_id;

        fetch(this.apiLengths)
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
                status_lengths: "hidden"
            };
        });

    }

    // handleChangeIndividuals(event){
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     // 1. Make a shallow copy of the lengths
    //     let lengths = [...this.state.lengths];
    //     // 2. Make a shallow copy of the length you want to update
    //     let le = lengths.find(len => len.length == name);
    //     // 3. Replace the property you're intested in
    //     le.number_individuals = value;
    //     // 4. Put it back into our array
    //     const indexLength = lengths.findIndex(x => x.length===le)
    //     lengths[indexLength] = le;
    //     // 5. Set the state to our new copy
    //     this.setState({lengths})
    // }

    // handleChangeLengths(event){
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     // 1. Make a shallow copy of the lengths
    //     let lengths = [...this.state.lengths];
    //     // 2. Make a shallow copy of the length you want to update
    //     let le = lengths.find(len => len.id == name);
    //     // 3. Get index of the original length
    //     const indexLength = lengths.findIndex(x => x.length===le)
    //     // 4. Replace the property you're intested in
    //     le.length = value;
    //     // 5. Put it back into our array
    //     lengths[indexLength] = le;
    //     // 6. Set the state to our new copy
    //     this.setState({lengths})
    // }

    // removeLength(length){
    //     /** Remove length.
    //      * This method remove the length (and its number of individuals) from State.
    //      */
    //     // 1. Make a shallow copy of the lengths
    //     let lengths = [...this.state.lengths];
    //     // 2. Remove the length
    //     let lengthIndex = lengths.findIndex(len => len.length == length);
    //     lengths.splice(lengthIndex, 1);
    //     // 3. Set the state to our new copy
    //     this.setState({lengths});
    // }

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

    saveLengths(event){
        /**
        * Save the lengths of state to database.
        */
        
        event.preventDefault();

        console.log(this.apiLengths)
        console.log(JSON.stringify(this.state.lengths))
        fetch(this.apiLengths, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(this.state.lengths)
        })
        .then(() => {
            this.setState(() => {
                return{status_lengths : "view"}
            })
        })
        .catch(error => console.log('Error'))

    }

    // componentDidMount() {
    //     // When the component is mounted the lengths are fetched.
    //     // TODO: study how to manage this.
    //     fetch(this.apiLengths)
    //     .then(response => {
    //         if(response.status > 400){
    //             return this.setState(() => {
    //                 return { placeholder: "Something went wrong!" }
    //             });
    //         }
    //         return response.json();
    //     })
    //     .then(lengths => {
    //         this.setState(() => {
    //             return {
    //                 lengths: lengths,
    //                 isVisible: true,
    //                 status_lengths: "view"
    //             };
    //         });
    //     });

    // }
        
    render() { 

        return(
            <Fragment>
                <FormLengths
                    lengths={ this.state.lengths }
                    status_lengths={ this.state.status_lengths }
                    handleShowLengths = { this.handleShowLengths }
                    handleHideLengths = { this.handleHideLengths }
                    handleRemoveLength= { this.handleRemoveLength }
                    handleAddLength={ this.handleAddLength } 
                    handleNumberIndividualsChange={ this.handleNumberIndividualsChange} 
                    handleLenghtNameChange={ this.handleLenghtNameChange }
                    saveLengths={ this.saveLengths }
                    editLengths={ this.editLengths }
                    cancelLengths={ this.cancelLengths }/>

            </Fragment>
        )
        // return ( 
        //     <Fragment>

        //     {this.state.isVisible===false?
        //         <Fragment>
        //             <button onClick={ this.handleShowLengths }>Show Lengths</button>
        //             <button onClick={ this.editLengths }>Edit Lengths</button>
        //         </Fragment>:
        //         null
        //     }
           

        //     {this.state.isVisible===true?
        //         <Fragment>
        //         <FormLengths isEdit={ this.state.isEdit}
        //                      lengths={ this.state.lengths }
        //                      status_lengths={ this.status_lengths }
        //                     //  removeLength={ this.removeLength }
        //                     //  handleChangeLengths={ this.handleChangeLengths }
        //                     //  handleChangeIndividuals={ this.handleChangeIndividuals }
        //                      handleRemoveLength= { this.handleRemoveLength }
        //                      handleAddLength={ this.handleAddLength } 
        //                      handleNumberIndividualsChange={ this.handleNumberIndividualsChange} 
        //                      handleLenghtNameChange={ this.handleLenghtNameChange }
        //                      saveLengths={ this.saveLengths }
        //                      editLengths={ this.editLengths }
        //                      cancelLengths={ this.cancelLengths }/>
        //         {this.state.isEdit===false?
        //             <button onClick={ this.handleHideLengths }>Hide Lengths</button>:
        //             null
        //         }
        //         </Fragment>:
        //         null
        //     }

        //     </Fragment>
        // );
    }
}
 
export default ComponentsLengths;