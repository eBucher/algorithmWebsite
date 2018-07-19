import React from 'react';
import './balloon.css';
import PropTypes from "prop-types";

const propTypes = {
    /** The text to be displayed in the tooltip */
    text: PropTypes.string.isRequired,
    /** Where the tooltip will appear relative to its children */
    position: PropTypes.oneOf(["up", "down", "left", "right"]),
    /** Appearance of the cursor when hovering over the children */
    cursor: PropTypes.string,
}

const defaultProps = {
    text: "",
    position: "up",
    cursor: "pointer"
}


/* Creates a tooltip that will appear when the user hovers over the children*/
class ToolTip extends React.Component{

    /** Gets the appropriate size string for the tooltip box */
    getToolTipSize = (text) => {
        var MEDIUM_SIZE = 60;
        if(text.length < MEDIUM_SIZE)
            return "medium"
        return "large";
    }


    render(){
        return(
            <div
                data-balloon={this.props.text}
                data-balloon-pos={this.props.position}
                data-balloon-length={this.getToolTipSize(this.props.text)}
                style={{display: "inline-block", cursor: this.props.cursor}}
            >
                {this.props.children}
            </div>
        )
    }
}

ToolTip.propTypes = propTypes;
ToolTip.defaultProps = defaultProps;

export default ToolTip;
