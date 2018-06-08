import React, { Component } from 'react';
import "./styles.css";
import AlgorithmPage from "pages/AlgorithmPage.js";
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import ExplanationBox from 'components/explanationBox/ExplanationBox.js';
import Square from 'components/drawArea/shapes/Square.js';
import Pointer from 'components/drawArea/shapes/Pointer.js';
import BooleanBox from 'components/drawArea/shapes/BooleanBox.js';
import {CONTENT_SQUARE, SMALL_POINTER, IF_STATEMENT, LOOP_CONTINUATION} from 'components/drawArea/shapes/Presets.js';
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

		for(i; i < elements.length; i++){
			steps.push({checkIndex: i, highlightedLines: 1, loopBox: true});
			if(elements[i] == target){
				steps.push({checkIndex: i, highlightedLines: 2, ifBox: true});
				steps.push({ checkIndex: i,highlightedLines: 3});
				return steps;
			} else {
				steps.push({checkIndex: i, highlightedLines: 2, ifBox: false});
			}
		}
		steps.push({checkIndex: null, highlightedLines: 1, loopBox: false});
		steps.push({checkIndex: null, highlightedLines: 6});
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
		        var r = new Square(CONTENT_SQUARE);
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
				var p = new Pointer(SMALL_POINTER);
				p.setPosition("BOTTOM");
				p.pointTo(elementsToDraw[currentStepState.checkIndex]);
				p.setMessage("i = " + currentStepState.checkIndex);
				elementsToDraw.push(p);
			}
			//Draw the if box
			var ifBox = new BooleanBox(IF_STATEMENT);
			ifBox.setTopLeft(new Coord(400, 180));
			if(typeof currentStepState.ifBox !== "undefined"){
				ifBox.setStatus(currentStepState.ifBox);
			}
			elementsToDraw.push(ifBox)
			//Draw the loop box
			var loopBox = new BooleanBox(LOOP_CONTINUATION);
			loopBox.setTopLeft(new Coord(550, 180));
			if(typeof currentStepState.loopBox !== "undefined"){
				loopBox.setStatus(currentStepState.loopBox);
			}
			elementsToDraw.push(loopBox)
		}
		return (elementsToDraw);
    }


	generateExplanation(){

		if(this.state.elements.length == 0)
			return "";

		var highlightedLine = this.state.steps[this.state.currentStepNum].highlightedLines;
		if(highlightedLine == 0)
			return "Goal: Determine whether the target is in the given elements.";
		if(highlightedLine == 1 || highlightedLine == 2)
			return "Loop through each element and see if it matches the target."
		if(highlightedLine == 3)
			return "The target was found and its index was returned.";
		if(highlightedLine == 6)
			return "Since all of the elements have been checked and the target was" +
					" not found, the algorithm returns a -1."
		return "Nothing to show.";
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
				<br/>
				<input id="stepSlider" type="range" min="0" max={this.state.steps.length - 1}
					step="1" onChange={this.handleSliderChange}
					value={this.state.currentStepNum} disabled={!this.allowSlider()}
				/>
		        <DrawArea w={this.areaWidth} h={this.areaHeight} displayedPieces={piecesToShow}/>
				<CodeBox linesOfCode={this.algorithm} highlightedLines={this.highlightedLines()}/>
				<ExplanationBox text={this.generateExplanation()} />
			</div>
		)
	}

}

export default LinearSearch;
