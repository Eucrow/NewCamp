import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';

class CatchEditForm extends Component {
    /** Form to edit catch
     * @param {object} props.this_catch:
     */

    render() { 

        const sexes=this.props.this_catch.sexes;

        return ( 
            <Fragment>
            <tr style={{verticalAlign: "top"}} key={ this.props.this_catch.id }>
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
                    {this.props.this_catch.sp_name}
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
                <td>
                
                </td>
                <td>
                    { sexes.map(s=>{
                        return ( 
                            <table><tbody><tr style={{verticalAlign: "top"}}><td>
                                { s.sex }
                                <ComponentsLengths sex_id={ s.id } isVisible={ false }/>
                            </td></tr></tbody></table>
                    )
                }) }
                </td>
            </tr>
        </Fragment>            
         );
    }
}
 
export default CatchEditForm;