import React, { Component } from 'react';
import "./styles.css";
import {Canvas, clearCanvas} from '../components/canvas/Canvas.js';
import CodeBox from '../components/codeBox/CodeBox.js';
import Square from '../components/canvas/shapes/Square.js';
import Arrow from '../components/canvas/shapes/Arrow.js';

import Coord from '../components/canvas/math/Coord.js';

class LinearSearch extends React.Component{

	constructor(){
		super();
		this.algorithm = [
			"function linearSearch(elements, target){",
			"    for(int i = 0; i < elements.length; i++){",
			"        if(elements[i] == target){",
			"            return i;",
			"        }",
			"    }",
			"    return -1",
			"}"
		];
		this.state = {
			//User Input
			tempTarget : "",
			tempElements : "",
			target : null,
			elements : [],

			index : null,
			steps : [],
			highlightedLines : [],
		}

	}

	calculateSteps = () => {
		var i = 0;
		this.steps.push({currentIndex: i, highlightLine: 1});
		for(i; i < this.elements.length; i++){
			this.steps.push({currentIndex: i, highlightLine: 2});
			if(this.elements[i] == this.target){
				this.steps.push({ currentIndex: i,highlightLine: 3});
				return i;
			}
			//Check the loop's condition again
			this.steps.push({currentIndex: i, highlightLine: 1});
		}
		this.steps.push({currentIndex: i, highlightLine: 6});
		return -1;
	}

	handleTargetChange = (event) => {
		this.setState({tempTarget : event.target.value});
	}

	handleElementsChange = (event) => {
		this.setState({tempElements : event.target.value});
	}

	handleSubmit = (event) => {
		//Trim the whitespace from the input
		var newElements = this.state.tempElements.replace(/\s/g,'');
		//Convert the elements to an array
		newElements = newElements.split(',');
		//Convert all of the strings to numbers
		for(var i = 0; i < newElements.length; i++){newElements[i] = Number(newElements[i])};
		console.log("New elements are " + newElements);
		this.setState({target : this.state.tempTarget,
					   elements: newElements});
		event.preventDefault();
	}

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas = () => {
		clearCanvas();
		var context = document.getElementById("drawArea").getContext("2d");
        var r = new Square();

        r.usePreset("SMALL");
        r.setColor("orange");
        for(var i = 0; i < this.state.elements.length; i++){
            r.setTopLeft(new Coord(0 + 50 * i, 50));
            r.setText(this.state.elements[i]);
            r.setText("ptr1", "TOP");
            r.setText("ptr2", "BOTTOM");
			if(this.state.target == this.state.elements[i]){
				r.setColor("green");
			} else{
				r.setColor("orange");
			}
            r.draw(context);
        }
    }

	render(){
		return (
			<div id="AlgorithmContainer">

				<form onSubmit={this.handleSubmit}>
					Target
					<input type="text" onChange={this.handleTargetChange}></input>
					Elements to search through
					<input type="text" onChange={this.handleElementsChange}></input>
					<input type="submit" value="Visualize"></input>
				</form>
		        <Canvas />
				<CodeBox linesOfCode={this.algorithm}/>

			</div>


		)
	}

}

export default LinearSearch;
