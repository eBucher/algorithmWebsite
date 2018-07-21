import React from 'react';
import './InputBox.css';
import 'pages/styles.css';
import HelpIcon from 'assets/HelpIcon.svg';
import SelectedHelpIcon from 'assets/HelpIconHighlighted.svg';
import WarningIcon from 'assets/WarningIcon.svg';
import ToolTip from 'components/toolTip/ToolTip.js';
import {Icon} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";

const propTypes = {
    /** Text that appears when there is an error */
    errorMsg: PropTypes.string,
    /** Whether or not to indicate an error with the input */
    hasError: PropTypes.bool,
    /** Describes to the user what to enter. i.e. "Email" */
    label: PropTypes.string,
    /** A function that takes in an event object produced by the input field. */
    onChangeHandler: PropTypes.func.isRequired,
    /** The text to be displayed in the input field. This must change on every
        keystroke to show what the user is typing. Consider using onChangeHandler()
        to update this. */
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Any text that should appear in a help icon next to the input field. Leaving
        this empty will prevent the help icon from appearing. */
    tooltip: PropTypes.string,
    /** The width of the input field in pixels. */
    width: PropTypes.number,
}

const defaultProps = {
    errorMsg: null,
    label: "",
    toolTip: null,
    width: 200,
}

/** A specially modifiable input field */
class InputBox extends React.Component{
    constructor(){
        super();
        this.state = {
            toolTipIconColor: "grey",
        }
    }


    /** @return The width for the input field without the padding on the right side
        for the error sybol.
    */
    getWidth = () => {
        var HORIZONTAL_PADDING = 30;
        return this.props.width - HORIZONTAL_PADDING;
    }


    /** @return The display settings for the error message based on the hasError
        prop */
    errorMsgVisibility = () => {
        if(this.props.hasError === true){
            return {display: "inline"};
        }
        return {visibility: "hidden"};
    }


    /** Switches the tooltip icon to be highlighted. */
    toolTipIconEnterHandler = () => {
        this.setState({
            toolTipIconColor: "orange",
        })
    }


    /** Switches the tooltip icon to not be highlighted. */
    toolTipIconExitHandler = () => {
        this.setState({
            toolTipIconColor: "grey",
        })
    }


    /** @return A style object that will set the appropriate width for the input
        and a warning icon in the background if the hasError prop is true. */
    getInputStyle = () => {
        if(this.props.hasError){
            return {
                width: (this.getWidth()) + "px",
                backgroundImage: "url(" + WarningIcon + ")",
            }
        }
        return {width: this.getWidth() + "px"}
    }


    /** @return A help icon with a tooltip if the ToolTip prop was specified.
        Otherwise, an empty string is returned. */
    optionalToolTip = () => {
        if(this.props.tooltip){
            return (
                <div className="toolTipIconPositioning">
                    <ToolTip position="up" text={this.props.tooltip} cursor="help">
                    <Icon name="question circle"
                        onMouseOver={this.toolTipIconEnterHandler}
                        onMouseOut={this.toolTipIconExitHandler}
                        color={this.state.toolTipIconColor}
                    />
                    </ToolTip>

                </div>
            )
        } else return "";
    }


    render(){
        return(
            <div className="inputArea">
                <label className="smallLabelText">{this.props.label}</label>
                <br/>
                <div>
                    <input
                        type="text"
                        style={this.getInputStyle()}
                        onChange={this.props.onChangeHandler}
                        value={this.props.text}
                        className="textField"
                    />
                    {this.optionalToolTip()}
                </div>
                <span className="inputErrorMsgText" style={this.errorMsgVisibility()}>
                    {this.props.errorMsg}
                </span>
            </div>
        )
    }
}

InputBox.propTypes = propTypes;
InputBox.defaultProps = defaultProps;

export default InputBox;
