import React from 'react';
import InputBox from 'components/inputBox/InputBox.js';
import './AlgorithmInputForm.css';
import 'pages/styles.css';

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


    /*
        Given a string, the function returns if a medium or large tooltip is
        needed.
    */
    getToolTipSize = (text) => {
        if(text.length < 60)
            return "medium"
        return "large";
    }


    /*
        Checks every form key to see if there is a matching url parameter. Returns an
        object with each of these key values.
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


    /*
        Returns an array of InputBox objects generated from this.props.model.inputs.
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

export default AlgorithmInputForm;
