import React, { Component } from 'react';
import 'pages/styles.css';

class BinarySearchInput extends React.Component {

    handleTargetChange = (event) => {
        this.setState({tempTarget : event.target.value});
    }


    handleElementsChange = (event) => {
        this.setState({tempElements : event.target.value});
    }


    // checkIndex is where the array will be pointing to.
    calculateSteps = (elements, leftIdx, rightIdx, target) => {
        var steps = [];
        steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 0});

        if(rightIdx >= leftIdx){
            steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 1, ifBox: true});
            var middle = leftIdx + Math.floor((rightIdx - leftIdx) /2);
            steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 2});
            if(elements[middle] == target){
                steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 4, ifBox: true});
                steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 5});
                return steps;
            } else {
                steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 4, ifBox: false});
            }
            if(elements[middle] > target){
                steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 8, ifBox: true});
                steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 9});
                return steps.concat(this.calculateSteps(elements, leftIdx, middle - 1, target));
            } else {
                steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 8, ifBox: false});
                steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 11});
                return steps.concat(this.calculateSteps(elements, middle + 1, rightIdx, target));
            }
        }
        steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 1, ifBox: false});
        steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 13});

        return steps;
    }


    handleSubmit = (event) => {
        //Trim the whitespace from the input
        var newElements = this.state.tempElements.replace(/\s/g,'');
        //Convert the elements to an array
        newElements = newElements.split(',');
        //Convert all of the strings to numbers
        for(var i = 0; i < newElements.length; i++){newElements[i] = Number(newElements[i])};
        var newSteps = this.calculateSteps(newElements, 0, newElements.length - 1, this.state.tempTarget);
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
        return (
            <div class="inputArea">
                <form onSubmit={this.handleSubmit}>
                    Target <br/>
                    <input type="text" onChange={this.handleTargetChange}></input>
                    <br/>
                    <br/>
                    Sorted Elements to search through <br/>
                    <input type="text" onChange={this.handleElementsChange}></input>
                    <br/>
                    <br/>
                    <input type="submit" value="Visualize" class="visualizeBtn"></input>
                </form>
            </div>
        )
    }
}

export default BinarySearchInput;
