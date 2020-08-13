import React, { Component } from 'react';

export default class Link extends Component {
    render() {
        return (
            <button type="button">{this.props.button_text}</button> 
        );
    }
}