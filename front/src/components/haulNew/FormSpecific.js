import React, { Component } from 'react';

import FormHydrology from "./hidrology/FormHydrology.js";
import FormTrawl from "./trawl/FormTrawl.js";

class FormSpecific extends Component {
    /**
     * 
     * @param {function} props.handleChangeTrawl: function to manage the handleChange event
     * @param {numeric} props.sampler_id: identification of sampler
     */
    constructor(props) {
        super(props);
        this.state = {  };
        this.handleChangeTrawl = this.props.handleChangeTrawl;
    }

    componentDidMount() {
    }

    render() { 
        const sampler_id = this.props.sampler_id;
        // console.log("sampler_id inside FormSpecific: " + sampler_id)
        if(sampler_id === "1"){
            return( <FormTrawl handleChangeTrawl={ this.handleChangeTrawl }/> )
        } else if (sampler_id === "2") {
            return( <FormHydrology handleChangeTrawl={ this.handleChangeTrawl }/> )
        } else {
            return( <p>nada</p> )
        }
    }
}
 
export default FormSpecific;