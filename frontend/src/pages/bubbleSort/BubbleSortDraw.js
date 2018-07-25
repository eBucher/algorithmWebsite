import React from 'react';
import Square from 'components/drawArea/shapes/Square.js';
import Pointer from 'components/drawArea/shapes/Pointer.js';
import BooleanBox from 'components/drawArea/shapes/BooleanBox.js';
import Coord from 'components/drawArea/math/Coord.js';
import {CONTENT_SQUARE, SMALL_POINTER, IF_STATEMENT, LOOP_CONTINUATION} from 'components/drawArea/shapes/Presets.js';

class BubbleSortDraw {

    /** elements: the elements to search through to find the target
		areaWidth: the width of the svg element
		areaHeight: the height of the svg element */
	constructor(areaWidth, areaHeight){
		this.areaWidth = areaWidth;
		this.areaHeight = areaHeight;
	}


    /** Returns the top left coordinate of where the element at the given
        index should be drawn. */
    boxLocation = (currentElementIndex, currentStepState) => {
        var drawAreaCenterX = this.areaWidth /2;
        var squareSize = CONTENT_SQUARE().size;

        var x = (drawAreaCenterX - currentStepState.elements.length/2.0*squareSize) +
            squareSize * currentElementIndex;
        var y = 100;
        return new Coord(x, y);
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


    /** Adds all of the boxes with the numbers to elementsToDraw. */
    addBoxes = (elementsToDraw, currentStepState) => {
        for(var i = 0; i < currentStepState.elements.length; i++){
            var r = new Square(CONTENT_SQUARE());
            r.topLeft = this.boxLocation(i, currentStepState);
            r.centerText = currentStepState.elements[i];
            r.topText = i;
            r.color = this.getBoxColor(currentStepState, i);
            elementsToDraw.push(r);
        }
    }


	/** Adds a pointer whose location is above the j'th element to elementsToDraw */
	addJPointer = (elementsToDraw, currentStepState) => {
		if(currentStepState.j !== null){
			console.log(currentStepState);
			console.log(elementsToDraw);
			var ptr = new Pointer(SMALL_POINTER());
			ptr.direction = "DOWN";
			ptr.pointCoord = elementsToDraw[currentStepState.j].getCoord("TOP")
			ptr.message = "j";
			elementsToDraw.push(ptr);
		}
	}


	/** If two elements are being swapped in the current step, the word "Swapped"
		whose position is below the two elements will be added to elementsToDraw. */
	addSwap = (elementsToDraw, currentStepState) => {
		if(currentStepState.highlightedLines === 4){
			var centerX = elementsToDraw[currentStepState.j].getCoord("BOTTOM").x +
				CONTENT_SQUARE().size/2;
			var centerY = elementsToDraw[currentStepState.j].getCoord("BOTTOM").y + 20;
			elementsToDraw.push(
				<text x={centerX} y={centerY}
					font-family="arial"
					font-size="20px"
					text-anchor="middle"
				>
 					Swapped
				</text>
			)
		}
	}


	addConditionBoxesTo(elementsToDraw, currentStepState){
		var ifBox = new BooleanBox(IF_STATEMENT());
		ifBox.topText = "Swap elements?";
		ifBox.topLeft = new Coord(this.areaWidth / 2 - CONTENT_SQUARE().size * 1.5 - 100, 200);
		if(typeof currentStepState.ifBox !== "undefined"){
			ifBox.status = currentStepState.ifBox;

		}
		elementsToDraw.push(ifBox);

		var loopBox = new BooleanBox(LOOP_CONTINUATION());
		loopBox.topText = "Continue loop?";
		loopBox.topLeft = new Coord(this.areaWidth / 2 - CONTENT_SQUARE().size / 2, 200);
		if(typeof currentStepState.loopBox !== "undefined"){
			loopBox.status = currentStepState.loopBox;

		}
		elementsToDraw.push(loopBox);
		console.log(currentStepState.i);
		var iBox = new Square(CONTENT_SQUARE());
		iBox.topText = "Value of i";
		iBox.color = "white";
		iBox.topLeft = new Coord(this.areaWidth / 2 + CONTENT_SQUARE().size * .5 + 100, 200);
		if(currentStepState.i !== null){
			iBox.centerText = currentStepState.i;
		}
		elementsToDraw.push(iBox);
	}


    visualizeAlgorithm = (currentStepState) => {

        var elementsToDraw = [];

        this.addBoxes(elementsToDraw, currentStepState);
		this.addJPointer(elementsToDraw, currentStepState);
		this.addSwap(elementsToDraw, currentStepState);
		this.addConditionBoxesTo(elementsToDraw, currentStepState);

        return (elementsToDraw);
    }
}

export default BubbleSortDraw;
