import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';

var CONTENT_SQUARE = {
	size : 50,
	thickness : 1,
	centerFontSize : 25,
	outerFontSize : 16,
}


var SMALL_POINTER = {
	fontSize : 16,	//In pixels
	length : 50,
	arrow: new Arrow({
		headHeight : 20,
		headWidth : 20,
		thickness : 8,
		color : "#000000",
	})
}

export {CONTENT_SQUARE, SMALL_POINTER};
