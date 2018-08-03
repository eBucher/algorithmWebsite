import React, { Component } from 'react';
import './DrawArea.css';
import PropTypes from 'prop-types';

const propTypes = {
    /** The width of the drawable area in pixels */
    width: PropTypes.number,
    /** The height of the drawable area in pixels */
    height: PropTypes.number,
    /** SVG elements to be drawn.*/
    displayedPieces: PropTypes.array,
}

/** A SVG element that displays all of the visuals for the algorithm */
class DrawArea extends Component {
    render() {
        return (
            <svg id="drawArea" width={this.props.width + "px"} height={this.props.height + "px"}>
                {this.props.displayedPieces.map((MyComponent, index) => {
                    return (<React.Fragment>{MyComponent}</React.Fragment>);
                } )}
            </svg>
        );
    }
}

DrawArea.propTypes = propTypes;

export default DrawArea;
