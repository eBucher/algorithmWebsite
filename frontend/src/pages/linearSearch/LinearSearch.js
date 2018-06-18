import React, { Component } from 'react';
import "../styles.css";
import AlgorithmPage from "pages/AlgorithmPage.js";
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import ExplanationBox from 'components/explanationBox/ExplanationBox.js';
import LinearSearchInput from 'pages/linearSearch/LinearSearchInput.js';
import LinearSearchDraw from 'pages/linearSearch/LinearSearchDraw.js';
import StepManager from 'components/stepManager/StepManager.js';

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
			started : false
		}
		this.areaHeight = 250;
		this.areaWidth = 1000;

	}


	generateExplanation = () => {
		console.log("Yo there");
		if(this.state.elements.length == 0)
			return "";

		var highlightedLine = this.state.steps[this.state.currentStepNum].highlightedLines;
		if(highlightedLine == 0)
			return "Goal: Determine whether the target is in the given elements.";
		if(highlightedLine == 1 && this.state.steps[this.state.currentStepNum].loopBox == false)
			return "There are no more elements to check.";
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
		var piecesToShow = [];
		if(this.state.started)
		{
			var drawHandler = new LinearSearchDraw(this.state.target, this.state.elements, this.areaWidth, this.areaHeight)
			var piecesToShow = drawHandler.visualizeAlgorithm(this.state.steps[this.state.currentStepNum]);
		}
		console.log("There are " + (this.state.steps.length - 1) + "steps");
		return (
			<div id="AlgorithmContainer">

				<LinearSearchInput parent={this}/>
				<StepManager value ={this.state.currentStepNum} numSteps={this.state.steps.length - 1} enabled={this.state.started} parent={this}/>
		        <DrawArea w={this.areaWidth} h={this.areaHeight} displayedPieces={piecesToShow}/>
				<CodeBox linesOfCode={this.algorithm} highlightedLines={this.highlightedLines()}/>
				<ExplanationBox text={this.generateExplanation()} />
			</div>
		)
	}

}

export default LinearSearch;
