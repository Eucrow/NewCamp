import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';
import ShowLengthsButton from '../lengths/ButtonShowLengths.js';


class ComponentSex extends Component {
    /**
     * 
     * @param {number} sex_id
     * @param {number} sex
     * @param {method} handleSex
     * @param {method} updateSex
     * @param {method} saveSex
     * @param {string} status_sex
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
            status_lengths : '',
            // Only use props.status_sex when the value is "add"
            status_sex: this.props.status_sex? this.props.status_sex: "collapsed",
        }

        
        this.apiSexAndLengths = "http://127.0.0.1:8000/api/1.0/sex/lengths/"

        this.editSexStatus = this.editSexStatus.bind(this);
        this.handleNewSex = this.handleNewSex.bind(this);
        this.saveSexAndLengths = this.saveSexAndLengths.bind(this);
        this.handleShowLengths = this.handleShowLengths.bind(this);
    }

    editSexStatus(status){
        /**
        * Change the state of status_sex.
        */
        this.setState(()=>{
            return(
                {
                    "status_sex" : status,
                    "new_sex" : ""
                }
            )
        })
    }

    handleNewSex(event){

        const value = event.target.value;

        this.setState({
            new_sex: value
        });

    }     

    handleShowLengths(event){
        /**
         * Show lengths.
         */
        // TODO: Detect if the legths are already in state and doesn't fetcth if it is the case.
        // In this case the legths has been hidden by css.
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
   
    render() { 
        // if (this.state.status_sex === "collapsed"){
            return ( 
                <table><tbody><tr style={{verticalAlign: "top"}}><td>
                { this.props.sex }
                <button onClick={() => { this.editSexStatus("edit") } }>Edit sex</button>
                {/* <ShowLengthsButton handleShowLengths = { this.handleShowLengths } /> */}

                {/* {this.state.status_lengths && <ComponentsLengths status_lengths={ "view" } sex_id={ this.props.sex_id } sex={ this.props.sex } />} */}

                {/* <ComponentsLengths status_lengths={ "hidden" } sex_id={ this.props.sex_id } sex={ this.props.sex } /> */}
                </td></tr></tbody></table>
            );
        // } 
        // else if (this.state.status_sex === "expanded"){
        //     <table><tbody><tr style={{verticalAlign: "top"}}><td>
        //     { this.props.sex }
        //     <button onClick={() => { this.editSexStatus("edit") } }>Edit sex</button>
        //     <ComponentsLengths status_lengths={ "hidden" } sex_id={ this.props.sex_id } sex={ this.props.sex } />
        //     </td></tr></tbody></table>
        // }

    //     if(this.state.status_sex === "edit") {

    //         return (
    //             <Fragment>
    //             <select id={ this.props.sex_id }
    //                     name={ this.props.sex_id } 
    //                     value={ this.props.sex }
    //                     onChange={ this.props.handleSex }>
    //                 <option value="3">Undetermined</option>
    //                 <option value="1">Male</option>
    //                 <option value="2">Female</option>
    //             </select>
    //             <button type="button" onClick={(e) => {
    //                     this.props.updateSex(e, this.props.sex_id)
    //                     this.editSexStatus("view")
    //                     }
    //                 }> Save sex </button> 
    //             <ComponentsLengths status_lengths={ "hidden" }
    //                                sex_id={ this.props.sex_id }
    //                                sex={ this.props.sex } />
    //             </Fragment>
    //         );

    //     } else if (this.state.status_sex === "view") {

    //         return ( 
    //             <table><tbody><tr style={{verticalAlign: "top"}}><td>
    //             { this.props.sex } hhh
    //             <button onClick={() => { this.editSexStatus("edit") } }>Edit sex</button>
    //             <ComponentsLengths status_lengths={ "hidden" } sex_id={ this.props.sex_id } sex={ this.props.sex } />
    //             </td></tr></tbody></table>
    //         );

    //     } else if (this.state.status_sex === "add_button") {

    //         return(
    //             <button onClick={() => { this.editSexStatus("add") } }>Add sex</button>
    //             )

    //     } 
    //     else if (this.state.status_sex === "add") {

    //         return ( 
    //             <Fragment>
    //             <select id="sex" name="sex" onChange={ this.handleNewSex }>
    //                 <option value="3">Undetermined</option>
    //                 <option value="1">Male</option>
    //                 <option value="2">Female</option>
    //             </select>
    //             <button type="button" onClick={(e) => {
    //                 this.props.saveSex(e, this.state.new_sex)
    //                 this.editSexStatus("view")
    //                 } }> Save sex </button> 
    //             <ComponentsLengths status_lengths={ "edit" }
    //                                sex_id={ this.props.sex_id }
    //                                sex={ this.props.sex }
    //                                saveSexAndLengths= { this.saveSexAndLengths }/>
    //             </Fragment>
    //         ); 

    //     }

    }
}
 
export default ComponentSex;