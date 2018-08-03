import React from 'react';
import ArrayVisual from 'components/dataStructures/arrayVisual/ArrayVisual.js';
import BooleanBox from 'components/shapes/booleanBox/BooleanBox.js';
import Square, {squareDefaultProps} from 'components/shapes/square/Square.js';

class InsertionSortDraw {

    /** elements: the elements to search through to find the target
		areaWidth: the width of the svg element
		areaHeight: the height of the svg element */
	constructor(areaWidth, areaHeight){
		this.areaWidth = areaWidth;
		this.areaHeight = areaHeight;
	}


    /** Given the current step object and the index of the element that will
        be drawn, the function returns what color the element's box should
        be. */
    getBoxColor = (currentStepState, currentElementIndex) => {
        if(currentStepState.i - 1 > currentElementIndex ||
			currentStepState.highlightedLines === 11){
            return "green";
        }
        return "white";
    }


	/** Adds the loop box and key box to elementsToDraw */
	addBottomBoxes = (elementsToDraw, currentStepState) => {
		elementsToDraw.push(<BooleanBox
			topText="Continue loop?"
			status={currentStepState.loopBox}
			center={{x: this.areaWidth/2 - squareDefaultProps.size*2, y: 275}}
		/>);
		elementsToDraw.push(<Square
			topText="value of key"
			centerText={currentStepState.key}
			center={{x: this.areaWidth/2 + squareDefaultProps.size*2, y: 275}}
		/>);
	}


	/** @returns an object that can be used as an ArrayVisual pointers prop. Contains
		info for the i and j pointers. */
	getPointers = (currentStepState) => {
		var ptrs = [];
		if(currentStepState.i !== null && currentStepState.i < currentStepState.elements.length){
			ptrs.push({index: currentStepState.i, text: "i", position: "TOP"});
		}
		if(currentStepState.j !== null && currentStepState.j >= 0){
			ptrs.push({index: currentStepState.j, text: "j", position: "BOTTOM"});
		}
		return ptrs;
	}


	/** Adds an ArrayVisual component to elementsToDraw that will render the
		array in the algorithm and the position of i. */
	addArrayTo = (elementsToDraw, currentStepState) => {
		var arrayModel = [];
		for(var i = 0; i < currentStepState.elements.length; i++){
			arrayModel.push({
				value: currentStepState.elements[i],
				color: this.getBoxColor(currentStepState, i)
			});
		}
		elementsToDraw.push(<ArrayVisual
			arrayModel={arrayModel}
			pointers={this.getPointers(currentStepState)}
			center={{x: this.areaWidth/2, y: 125}}
		/>);
	}


    visualizeAlgorithm = (currentStepState) => {
        var elements = [];
        this.addArrayTo(elements, currentStepState);
		this.addBottomBoxes(elements, currentStepState);
        return elements;
    }
}

export default InsertionSortDraw;
