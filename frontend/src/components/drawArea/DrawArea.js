import React, { Component } from 'react';
import './DrawArea.css';
import Square from 'components/drawArea/shapes/Square.js';
import Arrow from 'components/drawArea/shapes/Arrow.js';
import Coord from 'components/drawArea/math/Coord.js';


class DrawArea extends Component {
    constructor(){
        super();
    }


    render() {
        console.log("TIme to display: ");
        console.log(this.props.displayedPieces);
        return (
            <svg id="drawArea" width="1000px" height="500px">
                {this.props.displayedPieces.map((MyComponent, index) => {
                    return (
                        MyComponent.render()
                )} )}
            </svg>
        );
    }
}



export {DrawArea};
