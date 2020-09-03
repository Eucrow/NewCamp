import React, { Component, Fragment } from 'react';

class NewTrawlCatch extends Component {
    /**
     * 
     * @param {number} params.haul_id: id of the haul.
     */

    constructor(props) {
        super(props);
        this.state = {
            catch: [],
            haul_id: this.props.match.params.haul_id,
            species: [],
            categories: [],
            existsCatch: false,
            loaded: false,
            placeholder: "Loading"
        }

        this.apiSpeciesGroup = "http://127.0.0.1:8000/api/1.0/species/group/";
        this.apiCategoriesSpecies = "http://127.0.0.1:8000/api/1.0/species/category/";
        this.apiSaveCatch = "http://127.0.0.1:8000/api/1.0/catches/new";
        this.apiGetCatch = "http://127.0.0.1:8000/api/1.0/catches/category/";

        this.handleChangeGroup = this.handleChangeGroup.bind(this);
        this.handleChangeSpecies = this.handleChangeSpecies.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.existsCatch = this.existsCatch.bind(this);
        this.saveCatch = this.saveCatch.bind(this);

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
                        species: species,
                        loaded: true
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

        const apiCategoriesSpecies = this.apiCategoriesSpecies + value;
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
                        categories: categories,
                        loaded: true
					};
				});
            })
            .then(() =>{
                this.setState(() => {
                    return {
                        catch: {
                            ...this.state.catch,
                            ["sp"] : value
                        }
                    }
                })
            });

    }

    handleChange (event) { 
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
                .then(
                    this.setState(() => {
                        return{
                            catch: {
                                ... this.state.catch,
                                ["category_id"] : '',
                                ["weight"] : 0
                            }
                        }
                    })
                )
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
            <form>
                <input type="hidden" id="haul_id" name="haul_id" value={ this.props.haul_id } />
                <label for="group">Group:</label>
                <input type="number" id="group" name="group" min="1" max="5" onChange={ this.handleChangeGroup }/>
                <label for="sp_code">Specie code:</label>
                <select id="sp_code" name="sp_code" onChange={this.handleChangeSpecies }>
                    {this.state.species.map(s=>{
                        return(<option value={s.id}>{s.sp_code}-{s.sp_name}</option>)
                    })}
                </select>
                <label for="category_id">Category:</label>
                <select id="category_id" name="category_id" value={ this.state.catch.category_id }onChange={ this.handleChange }>
                    <option>select one...</option>
                    {this.state.categories.map(c=>{
                        return(<option value={c.id}>{c.category_name}</option>)
                    })}
                </select>
                <label for="weight">Total weight:</label>
                <input type="number" id="weight" name="weight" value={ this.state.catch.weight } onChange={ this.handleChange } />
                <button onClick={ this.saveCatch }>Save</button>
            </form>
            { this.state.existsCatch === true? 
                <p>The catch already exists.</p> :
                null
            }
            </Fragment>
         );
    }
}
 
export default NewTrawlCatch;