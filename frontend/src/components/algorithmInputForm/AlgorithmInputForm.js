import React, {Component} from 'react';
import 'tooltip/balloon.css';
import InputBox from 'components/inputBox/InputBox.js';

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

    constructor(){
        super();
        this.state = {
            errors: []
        }
    }

    handleChange = (event, key) => {
        this.setState({
            [key]: event.target.value
        });
    }

    getToolTipSize = (text) => {
        if(text.length < 60)
            return "medium"
        return "large";
    }

    inputFields = () => {
        var elementsToAdd = [];
        for (var i = 0; i < this.props.model.forms.length; i++){
            let entry = this.props.model.forms[i];
            var errorMsg = "";
            elementsToAdd.push(
                <div class="inputField">
                    <InputBox
                        label = {entry.displayText}
                        width = {200}
                        onChangeHandler = {(event) => {this.handleChange(event, entry.key)}}
                        hasError={this.state.errors.includes(entry.key)}
                        errorMsg={entry.errorMsg}
                        tooltip={entry.tooltipText}
                    />

                </div>
            );
        }
        return elementsToAdd;
    }


    checkInputErrors = () => {
        var errors = [];
        for (var i = 0; i < this.props.model.forms.length; i++){
            let entry = this.props.model.forms[i];
            if(!entry.verifyHandler(this.state[entry.key])){
                errors.push(entry.key);
            }
        }
        return errors;
    }

    submitForm = (event) => {
        event.preventDefault();
        var errors = this.checkInputErrors();
        this.setState({
            errors: errors
        })
        if(errors.length == 0){
            this.props.model.validInputHandler(this.state);
        }
    }


    render(){
        return (
            <form onSubmit={this.submitForm}>
                {this.inputFields()}
                <input type="submit" value="Visualize" class="secondaryBtn smallBtn"></input>
            </form>
        )
    }
}

export default AlgorithmInputForm;
