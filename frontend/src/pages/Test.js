import React, { Component } from 'react';
import "./styles.css";
import DrawArea from '../components/drawArea/DrawArea.js';
import CodeBox from '../components/codeBox/CodeBox.js';
import Square from '../components/drawArea/shapes/Square.js';
import Arrow from '../components/drawArea/shapes/Arrow.js';

import Coord from '../components/drawArea/math/Coord.js';

class Test extends React.Component{

	constructor(){
		super();
	}


    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas = () => {

        var r = new Square();
        r.usePreset("SMALL");
        r.setColor("orange");
		r.setTopLeft(new Coord(50, 50));
		r.setText("7059");
		r.setText("PTR", "TOP");
		r.setText("OTHER", "BOTTOM");
        r.draw();

		//Where the top left of the square should be.
		var c = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        c.setAttributeNS(null, 'cx', 50);
        c.setAttributeNS(null, 'cy', 50);
        c.setAttributeNS(null, 'r', 1);
		c.setAttributeNS(null, 'fill', "#FF0000");
        document.getElementById('drawArea').appendChild(c);

		//Where the center of the square should be.
		c = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        c.setAttributeNS(null, 'cx', 75);
        c.setAttributeNS(null, 'cy', 75);
        c.setAttributeNS(null, 'r', 1);
		c.setAttributeNS(null, 'fill', "#FF0000");
        document.getElementById('drawArea').appendChild(c);

		//Where the bottom right of the square should be.
		c = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        c.setAttributeNS(null, 'cx', 100);
        c.setAttributeNS(null, 'cy', 100);
        c.setAttributeNS(null, 'r', 1);
		c.setAttributeNS(null, 'fill', "#FF0000");
        document.getElementById('drawArea').appendChild(c);


    }

	render(){
		return (
			<div id="AlgorithmContainer">

		        <DrawArea />

			</div>


		)
	}

}

export default Test;
