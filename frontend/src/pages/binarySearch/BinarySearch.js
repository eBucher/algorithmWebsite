import React, { Component } from 'react';
import "pages/styles.css";
import Algorithm from "pages/Algorithm.js";
import AlgorithmPage from "pages/AlgorithmPage.js";
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import ExplanationBox from 'components/explanationBox/ExplanationBox.js';
import StepManager from 'components/stepManager/StepManager.js';
import BinarySearchInput from 'pages/binarySearch/BinarySearchInput.js';
import BinarySearchDraw from 'pages/binarySearch/BinarySearchDraw.js';
import Display from 'components/display/Display.js';

class BinarySearch extends Algorithm{

	constructor(){
		super();
		//Denote a line break as a \n
		this.name = "Binary Search";
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

	}


	generateExplanation = (stepNum) => {
		if(this.state.elements.length == 0)
			return "";

		var highlightedLine = this.state.steps[stepNum].highlightedLines;
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

	getVisuals = () => {
		var piecesToShow = [];
		if(this.state.started)
		{
			var drawHandler = new BinarySearchDraw(this.state.target, this.state.elements, this.state.areaWidth, this.state.areaHeight)
			var piecesToShow = drawHandler.visualizeAlgorithm(this.state.steps[this.state.currentStepNum]);
		}
		return piecesToShow;
	}

	getInputModel = () => {
		return new BinarySearchInput(this).buildModel();
	}


}

export default BinarySearch;
