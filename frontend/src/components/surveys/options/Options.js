import React, { Component, useLayoutEffect } from 'react';
import ReactDOM from "react-dom";
import SurveysOptionsDetailButton from "./DetailButton"
import Button from "../../common/Button.js"
import Survey from '../Surveys';

class SurveysOptions extends Component{
    constructor(props) {
        super(props);
        // this.state = {
        //   data: [],
        //   loaded: false,
        //   placeholder: "Loading"
        // };
      }
      


    render(){
        return(
            <ul>
                <li><SurveysOptionsDetailButton survey_id={this.props.survey_id}/></li>
                <li><Button button_text="edit" /></li>
                <li><Button button_text="remove" /></li>
                <li><Button button_text="select" /></li>
            </ul>
        )
    }
}

export default SurveysOptions