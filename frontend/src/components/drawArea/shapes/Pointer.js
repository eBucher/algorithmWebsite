import React from 'react';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';

class Pointer extends CustomShape{


	constructor(configObj){
		super();
		this.pointCoord = null;
		this.message = null;
		this.fontSize = 12;
		this.headWidth = 20;
		this.headHeight = 20;
		this.thickness = 8;
		this.length = 50;
		this.direction = "UP";
		this.color = "black";

		for(var prop in arguments[0])   {
        	this[prop]=arguments[0][prop];
    	}
	}


	textPositionData = (endPoint) => {
		if(this.direction == "UP")
			return {
				anchor: "middle",
				baseline: "hanging",
				position: new Coord(endPoint.x, endPoint.y + this.fontSize * .4)
			}
		if(this.direction == "DOWN")
			return {
				anchor: "middle",
				baseline: "bottom",
				position: new Coord(endPoint.x, endPoint.y - this.fontSize * .5)
			}
		if(this.direction == "LEFT")
			return {
				anchor: "start",
				baseline: "middle",
				position: new Coord(endPoint.x  + this.fontSize * .5, endPoint.y)
			}
		if(this.direction == "RIGHT")
			return {
				anchor: "end",
				baseline: "middle",
				position: new Coord(endPoint.x  - this.fontSize * .5, endPoint.y)
			}
	}

	getEndCoord = () => {
		if(this.direction == "UP")
			return new Coord(this.pointCoord.x, this.pointCoord.y + this.length);
		if(this.direction == "DOWN")
			return new Coord(this.pointCoord.x, this.pointCoord.y - this.length);
		if(this.direction == "LEFT")
			return new Coord(this.pointCoord.x + this.length, this.pointCoord.y);
		if(this.direction == "RIGHT")
			return new Coord(this.pointCoord.x - this.length, this.pointCoord.y);
	}



	drawMessage = (endPoint) => {
		if(this.message.toString() != null && this.message.toString() != ""){
			var positionData = this.textPositionData(endPoint);

			return (
				<text
					x={positionData.position.x}
					y={positionData.position.y}
					fill="#000000"
					textAnchor={positionData.anchor}
					dominantBaseline={positionData.baseline}
					style= {{
						font :  this.fontSize + "px Arial",
					}}
				>
					{this.message}
				</text>
			)
		}
	}


	build(){
		var endPoint = this.getEndCoord();
		var arrow = new Arrow({
			thickness: this.thickness,
			headHeight: this.headHeight,
			headWidth: this.headWidth,
			color: this.color,
			pointCoord: this.pointCoord,
			endCoord: endPoint
		});
		return (
			<React.Fragment>
				{arrow.build()}
				{this.drawMessage(endPoint)}
			</React.Fragment>

		)
	}
}

export default Pointer;
