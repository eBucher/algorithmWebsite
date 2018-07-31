import React from 'react';
import PropTypes from 'prop-types';
import {squareDefaultProps} from 'components/shapes/square/Square.js';
import SquareWrapper from 'components/shapes/square/SquareWrapper.js';
import Pointer from 'components/shapes/pointer/Pointer.js';

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
        the pointer. */
    pointers: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number,
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
        based on this.props.pointers */
    buildPointers = (squareWrappers) => {
        var pointers = [];
        for(var i = 0; i < this.props.pointers.length; i++){
            var direction = "";
            if(this.props.pointers[i].position === "TOP"){
                direction = "DOWN";
            } else{
                direction = "UP";
            }
            pointers.push(<Pointer
                pointCoord={squareWrappers[this.props.pointers[i].index].getCoordAt(
                    "OUTER_" + this.props.pointers[i].position)
                }
                message={this.props.pointers[i].text}
                direction={direction}
            />);
        }
        return pointers;
    }


    render(){
        var squares = this.getSquares();
        return (
            <g>
                {this.buildSquares(squares)}
                {this.buildPointers(squares)}
            </g>
        )
    }
}

ArrayVisual.propTypes = propTypes;
ArrayVisual.defaultProps = arrayVisualDefaultProps;

export default ArrayVisual;
