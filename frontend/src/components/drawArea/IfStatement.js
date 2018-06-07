import React, { Component } from 'react';
import Square from 'components/drawArea/shapes/Square.js';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import CheckMark from 'components/drawArea/shapes/primitives/CheckMark.js';
import XSymbol from 'components/drawArea/shapes/primitives/XSymbol.js';
import {toHex} from 'utils/Colors.js';
import {CONTENT_SQUARE} from 'components/drawArea/shapes/Presets.js';

class IfStatement extends CustomShape {

	constructor(){
		super();
		this.status = null;
		this.topLeft = null;
		this.SIZE = 50;
	}

	setStatus = (newStatus) => {
		this.status = newStatus;
	}

	setTopLeft = (newPosition) => {
		this.topLeft = newPosition;
	}


	//Creates an X
	falseSymbol = () => {
		var x = new XSymbol();
		x.setColor("red");
		x.setHeight(this.SIZE * .9);
		x.setCenter(new Coord(this.topLeft.x + this.SIZE/2, this.topLeft.y + this.SIZE/2));
		return x.build();
	}

	//Creates a check symbol
	trueSymbol = () => {
		var check = new CheckMark();
		check.setColor("green");
		check.setHeight(45);
		check.setCenter(new Coord(this.topLeft.x + this.SIZE/2, this.topLeft.y + this.SIZE/2));
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
		var s = new Square(CONTENT_SQUARE);
		s.setColor("white");

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
