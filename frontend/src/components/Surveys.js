import React, { Component } from "react";

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
    fetch("api/1.0/surveys")
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
              {surveys.acronym} - {surveys.description} - {surveys.start_date}- {surveys.end_date}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Survey;