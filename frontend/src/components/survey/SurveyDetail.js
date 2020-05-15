import React, { Component } from "react";
import ReactDOM from "react-dom";
// import fetchSurveyDetail from "../utils/fetchSurveyDetail.js"



class SurveyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
    this.api = "http://127.0.0.1:8000/api/1.0/surveys/" + props.survey_id

  }


  componentDidMount() {
    fetch(this.api)
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
        {this.state.data.map(detail => {
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

export default SurveyDetail;



