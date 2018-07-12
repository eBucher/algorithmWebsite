import React from 'react';
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
		if(position === "CENTER"){
			return new Coord(this.topLeft.x + this.size/2,
				this.topLeft.y + this.size/2);
		} else if (position === "TOP"){
			return new Coord(this.topLeft.x + this.size/2,
				this.topLeft.y)
		} else if (position === "BOTTOM"){
			return new Coord(this.topLeft.x + this.size/2,
				this.topLeft.y + this.size)
		} else if (position === "LEFT"){
			return new Coord(this.topLeft.x,
				this.topLeft.y + this.size/2)
		} else if (position === "RIGHT"){
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
					fill={toHex(this.color)}
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
					y={this.getCenterPoint().y}
					fill="#000000"
					textAnchor="middle"
					dominantBaseline="middle"
					style= {{
						font :  this.centerFontSize + "px Arial",
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
					textAnchor="middle"
					dominantBaseline="bottom"
					style= {{
						font :  this.outerFontSize + "px Arial",
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
					textAnchor="middle"
					dominantBaseline="hanging"
					style= {{
						font :  this.outerFontSize + "px Arial",
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
