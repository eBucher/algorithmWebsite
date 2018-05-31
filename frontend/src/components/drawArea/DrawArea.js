import React, { Component } from 'react';
import './DrawArea.css';
import Square from './shapes/Square.js';
import Arrow from './shapes/Arrow.js';
import LinearSearch from '../../algorithms/LinearSearch.js';
import Coord from './math/Coord.js';


class DrawArea extends Component {
    constructor(){
        super();
        this.state = {
            displayedPieces : ""
        }
    }


    render() {
        return (
            <svg id="drawArea" width="1000px" height="500px">
                {this.state.displayedPieces}
            </svg>
        );
    }
}



export {DrawArea};
