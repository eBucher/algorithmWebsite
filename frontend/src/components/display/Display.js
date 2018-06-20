import React, { Component } from 'react';
import DrawArea from 'components/drawArea/DrawArea.js';
import StepManager from 'components/stepManager/StepManager.js';
import './Display.css';

class Display extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div id="display">
                <div id="drawAreaSpace">
                    {this.props.children[0]}
                </div>
                <div id="stepManagerSpace">
                    {this.props.children[1]}
                </div>
            </div>
        );
    }
}

//<DrawArea w="250" h="250" displayedPieces={[]}/>
//<StepManager />


export default Display;
