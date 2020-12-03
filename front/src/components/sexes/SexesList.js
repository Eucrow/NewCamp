import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';
import ComponentSex from './sex.js';


class ComponentSexes extends Component {
    /**
     * 
     * @param {object} props.sexes
     * @param {character} props.status_sexes
     * @param {method} props.editSexes
     * @param {method} props.handleSex
     * @param {method} props.updateSex
     * @param {method} props.editSexStatus
     */

    constructor(props) {
        super(props);
        this.state = {
            showAddSexForm: false
        }

        this.handleAddSexButton = this.handleAddSexButton.bind(this)
        
    }

    handleAddSexButton(status) {
        this.setState({
            showAddSexForm: status
        })
    }


    render() { 

        const sexes = this.props.sexes ? this.props.sexes : null

        // if (sexes.length === 0){
        //     return (
        //         <button onClick={ this.editSexes }>Add sex</button>
        //         // <ComponentSex status_sex={"add_button"}
        //         //               saveSex={ this.props.saveSex }/>
        //     )

        // } else {
            return ( 
                <Fragment>
                { sexes.map(s=>{
                    return(
                        <ComponentSex
                            key = { s.id }
                            sex_id={ s.id }
                            sex={ s.sex }
                            catch_id={ this.props.catch_id }
                            handleSex={ this.props.handleSex }
                            updateSex={ this.props.updateSex }
                            saveSex={ this.props.saveSex } />
                    )
                })}
                

                { this.state.showAddSexForm === true?
                    <ComponentSex
                        catch_id={ this.props.catch_id }
                        status_sex = { "new" }
                        handleSex = { this.props.handleSex }
                        saveSex = { this.props.saveSex }
                        handleNewSexSubmit = { this.props.handleNewSexSubmit }
                        handleAddSexButton = { this.handleAddSexButton }
                    /> :
                    <button onClick={() => { this.handleAddSexButton(true) } }>Add sex</button> }
                    
                </Fragment>


            );            
        // } 

    }

    // render() { 

    //     const sexes = this.props.sexes ? this.props.sexes : null

    //     if (sexes.length === 0){
    //         return (
    //             <button onClick={ () => {this.props.editCatchStatus("addSex")} }>Add sex</button>
    //         )

    //     } else if (this.props.status_sexes === "view"){
    //         return ( 
    //             sexes.map(s=>{
    //                 return(
    //                     <table><tbody><tr style={{verticalAlign: "top"}}><td>
    //                     { s.sex }
    //                     <button onClick={ this.props.editSexes }>Edit sexes</button>
    //                     <ComponentsLengths sex_id={ s.id } sex={ s.sex } />
    //                     </td></tr></tbody></table>
    //                 )

    //             })

    //         );            
    //     } else if (this.props.status_sexes === "edit") {
    //         return(
    //             sexes.map(s=>{
    //                 return(
    //                     <ComponentSex sex_id={ s.id }
    //                                   sex={ s.sex }
    //                                   status_sexes= { this.props.status_sexes }
    //                                   handleSex={ this.props.handleSex }
    //                                   updateSex={ this.props.updateSex }
    //                                   editSexStatus= { this.editSexStatus } />
    //                 )
    //             })              
    //         )
    //     } else if (this.props.status_sexes === "add") {
    //         return(
    //             <ComponentSex status_sexes= { this.props.status_sexes }
    //                           handleSex={ this.props.handleSex } 
    //                           saveSex={ this.saveSex }/>
    //         )
    //     }

    // }
}
 
export default ComponentSexes;