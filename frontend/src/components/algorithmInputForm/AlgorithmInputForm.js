import React from 'react';
import InputBox from 'components/inputBox/InputBox.js';
import './AlgorithmInputForm.css';
import 'pages/styles.css';
import PropTypes from "prop-types";
import {Button} from "semantic-ui-react";

const propTypes = {
    model: PropTypes.shape({
        /** Called when the user's input is all valid (based on the given verifyHandlers)
            and the user presses the submit button. Takes in an object whose property
            names are each key in the model and their values are what the user has typed
            in. */
        validInputHandler: PropTypes.func.isRequired,
        /** Each object in the array will produce an input field */
        inputs: PropTypes.arrayOf(PropTypes.shape({
            /** A unique key to identify the input */
            key: PropTypes.string.isRequired,
            /** Optional initial text in the input field */
            initialValue: PropTypes.string,
            /** The label that will appear above the input field */
            displayText: PropTypes.string.isRequired,
            /** Additional information for the user that will appear in a tooltip */
            tooltipText: PropTypes.string.isRequired,
            /** Returns true or false based on whether the user's input is valid */
            verifyHandler: PropTypes.func.isRequired,
            /** A short message to display when the user tries to submit invalid input */
            errorMsg: PropTypes.string.isRequired,
        })).isRequired,
    }),
}


/** A series of input fields with a submit button created from a given model */
class AlgorithmInputForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ...this.getInitialValues(),
            errors: [],
        }

    }


    /*
        Any time that the user makes a change to the input box, handleChange should
        be called to record what is now in the box into the state.
    */
    handleChange = (event, key) => {
        this.setState({
            [key]: event.target.value
        });
    }


    /** @param  A string that will appear in a tooltip
        @return A size for the tooltip based on the length of the given string.
    */
    getToolTipSize = (text) => {
        if(text.length < 60)
            return "medium"
        return "large";
    }


    /** @return Any input that has an initialValue that is not undefined will be
        added to the returned object.
    */
    getInitialValues = () => {
        var newStateVars = {};
        for (var i = 0; i < this.props.model.inputs.length; i++){
            let entry = this.props.model.inputs[i];
            if(entry.initialValue){
                newStateVars[entry.key] = entry.initialValue;
            }
        }
        return newStateVars;
    }


    /** @return an array of InputBox objects generated from this.props.model.inputs.
        Each one will start out empty unless there was a specified initial value.
    */
    inputFields = () => {
        var elementsToAdd = [];
        for (var i = 0; i < this.props.model.inputs.length; i++){
            let entry = this.props.model.inputs[i];
            elementsToAdd.push(
                <div className="inputField" key={"AlgorithmInputFormField" + i}>
                    <InputBox
                        label = {entry.displayText}
                        width = {200}
                        onChangeHandler = {(event) => {this.handleChange(event, entry.key)}}
                        hasError={this.state.errors.includes(entry.key)}
                        errorMsg={entry.errorMsg}
                        tooltip={entry.tooltipText}
                        text={this.state[entry.key]}
                    />

                </div>
            );
        }
        return elementsToAdd;
    }


    /*
        Loops through each form in the model and checks each input that the
        user has entered against the input's verifyHandler function. If the
        user has entered an invalid input, the input's key will be added to
        an array of errors that is returned at the end of the function.
    */
    checkInputErrors = () => {
        var errors = [];
        for (var i = 0; i < this.props.model.inputs.length; i++){
            let entry = this.props.model.inputs[i];
            if(!entry.verifyHandler(this.state[entry.key])){
                errors.push(entry.key);
            }
        }
        return errors;
    }


    /*
        Checks all of the inputs for errors. If there are any, they are recorded
        in the state. If there are no arrors, the given validInputHandler function
        is called to draw the algorithm.
    */
    submitForm = (event) => {
        event.preventDefault();
        var errors = this.checkInputErrors();
        this.setState({
            errors: errors
        })
        if(errors.length === 0){
            this.props.model.validInputHandler(this.state);
        }
    }


    render(){
        return (
            <form className="algorithmInputForm" onSubmit={this.submitForm}>
                {this.inputFields()}
                <Button size="medium" color="orange" type="submit">Visualize</Button>
            </form>
        )
    }
}

AlgorithmInputForm.propTypes = propTypes;

export default AlgorithmInputForm;
