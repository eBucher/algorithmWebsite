import Coord from '../math/Coord.js';

class Square {
	constructor(){
		this.topLeft = null;
		this.size = null;
		this.color = null;
		this.thickness = null;
		this.topText = null;
		this.bottomText = null;
		this.centerText = null;

	}


	/*
	 Given a size, the method will automatically set the square's size property.
	 Parameter options: "SMALL", "MEDIUM"
	*/
	usePreset(size){
		if(size == "SMALL"){
			this.setSize(50);
		} else if (size == "MEDIUM"){
			this.setSize(80);
		}
		return this;
	}


	/*
		Given a Coord object with nonzero x and y values, the top left corner
		of the square will be set to that position.
	*/
	setTopLeft = (newTopLeft) => {
		this.topLeft = newTopLeft;
		return this;
	}


	/**
		The size of the square is the length of any side. The border is
		included into this measurement.
	 */
	setSize = (newSize) => {
		this.size = newSize;
		this.thickness = this.size *.02;
		return this;
	}

	setColor = (newColor) => {
		if (newColor == "red"){
			this.color = "#e74c3c";
		} else if (newColor == "orange"){
			this.color = "#e67e22";
		} else if (newColor == "yellow"){
			this.color = "#f1c40f";
		} else if (newColor == "green"){
			this.color = "#2ecc71";
		} else if (newColor == "blue"){
			this.color = "#3498db";
		} else if (newColor == "purple"){
			this.color = "#9b59b6";
		} else if (newColor == "grey"){
			this.color = "#95a5a6";
		} else if (newColor == "black"){
			this.color = "#000000";
		} else if (newColor == "white"){
			this.color = "#FFFFFF";
		}
	}

	/*
		By default, newText refers to the text that will be written in
		the center of the square. A second argument can be passed as
		either "CENTER", "TOP", or "BOTTOM" to specify where the
		text will be written relative to the square.
	*/
	setText = (newText, location = "CENTER") => {
		if (location == "CENTER"){
			this.centerText = newText;
		}if(location == "TOP"){
			this.topText = newText;
		} else if (location == "BOTTOM"){
			this.bottomText = newText;
		}
		return this;
	}

	getCenterPoint = () => {
		return new Coord(this.topLeft.x + this.size/2, this.topLeft.y + this.size/2);
	}

    draw = (context) => {
		this._drawSquare(context);
		this._drawCenterText(context);
		this._drawTopText(context);
		this._drawBottomText(context);
	}


	_drawSquare = (context) => {
		//Draw the Square without any text.
		context.fillStyle = this.color;
		context.strokeStyle = 'black';
		context.lineWidth = this.thickness;
		context.beginPath();
		context.rect(
			this.topLeft.x + this.thickness/2,
			this.topLeft.y + this.thickness/2,
			this.size - this.thickness,
			this.size -  this.thickness,
		);
		context.fill();
		context.stroke();
	}


	_drawCenterText = (context) => {
		if(this.centerText != null){
			context.fillStyle = "black";
			context.font = this.size/2 + "px Arial";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillText(this.centerText, this.getCenterPoint().x, this.getCenterPoint().y);
		}
	}


	_drawTopText = (context) => {
		if(this.topText != null){
			context.fillStyle = "black";
			context.font = this.size/3 + "px Arial";
			context.textAlign="center";
			context.textBaseline="bottom";
			context.fillText(this.topText, this.getCenterPoint().x, this.topLeft.y - 5);
		}
	}


	_drawBottomText = (context) => {
		if(this.bottomText != null){
			context.fillStyle = "black";
			context.font = this.size/3 + "px Arial";
			context.textAlign="center";
			context.textBaseline="top";
			context.fillText(this.bottomText, this.getCenterPoint().x, this.topLeft.y + this.size + 5);
		}
	}


}

export default Square;
