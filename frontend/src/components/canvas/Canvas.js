import React, { Component } from 'react';
import './Canvas.css';
import Square from './shapes/Square.js';
import Arrow from './shapes/Arrow.js';
import LinearSearch from '../../algorithms/LinearSearch.js';
import Coord from './math/Coord.js';


class Canvas extends Component {



    render() {
        return (
            <canvas id="drawArea" width="1000px" height="500px">
            </canvas>
        );
    }
}

function clearCanvas() {
    var canvas = document.getElementById("drawArea");
    var context = document.getElementById("drawArea").getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

export {Canvas, clearCanvas};
