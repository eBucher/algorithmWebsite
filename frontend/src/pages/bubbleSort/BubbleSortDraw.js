import React from 'react';
import ArrayVisual from 'components/dataStructures/arrayVisual/ArrayVisual.js';
import BooleanBox from 'components/shapes/booleanBox/BooleanBox.js';
import Square, {squareDefaultProps} from 'components/shapes/square/Square.js';

class BubbleSortDraw {

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
        if((currentStepState.elements.length - currentStepState.i <= currentElementIndex) ||
			(currentStepState.highlightedLines === 8)
		)
            return "green";
		if((currentStepState.highlightedLines === 4) &&
			(currentStepState.j === currentElementIndex ||
			currentStepState.j + 1 === currentElementIndex)
		)
			return "yellow";
        return "white";
    }


	/** If two elements are being swapped in the current step, the word "Swapped"
		whose position is below the two elements will be added to elementsToDraw. */
	addSwap = (currentStepState) => {
		if(currentStepState.highlightedLines === 4){
			return [{
				index1: currentStepState.j,
				index2: currentStepState.j + 1,
				text: "swap",
				position: "BOTTOM",
			}];
		}
	}


	/** Adds three centered boxes to show the value of the ifBox, loopBox, and i
		to elementsToDraw */
	addConditionBoxesTo = (elementsToDraw, currentStepState) => {
		elementsToDraw.push(<BooleanBox
			topText="Swap elements?"
			status={currentStepState.ifBox}
			center={{x: this.areaWidth/2 - squareDefaultProps.size * 3, y: 275}}
		/>);
		elementsToDraw.push(<BooleanBox
			topText="Continue loop?"
			status={currentStepState.loopBox}
			center={{x: this.areaWidth/2, y: 275}}
		/>);
		elementsToDraw.push(<Square
			topText="value of i"
			centerText={currentStepState.i}
			center={{x: this.areaWidth/2 + squareDefaultProps.size * 3, y: 275}}
		/>);
	}


	/** @return an array that can be used in an ArrayVisual pointer prop for making
		one pointer to indicate where i is */
	getPointers = (currentStepState) => {
		if(currentStepState.i < currentStepState.elements.length){
			return [{index: currentStepState.j, text: "j", position: "TOP"}];
		}
		return [];
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
			bracketPointers={this.addSwap(currentStepState)}
			center={{x: this.areaWidth/2, y: 125}}
		/>);
	}


    visualizeAlgorithm = (currentStepState) => {
        var elementsToDraw = [];

        this.addArrayTo(elementsToDraw, currentStepState);
		this.addSwap(elementsToDraw, currentStepState);
		this.addConditionBoxesTo(elementsToDraw, currentStepState);

        return (elementsToDraw);
    }
}

export default BubbleSortDraw;
