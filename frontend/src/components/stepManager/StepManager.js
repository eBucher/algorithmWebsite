import React, { Component } from 'react';
import "pages/styles.css";
import './StepManager.css';
import RightArrow from 'assets/ForwardIcon.svg';
import LeftArrow from 'assets/BackwardIcon.svg';

class StepManager extends React.Component{
	constructor(){
		super();
		this.currentStepNum = 0;
	}


	nextStep = () => {
		if(this.currentStepNum != this.props.numSteps - 1){
			this.currentStepNum++;
			this.updateParentStepTo(this.currentStepNum);
		}
	}


	previousStep = () => {
		if(this.currentStepNum != 0){
			this.currentStepNum--;
			this.updateParentStepTo(this.currentStepNum);
		}
	}


	handleSliderChange = (event) => {
		this.currentStepNum = Number(event.target.value);
		this.updateParentStepTo(this.currentStepNum);
	}


	updateParentStepTo(stepNum){
		this.props.parent.setState({
			currentStepNum: this.currentStepNum,
		});
	}


	render(){
		return (
			<div class="stepManager">
				<div class="previousLabel">
					<label class="smallLabelText">Previous Step</label>
				</div>
				<div class="nextLabel">
					<label class="smallLabelText">Next Step</label>
				</div>
				<button class="smallCircularBtn primaryBtn" onClick={this.previousStep} disabled={!this.props.enabled}>
					<img src={LeftArrow} class="backwardIcon"/>
				</button>
				<input id="stepSlider" type="range" min="0" max={this.props.numSteps}
					step="1" onChange={this.handleSliderChange}
					value={this.props.value} disabled={!this.props.enabled}
				/>
				<button class="smallCircularBtn primaryBtn" onClick={this.nextStep} disabled={!this.props.enabled}>
					<img src={RightArrow} class="forwardIcon"/>
				</button>
			</div>
		)
	}
}

export default StepManager;
