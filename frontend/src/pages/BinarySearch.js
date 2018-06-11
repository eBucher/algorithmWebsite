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

class BinarySearch extends AlgorithmPage{

	constructor(){
		super();
		//Denote a line break as a \n
		this.algorithm = [
			"function binarySearch(elements, left, right, target){",
			"    if (right >= left){",
			"        int mid = left + (right - 1)/2",
			"",
			"        if(elements[mid] == target){",
			"            return mid;",
			"        }",
			"",
			"        if(elements[mid] > target)",
			"            return binarySearch(elements, left, mid-1, target);",
			"",
			"        return binarySearch(elements, mid+1, right, target);",
			"    }",
			"    return -1;",
			"}"
		];
		this.state = {
			tempTarget : "",
			tempElements : "",
			target : null,
			elements : [],

			currentStepNum: null,
			steps : [],
			started : false
		}
		this.areaHeight = 250;
		this.areaWidth = 1000;

	}


	handleTargetChange = (event) => {
		this.setState({tempTarget : event.target.value});
	}


	handleElementsChange = (event) => {
		this.setState({tempElements : event.target.value});
	}


	// checkIndex is where the array will be pointing to.
	calculateSteps = (elements, leftIdx, rightIdx, target) => {
		alert("Calculate steps(" + elements + ", " + leftIdx + ", " + rightIdx + ", " + target + ")");
		var steps = [];
		steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 0});

		if(rightIdx >= leftIdx){
			steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 1, ifBox: true});
			var middle = leftIdx + Math.floor((rightIdx - leftIdx) /2);
			steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 2});
			if(elements[middle] == target){
				steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 4, ifBox: true});
				steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 5});
				return steps;
			} else {
				steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 4, ifBox: false});
			}
			if(elements[middle] > target){
				steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 8, ifBox: true});
				steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 9});
				return steps.concat(this.calculateSteps(elements, leftIdx, middle - 1, target));
			} else {
				steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 8, ifBox: false});
				steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 11});
				return steps.concat(this.calculateSteps(elements, middle + 1, rightIdx, target));
			}
		}
		steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 1, ifBox: false});
		steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 13});

		return steps;
	}


	handleSubmit = (event) => {
		//Trim the whitespace from the input
		var newElements = this.state.tempElements.replace(/\s/g,'');
		//Convert the elements to an array
		newElements = newElements.split(',');
		//Convert all of the strings to numbers
		for(var i = 0; i < newElements.length; i++){newElements[i] = Number(newElements[i])};
		var newSteps = this.calculateSteps(newElements, 0, newElements.length - 1, this.state.tempTarget);
		this.setState({
			target : this.state.tempTarget,
			elements: newElements,
			steps: newSteps,
			currentStepNum: 0,
			started: true,
		});
		event.preventDefault();
	}


	/*
		Given the current step object and the index of the element that will
		be drawn, the function returns what color the element's box should
		be.
	*/
	getBoxColor = (currentStepState, currentElementIndex) => {
		if(currentStepState.highlightedLines == 13)
			return "red";
		if(currentElementIndex < currentStepState.left)
			return "grey";
		if(currentElementIndex > currentStepState.right)
			return "grey";
		if(currentStepState.highlightedLines == 5 && currentStepState.mid == currentElementIndex)
			return "green";
		return "white";
	}


	/*
		Returns the top left coordinate of where the element at the given
		index should be drawn.
	*/
	boxLocation = (currentElementIndex) => {
		var drawAreaCenterX = this.areaWidth /2;
		var squareSize = CONTENT_SQUARE().size;

		var x = (drawAreaCenterX - this.state.elements.length/2.0*squareSize) +
			squareSize * currentElementIndex;
		var y = 20;
		return new Coord(x, y);
	}

	addArrows = (currentStep, elements) => {
		if(currentStep.left == currentStep.right && currentStep.left == currentStep.mid){
			this.addArrow(currentStep.left, "left/right/mid", elements);
		} else if(currentStep.left == currentStep.mid){
			this.addArrow(currentStep.left, "left/mid", elements);
			this.addArrow(currentStep.right, "right", elements)
		} else if(currentStep.left == currentStep.right){
			this.addArrow(currentStep.left, "left/right", elements);
			this.addArrow(currentStep.mid, "mid", elements);
		} else if(currentStep.right == currentStep.mid){
			this.addArrow(currentStep.right, "mid/right", elements);
			this.addArrow(currentStep.left, "left", elements);
		} else {
			this.addArrow(currentStep.left, "left", elements);
			this.addArrow(currentStep.mid, "mid", elements);
			this.addArrow(currentStep.right, "right", elements);
		}
	}

	/*
		Given a list of elements to draw, the function will add a new pointer
		element that points to the element at the given index and that uses
		the given text.
	*/
	addArrow = (indexOfSquare, text, elements) => {
		if(indexOfSquare != null && indexOfSquare >= 0 && indexOfSquare < this.state.elements.length){
			var ptr = new Pointer(SMALL_POINTER());
			ptr.setPosition("BOTTOM");
			ptr.pointTo(elements[indexOfSquare]);
			ptr.setMessage(text);
			elements.push(ptr);
		}
	}

    visualizeAlgorithm = () => {

		var elementsToDraw = [];
		if(this.state.started){

			var currentStepState = this.currentStep();

	        for(var i = 0; i < this.state.elements.length; i++){
		        var r = new Square(CONTENT_SQUARE());
	            r.setTopLeft(this.boxLocation(i));
	            r.setText(this.state.elements[i]);
	            r.setText(i, "TOP");
				r.setColor(this.getBoxColor(currentStepState, i));
	            elementsToDraw.push(r);

	        }
			this.addArrows(currentStepState, elementsToDraw);

			//Draw the if box
			var ifBox = new BooleanBox(IF_STATEMENT());
			ifBox.setTopLeft(new Coord(this.areaWidth / 2 - 100, 180));
			if(typeof currentStepState.ifBox !== "undefined"){
				ifBox.setStatus(currentStepState.ifBox);
			}

			elementsToDraw.push(ifBox)
			//Draw the loop box
			var loopBox = new BooleanBox(LOOP_CONTINUATION());
			loopBox.setTopLeft(new Coord(this.areaWidth / 2 + CONTENT_SQUARE().size, 180));
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
		if(highlightedLine == 1)
			return "Make sure the two indices have not passed eachother."
		if(highlightedLine == 2)
			return "Since the left and right indices are not past eachother, find the midpoint between them.";
		if(highlightedLine == 4)
			return "Check to see if the target is found at the midpoint."
		if(highlightedLine == 5)
			return "The target was at the midpoint, so its index is returned."
		if(highlightedLine == 8)
			return "The midpoint was not the target, so now it will check to see if the target is to the left of the midpoint.";
		if(highlightedLine == 9)
			return "If the target exists, it must be to the left of the midpoint. Therefore, the " +
			"function will be run again on the elements from the left index to the element that " +
			"is to the left of the midpoint.";
		if(highlightedLine == 11)
			return "The target is greater than the element at the midpoint. Therefore, the " +
			"function will run again on the elements from the right of the midpoint to the right index.";
		if(highlightedLine == 13)
			return "The left and right indices have passed each other so the target does not exist in " +
			"the list of elements.";
		return "Nothing to show.";
	}

	render(){
		var piecesToShow = this.visualizeAlgorithm();
		return (
			<div id="AlgorithmContainer">

				<form onSubmit={this.handleSubmit}>
					Target
					<input type="text" onChange={this.handleTargetChange}></input>
					Sorted Elements to search through
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
					value={this.state.currentStepNum} disabled={!this.state.started}
				/>
		        <DrawArea w={this.areaWidth} h={this.areaHeight} displayedPieces={piecesToShow}/>
				<CodeBox linesOfCode={this.algorithm} highlightedLines={this.highlightedLines()}/>
				<ExplanationBox text={this.generateExplanation()} />
			</div>
		)
	}

}

export default BinarySearch;
