import React, { Component } from 'react';
import './DrawArea.css';
import Square from 'components/drawArea/shapes/Square.js';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import Coord from 'components/drawArea/math/Coord.js';


class DrawArea extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <svg id="drawArea" width="1000px" height="200px">
                {this.props.displayedPieces.map((MyComponent, index) => {
                        if(MyComponent instanceof React.Component){
                            return (MyComponent.render());
                        } else {
                            return (<React.Fragment>{MyComponent}</React.Fragment>);
                        }
                } )}
            </svg>
        );
    }
}



export default DrawArea;
