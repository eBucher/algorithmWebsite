import React, { Component } from 'react';
import "./styles.css";
import DrawArea from '../components/drawArea/DrawArea.js';
import CodeBox from '../components/codeBox/CodeBox.js';
import Square from '../components/drawArea/shapes/Square.js';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import IfStatement from 'components/drawArea/IfStatement.js';
import CheckMark from 'components/drawArea/shapes/primitives/CheckMark.js';
import Coord from '../components/drawArea/math/Coord.js';

class Test extends React.Component{

	constructor(){
		super();
	}

	render(){
		var c = new CheckMark();
		c.setColor("red");
		c.setHeight(100);
		c.setCenter(new Coord(100, 100));
		return (
			<div id="AlgorithmContainer">
		        <svg width="1000px" height="200px">
					{c.build()}
					<circle cx="100" cy="100" fill="red" r="2"/>
					<rect x="75" y="75" stroke="black" fill="none" height="50" width="50"/>
					<rect x="50" y="50" stroke="black" fill="none" height="100" width="100"/>
				</svg>

			</div>


		)
	}

}

export default Test;
