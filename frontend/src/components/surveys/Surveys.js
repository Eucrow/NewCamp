import React, { Component } from "react";
import SurveysOptions from "../surveys/Options.js"

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/1.0/surveys")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <ul>
        {this.state.data.map(surveys => {
          return (
            <li key={surveys.id}>
              {surveys.description} <SurveysOptions survey_id={surveys.id} />
              
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Survey;