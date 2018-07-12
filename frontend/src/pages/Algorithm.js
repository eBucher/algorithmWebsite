import React from 'react';
import "./styles.css";
import AlgorithmPage from 'pages/AlgorithmPage.js';

class Algorithm extends React.Component{

	/*
		Required member variables:
		this.algorithm: an array of each line in the algorithm that will get
		highlighted. \n can be used in a string to indicate where where a line
		break will be upon output. Use four spaces for one tab.
	*/
	constructor(){
		super();
		//Denote a line break as a \n
		this.algorithm = [];

	}


	/*
		Returns the index of the line that should be highlighted. If there are
		no lines that need to be highlighted, null is returned.
	*/
	highlightedLines = () => {
		var state = this.props.algorithm;
		if(state.steps.length === 0){
			return null;
		} else {
			return state.steps[state.stepNum].highlightedLines;
		}
	}


	/*
		Must return a line to be displayed in the explanation box at the given step number.
	*/
	generateExplanation = (stepNum) => {
		if(this.constructor === Algorithm)
			throw new Error("generateExplanation() must be implemented in the " + this.constructor.name + " class.");
	}


	/*
		Must return an array of all of the objects that will be drawn in the drawArea.
	*/
	getVisuals = () => {
		if(this.constructor === Algorithm)
			throw new Error("getVisuals() must be implemented in the " + this.constructor.name + " class.");
	}


	/*
		Must return an object that can be used by an algorithmInputForm object to render all
		of the input form's elements.
	*/
	getInputModel = () => {
		if(this.constructor === Algorithm)
			throw new Error("getInputModel() must be implemented in the " + this.constructor.name + " class.");
	}


	generateExplanations = () => {
		var state = this.props.algorithm;
		var stepsToShow = 5;

		if(state.steps.length === 0){
			return [null, null, null, null, null];
		}
		var latestSteps = [];
		for(var i = state.stepNum; i > state.stepNum - stepsToShow; i--){
			if(i >= 0){
				latestSteps.push(this.generateExplanation(i));
			} else {
				latestSteps.push(null);
			}
		}
		return latestSteps;
	}


	render(){
		var piecesToShow = this.getVisuals();
		var inputModel = this.getInputModel();
		return (
			<AlgorithmPage
				parent = {this}
				inputModel = {inputModel}
				piecesToShow = {piecesToShow}
				linesOfCode = {this.algorithm}
				highlightedLines = {this.highlightedLines()}
				explanations = {this.generateExplanations()}
			/>
		)
	}

}

export default Algorithm;
