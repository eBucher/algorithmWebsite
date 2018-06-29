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

	verifyElements = (input) => {
		console.log(/^(-?[1-9]+(\s)*,(\s)*)*-?[1-9]+(\s)*$/.test(input));
        if(/^(-?[1-9]+(\s)*,(\s)*)*-?[1-9]+(\s)*$/.test(input)){
            return true;
        }
        return false;
    }

	render(){
		console.log(this.verifyElements("1, 2, 3, 4, 5"));
		return(
			<div style={{width: "500px", height: "500px", backgroundColor: "red"}}>
				{this.props.otherOne}
			</div>
		)
	}

}

export default Test;
