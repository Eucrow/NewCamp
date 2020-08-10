import React, { Component, Fragment } from 'react';

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
            // console.log(lengths)
            this.setState(() => {
                return {
                    lengths: lengths,
                    isVisible: true
                };
            });
        });

    }

    handleHideLengths(event){

        this.setState(() => {
            return {
                lengths: [],
                isVisible: false
            };
        });

    }
        
    render() { 

        const lengths = {
            Lengths:
            <ul>
                {this.state.lengths.map(l=>{
                    return(
                        <li key= { l.length }>
                                { l.length } : { l.number_individuals }
                        </li>
                    )
                })}
            </ul> }

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
                                { l.length } : { l.number_individuals }
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