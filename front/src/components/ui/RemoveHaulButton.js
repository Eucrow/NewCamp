import React, { Component } from "react";

class ComponentsUiRemoveHaulButton extends Component {
    /**
     * Button to remove one Station.
     * @param {number} props.haul_id
     * @param {function} props.onDelete: pass onDelete function to remove the station from parent state.
     */

    constructor(props) {
        super(props);
        this.apiRemoveHaul = "http://127.0.0.1:8000/api/1.0/haul/trawl/remove/" + this.props.haul_id;
        this.onDelete = this.props.onDelete;
    }

    removeHaul(haul_id){
        fetch(this.apiRemoveHaul, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(haul_id)
        })
        .then(this.props.onDelete(this.props.haul_id))
        .catch(error => console.log('Error'))
        
        this.forceUpdate();
    }

    render() {
		return (
           <button onClick={() => {
                if(window.confirm('Delete the haul?')){
                    this.removeHaul(this.props.haul_id)
                };
            }}> Remove </button>
		)
	}
}

export default ComponentsUiRemoveHaulButton;