import React, { Component } from 'react';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import Square from 'components/drawArea/shapes/Square.js';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';

class Pointer extends CustomShape{


	constructor(){
		super();
		this.otherObject = null;
		this.color = "#000000";
		this.message = "";
		this.position = null;
		this.arrow = new Arrow();
		this.length = 50;
		this.initializeArrow();
	}

	initializeArrow = () => {
		this.arrow.setHeadHeight(20);
		this.arrow.setHeadWidth(20);
		this.arrow.setThickness(8);
		this.arrow.setColor("#000000");
	}

	setColor = (newColor) => {
		this.color = newColor;
		return this;
	}

	pointTo = (otherObject) => {
		if(otherObject instanceof Square){
			var refCoord = otherObject.getCoord(this.position);
			var pointCoord = new Coord(refCoord.x, refCoord.y);
			this.arrow.setPointCoord(pointCoord);
			var endCoord = pointCoord.add(this.offset())
			this.arrow.setEndCoord(endCoord);
		}
	}

	setPosition = (newPosition) => {
		this.position = newPosition;
	}

	offset = () => {
		if(this.position == "TOP")
			return new Coord(0, -this.length);
		if(this.position == "BOTTOM")
			return new Coord(0, this.length);
		if(this.position == "LEFT")
			return new Coord(-this.length, 0);
		if(this.position == "RIGHT")
			return new Coord(this.length, 0);

	}


	build(){
		return (
			this.arrow.build()
		)
	}
}

export default Pointer;
