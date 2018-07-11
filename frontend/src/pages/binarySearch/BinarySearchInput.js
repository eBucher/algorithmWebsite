import React, { Component } from 'react';
import 'pages/styles.css';
import {CONTENT_SQUARE} from 'components/drawArea/shapes/Presets.js';
import AlgorithmInputForm from 'components/algorithmInputForm/AlgorithmInputForm.js';
import queryString from 'query-string';
import {connect} from "react-redux";
import {setStarted, setStepNum, setSteps, setAreaDimensions} from "actions/AlgorithmActions.js";
import store from "store.js"

class BinarySearchInput{
    constructor(algorithmLogic){
        this.algorithmLogic = algorithmLogic;
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


    validInputHandler = (formState) => {
        var newElements = this.cleanRawElements(formState.elements);
        var newSteps = this.calculateSteps(newElements, 0, newElements.length - 1, formState.target);
        store.dispatch(setStarted(true));
        store.dispatch(setStepNum(0));
        store.dispatch(setSteps(newSteps));
        store.dispatch(setAreaDimensions(CONTENT_SQUARE().size * (newElements.length + 2), 250));
        this.algorithmLogic.setState({
            target : formState.target,
            elements: newElements,
            steps: newSteps,
            currentStepNum: 0,
            started: true,
            areaWidth: CONTENT_SQUARE().size * (newElements.length + 2),
            areaHeight: 250,
        });
    }


    verifyTarget = (input) => {
        if(/^-?[1-9]+$/.test(input)){
            return true;
        }
        return false;
    }


    verifyElements = (input) => {
        if(/^(-?[0-9]+(\s)*,(\s)*)*-?[0-9]+(\s)*$/.test(input)){
            return true;
        }
        return false;
    }


    buildModel = () => {
        return {
            validInputHandler: this.validInputHandler.bind(this),
            urlParams: queryString.parse(this.algorithmLogic.props.location.search),
            forms: [
                {   key: "target",
                    displayText: "Target",
                    tooltipText: "Which number to search for.",
                    verifyHandler: this.verifyTarget,
                    errorMsg: "Must be an integer"
                },
                {
                    key: "elements",
                    displayText: "Sorted elements",
                    tooltipText: "All of the numbers to search through to try to find the target. The numbers should be listed in ascending order and be separated by commas.",
                    verifyHandler: this.verifyElements,
                    errorMsg: "Must be integers separated by commas"
                }
            ]
        }
    }
}


export default BinarySearchInput;
