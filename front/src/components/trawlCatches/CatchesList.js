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
            loaded: false,
            placeholder: "Loading"
        }

        this.apiCatches = "http://127.0.0.1:8000/api/1.0/catches/"
        this.apiSpeciesGroup = "http://127.0.0.1:8000/api/1.0/species/group/";
        this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        this.apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path // To edit and remove catches

        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.updateCatch = this.updateCatch.bind(this);
        this.removeCatch = this.removeCatch.bind(this);
    }


    // removeCatch = idx => () => {
    //     this.setState({
    //         lengths: this.state.lengths.filter((s, sidx) => idx !== sidx)
    //     });
    // };


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
                        // console.log ("idx: ", idx)
                        // console.log ("c.id: ", c.id )
                        // console.log ( idx !== c.id )
                        return (idx !== c.id)
                    }
                )
            })
            

            // this.setState(() => {
            //     return{
            //         catch : ""
            //     }
            // })
            
        }).then(()=>console.log("despues: ", this.state.catches))
        .catch(error => alert(error))

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

            //     this.loadSpecies(this.state.catch.group)
    //     .then(() => {
    //         console.log("Species loaded.")
    //     })
    //     .then(()=>{
    //         this.loadCategories(this.state.catch.sp_id)
    //         .then(() => {
    //             console.log("Categories loaded.")
    //         })            
    //     })
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