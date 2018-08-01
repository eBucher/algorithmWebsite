import React from 'react';
import PropTypes from 'prop-types';
import {squareDefaultProps} from 'components/shapes/square/Square.js';
import SquareWrapper from 'components/shapes/square/SquareWrapper.js';
import Pointer from 'components/shapes/pointer/Pointer.js';
import BracketPointer from 'components/shapes/bracketPointer/BracketPointer.js';

const propTypes = {
    /** An array of objects to represent each element displayed in the array.
        Each object should have a value to display in the middle of the square
        and a color to make the square. */
    arrayModel: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        color: PropTypes.string,
    })).isRequired,
    /** Any pointers that need to point to an element. Each object should have
        an index that is less than the length of the arrayModel, a position
        relative to the array, and any text to be displayed at the end of
        the pointer. Pointers with a null index don't get rendered. */
    pointers: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number,
        position: PropTypes.oneOf(["TOP", "BOTTOM"]),
        text: PropTypes.string,
    })),
    /** An array of bracket pointers that point to two elements each. Each object
        should two indices to point two, a position relative to the array, and
        optional text to display next to the bracket pointer. */
    bracketPointers: PropTypes.arrayOf(PropTypes.shape({
        index1: PropTypes.number,
        index2: PropTypes.number,
        position: PropTypes.oneOf(["TOP", "BOTTOM"]),
        text: PropTypes.string,
    })),
    /** The coordinate of the center of the array. */
    center: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }).isRequired,
}


export const arrayVisualDefaultProps = {
    indexPosition: "TOP",
    pointers: [],
    bracketPointers: [],
}

class ArrayVisual extends React.Component {
    /** @return the x and y coordinate of the center of the i'th square. */
    getPositionAtIndex = (i) => {
        return {
            x: this.props.center.x + squareDefaultProps.size *
                (i - Math.floor(this.props.arrayModel.length/2)),
            y: this.props.center.y
        };
    }


    /** @return an array of SquareWrapper objects for each element in the array
        to draw. */
    getSquares = () => {
        var arr = [];
        for(var i = 0; i < this.props.arrayModel.length; i++){
            var props = {
                topText: i,
                centerText: this.props.arrayModel[i].value,
                color: this.props.arrayModel[i].color,
                center: this.getPositionAtIndex(i)
            }
            arr.push(new SquareWrapper(props));
        }
        return arr;
    }


    /** @param squareWrappers - An array of SquareWrapper objects
        @return an array of <Square/> objects built from the squares argument */
    buildSquares = (squareWrappers) => {
        var arr = [];
        for(var i = 0; i < squareWrappers.length; i++){
            arr.push(squareWrappers[i].build());
        }
        return arr;
    }


    /** @param squareWrappers - An array of SquareWrapper objects
        @return an array of <Pointer/> components that will point to specific elements
        based on this.props.pointers. Any pointers with a null index will not be added. */
    buildPointers = (squareWrappers) => {
        var pointers = [];
        for(var i = 0; i < this.props.pointers.length; i++){
            var direction = "";
            if(this.props.pointers[i].position === "TOP"){
                direction = "DOWN";
            } else{
                direction = "UP";
            }
            if(this.props.pointers[i].index !== null){
                pointers.push(<Pointer
                    pointCoord={squareWrappers[this.props.pointers[i].index].getCoordAt(
                        "OUTER_" + this.props.pointers[i].position)
                    }
                    message={this.props.pointers[i].text}
                    direction={direction}
                />);
            }
        }
        return pointers;
    }


    /** @param squareWrappers - An array of SquareWrapper objects
        @return an array of <BracketPointer/> components that will point to specific
        elements based on this.props.bracketPointers. Any that have a null index1 or
        index2 will not be rendered. */
    buildBracketPointers = (squareWrappers) => {
        var pointers = [];
        for(var i = 0; i < this.props.bracketPointers.length; i++){
            var direction = "";
            if(this.props.bracketPointers[i].position === "TOP"){
                direction = "DOWN";
            } else{
                direction = "UP";
            }
            if(this.props.bracketPointers[i].index1 !== null &&
                this.props.bracketPointers[i].index2 !== null){
                pointers.push(<BracketPointer
                    point1={squareWrappers[this.props.bracketPointers[i].index1].getCoordAt(
                        "OUTER_" + this.props.bracketPointers[i].position)
                    }
                    point2={squareWrappers[this.props.bracketPointers[i].index2].getCoordAt(
                        "OUTER_" + this.props.bracketPointers[i].position)
                    }
                    text={this.props.bracketPointers[i].text}
                    direction={direction}
                />);
            }
        }
        return pointers;
    }


    render(){
        var squares = this.getSquares();
        return (
            <g>
                {this.buildSquares(squares)}
                {this.buildPointers(squares)}
                {this.buildBracketPointers(squares)}
            </g>
        )
    }
}

ArrayVisual.propTypes = propTypes;
ArrayVisual.defaultProps = arrayVisualDefaultProps;

export default ArrayVisual;
