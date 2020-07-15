import React, { Component } from 'react';

class ComponentsHaulCommon extends Component {
    /**
     * 
     * @param {number} props.haul
     * @param {boolean} props.isEdit
     * @param {function} props.handleChangeCommonHaul
     */
    
    constructor(props) {
        super(props);
    }

    render() {
        const haul = this.props.haul;
        const isEdit = this.props.isEdit;
        console.log("is valid in common: " + haul.valid)

        const is_valid = haul.valid===true? "TRUE" : "FALSE"
                
        if(isEdit===false){
            return (
                <fieldset>
                <legend>Haul:</legend>
                <p>Haul: {haul.haul || ""}</p>
                <p>Gear: {haul.gear || ""}</p>
                {/* <p>Valid: {haul.valid || ""}</p> */}
                <p>Valid: { is_valid }</p>
                </fieldset>
            );
        } else if (isEdit===true){


            return(
                <fieldset>
                <legend>Haul:</legend>
                <p>Haul: {haul.haul || ""}</p>
                <label htmlFor="gear">Gear:</label> 
                <input type="text" name="gear" id="gear" value={haul.gear || ""} onChange={this.props.handleChangeCommonHaul} />
                <label htmlFor="valid">Valid:</label>
                <input type="checkbox" name="valid" id="valid" defaultChecked= { haul.valid } onChange={this.props.handleChangeCommonValid} />
                </fieldset>
            )
        }

    }
}
 
export default ComponentsHaulCommon;
