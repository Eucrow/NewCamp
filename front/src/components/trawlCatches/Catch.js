import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';
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
            catch: this.props.this_catch,
            species: [],
            categories: [],
            status_catch : "view"
        }

        this.apiSpeciesGroup = "http://127.0.0.1:8000/api/1.0/species/group/";
        this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        this.apiUpdateCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path

        this.editCatchStatus = this.editCatchStatus.bind(this);
        this.loadSpecies = this.loadSpecies.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.updateCatch = this.updateCatch.bind(this);
        this.existsCatch = this.existsCatch.bind(this);
        this.existsCatchInState = this.existsCatchInState.bind(this);

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

    handleChangeGroup(event){
        /**
         * Method to mange the group field. When it is changed, get the species of the group.
         * Then, update de state.
         */

        const value = event.target.value;
        
        const apiSpeciesGroup = this.apiSpeciesGroup + value;
        console.log (apiSpeciesGroup)

        fetch(apiSpeciesGroup)
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
            .then(() =>{
                this.setState(() => {
                    return {
                        catch: {
                            ...this.state.catch,
                            ["group"] : value
                        }
                    }
                })
            });
    }

    handleChangeSpecies(event){
        /**
         * Method to get categories of the species, when the 'species' field is modified.
         * Then, update de state.
         */

        const value=event.target.value;
        const val=value.split("--")
        const sp=val[0]
        const sp_code=val[1]
        const sp_name=val[2]

        const apiCategoriesSpecies = this.apiCategoriesSpecies + sp;
        console.log (apiCategoriesSpecies)

        fetch(apiCategoriesSpecies)
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
            .then(() =>{
                this.setState(() => {
                    return {
                        catch: {
                            ...this.state.catch,
                            ["sp_id"] : sp,
                            ["sp_code"] : sp_code,
                            ["sp_name"] : sp_name
                        }
                    }
                })
            });

    }

    handleChangeCategory (event) { 
        /**
         * Handle change of new catch form.
         */       
        const value = event.target.value;
        const val = value.split("--");
        const category_id = val[0];
        const category_name = val[1];

        this.setState({
            catch: {
                ...this.state.catch,
                ["category_id"] : category_id,
                ["category_name"] : category_name
            }
        });
    }

    handleChangeWeight (event) { 
        /**
         * Handle change of new catch form.
         */       
        const name = event.target.name;
        const value = event.target.value;        

        this.setState({
            catch: {
                ...this.state.catch,
                [name] : value
            }
        });
    }

    existsCatchInState(group, sp_id, category_id) {
        return this.props.catches.some(item => {
             return (group == item.group &&
                     sp_id == item.sp_id &&
                     category_id == item.category_id)
        });
    }

    // TODO: existsCatch maybe useless: remove??
    existsCatch(haul_id, category_id){
        /**
         * Method to check if a catch exists in database.
         * @param {number} haul_id: id of haul.
         * @param {number} category_id: id of category.
         */

        const apiGetCatch = this.apiGetCatch + haul_id + "/" + category_id;

        return fetch(apiGetCatch)
            .then(response => {
                if(response.status == 200){
                    return true
                } else {
                    return false
                }
            })
            .catch(function(error) {
                console.log(error);
            });

    }

    updateCatch(event){
        /**
        * Save catch to database.
        */

        event.preventDefault();

        if(this.existsCatchInState(this.state.catch.group, this.state.catch.sp_id, this.state.catch.category_id)){
            alert("There are already saved the category " + this.state.catch.category_name + "of " + this.state.catch.sp_name)
        } else {
            fetch(this.apiUpdateCatch, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(this.state.catch)
            })
            .then( response => response.json())
            .then(c => {
                this.setState(() => {
                    return{
                        catch: {
                            ...this.state.catch,
                            ["catch_id"] : c.id,
                        },
                        loaded : true,
                        status_catch : "view"
                    }
                })
                
            })
            .catch(error => console.log('Error'))
        } 
    }

    componentDidMount(){

        this.loadSpecies(this.state.catch.group)
        .then(() => {
            console.log("Species loaded.")
        })
        .then(()=>{
            this.loadCategories(this.state.catch.sp_id)
            .then(() => {
                console.log("Categories loaded.")
            })            
        })


    }

    render() { 

        const this_catch = this.state.catch
                                
        const sampled_weight = this_catch.samples && this_catch.samples.sampled_weight? this_catch.samples.sampled_weight : null;
        const sexes = this_catch.sexes ? this_catch.sexes : null

        if (this.state.status_catch === "view") {
            return ( 
                <Fragment>
                <tr style={{verticalAlign: "top"}} key={ this_catch.id } >
                <td>{ this_catch.group } { this_catch.sp_code}</td>
                <td>{ this_catch.sp_name }</td>
                <td>{ this_catch.category }</td>
                <td>
                    { this_catch.weight }
                    <button onClick= { () => { this.editCatchStatus("edit")} }>Edit catch</button>
                </td>
                
                <td>{ sampled_weight }</td>
                <td>
                    { sexes.map(s=>{
                        return ( 
                        sexes.lenght === 0?
                        <button>Add Lengths</button>:
                        <table><tbody><tr style={{verticalAlign: "top"}}><td>
                            { s.sex }
                            <ComponentsLengths sex_id={ s.id } isVisible={ false } status_lengths={ "visible"} />
                        </td></tr></tbody></table>
                    )
                }) }
                </td>
                </tr>
                </Fragment>

            );
        } else if (this.state.status_catch === "edit"){            

            return(
                <CatchEditForm
                    this_catch = { this.state.catch }
                    species = {this.state.species }
                    categories = { this.state.categories }
                    handleChangeGroup = { this.handleChangeGroup }
                    handleChangeSpecies = { this.handleChangeSpecies }
                    handleChangeCategory = { this.handleChangeCategory }
                    handleChangeWeight = { this.handleChangeWeight }
                    updateCatch = { this.updateCatch }/>
            )

        }
    }
}
 
