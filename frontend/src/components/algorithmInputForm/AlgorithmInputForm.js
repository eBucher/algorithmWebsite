import React, {Component} from 'react';
import HelpIcon from 'assets/HelpIcon.svg';
import 'tooltip/balloon.css';
import InputBox from 'components/inputBox/InputBox.js';
import ToolTip from 'components/toolTip/ToolTip.js';
/*
    Required Properties:
    submitHandler - a function to handle when the form is submitted. It should
    take in an argument that is the AlgorithmInputForm's state, which contains
    only the input fields' values at the time of submission.
    model - an array of objects that have a 'key' property to differentiate
    between each field and a 'displayText' property which is the text to show
    next to the input box.

*/
class AlgorithmInputForm extends React.Component{

    handleChange = (event, key) => {
        this.setState({[key]: event.target.value});
    }

    getToolTipSize = (text) => {
        if(text.length < 60)
            return "medium"
        return "large";
    }

    inputFields = () => {
        var elementsToAdd = [];
        for (var i = 0; i < this.props.model.length; i++){
            var entry = this.props.model[i];
            elementsToAdd.push(
                <React.Fragment>
                    <InputBox
                        label = {entry.displayText}
                        width = {150}
                        onChangeHandler = {(event) => {this.handleChange(event, entry.key)}}
                    />
                    <ToolTip position="right" text={entry.tooltipText}>
                        <img src={HelpIcon}/>
                    </ToolTip>
                    <br /> <br />
                </React.Fragment>
            );
        }
        return elementsToAdd;
    }


    submitForm = (event) => {
        event.preventDefault();
        this.props.submitHandler(this.state);
    }


    render(){
        return (
            <form onSubmit={this.submitForm}>
                {this.inputFields()}
                <input type="submit" value="Visualize" class="secondaryBtn largeBtn"></input>
            </form>
        )
    }
}

export default AlgorithmInputForm;
