import React from 'react';
import Square from 'components/drawArea/shapes/Square.js';
import Pointer from 'components/drawArea/shapes/Pointer.js';
import BooleanBox from 'components/drawArea/shapes/BooleanBox.js';
import Coord from 'components/drawArea/math/Coord.js';
import {CONTENT_SQUARE, SMALL_POINTER, IF_STATEMENT, LOOP_CONTINUATION} from 'components/drawArea/shapes/Presets.js';

class InsertionSortDraw {

    /** elements: the elements to search through to find the target
		areaWidth: the width of the svg element
		areaHeight: the height of the svg element */
	constructor(areaWidth, areaHeight){
		this.areaWidth = areaWidth;
		this.areaHeight = areaHeight;
	}

    /** Returns the top left coordinate of where the element at the given
        index should be drawn. */
    boxLocation = (currentElementIndex, numElements) => {
        var drawAreaCenterX = this.areaWidth /2;
        var squareSize = CONTENT_SQUARE().size;

        var x = (drawAreaCenterX - numElements/2.0*squareSize) +
            squareSize * currentElementIndex;
        var y = 100;
        return new Coord(x, y);
    }

    /** Given the current step object and the index of the element that will
        be drawn, the function returns what color the element's box should
        be. */
    getBoxColor = (currentStepState, currentElementIndex) => {
        if(currentStepState.i - 1 > currentElementIndex){
            return "green";
        }
        return "white";
    }


    /** Adds all of the boxes with the numbers to elementsToDraw. */
    addBoxes = (elementsToDraw, currentStepState) => {
        for(var i = 0; i < currentStepState.elements.length; i++){
            var r = new Square(CONTENT_SQUARE());
            r.topLeft = this.boxLocation(i, currentStepState.elements.length);
            r.centerText = currentStepState.elements[i];
            r.topText = i;
            r.color = this.getBoxColor(currentStepState, i);
            elementsToDraw.push(r);
        }
    }

    visualizeAlgorithm = (currentStepState) => {
        var elements = [];
        this.addBoxes(elements, currentStepState);
        return elements;
    }
}

export default InsertionSortDraw;
