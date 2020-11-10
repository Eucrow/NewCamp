import React, { Component, Fragment } from 'react';

import Catch from './Catch.js';

class CatchesList extends Component {
    /**
     * Component to print all the caches of the haul.
     * @param {number} props.haul_id: id of haul.
     */
    
    constructor(props) {
        super(props);
        this.state = { 
            catches: [],
            species: [],
            categories: [],
            loaded: false,
            placeholder: "Loading"
        }

        this.apiCatches = "http://127.0.0.1:8000/api/1.0/catches/";
        // TODO: change the apiSpecies api to only return the id, sp_name, group and sp_code variables.
        this.apiSpecies = "http://127.0.0.1:8000/api/1.0/species";
        this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        this.apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path // To edit and remove catches

        
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.updateCatch = this.updateCatch.bind(this);
        this.removeCatch = this.removeCatch.bind(this);
    }

    removeCatch = idx => () => {
        /**
        * Remove catch to database.
        */

        const request = { "id" : idx }

        fetch(this.apiEditRemoveCatch, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            body: JSON.stringify(request)
        })
        // .then( response => response.json())
        .then(() => {
            console.log("antes: ", this.state.catches)

            this.setState({
                catches: this.state.catches.filter(
                    function(c) {
                        return (idx !== c.id)
                    }
                )
            })
            
        }).then(()=>console.log("despues: ", this.state.catches))
        .catch(error => alert(error))

    }

    handleChangeGroup = idx => evt =>{
        /**
         * Method to mange the group field. When it is changed, get the species of the group.
         * Then, update de state.
         */        
        const value = evt.target.value

        const apiSpeciesGroup = this.apiSpeciesGroup + value;
        console.log (apiSpeciesGroup)

        const newCatches = this.state.catches.map(c => {
            if (idx !== c.id) return c;
            return { ...c, group: value };
        });

        this.setState(() => {
            return {
                catches: newCatches
            }
        })

    }
    
    // handleChangeSpecies(event){
    handleChangeSpecies = idx => evt =>{
        /**
         * Method to get categories of the species, when the 'species' field is modified.
         * Then, update de state.
         */

        const value=evt.target.value;
        const val=value.split("--")
        const sp=val[0]
        const sp_code=val[1]
        const sp_name=val[2]

        const apiCategoriesSpecies = this.apiCategoriesSpecies + sp;
        console.log (apiCategoriesSpecies)

        const newCatches = this.state.catches.map(c => {
            if (idx !== c.id) return c;
            return {
                ...c,
                sp_id: sp,
                sp_code: sp_code,
                sp_name: sp_name };
        });

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
                        catches: newCatches
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

    updateCatch(event){
        /**
        * Update catch to database.
        */

        event.preventDefault();

        // TODO: doesn't throw error when the species is changed and already exists.
        const request = {"id" : this.state.catch.id,
                        "weight" : this.state.catch.weight,
                        "category_id" : this.state.catch.category_id,
                        "haul_id" : this.state.catch.haul_id }

        fetch(this.apiEditRemoveCatch, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(request)
        })
        .then( response => response.json())
        .then(c => {
            this.setState(() => {
                return{
                    status_catch : "view"
                }
            })
            
        })
        .catch(error => alert(error))

    }

    componentDidMount() {
        
        const apiCatches = this.apiCatches + this.props.haul_id;

        fetch(apiCatches)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
			.then(catches => {
				this.setState(() => {
					return {
                        catches: catches,
						loaded: true
					};
				});
            })
        
        fetch(this.apiSpecies)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return{ placeholder: "Something went wrong!" }
                    })
                }
                return response.json();
            })
            .then(species => {
                this.setState(() => {
                    return{
                        species: species
                    }
                })
            })
    }

    render() { 
        if (this.state.catches.length === 0) {
            return ( 
                <Fragment>
                    <p>There aren't catches yet</p>
                </Fragment>
                )
        } else {
            return(
            <table style={{verticalAlign: "top", borderWidth: 1, borderColor: "blue", borderStyle: "dotted"}}>
            <thead>
            <tr style={{verticalAlign: "top"}}>
                <td>Code</td>
                <td>Name</td>
                <td>Category</td>
                <td>Total Weight</td>
                <td>Sampled Weight</td>
                <td>Sexes</td>
            </tr>
            </thead>
            <tbody>
                {
                    this.state.catches.map(c => {       
                        return(
                            <Catch key={ c.id }
                            this_catch={ c }
                            species={ this.state.species }
                            categories={ this.state.categories }
                            handleChangeGroup = { this.handleChangeGroup }
                            handleChangeSpecies = { this.handleChangeSpecies }
                            handleChangeCategory = { this.handleChangeCategory }
                            handleChangeWeight = { this.handleChangeWeight }
                            updateCatch = { this.updateCatch }
                            removeCatch = { this.removeCatch }/>
                        )
                    })
                    
                }
            </tbody>
            </table>
            );
        }

    }
}
 
export default CatchesList;