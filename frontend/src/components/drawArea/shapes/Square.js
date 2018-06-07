import React, { Component } from 'react';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import {toHex} from 'utils/Colors.js';

class Square extends CustomShape{
	constructor(configObj){
		super();
		this.topLeft = null;
		this.size = null;
		this.color = null;
		this.thickness = null;
		this.topText = null;
		this.bottomText = null;
		this.centerText = null;
		this.centerFontSize = null;
		this.outerFontSize = null;

		for(var prop in arguments[0])   {
        	this[prop]=arguments[0][prop];
    	}

	}


	getCoord = (position) => {
		if(position == "CENTER"){
			return new Coord(this.topLeft.x + this.size/2,
				this.topLeft.y + this.size/2);
		} else if (position == "TOP"){
			return new Coord(this.topLeft.x + this.size/2,
				this.topLeft.y)
		} else if (position == "BOTTOM"){
			return new Coord(this.topLeft.x + this.size/2,
				this.topLeft.y + this.size)
		} else if (position == "LEFT"){
			return new Coord(this.topLeft.x,
				this.topLeft.y + this.size/2)
		} else if (position == "RIGHT"){
			return new Coord(this.topLeft.x + this.size,
				this.topLeft.y + this.size/2)
		} else {
			return null;
		}
	}

	/*
		Given a Coord object with nonzero x and y values, the top left corner
		of the square will be set to that position.
	*/
	setTopLeft = (newTopLeft) => {
		this.topLeft = newTopLeft;
		return this;
	}


	/**
		The size of the square is the length of any side. The border is
		included into this measurement.
	 */
	setSize = (newSize) => {
		this.size = newSize;
		this.thickness = this.size *.02;
		this.centerFontSize = this.size/2;
		this.outerFontSize = this.size/4;
		return this;
	}

	setColor = (newColor) => {
		if (newColor == "red"){
			this.color = "#e74c3c";
		} else if (newColor == "orange"){
			this.color = "#e67e22";
		} else if (newColor == "yellow"){
			this.color = "#f1c40f";
		} else if (newColor == "green"){
			this.color = "#2ecc71";
		} else if (newColor == "blue"){
			this.color = "#3498db";
		} else if (newColor == "purple"){
			this.color = "#9b59b6";
		} else if (newColor == "grey"){
			this.color = "#95a5a6";
		} else if (newColor == "black"){
			this.color = "#000000";
		} else if (newColor == "white"){
			this.color = "#FFFFFF";
		}
	}

	/*
		By default, newText refers to the text that will be written in
		the center of the square. A second argument can be passed as
		either "CENTER", "TOP", or "BOTTOM" to specify where the
		text will be written relative to the square.
	*/
	setText = (newText, location = "CENTER") => {
		if (location == "CENTER"){
			this.centerText = newText;
		}if(location == "TOP"){
			this.topText = newText;
		} else if (location == "BOTTOM"){
			this.bottomText = newText;
		}
		return this;
	}

	getCenterPoint = () => {
		return new Coord(this.topLeft.x + this.size/2,
			this.topLeft.y + this.size/2);
	}


	_drawSquare = (context) => {
		return (
			<rect x={this.topLeft.x + this.thickness/2}
					y={this.topLeft.y + this.thickness/2}
					height={this.size - this.thickness}
					width={this.size - this.thickness}
					fill={this.color}
					style={{
						strokeWidth : this.thickness,
						stroke : "#000000"
					}}
			/>
		)

	}


	_drawCenterText = (context) => {
		if(this.centerText != null){
			return (
				<text
					x={this.getCenterPoint().x}
					y={this.getCenterPoint().y + this.centerFontSize/2 - this.centerFontSize * .1}
					fill="#000000"
					style= {{
						font :  this.centerFontSize + "px Arial",
						textAnchor: "middle"
					}}
				>
					{this.centerText}
				</text>
			)
		}
	}


	_drawTopText = (context) => {
		if(this.topText != null){
			return(
				<text
					x={this.getCenterPoint().x}
					y={this.topLeft.y - this.outerFontSize*.2}
					fill="#000000"
					style= {{
						font :  this.outerFontSize + "px Arial",
						textAnchor: "middle"
					}}
				>
					{this.topText}
				</text>
			)
		}
	}


	_drawBottomText = (context) => {
		if(this.bottomText != null){
			return(
				<text
					x={this.getCenterPoint().x}
					y={this.topLeft.y + this.size}
					fill="#000000"
					style= {{
						font :  this.outerFontSize + "px Arial",
						textAnchor: "middle",
						dominantBaseline: "hanging"
					}}
				>
					{this.bottomText}
				</text>
			)
		}
	}

	build() {
		return (
			<React.Fragment>
				{this._drawSquare()}
				{this._drawCenterText()}
				{this._drawTopText()}
				{this._drawBottomText()}
			</React.Fragment>
		)

	}


}

export default Square;
