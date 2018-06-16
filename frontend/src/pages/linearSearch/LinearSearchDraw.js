import {CONTENT_SQUARE, SMALL_POINTER, IF_STATEMENT, LOOP_CONTINUATION} from 'components/drawArea/shapes/Presets.js';
import Square from 'components/drawArea/shapes/Square.js';
import Pointer from 'components/drawArea/shapes/Pointer.js';
import BooleanBox from 'components/drawArea/shapes/BooleanBox.js';
import Coord from 'components/drawArea/math/Coord.js';

class LinearSearchDraw {

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
		Given the current step's state and the index of the box to draw, the
		function will return what color the box should be.
	*/
	getBoxColor = (currentStepState, currentElementIndex) => {
		if(currentStepState.highlightedLines == 3 &&
			this.elements[currentElementIndex] == this.target)
			return "green";
		else if (currentStepState.highlightedLines == 6)
			return "red";
		else if (currentStepState.checkIndex > currentElementIndex)
			return "grey";

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
		Pre: i == this.elements.length
		The function will add a new component to elementsToDraw that is a red
		arrow and that is one position beyond the last box.
	*/
	beyondBoundsArrow = (elementsToDraw, i) => {
		var lastArrowPos = elementsToDraw[i - 1].getCoord("BOTTOM");
		var p = new Pointer(SMALL_POINTER());
		p.color = "red";
		p.direction = "UP";
		p.pointCoord = lastArrowPos.add(new Coord(CONTENT_SQUARE().size, 0));
		p.message = "i = " + i;
		elementsToDraw.push(p);
	}


	/*
		Adds all of the boxes with the numbers to elementsToDraw.
	*/
	addBoxesTo(elementsToDraw, currentStep){
		for(var i = 0; i < this.elements.length; i++){
			var r = new Square(CONTENT_SQUARE());
			r.topLeft = this.boxLocation(i);
			r.centerText = this.elements[i];
			r.topText = i;
			r.color = this.getBoxColor(currentStep, i);
			elementsToDraw.push(r);
		}
	}


	/*
		Adds the index arrow to elementsToDraw.
	*/
	addArrowTo(elementsToDraw, currentStep){

		if(currentStep.checkIndex != null && currentStep.checkIndex < this.elements.length){
			var p = new Pointer(SMALL_POINTER());
			p.direction = "UP";
			p.pointCoord = elementsToDraw[currentStep.checkIndex].getCoord("BOTTOM");
			p.message = "i = " + currentStep.checkIndex;
			elementsToDraw.push(p);
		}
		if(currentStep.checkIndex == this.elements.length){
			this.beyondBoundsArrow(elementsToDraw, currentStep.checkIndex);
		}
	}


	/*
		Adds the if statement box and for loop box to elementsToDraw.
	*/
	addConditionBoxesTo(elementsToDraw, currentStep){
		var ifBox = new BooleanBox(IF_STATEMENT());
		ifBox.topText = "Is it a match?";
		ifBox.topLeft = new Coord(this.areaWidth / 2 - 100, 180);
		if(typeof currentStep.ifBox !== "undefined"){
			ifBox.status = currentStep.ifBox;

		}
		elementsToDraw.push(ifBox);

		var loopBox = new BooleanBox(LOOP_CONTINUATION());
		loopBox.topText = "Continue checking?";
		loopBox.topLeft = new Coord(this.areaWidth / 2 + CONTENT_SQUARE().size, 180);
		if(typeof currentStep.loopBox !== "undefined"){
			loopBox.status = currentStep.loopBox;

		}
		elementsToDraw.push(loopBox);
	}


	/*
		Returns an array of components that are a visualization of the given step.
	*/
	visualizeAlgorithm = (currentStepState) => {

		var elementsToDraw = [];

		this.addBoxesTo(elementsToDraw, currentStepState);
		this.addArrowTo(elementsToDraw, currentStepState);
		this.addConditionBoxesTo(elementsToDraw, currentStepState);

		return (elementsToDraw);
	}
}

export default LinearSearchDraw;
