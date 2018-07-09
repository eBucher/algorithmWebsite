import React, { Component } from 'react';
import "./styles.css";
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import AlgorithmPage from 'pages/AlgorithmPage.js';

class Algorithm extends React.Component{

	/*
		Required member variables:
		this.algorithm: an array of each line in the algorithm that will get
		highlighted. \n can be used in a string to indicate where where a line
		break will be upon output. Use four spaces for one tab.
		this.state: Initialize its values as shown below along with any
			other state variables that are needed for the specific algorithm.
	*/
	constructor(){
		super();
		//Denote a line break as a \n
		this.algorithm = [];
		this.state = {
			areaWidth: 0,
			areaHeight: 0,
			currentStepNum: null,
			steps : [],
			started : false
		}

	}


	/*
		Returns the index of the line that should be highlighted. If there are
		no lines that need to be highlighted, null is returned.
	*/
	highlightedLines = () => {
		if(this.state.steps.length == 0){
			return null;
		} else {
			return this.state.steps[this.state.currentStepNum].highlightedLines;
		}
	}


	/*
		Must return a line to be displayed in the explanation box at the given step number.
	*/
	generateExplanation = (stepNum) => {
		if(this.constructor == Algorithm)
			throw new Error("generateExplanation() must be implemented in the " + this.constructor.name + " class.");
	}


	/*
		Must return an array of all of the objects that will be drawn in the drawArea.
	*/
	getVisuals = () => {
		if(this.constructor == Algorithm)
			throw new Error("getVisuals() must be implemented in the " + this.constructor.name + " class.");
	}


	/*
		Must return an object that can be used by an algorithmInputForm object to render all
		of the input form's elements.
	*/
	getInputModel = () => {
		if(this.constructor == Algorithm)
			throw new Error("getInputModel() must be implemented in the " + this.constructor.name + " class.");
	}


	generateExplanations = () => {
		var stepsToShow = 5;

		if(this.state.steps.length == 0){
			return [null, null, null, null, null];
		}
		var latestSteps = [];
		for(var i = this.state.currentStepNum; i > this.state.currentStepNum - stepsToShow; i--){
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
		console.log("Trying to render");
		return (
			<AlgorithmPage
				algorithmName = {this.name}
				parent = {this}
				inputModel = {inputModel}
				currentStepNum = {this.state.currentStepNum}
				numSteps = {this.state.steps.length}
				started = {this.state.started}
				areaWidth = {this.state.areaWidth}
				areaHeight = {this.state.areaHeight}
				piecesToShow = {piecesToShow}
				algorithm = {this.algorithm}
				highlightedLines = {this.highlightedLines()}
				explanations = {this.generateExplanations()}
			/>
		)
	}

}

export default Algorithm;
