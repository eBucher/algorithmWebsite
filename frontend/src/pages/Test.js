import React, { Component } from 'react';
import "./styles.css";
import DrawArea from '../components/drawArea/DrawArea.js';
import CodeBox from '../components/codeBox/CodeBox.js';
import Square from '../components/drawArea/shapes/Square.js';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import CheckMark from 'components/drawArea/shapes/primitives/CheckMark.js';
import Coord from '../components/drawArea/math/Coord.js';

class Other extends React.Component {
	render(){
		return(
			<p>Hey there</p>
		);
	}
}

class Test extends React.Component{

	constructor(){
		super();
	}

	render(){
		return(
			<div style={{width: "500px", height: "500px", backgroundColor: "red"}}>
				{this.props.otherOne}
			</div>
		)
	}

}

export {Test, Other};
