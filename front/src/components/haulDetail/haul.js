import React, { Component, Fragment } from 'react';

import ComponentsHaulHydrography from './FormHydrography.js';
import ComponentsHaulTrawl from './FormTrawl.js';
import ComponentsHaulMeteorology from './FormMeteorology.js';
import ComponentsHaulCommon from './FormCommonHaul.js';

import update from 'immutability-helper';

class ComponentsHaul extends Component {
    /**
     * 
     * @param {number} params.haul_id 
     * @param {number} params.sampler_id
     */
    
    constructor(props) {
        super(props);
        this.state = { 
            haul: {
                meteo: {},
                trawl_characteristics: {},
                hidrography_characteristics: {},
            },
            isEdit : this.props.location.state.isEdit,
            sampler_id : this.props.location.sampler_id,

         };

        this.apiTrawlHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/" + this.props.match.params.haul_id;
        this.apiHydrographyHaul = "http://127.0.0.1:8000/api/1.0/haul/hydrography/" + this.props.match.params.haul_id;

        this.handleChangeMeteorology = this.handleChangeMeteorology.bind(this);
        this.handleChangeTrawl = this.handleChangeTrawl.bind(this);
        this.handleChangeHydrography = this.handleChangeHydrography.bind(this);
        this.handleChangeCommonHaul = this.handleChangeCommonHaul.bind(this);
        this.handleChangeCommonValid = this.handleChangeCommonValid.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChangeCommonHaul (event) {
        const name = event.target.name;
        const value = event.target.value;
        console.log("name: " + name + "value: " + value);

        const newHaulState = update(this.state.haul, {
            [name]: {$set: value}
        })

        this.setState({
            haul: newHaulState
          });
    }

    handleChangeCommonValid (event) {
        const newHaulState = update(this.state.haul, {
                "valid": {$set: !this.state.haul.valid}
            })
    
        this.setState({
            haul: newHaulState
            });
    }

    handleChangeMeteorology (event) {
        const name = event.target.name;
        const value = event.target.value;
        
        const newHaulMeteo = update(this.state.haul, {
            meteo:{
                [name]: {$set: value}
            }
        });

        this.setState({
            haul: newHaulMeteo
        });
    }

    handleChangeTrawl (event) {
        const name = event.target.name;
        const value = event.target.value;

        const newHaulTrawl = update(this.state.haul, {
            trawl_characteristics:{
                [name]: {$set: value}
            }
        });

        this.setState({
            haul: newHaulTrawl
        });
    }

    handleChangeHydrography (event) {
        const name = event.target.name;
        const value = event.target.value;

        const newHaulHydrography = update(this.state.haul, {
            hydrography_characteristics:{
                [name]: {$set: value}
            }
        });

        this.setState({
            haul: newHaulHydrography
        });
    }

    handleSubmit(event) {
        // console.log("sampler_id :" + this.state.sampler_id);
        console.log("is valid: " + this.state.haul.valid);

        const apiHaul = this.state.sampler_id === 1 ? this.apiTrawlHaul
                        : this.state.sampler_id === 2 ? this.apiHydrographyHaul
                        : console.error("Error in sampler type.");

        fetch(apiHaul, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(this.state.haul)
        })
        .then(() => {
            this.setState(() => {
                return{isEdit: false}
            })
        })
        .catch(error => console.log('Error'))
        
        event.preventDefault();
    }
    
    componentDidMount() {

        const apiHaul = this.state.sampler_id === 1 ? this.apiTrawlHaul
                        : this.state.sampler_id === 2 ? this.apiHydrographyHaul
                        : console.error("Error in sampler type.");

                              

        fetch(apiHaul)
            .then(response => {
                if(response.status > 400){
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!"}
                    });
                }
                return response.json();
            })
            .then(haul => {
                this.setState(() => {
                    return {
                        haul
                    };
                });
            });

            

    }

    render() {
        // the first render does't have the haul yet
        if(this.state.haul.haul){

            const haul = this.state.haul;

            const isEdit = this.state.isEdit;
    
            const sampler_id = this.state.sampler_id;

            if(isEdit === false){
                return ( 
                <Fragment>

                    <ComponentsHaulCommon haul = { haul } isEdit = { isEdit } />

                    {
                    sampler_id===1? (
                        <Fragment>
                        <ComponentsHaulMeteorology haul = { haul } isEdit = { isEdit } />
                        <ComponentsHaulTrawl haul={ haul } isEdit = { isEdit } />
                        </Fragment>
                    ) : ( null )
                    }

                    {
                    sampler_id===2 ? (
                        <ComponentsHaulHydrography haul={ haul } isEdit={ isEdit }/> 
                        ) : (null)
                    }
                </Fragment>
                );
            } else if (isEdit===true){
                return(
                <Fragment>
                    <form>
                    <ComponentsHaulCommon haul = { haul }
                                          isEdit = { isEdit }
                                          handleChangeCommonValid = { this.handleChangeCommonValid }
                                          handleChangeCommonHaul = { this.handleChangeCommonHaul } />

                    { sampler_id===1 ? (
                        <Fragment>
                        <ComponentsHaulMeteorology haul = { haul } isEdit = { isEdit } handleChangeMeteorology={ this.handleChangeMeteorology }/>
                        <ComponentsHaulTrawl haul={ haul } isEdit={ isEdit } handleChangeTrawl={ this.handleChangeTrawl }/> 
                        </Fragment>
                        ) : (null)
                    }

                    { sampler_id===2 ? (
                        <ComponentsHaulHydrography haul={ haul } isEdit={ isEdit } handleChangeHydrography={ this.handleChangeHydrography }/>
                        ) : (null)
                    }
                    
                    <input type="submit" value="Save Haul" onClick={this.handleSubmit} />
                    </form>
                </Fragment>
                )
            }
        } else {
            return (null)
        }
    }
}
 
export default ComponentsHaul;
