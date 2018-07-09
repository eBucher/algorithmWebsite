import React, { Component } from 'react';
import DrawArea from 'components/drawArea/DrawArea.js';
import './Display.css';
import ReSizePointer from 'assets/ResizePointer.png';

class Display extends Component {
    constructor(){
        super();
    }

    renderContent = () => {
        console.log(this.props.started);
        if(this.props.started){
            return <div class="displayHelper">{this.props.children}</div>;
        } else {
            return (
                <div class="greyCover">
                    <div class="greyScreenTextBox">
                        Begin by entering your parameters for the algorithm at the
                        top of the screen.
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div class="display">
                    {this.renderContent()}
                    <p class="b">Resize Screen</p>
            </div>
        );
    }
}


export default Display;
