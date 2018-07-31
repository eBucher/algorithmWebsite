import React from 'react';
import ArrayVisual from 'components/dataStructures/arrayVisual/ArrayVisual.js';
import BooleanBox from 'components/shapes/booleanBox/BooleanBox.js';
class LinearSearchDraw {

	/** target: the element to look for
		elements: the elements to search through to find the target
		areaWidth: the width of the svg element
		areaHeight: the height of the svg element */
	constructor(target, elements, areaWidth, areaHeight){
		this.target = target;
		this.elements = elements;
		this.areaWidth = areaWidth;
		this.areaHeight = areaHeight;
	}


	/** Given the current step's state and the index of the box to draw, the
		function will return what color the box should be. */
	getBoxColor = (currentStepState, currentElementIndex) => {
		if(currentStepState.highlightedLines === 3 &&
			this.elements[currentElementIndex] === this.target)
			return "green";
		else if (currentStepState.highlightedLines === 6)
			return "red";
		else if (currentStepState.i > currentElementIndex)
			return "grey";

		return "white";
	}


	/** Adds the if statement box and for loop box to elementsToDraw. */
	addConditionBoxesTo(elementsToDraw, currentStep){
		elementsToDraw.push(<BooleanBox
			status={currentStep.ifBox}
			center={{x: this.areaWidth/2 - 75, y: 205}}
			topText="Is it a match?"
		/>);

		elementsToDraw.push(<BooleanBox
			status={currentStep.loopBox}
			center={{x: this.areaWidth/2 + 75, y: 205}}
			topText="Continue checking?"
		/>)
	}


	/** @return an array that can be used in an ArrayVisual pointer prop for making
		one pointer to indicate where i is */
	getPointers = (currentStepState) => {
		if(currentStepState.i !== null && currentStepState.i < this.elements.length){
			return [{index: currentStepState.i, text: "i", position: "BOTTOM"}];
		}
		return [];
	}


	/** Adds an ArrayVisual component to elementsToDraw that will render the
		array in the algorithm and the position of i. */
	addArrayTo(elementsToDraw, currentStepState){
		var arrayModel = [];
		for(var i = 0; i < this.elements.length; i++){
			arrayModel.push({
				value: this.elements[i],
				color: this.getBoxColor(currentStepState, i)
			});
		}
		elementsToDraw.push(<ArrayVisual
			arrayModel={arrayModel}
			pointers={this.getPointers(currentStepState)}
			center={{x: this.areaWidth/2, y: 50}}
		/>);
	}


	/** Returns an array of components that are a visualization of the given step. */
	visualizeAlgorithm = (currentStepState) => {
		var elementsToDraw = [];

		this.addArrayTo(elementsToDraw, currentStepState);
		this.addConditionBoxesTo(elementsToDraw, currentStepState);

		return (elementsToDraw);
	}
}

export default LinearSearchDraw;
