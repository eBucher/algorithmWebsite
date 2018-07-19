import React, { Component } from 'react';
import './DrawArea.css';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import PropTypes from 'prop-types';

const propTypes = {
    /** The width of the drawable area in pixels */
    width: PropTypes.number,
    /** The height of the drawable area in pixels */
    height: PropTypes.number,
    /** SVG elements or objects that extend the CustomShape class to be drawn.*/
    displayedPieces: PropTypes.array,
}

/** A SVG element that displays all of the visuals for the algorithm */
class DrawArea extends Component {

    render() {
        return (
            <svg id="drawArea" width={this.props.width + "px"} height={this.props.height + "px"}>
                {this.props.displayedPieces.map((MyComponent, index) => {
                    if(MyComponent instanceof CustomShape){
                        return (MyComponent.build());
                    } else {
                        return (<React.Fragment>{MyComponent}</React.Fragment>);
                    }
                } )}
            </svg>
        );
    }
}

DrawArea.propTypes = propTypes;

export default DrawArea;
