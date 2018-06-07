import React, { Component } from 'react';
import Square from 'components/drawArea/shapes/Square.js';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import CheckMark from 'components/drawArea/shapes/primitives/CheckMark.js';
import {toHex} from 'utils/Colors.js';

class IfStatement extends CustomShape {

	constructor(){
		super();
		this.status = null;
		this.topLeft = null;
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
		var color = toHex("red");
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
		var check = new CheckMark();
		check.setColor("green");
		check.setHeight(45);
		check.setCenter(new Coord(this.topLeft.x + 25, this.topLeft.y + 25));
		return check.build();
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
