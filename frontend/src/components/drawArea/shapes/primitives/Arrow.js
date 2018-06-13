import {distance, findPointFromDist, slopeBetween, perpendicularSlope} from 'components/drawArea/math/Graphing.js';
import React, { Component } from 'react';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import Coord from 'components/drawArea/math/Coord.js';

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


	/*
	The function returns the coordinates of the corners of the head of the arrow
	as if the arrow was laying horizontally and pointing to the right. The baseOfHead
	coord is the one where the line of the arrow would meet the head.
	*/
	calcHeadCoords = () => {
		var lengthOfArrow = distance(this.pointCoord, this.endCoord);
		var pointCoord = new Coord(
			this.endCoord.x + lengthOfArrow,
			this.endCoord.y
		);
		var topCoord = new Coord(
			this.endCoord.x + lengthOfArrow - this.headHeight,
			this.endCoord.y - this.headWidth /2
		);
		var bottomCoord = new Coord(
			this.endCoord.x + lengthOfArrow - this.headHeight,
			this.endCoord.y + this.headWidth /2
		);
		var baseOfHead = new Coord(
			this.endCoord.x + lengthOfArrow - this.headHeight,
			this.endCoord.y
		)
		return {pointCoord, topCoord, bottomCoord, baseOfHead}
	}


	/*
		Assuming the arrow is pointing horizontally to the left, the function
		returns the angle (in degrees) needed to rotate the arrow around the
		endCoord so that it is between endCoord and StartCoord.
	*/
	getRotation = (point, end) => {
		var y = point.y - end.y;
		var x = point.x - end.x;
		return Math.atan2(y, x) * 180 / Math.PI;
	}


	build(){
		var head = this.calcHeadCoords();

		var rotation = this.getRotation(this.pointCoord, this.endCoord);

		//Draw the head
		return (
			<g transform = {"rotate(" + rotation + " " + this.endCoord.x + " " + this.endCoord.y + ")"}>
				<path
					d={
						" M" + head.pointCoord.x + " " + head.pointCoord.y +
						" L" + head.topCoord.x + " " + head.topCoord.y +
						" L " + head.bottomCoord.x + " " + head.bottomCoord.y +
						" Z"
					}
					fill = {this.color}

				/>
				<path
					d={
						" M" + head.baseOfHead.x + " " + head.baseOfHead.y +
						" L" + this.endCoord.x + " " + this.endCoord.y +
						" Z"
					}
					stroke= {this.color}
					strokeWidth = {this.thickness}
				/>
			</g>
		)
	}
}

export default Arrow;
