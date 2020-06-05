import React, { Component } from 'react';
import NewStratumInput from '../ui/NewStratumInput.js';

class ComponentsSurveyNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stratification: [],
            loaded: false,
            placeholder: "Loading",
            stratum: [],
            inputStratum: []
        }

        this.onNewStratumClick = this.onNewStratumClick.bind(this)

        this.apiForm = "http://127.0.0.1:8000/api/1.0/surveys/new/"
        this.apiStratifications = "http://127.0.0.1:8000/api/1.0/stratifications/"
        this.apiStrata = "http://127.0.0.1:8000/api/1.0/strata"
    }

    onNewStratumClick(event) {
        const inputStratum = this.state.inputStratum;
        console.log(inputStratum);

        this.setState({
            inputStratum: inputStratum.concat(<NewStratumInput key={inputStratum.length} />)
        })

        event.preventDefault();
    }

    handleStrata(event) {
        /**
         * When the Add Strata button is clicked, get the strata from the api and show the input form.
         */

        // fetch(this.apiStrata)
        // .then(response => {
        //     if(response.status > 400){
        //         return this.setState(() => {
        //             return { placeholder: "Something went wrong!"}
        //         });
        //     }
        //     return response.json();
        // })
        // .then(stratum => {
        //     console.log(stratum)
        //     this.setState(() => {
        //         return {
        //             stratum:stratum,
        //             loaded: true
        //         };
        //     });
        // });
        // event.preventDefault();
    }

    componentDidMount() {
        /**
         * When the component is mounted, retrieve the posible stratifications and save in state.stratification
         */
        fetch(this.apiStratifications)
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" }
                    });
                }
                return response.json();
            })
            .then(stratification => {
                console.log(stratification)
                this.setState(() => {
                    return {
                        stratification: stratification,
                        loaded: true
                    };
                });
            });
    }

    render() {
        return (
            <form method="POST" action={this.apiForm}>
                
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

                <select id="stratification_id" name="stratification_id">
                    {this.state.stratification.map((st, idx) => {
                        return (
                            <option value={st.id} key={idx}>{st.stratification}</option>
                        )
                    })}
                </select>

                <input type="button" value="Add Strata" onClick={this.onNewStratumClick}/>

                {this.state.inputStratum}

                <input type="submit" value="Save Survey" />

            </form>
        )
    }

}

export default ComponentsSurveyNew;