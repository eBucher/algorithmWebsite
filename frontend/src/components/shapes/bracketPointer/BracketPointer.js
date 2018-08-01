import React from 'react';
import {toHex} from 'utils/Colors.js';
import PropTypes from 'prop-types';
import Pointer, {pointerDefaultProps} from 'components/shapes/pointer/Pointer.js';

const propTypes = {
    /** The tip of one arrowhead */
    point1: PropTypes.object.isRequired,
    /** The tip of a second arrowhead */
    point2: PropTypes.object.isRequired,
    /** The direction that the arrow should be pointing */
    direction: PropTypes.oneOf(["UP", "DOWN", "LEFT", "RIGHT"]).isRequired,
    /** The distance from the base of the arrow head to the edge of the piece
        that connects the two arrows */
    depth: PropTypes.number,
    /** Optional text to display next to the bracket */
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Arrow color */
    color: PropTypes.string,
}

const bracketPointerDefaultProps = {
    depth: 10,
    text: null,
    color: "black",
}

/** Renders a two headed arrow in the shape of a bracket that points to two
    points that are either vertically or horizontally aligned. */
class BracketPointer extends React.Component {

    /** @returns a line element that spans between the two parallel arrow pieces */
    buildConnectingLine = () => {
        var x1 = null;
        var y1 = null;
        var x2 = null;
        var y2 = null;
        if(this.props.direction === "UP"){
            x1=this.props.point1.x - pointerDefaultProps.thickness/2;
            y1=this.props.point1.y + pointerDefaultProps.headHeight +
                this.props.depth + pointerDefaultProps.thickness/2;

            x2=this.props.point2.x + pointerDefaultProps.thickness/2;
            y2=this.props.point2.y + pointerDefaultProps.headHeight +
                this.props.depth + pointerDefaultProps.thickness/2;
        } else if(this.props.direction === "DOWN"){
            x1=this.props.point1.x - pointerDefaultProps.thickness/2;
            y1=this.props.point1.y - pointerDefaultProps.headHeight -
                this.props.depth - pointerDefaultProps.thickness/2;

            x2=this.props.point2.x + pointerDefaultProps.thickness/2;
            y2=this.props.point2.y - pointerDefaultProps.headHeight -
                this.props.depth - pointerDefaultProps.thickness/2;
        } else if(this.props.direction === "LEFT"){
            x1=this.props.point1.x + pointerDefaultProps.headHeight +
                this.props.depth + pointerDefaultProps.thickness/2;;
            y1=this.props.point1.y - pointerDefaultProps.thickness/2;

            x2=this.props.point2.x + pointerDefaultProps.headHeight +
                this.props.depth + pointerDefaultProps.thickness/2;
            y2=this.props.point2.y + pointerDefaultProps.thickness/2;
        } else if(this.props.direction === "RIGHT"){
            x1=this.props.point1.x - pointerDefaultProps.headHeight -
                this.props.depth - pointerDefaultProps.thickness/2;;
            y1=this.props.point1.y - pointerDefaultProps.thickness/2;

            x2=this.props.point2.x - pointerDefaultProps.headHeight -
                this.props.depth - pointerDefaultProps.thickness/2;
            y2=this.props.point2.y + pointerDefaultProps.thickness/2;
        }

        return <line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={toHex(this.props.color)}
            strokeWidth={pointerDefaultProps.thickness}
        />
    }


    /** @returns an object containing the anchor, baseline, and position for where
        the text should be rendered at */
    textPositionData = () => {
        var point1 = this.props.point1;
        var point2 = this.props.point2;

        if(this.props.direction === "UP")
			return {
				anchor: "middle",
				baseline: "hanging",
				position: {
                    x: (point1.x + point2.x) / 2,
                    y: point1.y + pointerDefaultProps.headHeight + this.props.depth +
                        pointerDefaultProps.thickness + 3,
                }
			}
		if(this.props.direction === "DOWN")
			return {
				anchor: "middle",
				baseline: "bottom",
                position: {
                    x: (point1.x + point2.x) / 2,
                    y: point1.y - pointerDefaultProps.headHeight - this.props.depth -
                        pointerDefaultProps.thickness - 5,
                }
			}
		if(this.props.direction === "LEFT")
			return {
				anchor: "start",
				baseline: "middle",
                position: {
                    x: point1.x + pointerDefaultProps.headHeight + this.props.depth +
                        pointerDefaultProps.thickness + 5,
                    y: (point1.y + point2.y) / 2,
                }
			}
		if(this.props.direction === "RIGHT")
			return {
				anchor: "end",
				baseline: "middle",
                position: {
                    x: point1.x - pointerDefaultProps.headHeight - this.props.depth -
                        pointerDefaultProps.thickness - 5,
                    y: (point1.y + point2.y) / 2,
                }
			}
    }


    /** @returns The text object to render if the text prop is not an empty string/null */
    buildText = () => {
		if(this.props.text !== null && this.props.text.toString() !== ""){
			var positionData = this.textPositionData();
			return (
				<text
					x={positionData.position.x}
					y={positionData.position.y}
					fill="#000000"
					textAnchor={positionData.anchor}
					dominantBaseline={positionData.baseline}
					style= {{
						font :  "16px Arial",
					}}
				>
					{this.props.text}
				</text>
			)
		}
	}


    render(){
        return(
            <g>
                <Pointer
                    pointCoord={this.props.point1}
                    direction={this.props.direction}
                    length={pointerDefaultProps.headHeight + this.props.depth + 1}
                    color={this.props.color}
                />
                <Pointer
                    pointCoord={this.props.point2}
                    direction={this.props.direction}
                    length={pointerDefaultProps.headHeight + this.props.depth + 1}
                    color={this.props.color}
                />

                {this.buildConnectingLine()}
                {this.buildText()}
            </g>
        )
    }
}

BracketPointer.propTypes = propTypes;
BracketPointer.defaultProps = bracketPointerDefaultProps;

export default BracketPointer;
