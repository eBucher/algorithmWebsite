import CustomShape from 'components/drawArea/shapes/CustomShape.js';
import React from 'react';
import {toHex} from 'utils/Colors.js';

class XSymbol extends CustomShape {
	constructor(){
		super();
		this.color = "#000000";
		this.center = null;
		this.height = null;
		this.thickness = null
	}


	build = () => {
		var thickness = this.height * .15;
		return (
		<React.Fragment>
		{/*Top left to bottom right*/}
		<path
			d = {
				" M" + (this.center.x - this.height*.45) + " " + (this.center.y - this.height*.45) +
				" L" + (this.center.x + this.height*.45) + " " + (this.center.y + this.height*.45)
			}
			stroke = {toHex(this.color)}
			strokeWidth = {thickness}
		/>
		{/*Top right to bottom left*/}
		<path
			d = {
				" M" + (this.center.x + this.height*.45) + " " + (this.center.y - this.height*.45) +
				" L" + (this.center.x - this.height*.45) + " " + (this.center.y + this.height*.45)
			}
			stroke = {toHex(this.color)}
			strokeWidth = {thickness}
		/>
		</React.Fragment>
		)
	}
}

export default XSymbol;
