import React, { Component } from 'react';

export default class Menu extends Component {
    render() {
        return (
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="surveys.html">Survey</a></li>
                <li><a href="species.html">Species</a></li>
            </ul>
        );
    }
}