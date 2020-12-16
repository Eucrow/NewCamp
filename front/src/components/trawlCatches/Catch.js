import React, { Component, Fragment } from 'react';

import update from 'immutability-helper';

import ComponentSexes from '../sexes/SexesList.js'
import ComponentCategory from './Category.js';
import CatchEditForm from './CatchEditForm.js';

class Catch extends Component {
    /**
     * Catch form.
     * @param {object} props.this_catch: catch managed by this component.
     * @param {object} props.species: species list.
     * @param {method} props.handleChangeGroup: managing of group state and field.
     * @param {method} props.handleChangeSpecies: managing of species state and field.
     * @param {method} props.handleChangeCategory: managing of category state and field.
     * @param {method} props.handleChangeWeight: managing of weight state and field.
     * @param {method} props.updateCatch: update catch in database.
     * @param {method} props.removeCatch: remove catch in database.
     * @param {method} props.handleChangeSex: update sex in database.
     * @param {method} props.handleNewSexSubmit: handle the new sex form.
     */

    constructor(props) {
        super(props);
        this.state = {
            status_catch : "" // State of Catch component: "", "vier" or "edit". 
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
                        handleChangeSex= { this.props.handleChangeSex }
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
                <input type="submit" value="Save catch"/>
                </td>
                </tr>
            </Fragment>
            );
        }
    }
}
 
export default Catch;
