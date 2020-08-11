import React, { Component, Fragment } from 'react';

import ComponentsUiRemoveLengthButton from "./ui/RemoveLengthButton.js";

class ComponentsLengths extends Component {
    /**
	* Component of lengths
    * @param {number} props.sex_id: sex id of lengths.
    * @param {boolean} props.isVisible: If this component is visible or not.
	*/
    constructor(props) {
        super(props);
        this.state = { 
            lengths: [],
            isVisible: false
        }
        this.apiLengths = "http://127.0.0.1:8000/api/1.0/lengths/"

        this.handleShowLengths = this.handleShowLengths.bind(this)
        this.handleHideLengths = this.handleHideLengths.bind(this)
        this.removeLength = this.removeLength.bind(this)
    }

    handleShowLengths(event){
        const apiLengths = this.apiLengths + this.props.sex_id;

        fetch(apiLengths)
        .then(response => {
            if(response.status > 400){
                return this.setState(() => {
                    return { placeholder: "Something went wrong!" }
                });
            }
            return response.json();
        })
        .then(lengths => {
            this.setState(() => {
                return {
                    lengths: lengths,
                    isVisible: true
                };
            });
        })
        .then(() => console.log(this.state));

    }

    handleHideLengths(event){

        this.setState(() => {
            return {
                lengths: [],
                isVisible: false
            };
        });

    }

    removeLength(length){
        console.log(length)
        // 1. Make a shallow copy of the lengths
        let lengths = [...this.state.lengths];
        console.log(lengths)
        // 2. Make a shallow copy of the length you want to update
        let lenght = lengths.find(len => len.length == length);
        // 3. Replace the property you're intested in
        lenght.number_individuals = null;
        console.log(lenght)
        // 4. Put it back into our array
        const indexLength = lengths.findIndex(x => x.length===length)
        lengths[indexLength] = lenght;
        console.log(lengths)
        // 5. Set the state to our new copy
        this.setState({lengths});
    }
        
    render() { 
        return ( 
            <Fragment>

            {this.state.isVisible===false?
                <button onClick={this.handleShowLengths}>Show Lengths</button>:
                null
            }

            <ul>
                {this.state.lengths.map(l=>{
                    return(
                        <li key= { l.length }>
                                { l.length } : { l.number_individuals } -
                                <ComponentsUiRemoveLengthButton length={ l.length } removeLength={ this.removeLength }/>
                        </li> 
                    )
                })}
            </ul>

            {this.state.isVisible===true?
                <button onClick={this.handleHideLengths}>Hide Lengths</button>:
                null
            }

            </Fragment>
        );
    }
}
 
export default ComponentsLengths;