import React, {Component} from 'react';
import './InputBox.css';
import 'pages/styles.css';
import HelpIcon from 'assets/HelpIcon.svg';
import SelectedHelpIcon from 'assets/HelpIconLightBlue.svg';
import WarningIcon from 'assets/WarningIcon.svg';
import ToolTip from 'components/toolTip/ToolTip.js';

class InputBox extends React.Component{
    constructor(){
        super();
        this.state = {
            toolTipIcon: HelpIcon
        }
    }


    getWidth = () => {
        var HORIZONTAL_PADDING = 30;
        if(this.props.width){
            return this.props.width - HORIZONTAL_PADDING;
        }
        return 150 - HORIZONTAL_PADDING;
    }

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

    render(){
        return(
            <React.Fragment>
                <label class="smallLabelText">{this.props.label}</label>
                <br/>
                <div>
                    <input
                        type="text"
                        style={this.getInputStyle()}
                        onChange={this.props.onChangeHandler}
                    />
                    <div class="toolTipIconPositioning">
                        <ToolTip position="right" text={this.props.tooltip} cursor="help">
                            <img
                                src={this.state.toolTipIcon}
                                onMouseOver={this.toolTipIconEnterHandler}
                                onMouseOut={this.toolTipIconExitHandler}
                                class="toolTipIcon_InputBox"
                            />
                        </ToolTip>
                    </div>
                    <br/>
                </div>
                <span
                    class="inputErrorMsgText"
                    style={this.errorMsgVisibility()}
                >
                    {this.props.errorMsg}
                </span>
            </React.Fragment>
        )
    }
}

export default InputBox;
