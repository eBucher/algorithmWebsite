import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import React, {Component} from 'react';
import Coord from 'components/drawArea/math/Coord.js';
import {toHex} from 'utils/Colors.js';

class CheckMark extends CustomShape {
	constructor(){
		super();
		this.color = "#000000";
		this.center = null;
		this.height = null;
	}


	build = () => {
		var thickness = this.height * .15;
		return (
		<path
			d = {
				" M" + (this.center.x - this.height * .35) + " " + (this.center.y + this.height * .05) +
				" L" + (this.center.x - this.height * .1) + " " + (this.center.y + this.height * .35) +
				" L" + (this.center.x + this.height * .35) + " " + (this.center.y - this.height * .45)
			}
			stroke = {toHex(this.color)}
			strokeWidth = {thickness}
			fill = "none"
		/>
		)
	}
}

export default CheckMark;
