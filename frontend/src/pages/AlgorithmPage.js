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
		Returns the current step's information from this.state.steps. If the
		algorithm hasn't been started, null is returned.
	*/
	currentStep = () => {
		if(this.state.steps.length == 0){
			return null;
		} else {
			console.log("Your current step number is " + this.state.currentStepNum);
			return this.state.steps[this.state.currentStepNum];
		}
	}


	handleTargetChange = (event) => {
		this.setState({tempTarget : event.target.value});
	}


	handleElementsChange = (event) => {
		this.setState({tempElements : event.target.value});
	}


	nextStep = () => {
		if(this.state.currentStepNum != this.state.steps.length - 1){
			this.setState({
				currentStepNum: this.state.currentStepNum + 1,
			});
		}
	}


	previousStep = () => {
		if(this.state.currentStepNum != 0)
			this.setState({
				currentStepNum: this.state.currentStepNum - 1,
			});
	}


	handleSliderChange = (event) => {
		console.log("SLIDIN'!")
		this.setState({currentStepNum: Number(event.target.value)});
	}


	/*
		REQUIRED TO IMPLEMENT
		Must return an array of objects that contain the information needed
		for each step in the algorithm based on the user's input.
	*/
	calculateSteps = () => {
	}


	/*
		REQUIRED TO IMPLEMENT
		PRE: The user has entered information into a form and it is sent to
		the function in the event argument.
		POST: steps and currentStepNum are set in the state and
		event.preventDefault() is called.
	*/
	handleSubmit = (event) => {
	}


	/*
		REQUIRED TO IMPLEMENT
		PRE: none
		POST: The function returns an array of all of the elements to draw onto
		the drawArea. The elements can either be custom elements that are part
		of this project or regular HTML elements.
	*/
    visualizeAlgorithm = () => {
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
