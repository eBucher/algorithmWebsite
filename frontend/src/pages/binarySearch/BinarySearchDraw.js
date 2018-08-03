import React from 'react';
import BooleanBox from 'components/shapes/booleanBox/BooleanBox.js';
import ArrayVisual from 'components/dataStructures/arrayVisual/ArrayVisual.js';

class BinarySearchDraw {

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


    /** Given the current step object and the index of the element that will
        be drawn, the function returns what color the element's box should
        be. */
    getBoxColor = (currentStepState, currentElementIndex) => {
        if(currentStepState.highlightedLines === 13)
            return "red";
        if(currentElementIndex < currentStepState.left)
            return "grey";
        if(currentElementIndex > currentStepState.right)
            return "grey";
        if(currentStepState.highlightedLines === 5 && currentStepState.mid === currentElementIndex)
            return "green";
        return "white";
    }


	/** Adds the if statement box to elementsToDraw */
    addIfBox = (elementsToDraw, currentStepState) => {
		elementsToDraw.push(<BooleanBox
			topText="if statement result"
			center={{x: this.areaWidth/2, y: 205}}
			status={currentStepState.ifBox}
		/>)
    }


	/** @returns an object that can be used for the pointers prop in an ArrayVisual
		component that will render the left, mid, and right pointers. */
	getPointers = (currentStepState) => {
		if(currentStepState.left === currentStepState.right && currentStepState.left === currentStepState.mid){
			return [{index: currentStepState.left, position: "BOTTOM", text: "left/right/mid"}];
        } else if(currentStepState.left === currentStepState.mid){
			return [
				{index: currentStepState.left, position: "BOTTOM", text: "left/mid"},
				{index: currentStepState.right, position: "BOTTOM", text: "right"}
			];
        } else if(currentStepState.left === currentStepState.right){
			return [
				{index: currentStepState.left, position: "BOTTOM", text: "left/right"},
				{index: currentStepState.mid, position: "BOTTOM", text: "mid"}
			];
        } else if(currentStepState.right === currentStepState.mid){
			return [
				{index: currentStepState.left, position: "BOTTOM", text: "left"},
				{index: currentStepState.right, position: "BOTTOM", text: "mid/right"}
			];
        } else {
			return [
				{index: currentStepState.left, position: "BOTTOM", text: "left"},
				{index: currentStepState.mid, position: "BOTTOM", text: "mid"},
				{index: currentStepState.right, position: "BOTTOM", text: "right"}
			];
        }
	}

	/** Adds an ArrayVisual component to elementsToDraw that will render the array
		and the left, mid, and right pointers. */
	addArray = (elementsToDraw, currentStepState) => {
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


    visualizeAlgorithm = (currentStepState) => {
        var elementsToDraw = [];
        this.addArray(elementsToDraw, currentStepState);
        this.addIfBox(elementsToDraw, currentStepState);

        return (elementsToDraw);
    }
}

export default BinarySearchDraw;
