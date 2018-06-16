import React, { Component } from 'react';
import "../styles.css";

class LinearSearchInput extends React.Component{
	// Props: a this referring to the parent.

	handleTargetChange = (event) => {
		this.setState({tempTarget : event.target.value});
	}


	handleElementsChange = (event) => {
		this.setState({tempElements : event.target.value});
	}


	// checkIndex is where the array will be pointing to.
	calculateSteps = (target, elements) => {
		var i = 0;
		var steps = [];
		steps.push({checkIndex: null, highlightedLines: 0});

		for(i; i < elements.length; i++){
			steps.push({checkIndex: i, highlightedLines: 1, loopBox: true});
			if(elements[i] == target){
				steps.push({checkIndex: i, highlightedLines: 2, ifBox: true});
				steps.push({ checkIndex: i,highlightedLines: 3});
				return steps;
			} else {
				steps.push({checkIndex: i, highlightedLines: 2, ifBox: false});
			}
		}
		steps.push({checkIndex: i, highlightedLines: 1, loopBox: false});
		steps.push({checkIndex: null, highlightedLines: 6});
		return steps;
	}


	handleSubmit = (event) => {
		//Trim the whitespace from the input
		var newElements = this.state.tempElements.replace(/\s/g,'');
		//Convert the elements to an array
		newElements = newElements.split(',');
		//Convert all of the strings to numbers
		for(var i = 0; i < newElements.length; i++){newElements[i] = Number(newElements[i])};
		var newSteps = this.calculateSteps(this.state.tempTarget, newElements);
		this.props.parent.setState({
			target : this.state.tempTarget,
			elements: newElements,
			steps: newSteps,
			currentStepNum: 0,
			started: true,
		});
		event.preventDefault();
	}


	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				Target
				<input type="text" onChange={this.handleTargetChange}></input>
				Elements to search through
				<input type="text" onChange={this.handleElementsChange}></input>
				<input type="submit" value="Visualize"></input>
			</form>
		)
	}
}

export default LinearSearchInput;
