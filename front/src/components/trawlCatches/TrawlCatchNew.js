import React, { Component, Fragment } from 'react';

import TrawlCatchForm from "./TrawlCatchForm";

class NewTrawlCatch extends Component {
    /**
     * 
     * @param {number} params.haul_id: id of the haul.
     */

    constructor(props) {
        super(props);
        this.state = {
            haul_id: this.props.match.params.haul_id,
            catch: [],
            catch_id: "",
            sampled_weight: [],
            sexes:[],
            species: [],
            categories: [],
            loaded: false,
            placeholder: "Loading",
            status_catch: "new"
        }

        this.apiSpeciesGroup = "http://127.0.0.1:8000/api/1.0/species/group/";
        this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        this.apiSaveCatch = "http://127.0.0.1:8000/api/1.0/catches/new";
        this.apiGetCatch = "http://127.0.0.1:8000/api/1.0/catch/";
        this.apiUpdateCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path

        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.editCatchStatus = this.editCatchStatus.bind(this);
        this.existsCatch = this.existsCatch.bind(this);
        this.saveCatch = this.saveCatch.bind(this);
        this.updateCatch = this.updateCatch.bind(this);

    }
    
    handleChangeGroup(event){
        /**
         * Method to get the species of the group, when field 'group' is modified.
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

    editCatchStatus(status){
        this.setState({
            ["status_catch"] : status
        })
    }

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

    saveCatch(event){
        /**
        * Save catch to database.
        */

        event.preventDefault();

        this.existsCatch(this.state.catch.haul_id, this.state.catch.category_id)
        .then(response => {
            if(response === true){
                alert("Catch already exists")
            } else{
                fetch(this.apiSaveCatch, {
                    method: 'POST',
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
        })
        
    }

    // TODO: saveCatch and updateCatch are mostly the same, only change apiUpdateCatch with apiSaveCatch.
    updateCatch(event){
        /**
        * Save catch to database.
        */

        event.preventDefault();

        this.existsCatch(this.state.catch.haul_id, this.state.catch.category_id)
        .then(response => {
            if(response === true){
                alert("Catch already exists")
            } else{
                fetch(this.apiUpdateCatch, {
                    method: 'POST',
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
        })
        
    }

    componentDidMount(){
        /**
         * When the component is mount, add haul id to catch state.
         */
        this.setState({
            catch: {
                ["haul_id"] : this.state.haul_id
            }
        })

    }

    render() { 
        return ( 
            <Fragment>
                <p>haul_id: {this.state.haul_id}</p>

                <TrawlCatchForm catch={ this.state.catch }
                                species={ this.state.species }
                                categories={ this.state.categories }
                                loaded={ this.state.loaded }
                                status_catch={ this.state.status_catch }
                                editCatchStatus={ this.editCatchStatus }
                                handleChangeGroup={ this.handleChangeGroup }
                                handleChangeSpecies={ this.handleChangeSpecies }
                                handleChangeCategory={ this.handleChangeCategory }
                                handleChangeWeight={ this.handleChangeWeight }
                                saveCatch={ this.saveCatch }
                                updateCatch={ this.updateCatch }/>

            </Fragment>
         );
    }
}
 
export default NewTrawlCatch;