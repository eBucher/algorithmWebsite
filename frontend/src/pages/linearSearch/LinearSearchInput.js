import 'pages/styles.css';
import {CONTENT_SQUARE} from 'components/drawArea/shapes/Presets.js';
import {batchActions} from 'redux-batched-actions';
import {setStarted, setStepNum, setSteps, setAreaDimensions, setAlgParams} from "actions/AlgorithmActions.js";
import store from "store.js"

class LinearSearchInput{
	constructor(urlParams){
        this.urlParams = urlParams;
    }

	// checkIndex is where the array will be pointing to.
	calculateSteps = (target, elements) => {
		var i = 0;
		var steps = [];
		steps.push({checkIndex: null, highlightedLines: 0});

		for(i; i < elements.length; i++){
			steps.push({checkIndex: i, highlightedLines: 1, loopBox: true});
			if(elements[i] === target){
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

	/*  Given a string of numbers separated by commas, the function will return
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
        var newTarget = Number(formState.target);
        var newSteps = this.calculateSteps(newTarget, newElements);
        store.dispatch(batchActions([
            setStarted(true),
            setStepNum(0),
            setSteps(newSteps),
            setAreaDimensions(Math.max(450, CONTENT_SQUARE().size * (newElements.length + 2)), 250),
            setAlgParams({target: newTarget, elements: newElements}),
        ]));

    }


	/*  Accepts any string whose text is an integer */
    verifyTarget = (input) => {
        if(/^-?[0-9]+$/.test(input)){
            return true;
        }
        return false;
    }


	/*  Accepts any string that contains integers separated by commas. Whitespace
        between the integers and commas will be accepted. */
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
                {   key: "target",
					initialValue: this.urlParams["target"],
                    displayText: "Target",
                    tooltipText: "Which number to search for.",
                    verifyHandler: this.verifyTarget,
                    errorMsg: "Must be an integer"
                },
                {
                    key: "elements",
					initialValue: this.urlParams["elements"],
                    displayText: "Elements",
                    tooltipText: "All of the numbers to search through to try to find the target.",
                    verifyHandler: this.verifyElements,
                    errorMsg: "Must be integers separated by commas"
                }
            ]
        }
	}
}

export default LinearSearchInput;
