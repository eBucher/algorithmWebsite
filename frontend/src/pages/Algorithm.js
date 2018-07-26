import React from 'react';
import "./styles.css";
import AlgorithmPage from 'pages/AlgorithmPage.js';
import {resetAlgorithmState} from "actions/AlgorithmActions.js";
import {setPagePath} from "actions/AppActions.js";
import store from 'store.js';
import {batchActions} from 'redux-batched-actions';

class Algorithm extends React.Component{

	constructor(props){
		super(props);
		store.dispatch(batchActions([
            resetAlgorithmState(),
			setPagePath(props.location.pathname),
        ]));
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


	/** Must return the name of the algorithm to appear at the top of the page */
	getAlgorithmName = () => {
		if(this.constructor === Algorithm)
			throw new Error("getAlgorithmName() must be implemented in the " + this.constructor.name + " class.");
	}


	/** Must return an array of strings where each string is a line of code in
		the algorithm that will be displayed. */
	getAlgorithmLines = () => {
		if(this.constructor === Algorithm)
			throw new Error("getAlgorithmLines() must be implemented in the " + this.constructor.name + " class.");
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
				algorithmName = {this.getAlgorithmName()}
				urlPath = {this.props.location.pathname}
				inputModel = {inputModel}
				piecesToShow = {piecesToShow}
				linesOfCode = {this.getAlgorithmLines()}
				highlightedLines = {this.highlightedLines()}
				explanations = {this.generateExplanations()}
			/>
		)
	}

}

export default Algorithm;
