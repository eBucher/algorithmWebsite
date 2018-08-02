import 'pages/styles.css';
import {CONTENT_SQUARE} from 'components/drawArea/shapes/Presets.js';
import {batchActions} from 'redux-batched-actions';
import {setStarted, setStepNum, setSteps, setAreaDimensions, setAlgParams} from "actions/AlgorithmActions.js";
import store from "store.js"

class BubbleSortInput{
    constructor(urlParams){
        this.urlParams = urlParams;
    }

    calculateSteps = (nums) => {
        var elements = nums.slice(0); //copy nums
        var numElements = elements.length;
        var steps = [];
        steps.push({elements: elements.slice(0), i: null, j: null, highlightedLines: 0});
        for(var i = 0; i < numElements - 1; i++){
            if(i === 0)
                steps.push({elements: elements.slice(0), i: i, j: null, loopBox: true, highlightedLines: 1});
            else
                steps.push({elements: elements.slice(0), i: i, j: j, loopBox: true, highlightedLines: 1});
            for(var j = 0; j < numElements - i - 1; j++){
                steps.push({elements: elements.slice(0), i: i, j: j, loopBox: true, highlightedLines: 2});
                if(elements[j] > elements[j + 1]){
                    steps.push({elements: elements.slice(0), i: i, j: j, ifBox: true, highlightedLines: 3});
                    this.swap(elements, j, j+1);
                    steps.push({elements: elements.slice(0), i: i, j: j, highlightedLines: 4});
                } else {
                    steps.push({elements: elements.slice(0), i: i, j: j, ifBox: false, highlightedLines: 3});
                }
            }
            steps.push({elements: elements.slice(0), i: i, j: j, loopBox: false, highlightedLines: 2});
        }
        steps.push({elements: elements.slice(0), i: i, j: j, loopBox: false, highlightedLines: 1});
        steps.push({elements: elements.slice(0), i: i, j: j, finished: true, highlightedLines: 8});
        return steps;
    }


    /** Helper function to swap the elements at arr[idx1] and arr[idx2] */
    swap(arr, idx1, idx2){
        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
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
            setAreaDimensions(Math.max(450, CONTENT_SQUARE().size * (newElements.length + 2)), 350),
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

export default BubbleSortInput;
