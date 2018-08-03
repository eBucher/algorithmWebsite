import React from 'react';
import PropTypes from 'prop-types';
import Arrow from 'components/shapes/arrow/Arrow.js';

const propTypes = {
    /** Where the point of the arrow is */
    pointCoord: PropTypes.object.isRequired,
    /** Distance from pointCoord to the end of the arrow */
    length: PropTypes.number,
    /** Optional text to display at the end of the arrow */
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Size of the message text */
    fontSize: PropTypes.number,
    /** The distance between the base two points on the arrow head */
    headWidth: PropTypes.number,
    /** The distance between where the arrow head connects to the line */
    headHeight: PropTypes.number,
    /** Thickness of the width of the line on the arrow */
    thickness: PropTypes.number,
    /** Which direction the arrow will point */
    direction: PropTypes.oneOf(["UP", "DOWN", "LEFT", "RIGHT"]).isRequired,
    /** Color of the entire arrow */
    color: PropTypes.string,
}


export const pointerDefaultProps = {
    length: 50,
    message: null,
    fontSize: 16,
    headWidth: 20,
    headHeight: 20,
    thickness: 8,
    color: "black",
}


/** Renders an arrow but with optional text at the end of it. */
class Pointer extends React.Component {

    /** Given the end point of the pointer, the function returns an object that
        contains properties for the text's anchor, baseline, and position. */
    textPositionData = (endPoint) => {
		if(this.props.direction === "UP")
			return {
				anchor: "middle",
				baseline: "hanging",
				position: {x: endPoint.x, y: endPoint.y + this.props.fontSize * .4}
			}
		if(this.props.direction === "DOWN")
			return {
				anchor: "middle",
				baseline: "bottom",
				position: {x: endPoint.x, y: endPoint.y - this.props.fontSize * .5}
			}
		if(this.props.direction === "LEFT")
			return {
				anchor: "start",
				baseline: "middle",
				position: {x: endPoint.x  + this.props.fontSize * .5, y: endPoint.y}
			}
		if(this.props.direction === "RIGHT")
			return {
				anchor: "end",
				baseline: "middle",
				position: {x: endPoint.x  - this.props.fontSize * .5, y: endPoint.y}
			}
	}


    /** Returns a text element that is the text for the end of the pointer. The
        position is relative to the direction prop and the given endPoint. */
    drawMessageAt = (endPoint) => {
		if(this.props.message !== null && this.props.message.toString() !== ""){
			var positionData = this.textPositionData(endPoint);

			return (
				<text
					x={positionData.position.x}
					y={positionData.position.y}
					fill="#000000"
					textAnchor={positionData.anchor}
					dominantBaseline={positionData.baseline}
					style= {{
						font :  this.props.fontSize + "px Arial",
					}}
				>
					{this.props.message}
				</text>
			)
		}
	}

    /** Returns the position of the end of the pointer depending on the direction
        of the arrow. */
    getEndCoord = () => {
        var pointCoord = this.props.pointCoord;
        var length = this.props.length;
		if(this.props.direction === "UP")
			return {x: pointCoord.x, y: pointCoord.y + length};
		if(this.props.direction === "DOWN")
			return {x: pointCoord.x, y: pointCoord.y - length};
		if(this.props.direction === "LEFT")
			return {x: pointCoord.x + length, y: pointCoord.y};
		if(this.props.direction === "RIGHT")
			return {x: pointCoord.x - length, y: pointCoord.y};
	}


    render(){
		var endPoint = this.getEndCoord();
		return (
			<g>
				<Arrow
                    pointCoord={this.props.pointCoord}
                    endCoord={endPoint}
                    color={this.props.color}
                    headWidth={this.props.headWidth}
                    headHeight={this.props.headHeight}
                    thickness={this.props.thickness}
                />
				{this.drawMessageAt(endPoint)}
			</g>
		)
	}
}

Pointer.propTypes = propTypes;
Pointer.defaultProps = pointerDefaultProps;

export default Pointer;
