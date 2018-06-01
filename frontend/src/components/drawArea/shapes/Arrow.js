import {distance, findPointFromDist, slopeBetween, perpendicularSlope} from 'components/drawArea/math/Graphing.js';
import React, { Component } from 'react';

class Arrow extends React.Component{

	/*
		pointCoord:	The Coordinate of the tip of the arrow
		endCoord:		The Coordinate of the end of the line part of the arrow
		headHeight:	How long the triangle part of the arrow should be from pointCoord
							to the base of the triangle
		headWidth:	How wide the triangle should be
		thickness:		How thick the line coming from the triangle should be (in pixels)
		color:			The color of the arrow
	*/
	constructor(){
		super();
		this.pointCoord = null;
		this.endCoord = null;
		this.color = null;
		this.headHeight = null;
		this.headWidth = null;
		this.thickness = null;
	}


	/*
	 Given a size, the method will automatically set the headHeight,
	 headWidth, and thickness to preset values.
	 Parameter options: "SMALL"
	*/
	usePreset(size){
		if(size == "SMALL"){
			this.setHeadHeight(20);
			this.setHeadWidth(20);
			this.setThickness(8);
		}
		return this;
	}


	setPointCoord = (pointCoord) => {
		this.pointCoord = pointCoord;
		return this;
	}


	setEndCoord = (endCoord) => {
		this.endCoord = endCoord;
		return this;
	}


	setColor = (newColor) => {
		this.color = newColor;
		return this;
	}


	setHeadHeight = (newHeight) => {
		this.headHeight = newHeight;
		return this;
	}


	setHeadWidth = (newWidth) => {
		this.headWidth = newWidth;
		return this;
	}


	setThickness = (newThickness) => {
		this.thickness = newThickness;
		return this;
	}


	/*
		Draws the arrow to the given context
	*/
	draw = (context) => {
/*
		//Slope of the line between pointCoord and endCoord
		var slope = slopeBetween(this.pointCoord, this.endCoord);
		var headCoords = this.calcHeadCoords(this.pointCoord, slope, this.headHeight, this.headWidth / 2);

		var leftCoord = headCoords[0];
		var rightCoord = headCoords[2];
		var baseOfHead = headCoords[3];

		//Draw the head
		context.beginPath();
		context.moveTo(this.pointCoord.x, this.pointCoord.y);
		context.lineTo(leftCoord.x, leftCoord.y);
		context.lineTo(rightCoord.x, rightCoord.y);
		context.closePath();
		context.fillStyle = this.color;
		context.fill();

		//Draw the vertical line
		context.beginPath();
		context.moveTo(baseOfHead.x, baseOfHead.y);
		context.lineTo(this.endCoord.x, this.endCoord.y);
		context.strokeStyle = this.color;
		context.lineWidth = this.thickness;
		context.stroke();
		*/
	}


	/*
	The function returns the coordinates of the corners of the head of the arrow, and
	the spot where the line of the arrow meets the head. The coordinates are in the
	following order if the arrow was pointing vertically and the head is at the top:
		0. The bottom left point
		1. The top point
		2. The bottom right point
		3. The point where the line of the arrow meets the head
	*/
	calcHeadCoords = (pointCoord, slope, headHeight, headWidth) => {
		var perpSlope = perpendicularSlope(slope); //slope of the line perpendicular to the slope variable
		var headDirection = 1;

		// Flip the head to face the right direction if needed
		if (pointCoord.x > this.endCoord.x || (pointCoord.y > this.endCoord.y && pointCoord.x == this.endCoord.x)) {
			headDirection = -1;
		}

		var baseOfHead = findPointFromDist(pointCoord, headDirection * headHeight, slope);
		var leftPoint = findPointFromDist(baseOfHead, -1 * headWidth, perpSlope);
		var rightPoint = findPointFromDist(baseOfHead, 1 * headWidth, perpSlope);
		return [leftPoint, pointCoord, rightPoint, baseOfHead];
	}

	render(){
		//Slope of the line between pointCoord and endCoord
		var slope = slopeBetween(this.pointCoord, this.endCoord);
		var headCoords = this.calcHeadCoords(this.pointCoord, slope, this.headHeight, this.headWidth / 2);

		var leftCoord = headCoords[0];
		var rightCoord = headCoords[2];
		var baseOfHead = headCoords[3];

		//Draw the head
		return (
			<React.Fragment>
				<path
					d={
						" M" + this.pointCoord.x + " " + this.pointCoord.y +
						" L" + leftCoord.x + " " + leftCoord.y +
						" L " + rightCoord.x + " " + rightCoord.y +
						" Z"
					}
					fill = "#000000"
				/>
				<path
					d={
						" M" + baseOfHead.x + " " + baseOfHead.y +
						" L" + this.endCoord.x + " " + this.endCoord.y +
						" Z"
					}
					stroke= "#000000"
					strokeWidth = {this.thickness}
				/>
			</React.Fragment>
		)
	}
}

export default Arrow;
