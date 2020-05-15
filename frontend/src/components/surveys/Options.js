import React, { Component, useLayoutEffect } from 'react';
import ReactDOM from "react-dom";
import Button from "../common/Button.js";
// import SurveyDetail from "./SurveyDetail.js"

function fetchAPI(survey_id) {
    console.log("http://127.0.0.1:8000/api/1.0/surveys/" + survey_id)
    return fetch("http://127.0.0.1:8000/api/1.0/surveys/" + survey_id);
  }

class SurveyDetail extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
          <ul>
            {this.props.data_survey.map(detail => {
              return (
                <li key={detail.id}>
                  {detail.acronym}
                  {detail.description}
                  {detail.with_x}
                  {detail.with_y}
                  {detail.origin_x}
                  {detail.origin_y}
                  {ship}
                  {haul_duration}
                  {unit_sample}
                  {comment}
                  {end_date}
                  {start_date}
                </li>
              );
            })}
          </ul>
        );
      }
}

class SurveyDetailButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [] };
    this.handleClick = this.handleClick.bind(this);
    }

  handleClick() {
    fetchAPI(this.props.survey_id)
        .then(response => response.json())
        .then(response => {
            this.setState({data: response})
            console.log(this.state.data)
        })
    }

  render() {
    return (
      <div>
      <button onClick={this.handleClick}>
        {/* {this.state.isToggleOn ? 'ON' : 'OFF'} */}
        "edit"
      </button>
      <div>aquí: {this.state.data.acronym}</div>
      </div>
    );
  }
}

// ReactDOM.render(<SurveyDetailButton/>, document.getElementById("container"));

// ReactDOM.render(
//   <Toggle />,
//   document.getElementById('root')
// );

export default class SurveysOptions extends Component{
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
                {/* <li><Button button_text="detail" survey_id={this.props.survey_id} /></li> */}
                <li><SurveyDetailButton survey_id={this.props.survey_id}/></li>
                {/* <li><Button button_text="edit" /></li>
                <li><Button button_text="remove" /></li>
                <li><Button button_text="select" /></li> */}
            </ul>
        )
    }
}