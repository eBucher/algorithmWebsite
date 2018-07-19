import React from 'react';
import InputBox from 'components/inputBox/InputBox.js';
import './AlgorithmInputForm.css';
import 'pages/styles.css';
import PropTypes from "prop-types";

const propTypes = {
    model: PropTypes.shape({
        /** Called when the user's input is all valid (based on the given verifyHandlers)
            and the user presses the submit button. Takes in an object whose property
            names are each key in the model and their values are what the user has typed
            in. */
        validInputHandler: PropTypes.func.isRequired,
        /** If any property names match any of the keys in the model, the input fields
            will automatically be filled with the corresponding values. */
        urlParams: PropTypes.object.isRequired,
        /** Each object in the array will produce an input field */
        inputs: PropTypes.arrayOf(PropTypes.shape({
            /** A unique key to identify the input */
            key: PropTypes.string.isRequired,
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
            ...this.getUrlParams(),
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


    /** @return An object that contains every key/value from the model.urlParams
        prop that also has a key in the model.inputs prop.
    */
    getUrlParams = () => {
        var newStateVars = {};
        for (var i = 0; i < this.props.model.inputs.length; i++){
            let entry = this.props.model.inputs[i];
            if(this.props.model.urlParams[entry.key]){
                newStateVars[entry.key] = this.props.model.urlParams[entry.key];
            }
        }
        return newStateVars;
    }


    /** @return an array of InputBox objects generated from this.props.model.inputs.
        If there were any url parameters, they will be used as initial values for
        the inputs. this.handledUrlParams will be true by the end of the function.
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
                <input type="submit" value="Visualize" className="orangeBtn smallBtn"></input>
            </form>
        )
    }
}

AlgorithmInputForm.propTypes = propTypes;

export default AlgorithmInputForm;
