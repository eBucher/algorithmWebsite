import 'pages/styles.css';
import {CONTENT_SQUARE} from 'components/drawArea/shapes/Presets.js';
import {batchActions} from 'redux-batched-actions';
import {setStarted, setStepNum, setSteps, setAreaDimensions, setAlgParams} from "actions/AlgorithmActions.js";
import store from "store.js"

class InsertionSortInput{
    constructor(urlParams){
        this.urlParams = urlParams;
    }

    calculateSteps = (nums) => {
        var elements = nums.slice(0); //copy nums
        var numElements = elements.length;
        var steps = [];
        var key = null;
        var j = null;
        steps.push({elements: elements, i: null, j: null, key: null, loopBox: null, highlightedLines: 0});
        for(var i = 1; i < numElements; i++){
            steps.push({elements: elements.slice(0), i: i, j: null, key: null, loopBox: true, highlightedLines: 1});
            key = elements[i];
            steps.push({elements: elements.slice(0), i: i, j: null, key: key, loopBox: null, highlightedLines: 2});
            j = i - 1;
            steps.push({elements: elements.slice(0), i: i, j: j, key: key, loopBox: null, highlightedLines: 3});
            while(j >= 0 && elements[j] > key){
                steps.push({elements: elements.slice(0), i: i, j: j, key: key, loopBox: true, highlightedLines: 5});
                elements[j + 1] = elements[j];
                steps.push({elements: elements.slice(0), i: i, j: j, key: key, loopBox: null, highlightedLines: 6});
                j = j - 1;
                steps.push({elements: elements.slice(0), i: i, j: j, key: key, loopBox: null, highlightedLines: 7});
            }
            steps.push({elements: elements.slice(0), i: i, j: j, key: key, loopBox: false, highlightedLines: 5});
            elements[j + 1] = key;
            steps.push({elements: elements.slice(0), i: i, j: j, key: key, loopBox: null, highlightedLines: 9});
        }
        steps.push({elements: elements.slice(0), i: i, j: null, key: null, loopBox: false, highlightedLines: 1});
        steps.push({elements: elements.slice(0), i: null, j: null, key: null, loopbox: null, highlightedLines: 11});

        return steps;
    }


    /**  Given a string of numbers separated by commas, the function will return
        an array of the numbers in the order that they appear in the string. */
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
        var newSteps = this.calculateSteps(newElements);
        store.dispatch(batchActions([
            setStarted(true),
            setStepNum(0),
            setSteps(newSteps),
            setAreaDimensions(Math.max(450, CONTENT_SQUARE().size * (newElements.length + 2)), 250),
            setAlgParams({elements: newElements}),
        ]));
    }


    /** Accepts any string that contains sorted integers separated by commas.
        Whitespace between the integers and commas will be accepted.*/
    verifyElements = (input) => {
        if(/^(-?[0-9]+(\s)*,(\s)*)*-?[0-9]+(\s)*$/.test(input)){
            return true;
        }
        return false;
    }


    buildModel = () => {
        return {
            validInputHandler: this.validInputHandler.bind(this),
            inputs: [
                {
                    key: "elements",
                    initialValue: this.urlParams["elements"],
                    displayText: "Elements",
                    tooltipText: "All of the numbers to sort. The numbers should be listed in ascending order and be separated by commas.",
                    verifyHandler: this.verifyElements,
                    errorMsg: "Must be integers separated by commas"
                }
            ]
        }
    }
}

export default InsertionSortInput;
