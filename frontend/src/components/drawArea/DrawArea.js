import React, { Component } from 'react';
import './DrawArea.css';
import Square from 'components/drawArea/shapes/Square.js';
import Arrow from 'components/drawArea/shapes/primitives/Arrow.js';
import Coord from 'components/drawArea/math/Coord.js';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';


class DrawArea extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <svg id="drawArea" width={this.props.w} height={this.props.h}>
                {this.props.displayedPieces.map((MyComponent, index) => {
                        if(MyComponent instanceof CustomShape){
                            return (MyComponent.build());
                        } else {
                            return (<React.Fragment>{MyComponent}</React.Fragment>);
                        }
                } )}
            </svg>
        );
    }
}



export default DrawArea;
