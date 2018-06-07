import {distance, findPointFromDist, slopeBetween, perpendicularSlope} from 'components/drawArea/math/Graphing.js';
import React, { Component } from 'react';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';

class Arrow extends CustomShape{

	/*
		pointCoord:	The Coordinate of the tip of the arrow
		endCoord:		The Coordinate of the end of the line part of the arrow
		headHeight:	How long the triangle part of the arrow should be from pointCoord
							to the base of the triangle
		headWidth:	How wide the triangle should be
		thickness:		How thick the line coming from the triangle should be (in pixels)
		color:			The color of the arrow
	*/
	constructor(configObj){
		super();
		this.pointCoord = null;
		this.endCoord = null;
		this.color = "#000000";
		this.headHeight = null;
		this.headWidth = null;
		this.thickness = null;

		for(var prop in arguments[0])   {
        	this[prop]=arguments[0][prop];
    	}
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

	build(){
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
					fill = {this.color}
				/>
				<path
					d={
						" M" + baseOfHead.x + " " + baseOfHead.y +
						" L" + this.endCoord.x + " " + this.endCoord.y +
						" Z"
					}
					stroke= {this.color}
					strokeWidth = {this.thickness}
				/>
			</React.Fragment>
		)
	}
}

export default Arrow;
