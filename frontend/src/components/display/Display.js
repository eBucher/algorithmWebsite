import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
    renderContent = () => {
        if(this.props.started){
            return <div className="displayHelper">{this.props.children}</div>;
        } else {
            return (
                <div className="greyCover">
                    <div className="greyScreenTextBox">
                        Begin by entering your parameters for the algorithm at the
                        top of the screen.
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="display">
                    {this.renderContent()}
                    <p className="b">Resize Screen</p>
            </div>
        );
    }
}


export default Display;
