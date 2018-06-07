import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import React, {Component} from 'react';
import Coord from 'components/drawArea/math/Coord.js';
import {toHex} from 'utils/Colors.js';

class XSymbol extends CustomShape {
	constructor(){
		super();
		this.color = "#000000";
		this.center = null;
		this.height = null;
		this.thickness = null
	}


	setHeight = (newHeight) => {
		this.height = newHeight;
		this.thickness = this.height * .15;
	}


	/*
		newCenter must be a Coordinate object. The center coordinate is the
		position that would be in the center of a bounding rectangle around
		the checkmark.
	*/
	setCenter = (newCenter) => {
		this.center = newCenter;
	}


	/*
		newColor should be the name of a color, not the hex value.
	*/
	setColor = (newColor) => {
		this.color = toHex(newColor);
	}


	build = () => {
		return (
		<React.Fragment>
		//Top left to bottom right
		<path
			d = {
				" M" + (this.center.x - this.height*.45) + " " + (this.center.y - this.height*.45) +
				" L" + (this.center.x + this.height*.45) + " " + (this.center.y + this.height*.45)
			}
			stroke = {this.color}
			strokeWidth = {this.thickness}
		/>
		//Top right to bottom left
		<path
			d = {
				" M" + (this.center.x + this.height*.45) + " " + (this.center.y - this.height*.45) +
				" L" + (this.center.x - this.height*.45) + " " + (this.center.y + this.height*.45)
			}
			stroke = {this.color}
			strokeWidth = {this.thickness}
		/>
		</React.Fragment>
		)
	}
}

export default XSymbol;
