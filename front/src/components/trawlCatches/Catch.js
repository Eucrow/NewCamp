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
            // catch: this.props.this_catch,
            species: [],
            categories: [],
            status_catch : "view"
        }

        // this.apiSpeciesGroup = "http://127.0.0.1:8000/api/1.0/species/group/";
        // this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        // this.apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path // To edit and remove catches
        this.apiSex = "http://127.0.0.1:8000/api/1.0/sexes/"

        this.editCatchStatus = this.editCatchStatus.bind(this);
        this.loadSpecies = this.loadSpecies.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        // this.handleChangeGroup = this.handleChangeGroup.bind(this);
        // this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        // this.handleChangeCategory = this.handleChangeCategory.bind(this);
        // this.handleChangeWeight = this.handleChangeWeight.bind(this);
        // this.updateCatch = this.updateCatch.bind(this);
        // this.removeCatch = this.removeCatch.bind(this);
        this.handleSex = this.handleSex.bind(this);
        this.updateSex = this.updateSex.bind(this);
        this.saveSex = this.saveSex.bind(this);

    }

    editCatchStatus(status){
        this.setState({
            ["status_catch"] : status
        })
    }

    loadSpecies(group){
        /**
         * Fetch species by group from server and save in state.
         */

        const apiSpeciesGroup = this.apiSpeciesGroup + group;
        return fetch(apiSpeciesGroup)
        .then(response => {
            if(response.status > 400){
                return this.setState(() => {
                    return { placeholder: "Something went wrong!" }
                });
            }
            return response.json();
        })
        .then(species => {
            this.setState(() => {
                return {
                    species: species
                };
            });
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

    // handleChangeGroup(event){
    //     /**
    //      * Method to mange the group field. When it is changed, get the species of the group.
    //      * Then, update de state.
    //      */

    //     const value = event.target.value;
        
    //     const apiSpeciesGroup = this.apiSpeciesGroup + value;
    //     console.log (apiSpeciesGroup)

    //     fetch(apiSpeciesGroup)
    //         .then(response => {
    //             if(response.status > 400){
    //                 return this.setState(() => {
    //                     return { placeholder: "Something went wrong!" }
    //                 });
    //             }
    //             return response.json();
    //         })
	// 		.then(species => {
	// 			this.setState(() => {
	// 				return {
    //                     species: species
	// 				};
	// 			});
    //         })
    //         .then(() =>{
    //             this.setState(() => {
    //                 return {
    //                     catch: {
    //                         ...this.props.this_catch,
    //                         ["group"] : value
    //                     }
    //                 }
    //             })
    //         });
    // }

    // handleChangeSpecies(event){
    //     /**
    //      * Method to get categories of the species, when the 'species' field is modified.
    //      * Then, update de state.
    //      */

    //     const value=event.target.value;
    //     const val=value.split("--")
    //     const sp=val[0]
    //     const sp_code=val[1]
    //     const sp_name=val[2]

    //     const apiCategoriesSpecies = this.apiCategoriesSpecies + sp;
    //     console.log (apiCategoriesSpecies)

    //     fetch(apiCategoriesSpecies)
    //         .then(response => {
    //             if(response.status > 400){
    //                 return this.setState(() => {
    //                     return { placeholder: "Something went wrong!" }
    //                 });
    //             }
    //             return response.json();
    //         })
	// 		.then(categories => {
	// 			this.setState(() => {
	// 				return {
    //                     categories: categories
	// 				};
	// 			});
    //         })
    //         .then(() =>{
    //             this.setState(() => {
    //                 return {
    //                     catch: {
    //                         ...this.props.this_catch,
    //                         ["sp_id"] : sp,
    //                         ["sp_code"] : sp_code,
    //                         ["sp_name"] : sp_name
    //                     }
    //                 }
    //             })
    //         });

    // }

    // handleChangeCategory (event) { 
    //     /**
    //      * Handle change of new catch form.
    //      */       
    //     const value = event.target.value;
    //     const val = value.split("--");
    //     const category_id = val[0];
    //     const category_name = val[1];

    //     this.setState({
    //         catch: {
    //             ...this.props.this_catch,
    //             ["category_id"] : category_id,
    //             ["category_name"] : category_name
    //         }
    //     });
    // }

    // handleChangeWeight (event) { 
    //     /**
    //      * Handle change of new catch form.
    //      */       
    //     const name = event.target.name;
    //     const value = event.target.value;        

    //     this.setState({
    //         catch: {
    //             ...this.props.this_catch,
    //             [name] : value
    //         }
    //     });
    // }

    // updateCatch(event){
    //     /**
    //     * Update catch to database.
    //     */

    //     event.preventDefault();

    //     // TODO: doesn't throw error when the species is changed and already exists.
    //     const request = {"id" : this.props.this_catch.id,
    //                     "weight" : this.props.this_catch.weight,
    //                     "category_id" : this.props.this_catch.category_id,
    //                     "haul_id" : this.props.this_catch.haul_id }

    //     fetch(this.apiEditRemoveCatch, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             },
    //         body: JSON.stringify(request)
    //     })
    //     .then( response => response.json())
    //     .then(c => {
    //         this.setState(() => {
    //             return{
    //                 status_catch : "view"
    //             }
    //         })
            
    //     })
    //     .catch(error => alert(error))

    // }

    handleSex(event){

        const name = event.target.name;
        const value = event.target.value;

        const updatedSex = this.props.this_catch.sexes
        const indexUpdatedSex = updatedSex.findIndex((s) => { return s.id == name })

        const newSexState = update(this.props.this_catch, {
            "sexes": {
                [indexUpdatedSex]: { "sex": {$set: value}}
            }
        })

        this.setState({
            catch: newSexState
        });
       
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

    saveSex(event, new_sex){
        /**
        * Save the sex of state to database.
        */
        
        event.preventDefault();

        // get the sex of the catch which has been changed
        const newSex = {
            "catch_id": this.props.this_catch.id,
            "sex": new_sex
        }

        fetch(this.apiSex, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(newSex)
        })
        .then(response => response.json())
        .then(sex => {
            const newSexState = update(this.props.this_catch, {
                "sexes": {"id": {$set: sex.id},
                          "sex": {$set: sex.sex},
                          "catch_id": {$set: sex.catch_id}
                }
            })

            this.setState(() => {
                return{ catch: newSexState }

            })
            
        })
        .catch(error => console.log('Error'))

    }

    componentDidMount(){
        // TODO: the species and categories shoul be fetched only one time, maybe
        // in CatchesList component?
        this.loadSpecies(this.props.this_catch.group)
        .then(() => {
            console.log("Species loaded.")
        })
        .then(()=>{
            this.loadCategories(this.props.this_catch.sp_id)
            .then(() => {
                console.log("Categories loaded.")
            })            
        })
    }

    render() { 

        const this_catch = this.props.this_catch
                                
        const sampled_weight = this_catch.samples && this_catch.samples.sampled_weight? this_catch.samples.sampled_weight : null;
        const sexes = this_catch.sexes ? this_catch.sexes : null

        return ( 
            <Fragment>
            <tr style={{verticalAlign: "top"}} key={ this_catch.id } >

            <ComponentCategory status_catch = { this.state.status_catch }
                               this_catch = { this.props.this_catch }
                               species = {this.state.species }
                               categories = { this.state.categories }
                               editCatchStatus = { this.editCatchStatus }
                               handleChangeGroup = { this.props.handleChangeGroup }
                               handleChangeSpecies = { this.props.handleChangeSpecies }
                               handleChangeCategory = { this.props.handleChangeCategory }
                               handleChangeWeight = { this.props.handleChangeWeight }
                               updateCatch = { this.props.updateCatch }
                               removeCatch = { this.props.removeCatch }
                               />
            {/* <td>
                { sampled_weight }
            </td> */}
            {/* <td>
                <ComponentSexes sexes={ sexes }
                                status_sexes= { this.state.status_sexes }
                                handleSex= { this.handleSex }
                                updateSex={ this.updateSex }
                                saveSex={ this.saveSex }
                                editCatchStatus={ this.editCatchStatus }/>
            </td> */}
            </tr>
            </Fragment>

        );

        // if (this.state.status_catch === "view") {
            // return ( 
            //     <Fragment>
            //     <tr style={{verticalAlign: "top"}} key={ this_catch.id } >

            //         <ComponentCategory status_catch = { this.state.status_catch }
            //                            this_catch = { this.props.this_catch }
            //                            species = {this.state.species }
            //                            categories = { this.state.categories }
            //                            editCatchStatus = { this.editCatchStatus }
            //                            handleChangeGroup = { this.handleChangeGroup }
            //                            handleChangeSpecies = { this.handleChangeSpecies }
            //                            handleChangeCategory = { this.handleChangeCategory }
            //                            handleChangeWeight = { this.handleChangeWeight }
            //                            updateCatch = { this.updateCatch }/>
            //     <td>{ this_catch.group } { this_catch.sp_code }</td>
            //     <td>{ this_catch.sp_name }</td>
            //     <td>{ this_catch.category }</td>
            //     <td>
            //         { this_catch.weight }
            //         <button onClick= { () => { this.editCatchStatus("edit")} }>Edit catch</button>
            //     </td>
            //     <td>
            //         { sampled_weight }
            //     </td>
            //     <td>
            //         <ComponentSexes sexes={ sexes }
            //                         status_sexes= { this.state.status_sexes }
            //                         handleSex= { this.handleSex }
            //                         updateSex={ this.updateSex }
            //                         saveSex={ this.saveSex }
            //                         editCatchStatus={ this.editCatchStatus }/>
            //     </td>
            //     </tr>
            //     </Fragment>

            // );
        // } else if (this.state.status_catch === "edit"){            
        //     return(
        //         <CatchEditForm
        //             this_catch = { this.props.this_catch }
        //             species = {this.state.species }
        //             categories = { this.state.categories }
        //             handleChangeGroup = { this.handleChangeGroup }
        //             handleChangeSpecies = { this.handleChangeSpecies }
        //             handleChangeCategory = { this.handleChangeCategory }
        //             handleChangeWeight = { this.handleChangeWeight }
        //             updateCatch = { this.updateCatch }/>
        //     )
        // }
        //  else if (this.state.status_catch === "addSex"){
        //     return(
        //         <ComponentSexes sexes={ sexes }
        //                         status_sexes= { "add" }
        //                         handleSex= { this.handleSex }
        //                         saveSex={ this.saveSex }
        //                         editCatchStatus={ this.editCatchStatus } />   
        //     )

        // }
    }
}
 
export default Catch;
