import React, { Component } from 'react';
import './DrawArea.css';
import CustomShape from 'components/drawArea/shapes/CustomShape.js';


class DrawArea extends Component {

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
