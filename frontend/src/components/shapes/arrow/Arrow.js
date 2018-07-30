import {distance} from 'utils/math/Graphing.js';
import React from 'react';
import {toHex} from 'utils/Colors.js';
import PropTypes from 'prop-types';

const propTypes = {
    pointCoord: PropTypes.object.isRequired,
    endCoord: PropTypes.object.isRequired,
    headWidth: PropTypes.number,
    headHeight: PropTypes.number,
    thickness: PropTypes.number,
    color: PropTypes.string,
}


export const arrowDefaultProps = {
    headWidth: 20,
    headHeight: 20,
    thickness: 8,
    color: "black",
}

/** Renders an arrow pointing from and to specific points. */
class Arrow extends React.Component{

	/** The function returns the coordinates of the corners of the head of the arrow
	as if the arrow was laying horizontally and pointing to the right. The baseOfHead
	coord is the one where the line of the arrow would meet the head. */
	calcHeadCoords = () => {
        var endCoord = this.props.endCoord;
        var headHeight = this.props.headHeight;
        var headWidth = this.props.headWidth;
        var pointCoord = this.props.pointCoord;
		var lengthOfArrow = distance(pointCoord, endCoord);

		var pointCoord = {
			x: endCoord.x + lengthOfArrow,
			y: endCoord.y
		};
		var topCoord = {
			x: endCoord.x + lengthOfArrow - headHeight,
			y: endCoord.y - headWidth /2
		};
		var bottomCoord = {
			x: endCoord.x + lengthOfArrow - headHeight,
			y: endCoord.y + headWidth /2
		};
		var baseOfHead = {
			x: endCoord.x + lengthOfArrow - headHeight,
			y: endCoord.y
		};
		return {pointCoord, topCoord, bottomCoord, baseOfHead};
	}


	/** Assuming the arrow is pointing horizontally to the left, the function
		returns the angle (in degrees) needed to rotate the arrow around the
		endCoord so that it is between endCoord and StartCoord. */
	getRotation = (point, end) => {
		var y = point.y - end.y;
		var x = point.x - end.x;
		return Math.atan2(y, x) * 180 / Math.PI;
	}


	render(){
        var pointCoord = this.props.pointCoord;
        var endCoord = this.props.endCoord;
		var head = this.calcHeadCoords();
		var rotation = this.getRotation(pointCoord, endCoord);

		//Draw the head
		return (
			<g transform = {"rotate(" + rotation + " " + endCoord.x + " " + endCoord.y + ")"}>
				<path
					d={
						" M" + head.pointCoord.x + " " + head.pointCoord.y +
						" L" + head.topCoord.x + " " + head.topCoord.y +
						" L " + head.bottomCoord.x + " " + head.bottomCoord.y +
						" Z"
					}
					fill = {toHex(this.props.color)}

				/>
				<path
					d={
						" M" + head.baseOfHead.x + " " + head.baseOfHead.y +
						" L" + endCoord.x + " " + endCoord.y +
						" Z"
					}
					stroke= {toHex(this.props.color)}
					strokeWidth = {this.props.thickness}
				/>
			</g>
		)
	}
}

Arrow.propTypes = propTypes;
Arrow.defaultProps = arrowDefaultProps;

export default Arrow;
