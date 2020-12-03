import React, { Component, Fragment } from 'react';

import update from 'immutability-helper';

import ComponentSexes from '../sexes/SexesList.js'
import ComponentCategory from './Category.js';
import CatchEditForm from './CatchEditForm.js';

class Catch extends Component {
    /**
     * Catch form.
     * @param {object} props.this_catch: catch object.
     * @param {object} props.catches: object with all the catches of the haul.
     */

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            status_catch : "",
        }

        this.apiSex = "http://127.0.0.1:8000/api/1.0/sexes/";

        this.editCatchStatus = this.editCatchStatus.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        // this.handleSex = this.handleSex.bind(this);
        this.updateSex = this.updateSex.bind(this);
        this.saveSex = this.saveSex.bind(this);

    }

    editCatchStatus(status){
        this.setState({
            ["status_catch"] : status
        })
    }


    loadCategories(sp){
        /**
        * Fetch categories by species from server and save in state.
        */

        const apiCategoriesSpecies = this.apiCategoriesSpecies + sp;
        return fetch(apiCategoriesSpecies)
        .then(response => {
            if(response.status > 400){
                return this.setState(() => {
                    return { placeholder: "Something went wrong!" }
                });
            }
            return response.json();
        })
        .then(categories => {
            this.setState(() => {
                return {
                    categories: categories
                };
            });
        })
    }

    updateSex(event, sex_id){
        /**
        * Save the sex of state to database.
        */
        
        event.preventDefault();

        // get the sex of the catch which has been changed
        const updatedSex = this.props.this_catch.sexes.find(s => {
            return s.id == sex_id
        })

        console.log(JSON.stringify(updatedSex))
        fetch(this.apiSex, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(updatedSex)
        })
        .catch(error => console.log('Error'))

    }

    saveSex(event, catch_id){
        /**
        * Save the sex of state to database.
        */
        
        event.preventDefault();

        // get the sex of the catch which has been changed
        const newSex = this.props.this_catch.find( c => {
            return c.id == catch_id
        })

        // const newSex = {
        //     "catch_id": this.props.this_catch.id,
        //     "sex": new_sex
        // }

        fetch(this.apiSex, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(newSex)
        })
        // .then(response => response.json())
        // .then(sex => {
        //     const newSexState = update(this.props.this_catch, {
        //         "sexes": {"id": {$set: sex.id},
        //                   "sex": {$set: sex.sex},
        //                   "catch_id": {$set: sex.catch_id}
        //         }
        //     })

        //     this.setState(() => {
        //         return{ catch: newSexState }

        //     })
            
        // })
        .catch(error => console.log('Error'))

    }

    render() { 

        const this_catch = this.props.this_catch
                                
        const sampled_weight = this_catch.samples && this_catch.samples.sampled_weight? this_catch.samples.sampled_weight : null;
        const sexes = this_catch.sexes ? this_catch.sexes : null
        

        if (this.state.status_catch === "view" || this.state.status_catch === "" ){

            return ( 
                <Fragment>
                <tr style={{verticalAlign: "top"}} key={ this_catch.id } >
                    <ComponentCategory
                        status_catch = { this.state.status_catch }
                        this_catch = { this.props.this_catch } />
                <td>
                    { this_catch.weight }
                    <button onClick= { () => { this.editCatchStatus("edit") } }>Edit catch</button>
                    <button onClick= { this.props.removeCatch(this_catch.id) }>Remove catch</button>
                </td>


                <td>
                    <ComponentSexes
                        sexes = { sexes }
                        catch_id = { this.props.this_catch.id }
                        handleSex= { this.props.handleSex }
                        updateSex= { this.updateSex }
                        saveSex= { this.saveSex }
                        editCatchStatus= { this.editCatchStatus }
                        handleNewSexSubmit = { this.props.handleNewSexSubmit } 
                        />
                </td>
                </tr>
                </Fragment>
            );

        } else if (this.state.status_catch === "edit"){
            return ( 
                <Fragment>
                <tr style={{verticalAlign: "top"}} key={ this_catch.id } >
                <ComponentCategory
                            status_catch = { this.state.status_catch }
                            this_catch = { this.props.this_catch }
                            species = {this.props.species }
                            categories = { this.state.categories }
                            handleChangeGroup = { this.props.handleChangeGroup }
                            handleChangeSpecies = { this.props.handleChangeSpecies }
                            handleChangeCategory = { this.props.handleChangeCategory }
                            handleChangeWeight = { this.props.handleChangeWeight } />
                <td>
                <button onClick={ () =>  {
                        this.props.updateCatch(this_catch.id);
                        this.editCatchStatus("view");
                        }
                    }>Save</button>
                </td>
                </tr>
            </Fragment>
            );
        }


        // return ( 
        //     <Fragment>
        //     <tr style={{verticalAlign: "top"}} key={ this_catch.id } >

        //     <ComponentCategory status_catch = { this.state.status_catch }
        //                        this_catch = { this.props.this_catch }
        //                        species = {this.props.species }
        //                        categories = { this.state.categories }
        //                        editCatchStatus = { this.editCatchStatus }
        //                        handleChangeGroup = { this.props.handleChangeGroup }
        //                        handleChangeSpecies = { this.props.handleChangeSpecies }
        //                        handleChangeCategory = { this.props.handleChangeCategory }
        //                        handleChangeWeight = { this.props.handleChangeWeight }
        //                        updateCatch = { this.props.updateCatch }
        //                        removeCatch = { this.props.removeCatch }
        //                        />
        //     {/* <td>
        //         { sampled_weight }
        //     </td> */}
        //     {/* <td>
        //         <ComponentSexes sexes={ sexes }
        //                         status_sexes= { this.state.status_sexes }
        //                         handleSex= { this.handleSex }
        //                         updateSex={ this.updateSex }
        //                         saveSex={ this.saveSex }
        //                         editCatchStatus={ this.editCatchStatus }/>
        //     </td> */}
        //     </tr>
        //     </Fragment>
        // );

        

    }
}
 
export default Catch;
