import React, { Component } from 'react';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import Square from 'components/drawArea/shapes/Square.js';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';

class Pointer extends CustomShape{


	constructor(configObj){
		super();
		this.otherObject = null;
		this.message = "";
		this.fontSize = null;	//In pixels
		this.position = null;
		this.arrow = new Arrow();
		this.length = null;

		for(var prop in arguments[0])   {
        	this[prop]=arguments[0][prop];
    	}
	}


	setMessage = (newMessage) => {
		this.message = newMessage;
	}


	setColor = (newColor) => {
		this.arrow.setColor(newColor);
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


	//The offset from the end of the arrow to the text anchor
	textOffset = () => {
		if(this.position == "TOP")
			return new Coord(0, -this.fontSize * 1.2);
		if(this.position == "BOTTOM")
			return new Coord(0, this.fontSize * 1.2);
		if(this.position == "LEFT")
			return new Coord(-this.fontSize * 1.2, 0);
		if(this.position == "RIGHT")
			return new Coord(this.fontSize * 1.2, 0);
	}


	/*
		Returns where the text should be anchored relative to the end of
		the arrow to be used with the textAnchor style.
	*/
	textAnchorPosition = () => {
		if(this.position == "TOP" || this.position == "BOTTOM")
			return "middle";
		else if (this.position == "LEFT")
			return "right";
		else if (this.position == "RIGHT")
			return "left";
		return null;
	}


	drawMessage = () => {
		if(this.message.toString() != null && this.message.toString() != ""){
			var offset = this.textOffset();

			return (
				<text
					x={this.arrow.endCoord.x + offset.x}
					y={this.arrow.endCoord.y + offset.y}
					fill="#000000"
					style= {{
						font :  this.fontSize + "px Arial",
						textAnchor: this.textAnchorPosition()
					}}
				>
					{this.message}
				</text>
			)
		}
	}


	build(){
		return (
			<React.Fragment>
				{this.arrow.build()}
				{this.drawMessage()}
			</React.Fragment>

		)
	}
}

export default Pointer;
