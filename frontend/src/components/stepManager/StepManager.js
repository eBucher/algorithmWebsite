import React from 'react';
import "pages/styles.css";
import './StepManager.css';
import RightArrow from 'assets/ForwardIcon.svg';
import LeftArrow from 'assets/BackwardIcon.svg';
import {setStepNum} from 'actions/AlgorithmActions.js';
import {connect} from "react-redux";

class StepManager extends React.Component{

	/* 	Increments the step num by 1. If the stepNum is the last step, nothing is
		changed.
	*/
	nextStep = () => {
		if(this.props.algorithm.stepNum !== this.props.algorithm.steps.length - 1){
			var newStepNum = this.props.algorithm.stepNum + 1;
			this.props.setStepNum(newStepNum);
		}
	}


	/* 	Decrements the step num by 1. If the stepNum is 0 (the first step),
		nothing is changed.
	*/
	previousStep = () => {
		if(this.props.algorithm.stepNum !== 0){
			var newStepNum = this.props.algorithm.stepNum - 1;
			this.props.setStepNum(newStepNum);
		}
	}


	/* 	Given an event from a range slider, the stepNum is changed to be equal
		to the slider's value.
		Pre: the slider's value is >= 0 and <= the last step number.
	*/
	handleSliderChange = (event) => {
		this.props.setStepNum(Number(event.target.value));
	}


	render(){
		return (
			<div class="stepManager">
				<button class="smallCircularBtn orangeBtn stepBtnMargin" onClick={this.previousStep} disabled={!this.props.algorithm.started}>
					<img src={LeftArrow} class="backwardIcon" alt="previous step button"/>
				</button>
				<button class="smallCircularBtn orangeBtn stepBtnMargin" onClick={this.nextStep} disabled={!this.props.algorithm.started}>
					<img src={RightArrow} class="forwardIcon" alt="next step button"/>
				</button>
				<input id="stepSlider" type="range" min="0" max={this.props.algorithm.steps.length - 1}
					step="1" onChange={this.handleSliderChange}
					value={this.props.algorithm.stepNum} disabled={!this.props.algorithm.started}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
      algorithm: state.Algorithm,
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
