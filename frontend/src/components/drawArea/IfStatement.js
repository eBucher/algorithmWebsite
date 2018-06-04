import React, { Component } from 'react';
import Square from 'components/drawArea/shapes/Square.js';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';

class IfStatement extends CustomShape {

	constructor(){
		super();
		this.status = null;
	}

	setStatus = (newStatus) => {
		this.status = newStatus;
	}

	setTopLeft = (newPosition) => {
		this.topLeft = newPosition;
	}


	//Creates an X
	falseSymbol = () => {
		var thickness = 8;
		var color = "red";
		return (
		<React.Fragment>
		//Top left to bottom right
		<path
			d = {
				" M" + (this.topLeft.x + 5) + " " + (this.topLeft.y + 5) +
				" L" + (this.topLeft.x + 45) + " " + (this.topLeft.y + 45)
			}
			stroke = {color}
			strokeWidth = {thickness}
		/>
		//Top right to bottom left
		<path
			d = {
				" M" + (this.topLeft.x + 45) + " " + (this.topLeft.y + 5) +
				" L" + (this.topLeft.x + 5) + " " + (this.topLeft.y + 45)
			}
			stroke = {color}
			strokeWidth = {thickness}
		/>
		</React.Fragment>
		)
	}

	//Creates a check symbol
	trueSymbol = () => {
		var thickness = 8;
		var color = "green";
		return (
		<path
			d = {
				" M" + (this.topLeft.x + 10) + " " + (this.topLeft.y + 25) +
				" L" + (this.topLeft.x + 20) + " " + (this.topLeft.y + 40) +
				" L" + (this.topLeft.x + 45) + " " + (this.topLeft.y + 5)
			}
			stroke = {color}
			strokeWidth = {thickness}
			fill = "none"
		/>
		)
	}

	getSymbol = () => {
		if(this.status == true)
			return this.trueSymbol();
		else if (this.status == false)
			return this.falseSymbol();
		else
			return "";
	}


	build(){
		var s = new Square();
		s.setColor("white");
		s.usePreset("SMALL");
		s.setTopLeft(this.topLeft);
		s.setText("If statement result", "TOP");
		var symbolToUse = null;
		if(this.status == true){
			s.setText("true", "BOTTOM");
		} else if (this.status == false){
			s.setText("false", "BOTTOM")
		}

		return (
			<React.Fragment>
				{s.build()}
				{this.getSymbol()}
			</React.Fragment>
		)
	}
}

export default IfStatement;
