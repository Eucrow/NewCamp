import React, { Component, Fragment } from 'react';

class CatchEditForm extends Component {
    /**
     * @param {object} props.this_catch:
     */
    constructor(props) {
        super(props);
        this.state = {
            catch : this.props.this_catch,
            species : [],
            categories : []
        }

        this.loadCategories = this.loadCategories.bind(this);
        this.loadSpecies = this.loadSpecies.bind(this);
        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChangeWeight = this.handleChangeWeight.bind(this);
        this.updateCatch = this.updateCatch.bind(this);
        this.existsCatch = this.existsCatch.bind(this);

        this.apiSpeciesGroup = "http://127.0.0.1:8000/api/1.0/species/group/";
        this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        this.apiUpdateCatch = "http://127.0.0.1:8000/api/1.0/catch"; //no / in end of the path
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

    // TODO: saveCatch and updateCatch are mostly the same, only change apiUpdateCatch with apiSaveCatch.
    updateCatch(event){
        /**
        * Save catch to database.
        */

        event.preventDefault();

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

    componentDidMount(){
        // TODO: every time this component is mounted, this fetch a request... think a way to avoid this.
        this.loadSpecies(this.state.catch.group)
        .then(() => {
            console.log("Species loaded.")
        })

        this.loadCategories(this.state.catch.sp_id)
        .then(() => {
            console.log("Categories loaded.")
        })
    }

    render() { 
        return ( 
            <Fragment>
            <tr style={{verticalAlign: "top"}} key={ this.state.catch.id }>
                <td>
                <input type="hidden" id="haul_id" name="haul_id" value={ this.state.catch.haul_id } />
                <input type="number" id="group" name="group" min="1" max="5"
                        value={ this.state.catch.group } onChange={ this.handleChangeGroup }/>

                <select id="sp_code" name="sp_code"
                        value = { this.state.catch.sp_id + "--" + this.state.catch.sp_code + "--" + this.state.catch.sp_name}
                        onChange={ this.handleChangeSpecies }>
                    {this.state.species.map(s=>{
                        return(<option value={s.id + "--" + s.sp_code + "--" + s.sp_name}>{s.sp_code}-{s.sp_name}</option>)
                    })}
                </select>
                </td>
                <td>
                    {this.state.catch.sp_name}
                </td>
                <td>
                <select id="category_id" name="category_id"
                        value= { this.state.catch.category_id + "--" + this.state.catch.category }
                        onChange={ this.handleChangeCategory }>
                    <option>select one...</option>
                    {this.state.categories.map(c=>{
                        return(<option value={c.id + "--" + c.category_name}>{c.category_name}</option>)
                    })}
                </select>
                </td>
                <td>
                <input type="number" id="weight" name="weight" value={ this.state.catch.weight } onChange={ this.handleChangeWeight } />
                </td>
                <td>
                <button onClick={ this.updateCatch }>Save</button>
                </td>
            </tr>
        </Fragment>            
         );
    }
}
 
export default CatchEditForm;