export default Catch;

// render() {
//     if(this.props.status_catch === "new"){
//         return(
//             <form style={{backgroundColor: 'green'}}>
//                 <input type="hidden" id="haul_id" name="haul_id" value={ this.props.haul_id } />
//                 <label for="group">Group:</label>
//                 <input type="number" id="group" name="group" min="1" max="5" onChange={ this.props.handleChangeGroup }/>
//                 <label for="sp_code">Specie code:</label>
//                 <select id="sp_code" name="sp_code" onChange={ this.props.handleChangeSpecies }>
//                     {this.props.species.map(s=>{
//                         return(<option value={s.id + "--" + s.sp_code + "--" + s.sp_name}>{s.sp_code}-{s.sp_name}</option>)
//                     })}
//                 </select>
//                 <label for="category_id">Category:</label>
//                 <select id="category_id" name="category_id" onChange={ this.props.handleChangeCategory }>
//                     <option>select one...</option>
//                     {this.props.categories.map(c=>{
//                         return(<option value={c.id + "--" + c.category_name}>{c.category_name}</option>)
//                     })}
//                 </select>
//                 <label for="weight">Total weight:</label>
//                 <input type="number" id="weight" name="weight" value={ this.props.catch.weight } onChange={ this.props.handleChangeWeight } />
//                 <button onClick={ this.props.saveCatch }>Save</button>
//             </form>
//         )
//     } else if (this.props.status_catch === "view") {
//         return(
//             <Fragment>
//                 <div style={{backgroundColor: 'green'}}>
//                 Group: { this.props.catch.group }
//                 Specie code: { this.props.catch.sp_code }
//                 Specie name: { this.props.catch.sp_name }
//                 Category: { this.props.catch.category_name }
//                 Total weight: { this.props.catch.weight }
//                 <button onClick= { () => { this.props.editCatchStatus("edit")} }>Edit</button>
//                 </div>

//                 <TrawlSampleForm catch_id={ this.props.catch.catch_id }/>

//             </Fragment>                
//         )
//     } else if (this.props.status_catch === "edit"){
        // return(
        //     <form style={{backgroundColor: 'green'}}>
        //         <input type="hidden" id="haul_id" name="haul_id" value={ this.props.haul_id } />
        //         <label for="group">Group:</label>
        //         <input type="number" id="group" name="group" min="1" max="5"
        //                value={ this.props.catch.group } onChange={ this.props.handleChangeGroup }/>
        //         <label for="sp_code">Specie code:</label>
        //         <select id="sp_code" name="sp_code"
        //                 value = { this.props.catch.sp + "--" + this.props.catch.sp_code + "--" + this.props.catch.sp_name}
        //                 onChange={ this.props.handleChangeSpecies }>
        //             {this.props.species.map(s=>{
        //                 return(<option value={s.id + "--" + s.sp_code + "--" + s.sp_name}>{s.sp_code}-{s.sp_name}</option>)
        //             })}
        //         </select>
        //         <label for="category_id">Category:</label>
        //         <select id="category_id" name="category_id"
        //                 value= { this.props.catch.category_id + "--" + this.props.catch.category_name }
        //                 onChange={ this.props.handleChangeCategory }>
        //             <option>select one...</option>
        //             {this.props.categories.map(c=>{
        //                 return(<option value={c.id + "--" + c.category_name}>{c.category_name}</option>)
        //             })}
        //         </select>
        //         <label for="weight">Total weight:</label>
        //         <input type="number" id="weight" name="weight" value={ this.props.catch.weight } onChange={ this.props.handleChangeWeight } />
        //         <button onClick={ this.props.updateCatch }>Save</button>
        //     </form>
        // )
//     }
    
// }