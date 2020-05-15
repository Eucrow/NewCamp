import React, { Component } from "react";

class ComponentsSurveysOptions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         }
    }
    render() { 
        return ( 
            <ul>
                <li>detail</li>
                <li>edit</li>
                <li>remove</li>
                <li>select</li>
            </ul>

         );
    }
}
 
export default ComponentsSurveysOptions;