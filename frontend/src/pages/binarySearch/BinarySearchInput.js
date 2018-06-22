import React, { Component } from 'react';
import 'pages/styles.css';
import {CONTENT_SQUARE} from 'components/drawArea/shapes/Presets.js';
import AlgorithmInputForm from 'components/algorithmInputForm/AlgorithmInputForm.js';

class BinarySearchInput extends React.Component {

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


    cleanRawElements = (rawElements) => {
        //Trim the whitespace from the input
        var newElements = rawElements.replace(/\s/g,'');
        //Convert the elements to an array
        newElements = newElements.split(',');
        //Convert all of the strings to numbers
        for(var i = 0; i < newElements.length; i++){
            newElements[i] = Number(newElements[i])
        };

        return newElements;
    }


    handleSubmit = (formState) => {
        var newElements = this.cleanRawElements(formState.elements);
        var newSteps = this.calculateSteps(newElements, 0, newElements.length - 1, formState.target);
        this.props.parent.setState({
            target : formState.target,
            elements: newElements,
            steps: newSteps,
            currentStepNum: 0,
            started: true,
            areaWidth: CONTENT_SQUARE().size * (newElements.length + 2),
            areaHeight: 250,
        });
    }

    render(){
        return (
            <div class="inputArea">
                <AlgorithmInputForm
                    model={[
                        {key: "target", displayText: "Target" },
                        {key: "elements", displayText: "Sorted elements to search through"}
                    ]}
                    submitHandler={this.handleSubmit.bind(this)}
                />
            </div>
        )
    }
}

export default BinarySearchInput;
