import React, { Component, Fragment } from 'react';

import TrawlSampleForm from "./TrawlSampleForm";

class TrawlCatchForm extends Component {
    /**
     * Catch form.
     * @param {} catch:
     * @param {} species:
     * @param {} categories:
     * @param {boolean} loaded: 
     * @param {string} status_catch: Options: 'view', 'edit', 'new'.
     * @param {method} editCatchStatus:
     * @param {method} handleChangeGroup: 
     * @param {method} handleChangeSpecies: 
     * @param {method} handleChangeCategory: 
     * @param {method} handleChangeWeight: 
     * @param {method} saveCatch:
     * @param {method} updateCatch:
     */


    render() {
        if(this.props.status_catch === "new"){
            return(
                <form style={{backgroundColor: 'green'}}>
                    <input type="hidden" id="haul_id" name="haul_id" value={ this.props.haul_id } />
                    <label for="group">Group:</label>
                    <input type="number" id="group" name="group" min="1" max="5" onChange={ this.props.handleChangeGroup }/>
                    <label for="sp_code">Specie code:</label>
                    <select id="sp_code" name="sp_code" onChange={ this.props.handleChangeSpecies }>
                        {this.props.species.map(s=>{
                            return(<option value={s.id + "--" + s.sp_code + "--" + s.sp_name}>{s.sp_code}-{s.sp_name}</option>)
                        })}
                    </select>
                    <label for="category_id">Category:</label>
                    <select id="category_id" name="category_id" onChange={ this.props.handleChangeCategory }>
                        <option>select one...</option>
                        {this.props.categories.map(c=>{
                            return(<option value={c.id + "--" + c.category_name}>{c.category_name}</option>)
                        })}
                    </select>
                    <label for="weight">Total weight:</label>
                    <input type="number" id="weight" name="weight" value={ this.props.catch.weight } onChange={ this.props.handleChangeWeight } />
                    <button onClick={ this.props.saveCatch }>Save</button>
                </form>
            )
        } else if (this.props.status_catch === "view") {
            return(
                <Fragment>
                    <div style={{backgroundColor: 'green'}}>
                    Group: { this.props.catch.group }
                    Specie code: { this.props.catch.sp_code }
                    Specie name: { this.props.catch.sp_name }
                    Category: { this.props.catch.category_name }
                    Total weight: { this.props.catch.weight }
                    <button onClick= { () => { this.props.editCatchStatus("edit")} }>Edit</button>
                    </div>

                    <TrawlSampleForm catch_id={ this.props.catch.catch_id }/>

                </Fragment>                
            )
        } else if (this.props.status_catch === "edit"){
            return(
                <form style={{backgroundColor: 'green'}}>
                    <input type="hidden" id="haul_id" name="haul_id" value={ this.props.haul_id } />
                    <label for="group">Group:</label>
                    <input type="number" id="group" name="group" min="1" max="5"
                           value={ this.props.catch.group } onChange={ this.props.handleChangeGroup }/>
                    <label for="sp_code">Specie code:</label>
                    <select id="sp_code" name="sp_code"
                            value = { this.props.catch.sp + "--" + this.props.catch.sp_code + "--" + this.props.catch.sp_name}
                            onChange={ this.props.handleChangeSpecies }>
                        {this.props.species.map(s=>{
                            return(<option value={s.id + "--" + s.sp_code + "--" + s.sp_name}>{s.sp_code}-{s.sp_name}</option>)
                        })}
                    </select>
                    <label for="category_id">Category:</label>
                    <select id="category_id" name="category_id"
                            value= { this.props.catch.category_id + "--" + this.props.catch.category_name }
                            onChange={ this.props.handleChangeCategory }>
                        <option>select one...</option>
                        {this.props.categories.map(c=>{
                            return(<option value={c.id + "--" + c.category_name}>{c.category_name}</option>)
                        })}
                    </select>
                    <label for="weight">Total weight:</label>
                    <input type="number" id="weight" name="weight" value={ this.props.catch.weight } onChange={ this.props.handleChangeWeight } />
                    <button onClick={ this.props.updateCatch }>Save</button>
                </form>
            )
        }
        
    }
}
 
export default TrawlCatchForm;