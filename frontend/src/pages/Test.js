import React, { Component } from 'react';
import "./styles.css";
import DrawArea from '../components/drawArea/DrawArea.js';
import CodeBox from '../components/codeBox/CodeBox.js';
import Square from '../components/drawArea/shapes/Square.js';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import CheckMark from 'components/drawArea/shapes/primitives/CheckMark.js';
import Coord from '../components/drawArea/math/Coord.js';

class Test extends React.Component{

	constructor(){
		super();
	}

	render(){
		var ContentSquare = {
			size : 50,
			thickness : 1,
			centerFontSize : 25,
			outerFontSize : 16,
		}

		var s = new Square(ContentSquare);
		s.setText("Hey");
		s.setTopLeft(new Coord(100, 100));
		s.setColor("red");
		s.setText("there", "TOP");
		s.setText("123", "BOTTOM");
		return (
			<div id="AlgorithmContainer">
		        <svg width="1000px" height="200px">
					{s.build()}
				</svg>

			</div>


		)
	}

}

export default Test;
