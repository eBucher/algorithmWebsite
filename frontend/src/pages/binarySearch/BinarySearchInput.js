import 'pages/styles.css';
import {CONTENT_SQUARE} from 'components/drawArea/shapes/Presets.js';
import {batchActions} from 'redux-batched-actions';
import {setStarted, setStepNum, setSteps, setAreaDimensions, setAlgParams} from "actions/AlgorithmActions.js";
import store from "store.js"

class BinarySearchInput{
    constructor(urlParams){
        this.urlParams = urlParams;
    }

    // checkIndex is where the array will be pointing to.
    calculateSteps = (elements, leftIdx, rightIdx, target) => {
        var steps = [];
        steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 0});

        if(rightIdx >= leftIdx){
            steps.push({left: leftIdx, right: rightIdx, mid: null, highlightedLines: 1, ifBox: true});
            var middle = leftIdx + Math.floor((rightIdx - leftIdx) /2);
            steps.push({left: leftIdx, right: rightIdx, mid: middle, highlightedLines: 2});
            if(elements[middle] === target){
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


    /*  Given a string of numbers separated by commas, the function will return
        an array of the numbers in the order that they appear in the string.
    */
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
        var newTarget = Number(formState.target);
        var newSteps = this.calculateSteps(newElements, 0, newElements.length - 1, newTarget);
        store.dispatch(batchActions([
            setStarted(true),
            setStepNum(0),
            setSteps(newSteps),
            setAreaDimensions(Math.max(450, CONTENT_SQUARE().size * (newElements.length + 2)), 250),
            setAlgParams({target: newTarget, elements: newElements}),
        ]));

    }


    /*  Accepts any string whose text is an integer
    */
    verifyTarget = (input) => {
        if(/^-?[0-9]+$/.test(input)){
            return true;
        }
        return false;
    }


    /*  Accepts any string that contains sorted integers separated by commas.
        Whitespace between the integers and commas will be accepted.
    */
    verifyElements = (input) => {
        if(/^(-?[0-9]+(\s)*,(\s)*)*-?[0-9]+(\s)*$/.test(input)){
            var elements = this.cleanRawElements(input);
            for(var i = 0; i < elements.length - 1; i++){
                if(elements[i] >= elements[i+1]){
                    return false;
                }
            }
            return true;
        }
        return false;
    }


    buildModel = () => {
        return {
            validInputHandler: this.validInputHandler.bind(this),
            urlParams: this.urlParams,
            inputs: [
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
                    errorMsg: "Must be sorted integers separated by commas"
                }
            ]
        }
    }
}


export default BinarySearchInput;
