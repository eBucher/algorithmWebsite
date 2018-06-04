import React, { Component } from 'react';
import "./styles.css";
import AlgorithmPage from "pages/AlgorithmPage.js";
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import Square from 'components/drawArea/shapes/Square.js';
import Pointer from 'components/drawArea/shapes/Pointer.js';
import IfStatement from 'components/drawArea/IfStatement.js';

import Coord from 'components/drawArea/math/Coord.js';

class LinearSearch extends AlgorithmPage{

	constructor(){
		super();
		//Denote a line break as a \n
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

			currentStepNum: null,
			steps : [],
		}
		this.areaHeight = 250;
		this.areaWidth = 1000;

	}


	// checkIndex is where the array will be pointing to.
	calculateSteps = (target, elements) => {
		var i = 0;
		var steps = [];
		steps.push({checkIndex: null, highlightedLines: 0});
		steps.push({checkIndex: i, highlightedLines: 1});
		for(i; i < elements.length; i++){
			steps.push({checkIndex: i, highlightedLines: 2});
			if(elements[i] == target){
				steps.push({ checkIndex: i,highlightedLines: 3});
				return steps;
			}
			//Check the loop's condition again
			if(i + 1 < elements.length)
				steps.push({checkIndex: i + 1, highlightedLines: 1});
		}
		steps.push({checkIndex: i - 1, highlightedLines: 6});
		return steps;
	}

	handleSubmit = (event) => {
		//Trim the whitespace from the input
		var newElements = this.state.tempElements.replace(/\s/g,'');
		//Convert the elements to an array
		newElements = newElements.split(',');
		//Convert all of the strings to numbers
		for(var i = 0; i < newElements.length; i++){newElements[i] = Number(newElements[i])};
		var newSteps = this.calculateSteps(this.state.tempTarget, newElements);
		this.setState({
			target : this.state.tempTarget,
			elements: newElements,
			steps: newSteps,
			currentStepNum: 0,
		});
		event.preventDefault();
	}


    visualizeAlgorithm = () => {

		var elementsToDraw = [];
		if(this.state.elements.length > 0){

			var currentStepState = this.currentStep();

	        for(var i = 0; i < this.state.elements.length; i++){
		        var r = new Square();
		        r.usePreset("SMALL");
	            r.setTopLeft(new Coord((500 - this.state.elements.length/2.0*50) + 50 * i, 20));
	            r.setText(this.state.elements[i]);
	            r.setText(i, "TOP");
				if(this.state.target == this.state.elements[i] &&
					this.state.steps.length - 1 == this.state.currentStepNum){
					r.setColor("green");
				} else if (currentStepState.highlightedLines == 6){
					r.setColor("red");
				} else if (currentStepState.checkIndex > i){
					r.setColor("grey");
				} else {
					r.setColor("white");
				}
	            elementsToDraw.push(r);

	        }
			//Draw the arrow
			if(currentStepState.checkIndex != null){
				var p = new Pointer();
				p.setPosition("BOTTOM");
				p.pointTo(elementsToDraw[currentStepState.checkIndex]);
				elementsToDraw.push(p);
			}
			console.log("We're on " + this.state.elements[currentStepState.checkIndex] + " and the target is " + this.target);
			//If statement box
			if(currentStepState.highlightedLines == 2 &&
				this.state.elements[currentStepState.checkIndex] == this.state.target){
					elementsToDraw.push(
						<IfStatement topLeft={new Coord(475, 180)} status="true" />
					)
			} else if (currentStepState.highlightedLines == 2){
				elementsToDraw.push(
					<IfStatement topLeft={new Coord(475, 180)} status="false" />
				)
			} else {
				elementsToDraw.push(
					<IfStatement topLeft={new Coord(475, 180)} />
				)
			}
		}
		return (elementsToDraw);
    }


	render(){
		var piecesToShow = this.visualizeAlgorithm();
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
		        <DrawArea w={this.areaWidth} h={this.areaHeight} displayedPieces={piecesToShow}/>
				<CodeBox linesOfCode={this.algorithm} highlightedLines={this.highlightedLines()}/>

			</div>
		)
	}

}

export default LinearSearch;
