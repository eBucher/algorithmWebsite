import React, { Component } from 'react';
import Square from 'components/drawArea/shapes/Square.js';
import Coord from 'components/drawArea/math/Coord.js';
class IfStatement extends React.Component {

	constructor(){
		super();
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
				" M" + (this.props.topLeft.x + 5) + " " + (this.props.topLeft.y + 5) +
				" L" + (this.props.topLeft.x + 45) + " " + (this.props.topLeft.y + 45)
			}
			stroke = {color}
			strokeWidth = {thickness}
		/>
		//Top right to bottom left
		<path
			d = {
				" M" + (this.props.topLeft.x + 45) + " " + (this.props.topLeft.y + 5) +
				" L" + (this.props.topLeft.x + 5) + " " + (this.props.topLeft.y + 45)
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
				" M" + (this.props.topLeft.x + 10) + " " + (this.props.topLeft.y + 25) +
				" L" + (this.props.topLeft.x + 20) + " " + (this.props.topLeft.y + 40) +
				" L" + (this.props.topLeft.x + 45) + " " + (this.props.topLeft.y + 5)
			}
			stroke = {color}
			strokeWidth = {thickness}
			fill = "none"
		/>
		)
	}

	getSymbol = () => {
		if(this.props.status == "true")
			return this.trueSymbol();
		else if (this.props.status == "false")
			return this.falseSymbol();
		else
			return "";
	}


	render(){
		var s = new Square();
		s.setColor("white");
		s.usePreset("SMALL");
		s.setTopLeft(this.props.topLeft);
		s.setText("If statement result", "TOP");
		var symbolToUse = null;
		if(this.props.status == "true"){
			s.setText("true", "BOTTOM");
		} else if (this.props.status == "false"){
			s.setText("false", "BOTTOM")
		}

		return (
			<React.Fragment>
				{s.render()}
				{this.getSymbol()}
			</React.Fragment>
		)
	}
}

export default IfStatement;
