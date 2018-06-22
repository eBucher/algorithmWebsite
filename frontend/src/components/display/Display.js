import React, { Component } from 'react';
import DrawArea from 'components/drawArea/DrawArea.js';
import './Display.css';

class Display extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div id="display">
                {this.props.children}
            </div>
        );
    }
}

//<DrawArea w="250" h="250" displayedPieces={[]}/>
//<StepManager />


export default Display;
