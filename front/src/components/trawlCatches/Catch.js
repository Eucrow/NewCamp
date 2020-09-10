import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';
import CatchEditForm from './CatchEditForm.js';

class Catch extends Component {
    /**
     * Catch form.
     * @param {object} props.this_catch:
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

        this.editCatchStatus = this.editCatchStatus.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
        this.loadSpecies = this.loadSpecies.bind(this);
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        

    }

    
    loadSpecies(group){
        /**
         * Fetch species by group from server and save in state.
         */

        const apiSpeciesGroup = this.apiSpeciesGroup + group;
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

    editCatchStatus(status){
        this.setState({
            ["status_catch"] : status
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
                            ["sp"] : sp,
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

    componentDidMount() {

        if (this.state.status_catch === "edit"){
            this.loadSpecies(this.state.catch.group)
            .then(() => {
                console.log("Species loaded.")
            })
    
            this.loadCategories(this.state.catch.sp_id)
            .then(() => {
                console.log("Categories loaded.")
            })
        }
    }

    render() { 

        const this_catch = this.state.catch
                                
        const sampled_weight = this_catch.samples && this_catch.samples.sampled_weight? this_catch.samples.sampled_weight : null;
        const sexes = this_catch.sexes ? this_catch.sexes : null

        if (this.state.status_catch === "view") {
            return ( 
                <Fragment>
                <tr style={{verticalAlign: "top"}} key={ this_catch.id }>
                <td>{ this_catch.group } { this_catch.sp_code}</td>
                <td>{ this_catch.sp_name }</td>
                <td>{ this_catch.category }</td>
                <td>{ this_catch.weight }</td>
                <button onClick= { () => { this.editCatchStatus("edit")} }>Edit</button>
                <td>{ sampled_weight }</td>
                <td>
                    { sexes.map(s=>{
                        return ( 
                            <table><tbody><tr style={{verticalAlign: "top"}}><td>
                                { s.sex }
                                <ComponentsLengths sex_id={ s.id } isVisible={ false }/>
                            </td></tr></tbody></table>
                    )
                }) }
                </td>
                </tr>
                </Fragment>

            );
        } else if (this.state.status_catch === "edit"){
                // return(
                // <Fragment>
                // <tr style={{verticalAlign: "top"}} key={ this.state.catch.id }>
                //     <td>
                //     <input type="hidden" id="haul_id" name="haul_id" value={ this.state.catch.haul_id } />
                //     <input type="number" id="group" name="group" min="1" max="5"
                //             value={ this.state.catch.group } onChange={ this.handleChangeGroup }/>
    
                //     <select id="sp_code" name="sp_code"
                //             value = { this.state.catch.sp_id}
                //             onChange={ this.handleChangeSpecies }>
                //         {this.state.species.map(s=>{
                //             return(<option value={s.id}>{s.sp_code}</option>)
                //         })}
                        
                //     </select>
                //     </td>
                //     <td>
                //         {this.state.catch.sp_name}
                //     </td>
                //     <td>
                //     <select id="category_id" name="category_id"
                //             value= { this.state.catch.category_id + "--" + this.state.catch.category }
                //             onChange={ this.handleChangeCategory }>
                //         <option>select one...</option>
                //         {this.state.categories.map(c=>{
                //             return(<option value={c.id + "--" + c.category_name}>{c.category_name}</option>)
                //         })}
                //     </select>
                //     </td>
                //     <td>
                //     <input type="number" id="weight" name="weight" value={ this.state.catch.weight } onChange={ this.handleChangeWeight } />
                //     </td>
                //     <td>
                //     <button onClick={ this.props.updateCatch }>Save</button>
                //     </td>
                // </tr>
                // </Fragment> 
                // )
            

            return(
                <CatchEditForm
                    this_catch = { this_catch }/>
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