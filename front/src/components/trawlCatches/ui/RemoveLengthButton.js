import React, { Component } from "react";

class ComponentsUiRemoveLengthButton extends Component {
    /**
     * Button to remove one Length.
     * @param {number} props.length
     * @param {function} props.removeLength: pass removeLength function to remove the length from parent state.
     */

    constructor(props) {
        super(props);
        this.removeLength = this.props.removeLength;
    }



    render() {
		return (
           <button onClick={() => this.removeLength(this.props.length)}> Remove </button>
		)
	}
}

export default ComponentsUiRemoveLengthButton;