import React, { Component } from 'react';

import FormHydrography from "./hidrography/FormHydrography.js";
import FormTrawl from "./trawl/FormTrawl.js";

class FormSpecific extends Component {
    /**
     * Component of the specific form: Hydrography or Trawl form.
     * @param {function} props.handleChangeTrawl: function to manage the trawl handleChange event.
     * @param {numeric} props.sampler_id: identification of sampler.
     * @param {function} props.handleChangeHydrography: function to manage hydrography handleChange evet.
     */
    constructor(props) {
        super(props);
        this.state = {  };
        this.handleChangeTrawl = this.props.handleChangeTrawl;
        this.handleChangeHydrography = this.props.handleChangeHydrography;
    }

    render() { 
        const sampler_id = this.props.sampler_id;
        // console.log("sampler_id inside FormSpecific: " + sampler_id)
        if(sampler_id === "1"){
            return( <FormTrawl handleChangeTrawl={ this.handleChangeTrawl }/> )
        } else if (sampler_id === "2") {
            return( <FormHydrography handleChangeHydrography={ this.handleChangeHydrography }/> )
        } else {
            //TODO: return error message instead of null
            return( null )
        }
    }
}
 
export default FormSpecific;