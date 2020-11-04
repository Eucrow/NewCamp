import React, { Component, Fragment } from 'react';

class ComponentCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }


    render() { 

        const sampled_weight = this.props.this_catch.samples && this.props.this_catch.samples.sampled_weight? this.props.this_catch.samples.sampled_weight : null;

        if (this.props.status_catch === "view"){

            return ( 
                <Fragment>
                <td>catch_id: {this.props.this_catch.id} -- { this.props.this_catch.group } { this.props.this_catch.sp_code }</td>
                <td>{ this.props.this_catch.sp_name }</td>
                <td>{ this.props.this_catch.category }</td>
                <td>
                    { this.props.this_catch.weight }
                    <button onClick= { () => { this.props.editCatchStatus("edit") } }>Edit catch</button>
                    <button onClick= { this.props.removeCatch(this.props.this_catch.id) }>Remove catch</button>
                </td>
                <td>
                    { sampled_weight }
                </td>

                {/* <td>
                    <ComponentSexes sexes={ sexes }
                    status_sexes= { this.state.status_sexes }
                    handleSex= { this.handleSex }
                    updateSex={ this.updateSex }
                    saveSex={ this.saveSex }
                    editCatchStatus={ this.editCatchStatus }/>
                </td> */}
            </Fragment>
            );
        } else if (this.props.status_catch === "edit"){
            return ( 
                <Fragment>
                <td>
                <input type="hidden" id="haul_id" name="haul_id" value={ this.props.this_catch.haul_id } />
                <input type="number" id="group" name="group" min="1" max="5"
                        value={ this.props.this_catch.group } onChange={ this.props.handleChangeGroup }/>

                <select id="sp_code" name="sp_code"
                        value = { this.props.this_catch.sp_id + "--" + this.props.this_catch.sp_code + "--" + this.props.this_catch.sp_name}
                        onChange={ this.props.handleChangeSpecies }>
                    {this.props.species.map(s=>{
                        return(<option value={s.id + "--" + s.sp_code + "--" + s.sp_name}>{s.sp_code}-{s.sp_name}</option>)
                    })}
                </select>
                </td>
                <td>
                <select id="category_id" name="category_id"
                        value= { this.props.this_catch.category_id + "--" + this.props.this_catch.category }
                        onChange={ this.props.handleChangeCategory }>
                    <option>select one...</option>
                    {this.props.categories.map(c=>{
                        return(<option value={c.id + "--" + c.category_name}>{c.category_name}</option>)
                    })}
                </select>
                </td>
                <td>
                <input type="number" id="weight" name="weight" value={ this.props.this_catch.weight } onChange={ this.props.handleChangeWeight } />
                <button onClick={ this.props.updateCatch }>Save</button>
                </td>
            </Fragment>
            );
        }
    }
}
 
export default ComponentCategory;