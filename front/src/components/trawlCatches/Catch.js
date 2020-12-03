import React, { Component, Fragment } from 'react';

import update from 'immutability-helper';

import ComponentSexes from '../sexes/SexesList.js'
import ComponentCategory from './Category.js';
import CatchEditForm from './CatchEditForm.js';

class Catch extends Component {
    /**
     * Catch form.
     * @param {object} props.this_catch: object with this catch.
     * @param {object} props.species: obejct with species list.
     * @param {object} props.handleChangeGroup: 
     * @param {object} props.handleChangeSpecies: 
     * @param {object} props.handleChangeCategory: 
     * @param {object} props.handleChangeWeight: 
     * @param {object} props.updateCatch: 
     * @param {object} props.removeCatch: 
     * @param {object} props.updateSex: 
     * @param {object} props.handleNewSexSubmit: 
     */

    constructor(props) {
        super(props);
        this.state = {
            status_catch : ""
        }

        this.editCatchStatus = this.editCatchStatus.bind(this);

    }

    editCatchStatus(status){
        this.setState({
            ["status_catch"] : status
        })
    }

    render() { 

        const this_catch = this.props.this_catch
                                
        const sampled_weight = this_catch.samples && this_catch.samples.sampled_weight? this_catch.samples.sampled_weight : null;
        const sexes = this_catch.sexes ? this_catch.sexes : null
        

        if (this.state.status_catch === "view" || this.state.status_catch === "" ){

            return ( 
                <Fragment>
                <tr style={{verticalAlign: "top"}} key={ this_catch.id } >
                    <ComponentCategory
                        status_catch = { this.state.status_catch }
                        this_catch = { this.props.this_catch } />
                <td>
                    { this_catch.weight }
                    <button onClick= { () => { this.editCatchStatus("edit") } }>Edit catch</button>
                    <button onClick= { this.props.removeCatch(this_catch.id) }>Remove catch</button>
                </td>


                <td>
                    <ComponentSexes
                        sexes = { sexes }
                        catch_id = { this.props.this_catch.id }
                        updateSex= { this.updateSex }
                        editCatchStatus= { this.editCatchStatus }
                        handleNewSexSubmit = { this.props.handleNewSexSubmit } 
                        />
                </td>
                </tr>
                </Fragment>
            );

        } else if (this.state.status_catch === "edit"){
            return ( 
                <Fragment>
                <tr style={{verticalAlign: "top"}} key={ this_catch.id } >
                <ComponentCategory
                            status_catch = { this.state.status_catch }
                            this_catch = { this.props.this_catch }
                            species = {this.props.species }
                            handleChangeGroup = { this.props.handleChangeGroup }
                            handleChangeSpecies = { this.props.handleChangeSpecies }
                            handleChangeCategory = { this.props.handleChangeCategory }
                            handleChangeWeight = { this.props.handleChangeWeight } />
                <td>
                <button onClick={ () =>  {
                        this.props.updateCatch(this_catch.id);
                        this.editCatchStatus("view");
                        }
                    }>Save</button>
                </td>
                </tr>
            </Fragment>
            );
        }
    }
}
 
export default Catch;
