import React, { Component } from 'react';

class ComponentsSurveyNew extends Component{

    render(){
        return(
            <form method = "POST" action = "http://127.0.0.1:8000/api/1.0/surveys/new">
                <label htmlFor="id">id: </label>
                <input type="text" id="id" name="id" />
                <label htmlFor="start_date">acronym: </label>
                <input type="text" id="acronym" name="acronym" />
                <label htmlFor="start_date">description: </label>
                <input type="text" id="description" name="description" />
                <label htmlFor="start_date">start_date: </label>
                <input type="text" id="start_date" name="start_date" />
                <label htmlFor="end_date">end_date: </label>
                <input type="text" id="end_date" name="end_date" />
                <label htmlFor="width_x">width_x: </label>
                <input type="text" id="width_x" name="width_x" />
                <label htmlFor="width_y">width_y: </label>
                <input type="text" id="width_y" name="width_y" />
                <label htmlFor="origin_x">origin_x: </label>
                <input type="text" id="origin_x" name="origin_x" />
                <label htmlFor="origin_y">origin_y: </label>
                <input type="text" id="origin_y" name="origin_y" />
                <label htmlFor="ship">ship: </label>
                <input type="text" id="ship" name="ship" />
                <label htmlFor="hauls_duration">hauls_duration: </label>
                <input type="text" id="hauls_duration" name="hauls_duration" />
                <label htmlFor="unit_sample">unit_sample: </label>
                <input type="text" id="unit_sample" name="unit_sample" />
                <label htmlFor="comment">comment: </label>
                <input type="text" id="comment" name="comment" />
                <label htmlFor="stratification_id">stratification_id: </label>
                <input type="text" id="stratification_id" name="stratification_id" />
                <input type="submit" value="Save Survey"/>
            </form>
        )
    }

}

export default ComponentsSurveyNew;