import React, { Component } from 'react';
import "./styles.css";
import DrawArea from '../components/drawArea/DrawArea.js';
import CodeBox from '../components/codeBox/CodeBox.js';
import Square from '../components/drawArea/shapes/Square.js';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import IfStatement from 'components/drawArea/IfStatement.js';
import Coord from '../components/drawArea/math/Coord.js';

class Test extends React.Component{

	constructor(){
		super();
	}

	render(){
		var a = <Square></Square>;
		console.log(a);
		a.setColor("red");
		return (
			<div id="AlgorithmContainer">

		        <svg width="1000px" height="200px">
					<IfStatement topLeft={new Coord(50, 50)}/>
				</svg>

			</div>


		)
	}

}

export default Test;
