import React from 'react';
import "./styles.css";
import SquareWrapper from 'components/shapes/square/SquareWrapper.js';
import Arrow from 'components/shapes/arrow/Arrow.js';
import PointerWrapper from 'components/shapes/pointer/PointerWrapper.js';

class Test extends React.Component{

	render(){
		var a = new SquareWrapper({
			center: {x: 100, y: 100},
			centerText: "12",
			topText: "123y",
			bottomText: "123y",
			outerFontSize: 16,
		});

		var b = new PointerWrapper({
			pointCoord: {x: 100, y: 300},
			length: 50,
			message: "Hello",
			direction: "UP",
		})

		console.log(a.getCoordAt("OUTER_LEFT"));

		return(
			<div>
				<svg width="1000px" height="1000px" style={{border: "1px solid black"}}>
					{a.build()}
					<rect id="CENTER" x={a.getCoordAt("CENTER").x} y={a.getCoordAt("CENTER").y} height="1" width="1" fill="red"/>
					<rect id="LEFT" x={a.getCoordAt("LEFT").x} y={a.getCoordAt("LEFT").y} height="1" width="1" fill="red"/>
					<rect id="OUTER_LEFT" x={a.getCoordAt("OUTER_LEFT").x} y={a.getCoordAt("OUTER_LEFT").y} height="1" width="1" fill="red"/>
					<rect id="RIGHT" x={a.getCoordAt("RIGHT").x} y={a.getCoordAt("RIGHT").y} height="1" width="1" fill="red"/>
					<rect id="OUTER_RIGHT" x={a.getCoordAt("OUTER_RIGHT").x} y={a.getCoordAt("OUTER_RIGHT").y} height="1" width="1" fill="red"/>
					<rect id="TOP" x={a.getCoordAt("TOP").x} y={a.getCoordAt("TOP").y} height="1" width="1" fill="red"/>
					<rect id="OUTER_TOP" x={a.getCoordAt("OUTER_TOP").x} y={a.getCoordAt("OUTER_TOP").y} height="1" width="1" fill="red"/>
					<rect id="BOTTOM" x={a.getCoordAt("BOTTOM").x} y={a.getCoordAt("BOTTOM").y} height="1" width="1" fill="red"/>
					<rect id="OUTER_BOTTOM" x={a.getCoordAt("OUTER_BOTTOM").x} y={a.getCoordAt("OUTER_BOTTOM").y} height="1" width="1" fill="red"/>
					<Arrow pointCoord = {{x: 200, y: 200}} endCoord ={{x: 300, y: 300}} />
					<rect id="POINT_COORD" x={200} y={200} height="1" width="1" fill="red"/>
					<rect id="END_COORD" x={300} y={300} height="1" width="1" fill="red"/>
					{b.build()}
				</svg>

			</div>
		)
	}
}



export default Test;
