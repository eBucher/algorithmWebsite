import Square from 'components/drawArea/shapes/Square.js';
import Pointer from 'components/drawArea/shapes/Pointer.js';
import BooleanBox from 'components/drawArea/shapes/BooleanBox.js';
import Coord from 'components/drawArea/math/Coord.js';
import {CONTENT_SQUARE, SMALL_POINTER, IF_STATEMENT} from 'components/drawArea/shapes/Presets.js';

class BinarySearchDraw {

    /*
		target: the element to look for
		elements: the elements to search through to find the target
		areaWidth: the width of the svg element
		areaHeight: the height of the svg element
	*/
	constructor(target, elements, areaWidth, areaHeight){
		this.target = target;
		this.elements = elements;
		this.areaWidth = areaWidth;
		this.areaHeight = areaHeight;
	}

    /*
        Given the current step object and the index of the element that will
        be drawn, the function returns what color the element's box should
        be.
    */
    getBoxColor = (currentStepState, currentElementIndex) => {
        if(currentStepState.highlightedLines == 13)
            return "red";
        if(currentElementIndex < currentStepState.left)
            return "grey";
        if(currentElementIndex > currentStepState.right)
            return "grey";
        if(currentStepState.highlightedLines == 5 && currentStepState.mid == currentElementIndex)
            return "green";
        return "white";
    }


    /*
        Returns the top left coordinate of where the element at the given
        index should be drawn.
    */
    boxLocation = (currentElementIndex) => {
        var drawAreaCenterX = this.areaWidth /2;
        var squareSize = CONTENT_SQUARE().size;

        var x = (drawAreaCenterX - this.elements.length/2.0*squareSize) +
            squareSize * currentElementIndex;
        var y = 20;
        return new Coord(x, y);
    }


    /*
        Adds all of the boxes with the numbers to elementsToDraw.
    */
    addBoxes = (elementsToDraw, currentStepState) => {
        for(var i = 0; i < this.elements.length; i++){
            var r = new Square(CONTENT_SQUARE());
            r.topLeft = this.boxLocation(i);
            r.centerText = this.elements[i];
            r.topText = i;
            r.color = this.getBoxColor(currentStepState, i);
            elementsToDraw.push(r);

        }
    }


    /*
        Draws the left, mid, and right arrows pointing to the correct boxes.
    */
    addArrows = (elements, currentStep) => {
        if(currentStep.left == currentStep.right && currentStep.left == currentStep.mid){
            this.addArrow(currentStep.left, "left/right/mid", elements);
        } else if(currentStep.left == currentStep.mid){
            this.addArrow(currentStep.left, "left/mid", elements);
            this.addArrow(currentStep.right, "right", elements)
        } else if(currentStep.left == currentStep.right){
            this.addArrow(currentStep.left, "left/right", elements);
            this.addArrow(currentStep.mid, "mid", elements);
        } else if(currentStep.right == currentStep.mid){
            this.addArrow(currentStep.right, "mid/right", elements);
            this.addArrow(currentStep.left, "left", elements);
        } else {
            this.addArrow(currentStep.left, "left", elements);
            this.addArrow(currentStep.mid, "mid", elements);
            this.addArrow(currentStep.right, "right", elements);
        }
    }

    /*
        Given a list of elements to draw, the function will add a new pointer
        element that points to the element at the given index and that uses
        the given text.
    */
    addArrow = (indexOfSquare, text, elements) => {
        if(indexOfSquare != null && indexOfSquare >= 0 && indexOfSquare < this.elements.length){
            var ptr = new Pointer(SMALL_POINTER());
            ptr.direction = "UP";
            ptr.pointCoord = elements[indexOfSquare].getCoord("BOTTOM")
            ptr.message = text;
            elements.push(ptr);
        }
    }


    addIfBox = (elementsToDraw, currentStepState) => {
        var ifBox = new BooleanBox(IF_STATEMENT());
        ifBox.topText = "if statement result";
        ifBox.topLeft = new Coord(this.areaWidth / 2 - ifBox.size/2, 180);
        if(typeof currentStepState.ifBox !== "undefined"){
            ifBox.status = currentStepState.ifBox;
        }

        elementsToDraw.push(ifBox)
    }


    visualizeAlgorithm = (currentStepState) => {

        var elementsToDraw = [];

        this.addBoxes(elementsToDraw, currentStepState);
        this.addArrows(elementsToDraw, currentStepState);
        this.addIfBox(elementsToDraw, currentStepState);


        return (elementsToDraw);
    }
}

export default BinarySearchDraw;
