import React, { Component, useLayoutEffect } from 'react';
import SurveysSurveyDetail from "../../survey/SurveyDetail.js"
import ReactDOM from "react-dom";
import Button from "../../common/Button.js"


/**
 * Detail Button component
 */
class SurveysOptionsDetailButton extends React.Component {
    /**
     * @param {number} props.survey_id 
     */
    constructor(props) {
      super(props);
      this.state = {
          data: [],
          isDetail: false };
      this.handleClick = this.handleClick.bind(this);
      }

    handleClick() {
        /**
         * Handle click event of button
         */
    //   fetchAPI(this.props.survey_id)
        fetch("http://127.0.0.1:8000/api/1.0/surveys/" + this.props.survey_id)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState(() => {
                    return{
                        data: response, 
                        isDetail: true
                    }
                })
              
          })
      }

    
  
    render() {
        if (this.state.isDetail) {
            return( 
                <div>
                <button onClick={this.handleClick}> Detail </button>
                <ul>
                <li key={this.state.data.id}>
                    {this.state.data.acronym}
                    {this.state.data.description}
                    {this.state.data.with_x}
                    {this.state.data.with_y}
                    {this.state.data.origin_x}
                    {this.state.data.origin_y}
                    {this.state.data.ship}
                    {this.state.data.haul_duration}
                    {this.state.data.unit_sample}
                    {this.state.data.comment}
                    {this.state.data.end_date}
                    {this.state.data.start_date}
                </li>
                </ul>
                </div>
            )
        } else {
            return (
                <div>
                <button onClick={this.handleClick}> Detail </button>
                </div>
            )
        }
    }
  

        

  }

export default SurveysOptionsDetailButton

