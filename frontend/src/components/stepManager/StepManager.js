import React from 'react';
import "pages/styles.css";
import './StepManager.css';
import RightArrow from 'assets/ForwardIcon.svg';
import LeftArrow from 'assets/BackwardIcon.svg';
import {setStepNum} from 'actions/AlgorithmActions.js';
import {connect} from "react-redux";
import {Button, Icon} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";


const propTypes = {
	/** Whether the user can interact with the step manager.
		Connected to Redux. */
	enabled: PropTypes.bool.isRequired,
	/** The total number of steps. Connected to Redux. */
	numSteps: PropTypes.number.isRequired,
	/** The current step index. Connrected to Redux. */
	stepNum: PropTypes.number.isRequired,
	/** A function meant for controlling the current step number. Takes one argument
		that is the new step number. Connected to Redux. */
	setStepNum: PropTypes.func.isRequired,
}

/** A range slider and set of buttons for incrementing and decrementing the
	current step number in an algorithm. */
export class StepManager extends React.Component{

	/** Increments the step num by 1. If the stepNum is the last step, nothing is
		changed. */
	nextStep = () => {
		if(this.props.stepNum !== this.props.numSteps - 1){
			var newStepNum = this.props.stepNum + 1;
			this.props.setStepNum(newStepNum);
		}
	}


	/** Decrements the step num by 1. If the stepNum is 0 (the first step),
		nothing is changed. */
	previousStep = () => {
		if(this.props.stepNum !== 0){
			var newStepNum = this.props.stepNum - 1;
			this.props.setStepNum(newStepNum);
		}
	}


	/** Given an event from a range slider, the stepNum is changed to be equal
		to the slider's value.
		pre: the slider's value is >= 0 and <= the last step index. */
	handleSliderChange = (event) => {
		this.props.setStepNum(Number(event.target.value));
	}

	stepNumDisplay = () => {
		var visibility = "hidden";
		if(this.props.enabled){
			visibility = "visible";
		}
		return (
			<div className="stepNumCounter smallLabelText" style={{visibility: visibility}}>
				{this.props.stepNum + 1} / {this.props.numSteps}
			</div>
		)
	}

	render(){
		return (
			<div className="stepManager">

				<div className="stepManagerButtons">
					{this.stepNumDisplay()}
					<Button circular icon="backward" color="orange" onClick={this.previousStep} disabled={!this.props.enabled}/>
					<Button circular icon="forward" color="orange" onClick={this.nextStep} disabled={!this.props.enabled}/>
				</div>
				<input id="stepSlider" type="range" min="0" max={this.props.numSteps - 1}
					step="1" onChange={this.handleSliderChange}
					value={this.props.stepNum} disabled={!this.props.enabled}
				/>
			</div>
		)
	}
}

StepManager.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
	  enabled: state.Algorithm.started,
	  numSteps: state.Algorithm.steps.length,
	  stepNum: state.Algorithm.stepNum,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
		setStepNum: (newNum) => {
            dispatch(setStepNum(newNum));
		}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StepManager);
