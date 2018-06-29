import React, {Component} from 'react';
import './InputBox.css';
import HelpIcon from 'assets/HelpIcon.svg';
import SelectedHelpIcon from 'assets/HelpIconLightBlue.svg';
import ToolTip from 'components/toolTip/ToolTip.js';

class InputBox extends React.Component{
    constructor(){
        super();
        this.state = {
            toolTipIcon: HelpIcon
        }
    }


    getWidth = () => {
        if(this.props.width){
            return this.props.width;
        }
        return 140; //default is 150, but there is padding
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


    render(){
        return(
            <React.Fragment>
                <label class="inputBoxLabel">{this.props.label}</label>
                <br/>
                <div>
                    <input
                        type="text"
                        style={{width: this.getWidth() + "px"}}
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
