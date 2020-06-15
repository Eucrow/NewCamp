import React, { Component } from 'react';

class ComponentsStationNew extends Component {

    constructor(props) {
        super(props);
        this.apiNewStation = "http://127.0.0.1:8000/api/1.0/station/new/";
        
    }


    render() {
        return (
            
            <form method="POST" action={this.apiNewStation}>
                
                <label htmlFor="survey_id">survey Id:</label>
                <input type="text" id="survey_id" name="survey_id" />

                <label htmlFor="station">Station: </label>
                <input type="text" id="station" name="station" />

                <label htmlFor="comment">comment: </label>
                <input type="text" id="comment" name="comment" />

                <input type="submit" value="Save Station" />

            </form>
        )

    }

}

export default ComponentsStationNew;