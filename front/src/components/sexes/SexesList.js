import React, { Component, Fragment } from 'react';

import ComponentsLengths from '../lengths/Lengths.js';
import ComponentSex from './sex.js';


class ComponentSexes extends Component {
    /**
     * 
     * @param {object} props.sexes
     * @param {character} props.status_sexes
     * @param {method} props.editSexes
     * @param {method} props.updateSex
     * @param {method} props.editSexStatus
     */

    constructor(props) {
        super(props);
        this.state = {
            showAddSexForm: false //Manage is the button 'Add sex' is showed.
        }

        this.handleAddSexButton = this.handleAddSexButton.bind(this)
        
    }

    handleAddSexButton(status) {
        /**
         * Manage if the button 'Add sex' is showed.
         */
        this.setState({
            showAddSexForm: status
        })
    }


    render() { 

        const sexes = this.props.sexes ? this.props.sexes : null

        return ( 
            <Fragment>

            { sexes.map(s=>{
                return(
                    <ComponentSex
                        key = { s.id }
                        sex_id={ s.id }
                        sex={ s.sex }
                        catch_id={ this.props.catch_id }
                        updateSex={ this.props.updateSex } />
                )
            })}
            

            { this.state.showAddSexForm === true?
                <ComponentSex
                    catch_id={ this.props.catch_id }
                    status_sex = { "add" }
                    updateSex={ this.props.updateSex }
                    handleNewSexSubmit = { this.props.handleNewSexSubmit }
                    handleAddSexButton = { this.handleAddSexButton }
                /> :
                <button onClick={() => { this.handleAddSexButton(true) } }>Add sex</button> }
                
            </Fragment>
        );    
    }
}
 
export default ComponentSexes;