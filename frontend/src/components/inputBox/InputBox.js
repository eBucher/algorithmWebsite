import React from 'react';
import './InputBox.css';
import 'pages/styles.css';
import HelpIcon from 'assets/HelpIcon.svg';
import SelectedHelpIcon from 'assets/HelpIconHighlighted.svg';
import WarningIcon from 'assets/WarningIcon.svg';
import ToolTip from 'components/toolTip/ToolTip.js';

class InputBox extends React.Component{
    constructor(){
        super();
        this.state = {
            toolTipIcon: HelpIcon
        }
    }


    /*
        Returns the width that the input field should be without the padding on
        the right (HORIZONTAL_PADDING) for the error icon to appear in. If a
        width was not specified in the props, a default value is returned.
    */
    getWidth = () => {
        var HORIZONTAL_PADDING = 30;
        if(this.props.width){
            return this.props.width - HORIZONTAL_PADDING;
        }
        return 150 - HORIZONTAL_PADDING;
    }


    /*
        If there is an error, the function returns a style that will make the
        error message visibile. Otherwise, the style will be invisible.
    */
    errorMsgVisibility = () => {
        if(this.props.hasError){
            return {display: "inline"};
        }
        return {visibility: "hidden"};
    }


    toolTipIconEnterHandler = () => {
        this.setState({
            toolTipIcon: SelectedHelpIcon
        })
    }


    toolTipIconExitHandler = () => {
        this.setState({
            toolTipIcon: HelpIcon
        })
    }


    getInputStyle = () => {
        if(this.props.hasError){
            return {
                width: (this.getWidth()) + "px",
                backgroundImage: "url(" + WarningIcon + ")",
            }
        }
        return {width: this.getWidth() + "px"}
    }


    getValue = () => {
        if(this.props.text){
            return this.props.text;
        }
        return "";
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
                        value={this.getValue()}
                        className="textField"
                    />
                    <div className="toolTipIconPositioning">
                        <ToolTip position="up" text={this.props.tooltip} cursor="help">
                            <img
                                src={this.state.toolTipIcon}
                                onMouseOver={this.toolTipIconEnterHandler}
                                onMouseOut={this.toolTipIconExitHandler}
                                className="toolTipIcon_InputBox"
                                alt="help tooltip icon"
                            />
                        </ToolTip>
                    </div>
                </div>
                <span className="inputErrorMsgText" style={this.errorMsgVisibility()}>
                    {this.props.errorMsg}
                </span>
            </div>
        )
    }
}

export default InputBox;
