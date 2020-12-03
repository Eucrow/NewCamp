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
            loaded: false,
            placeholder: "Loading"
        }

        this.apiCatches = "http://127.0.0.1:8000/api/1.0/catches/";
        this.apiCatch = "http://127.0.0.1:8000/api/1.0/catch/"
        // TODO: change the apiSpecies api to only return the id, sp_name, group and sp_code variables.
        this.apiSpecies = "http://127.0.0.1:8000/api/1.0/species";
        this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        this.apiEditRemoveCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path // To edit and remove catches
        this.apiSex = "http://127.0.0.1:8000/api/1.0/sexes/"
        
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.updateCatch = this.updateCatch.bind(this);
        this.removeCatch = this.removeCatch.bind(this);
        this.updateSex = this.updateSex.bind(this);
        this.handleNewSexSubmit = this.handleNewSexSubmit.bind(this);
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

    handleChangeCategory = idx => evt =>{
        /**
         * Handle change of new catch form.
         */

        const value = evt.target.value;

        // Firstly, get the data of catch to modify
        const thisCatch = this.state.catches.find(c => {
            if( c.id === idx ) return c;
        })

        // Secondly, check if exists another catch whith the same species and category
        const repeatedCatch = this.state.catches.some(c =>
            //the comparison between c.category and value must be with == instead of === 
            (c.group === thisCatch.group) & (c.sp_code === thisCatch.sp_code) & (c.category == value)
        )

        // And finally save the state or thrown an alert.
        if (repeatedCatch === true) {

            alert("This category of the species already exists");
            
        } else if (repeatedCatch === false) {

            const newCatches = this.state.catches.map(c => {
                if( c.id !== idx ) return c;
                return{
                    ...c,
                    category: value
                }
    
            })
    
            this.setState({
                catches: newCatches
            });

        }

    }

    handleChangeWeight = idx => evt =>{
    // handleChangeWeight (event) { 
        /**
         * Handle change of new catch form.
         */       
        const value = evt.target.value;
        
        const newCatches = this.state.catches.map(c => {
            if ( c.id !== idx ) return c;
            return{
                ...c,
                weight: value
            }
        })

        this.setState({
            catches: newCatches
        })
    }

    updateCatch = idx =>{
        /**
        * Update catch in database.
        */

        const updatedCatch = this.state.catches.find(
            function(c) {
                return (idx === c.id)
            })

        const request = {"id" : updatedCatch.id,
                         "haul_id" : updatedCatch.haul,
                         "sp_id" : updatedCatch.sp_id,
                         "category" : updatedCatch.category,
                         "weight" : updatedCatch.weight}

        fetch(this.apiEditRemoveCatch, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(request)
        })
        .then( response => response.json())
        .catch(error => alert(error))


    }

    updateSex = (ids, idc) => evt => {

        const value = evt.target.value;

        const newCatches = this.state.catches.map(c => {
            if (idc !== c.id) {
                return c;
            } else {
                const newSexes = c.sexes.map(s =>{
                    if (ids !== s.id) return s;
                    return {...s, sex: value };
                })
                return {...c, sexes: newSexes };
            }
        })

        this.setState(() => {
            return {
                catches: newCatches
            }
        })  

    }

    handleNewSexSubmit = (evt, sex, idc) => {
        /**
         * Handle new sex submit.
         * Fetch the new sex and update the catches state.
         */

        evt.preventDefault();

        var data = {
            "catch_id" : idc,
            "sex" : sex
        }

        console.log(JSON.stringify(data))

        fetch(this.apiSex, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(data)
        })
        .then(response => {
            if(response.status > 400){
                // return this.setState(() => {
                //     return { placeholder: "Something went wrong!" }
                // });
                alert("Error: maybe the sex already exists.")
            }
            return response.json();
        })
        .then(newSex => {
            const newCatches = this.state.catches.map(c => {
                if (c.id !== idc) return c;
                c.sexes.push(newSex)
                return c;
            })

            this.setState(() => {
                return {
                    catches: newCatches
                }
            }) 
        } )
        .catch(error => console.log('Error'))
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
                            <Catch
                                key ={ c.id }
                                this_catch ={ c }
                                species ={ this.state.species }
                                handleChangeGroup = { this.handleChangeGroup }
                                handleChangeSpecies = { this.handleChangeSpecies }
                                handleChangeCategory = { this.handleChangeCategory }
                                handleChangeWeight = { this.handleChangeWeight }
                                updateCatch = { this.updateCatch }
                                removeCatch = { this.removeCatch }
                                updateSex = { this.updateSex }
                                handleNewSexSubmit = { this.handleNewSexSubmit } />
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