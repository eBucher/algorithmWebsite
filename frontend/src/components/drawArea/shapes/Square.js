import Coord from '../math/Coord.js';
import React, { Component } from 'react';

class Square {
	constructor(){
		this.topLeft = null;
		this.size = null;
		this.color = null;
		this.thickness = null;
		this.topText = null;
		this.bottomText = null;
		this.centerText = null;
		this.centerFontSize = null;
		this.outerFontSize = null;
		this.outerFontSpacing = null;

	}


	/*
	 Given a size, the method will automatically set the square's size property.
	 Parameter options: "SMALL", "MEDIUM"
	*/
	usePreset(size){
		if(size == "SMALL"){
			this.setSize(50);
		} else if (size == "MEDIUM"){
			this.setSize(80);
		}
		return this;
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
		this.outerFontSize = this.size/5;
		this.outerFontSpacing = this.size/10;
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

    draw = (context) => {
		this._drawSquare(context);
		this._drawCenterText(context);
		this._drawTopText(context);
		this._drawBottomText(context);
	}


	_drawSquare = (context) => {
		var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rect.setAttributeNS(null, 'x', this.topLeft.x + this.thickness/2);
        rect.setAttributeNS(null, 'y', this.topLeft.y + this.thickness/2);
        rect.setAttributeNS(null, 'height', this.size - this.thickness);
        rect.setAttributeNS(null, 'width', this.size - this.thickness);
        rect.setAttributeNS(null, 'fill', this.color);
		rect.setAttributeNS(null, "style",
							"fill:" + this.color + "; " +
							"stroke-width:" + this.thickness + "; " +
							"stroke: #000000"
		);
        document.getElementById('drawArea').appendChild(rect);

	}


	_drawCenterText = (context) => {
		if(this.centerText != null){
			var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
			text.textContent = this.centerText;
	        text.setAttributeNS(null, 'x', this.getCenterPoint().x);
	        text.setAttributeNS(null, 'y', this.getCenterPoint().y + this.centerFontSize/2 - this.centerFontSize * .1);
	        text.setAttributeNS(null, 'fill', "#000000");
			text.setAttributeNS(null, "style",
								"font:" + this.centerFontSize + "px Arial;" +
								"text-anchor: middle;"

			);
			document.getElementById('drawArea').appendChild(text);
		}
	}


	_drawTopText = (context) => {
		if(this.topText != null){
			var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
			text.textContent = this.topText;
	        text.setAttributeNS(null, 'x', this.getCenterPoint().x);
	        text.setAttributeNS(null, 'y', this.topLeft.y - this.outerFontSpacing);
	        text.setAttributeNS(null, 'fill', "#000000");
			text.setAttributeNS(null, "style",
								"font:" + this.outerFontSize + "pt Arial;" +
								"text-anchor: middle;"

			);
			document.getElementById('drawArea').appendChild(text);
		}
	}


	_drawBottomText = (context) => {
		if(this.bottomText != null){
			var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
			text.textContent = this.topText;
	        text.setAttributeNS(null, 'x', this.getCenterPoint().x);
	        text.setAttributeNS(null, 'y', this.topLeft.y + this.size);
	        text.setAttributeNS(null, 'fill', "#000000");
			text.setAttributeNS(null, "style",
								"font:" + this.outerFontSize + "pt Arial;" +
								"text-anchor: middle; dominant-baseline: hanging;"

			);
			document.getElementById('drawArea').appendChild(text);
		}
	}


}

export default Square;
