import React from 'react';
import './AlgDisplay.css';
import PropTypes from "prop-types";

const propTypes = {
    /** Anything to be displayed in the middle of the display area. */
    children: PropTypes.element.isRequired,
    /** Whether to display the algorithm or the grey cover */
    started: PropTypes.bool.isRequired,
}


/** A container that will either display a grey cover when it is unstarted or
    its children when it is started (specified by its "started" prop). */
class AlgDisplay extends React.Component {

    /** @return an Element that will be displayed in the middle of the display area.
        If the started prop is false, a grey div that covers the entire display will
        be returned instead. */
    renderContent = () => {
        if(this.props.started){
            return <div className="algDisplayHelper">{this.props.children}</div>;
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
            <div className="algDisplay">
                {this.renderContent()}
                <p className="b">Resize Screen</p>
            </div>
        );
    }
}

AlgDisplay.propTypes = propTypes;

export default AlgDisplay;
