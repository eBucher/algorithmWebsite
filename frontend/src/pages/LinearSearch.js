import React, { Component } from 'react';
import "./styles.css";
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import Square from 'components/drawArea/shapes/Square.js';
import Pointer from 'components/drawArea/shapes/Pointer.js';

import Coord from 'components/drawArea/math/Coord.js';

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
			tempTarget : "",
			tempElements : "",
			target : null,
			elements : [],
			currentStep: 0,
			index : null,
			steps : [],
			highlightedLines : [],
		}

	}

	// currentIndex is where the array will be pointing to.
	calculateSteps = (target, elements) => {
		var i = 0;
		var steps = [];
		steps.push({currentIndex: null, highlightLine: [1]});
		for(i; i < elements.length; i++){
			steps.push({currentIndex: i, highlightLine: [2]});
			if(elements[i] == target){
				steps.push({ currentIndex: i,highlightLine: [3]});
				return steps;
			}
			//Check the loop's condition again
			steps.push({currentIndex: i, highlightLine: [1]});
		}
		steps.push({currentIndex: i, highlightLine: [6]});
		return steps;
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
		var newSteps = this.calculateSteps(this.state.tempTarget, newElements);
		this.setState({target : this.state.tempTarget,
					   elements: newElements,
				   	   steps: newSteps,
					   highlightedLines: [1]
		});
		event.preventDefault();
	}

	nextStep = () => {
		if(this.state.currentStep != this.state.steps.length - 1){
			console.log("We did it because we were on step " + this.state.currentStep + "and the max is " + (this.state.steps.length - 1));
			this.setState({
				currentStep: this.state.currentStep + 1,
				highlightedLines: this.state.steps[this.state.currentStep].highlightLine
			});
		}
	}

	previousStep = () => {
		if(this.state.currentStep != 0)
			this.setState({
				currentStep: this.state.currentStep - 1,
				highlightedLines: this.state.steps[this.state.currentStep].highlightLine
			});
	}


    visualizeAlgorithm = () => {

		var elementsToDraw = [];
		if(this.state.elements.length > 0){
			console.log("Visualizing step " + this.state.currentStep);
			var currentStepState = this.state.steps[this.state.currentStep];
	        for(var i = 0; i < this.state.elements.length; i++){
		        var r = new Square();
		        r.usePreset("SMALL");
		        r.setColor("orange");
	            r.setTopLeft(new Coord(0 + 50 * i, 50));
	            r.setText(this.state.elements[i]);
	            r.setText(i, "TOP");
				if(this.state.target == this.state.elements[i]){
					r.setColor("green");
				} else{
					r.setColor("orange");
				}
	            elementsToDraw.push(r);

	        }
			if(currentStepState.currentIndex != null){
				var p = new Pointer();
				p.setPosition("BOTTOM");
				p.pointTo(elementsToDraw[currentStepState.currentIndex]);
				elementsToDraw.push(p);
			}
		}
		return (elementsToDraw);
    }

	render(){
		var piecesToShow = this.visualizeAlgorithm();
		console.log("Rendering...");
		return (
			<div id="AlgorithmContainer">

				<form onSubmit={this.handleSubmit}>
					Target
					<input type="text" onChange={this.handleTargetChange}></input>
					Elements to search through
					<input type="text" onChange={this.handleElementsChange}></input>
					<input type="submit" value="Visualize"></input>
				</form>
				<button onClick={this.previousStep}>
					Previous Step
				</button>
				<button onClick={this.nextStep}>
					Next Step
				</button>
		        <DrawArea displayedPieces={piecesToShow}/>
				<CodeBox linesOfCode={this.algorithm} highlightedLines={this.state.highlightedLines}/>

			</div>


		)
	}

}

export default LinearSearch;
