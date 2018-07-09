import React, { Component } from 'react';
import DrawArea from 'components/drawArea/DrawArea.js';
import './Display.css';

class Display extends Component {
    constructor(){
        super();
    }

    renderContent = () => {
        console.log(this.props.started);
        if(this.props.started){
            return this.props.children;
        } else {
            return (
                <div class="greyCover">

                </div>
            )
        }
    }

    render() {
        return (
            <div class="display">
                {this.renderContent()}
            </div>
        );
    }
}


export default Display;
