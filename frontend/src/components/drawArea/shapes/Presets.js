import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';

function CONTENT_SQUARE() {
	return {
		size : 50,
		thickness : 1,
		centerFontSize : 25,
		outerFontSize : 16,
	}
}


function SMALL_POINTER() {
	return {
		fontSize : 16,	//In pixels
		length : 50,
		arrow: new Arrow({
			headHeight : 20,
			headWidth : 20,
			thickness : 8,
			color : "#000000",
		})
	};
}


function IF_STATEMENT() {
	return {
		size : 50,
		topText : "if statement result",
	}
}


function LOOP_CONTINUATION() {
	return {
		size: 50,
		topText : "continue loop?"
	}
}

export {CONTENT_SQUARE, SMALL_POINTER, IF_STATEMENT, LOOP_CONTINUATION};
