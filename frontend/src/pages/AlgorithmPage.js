import React, { Component } from 'react';
import "./styles.css";
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';

class AlgorithmPage extends React.Component{

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
			tempTarget : "",
			tempElements : "",

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
		Must return a line to be displayed in the explanatin box.
	*/
	generateExplanation = () => {
		if(this.constructor == AlgorithmPage)
			throw new Error("generateExplanation() must be implemented in the " + this.constructor.name + " class.");
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


	/*
		REQUIRED TO IMPLEMENT
		PRE: none
		POST: A div called "AlgorithmContainer" is returned that contains
		input boxes for the user, the drawArea, and a codeBox.
	*/
	render(){
		return (<div id="AlgorithmContainer"></div>);
	}

}

export default AlgorithmPage;
