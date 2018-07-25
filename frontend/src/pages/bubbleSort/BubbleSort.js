import Algorithm from "pages/Algorithm.js";
import BubbleSortInput from './BubbleSortInput.js';
import BubbleSortDraw from './BubbleSortDraw.js';
import queryString from 'query-string';
import {connect} from "react-redux";
import {setAlgorithmName, resetAlgorithmState} from "actions/AlgorithmActions.js";
import {setPagePath} from "actions/AppActions.js";
import store from 'store.js';
import {batchActions} from 'redux-batched-actions';

class BubbleSort extends Algorithm{
    constructor(props){
        super(props);
        store.dispatch(batchActions([
            resetAlgorithmState(),
			setAlgorithmName("Bubble Sort"),
			setPagePath(props.location.pathname),
        ]));
        this.algorithm = [
            "function bubbleSort(elements, numElements){",
            "    for(int i = 0; i < numElements - 1; i++){",
            "        for(int j = 0; j < numElements - i - 1; j++){",
            "            if(elements[j] > elements[j+1]){",
            "                swap(elements[j], elements[j + 1]);",
            "            }",
            "        }",
            "    }",
            "}",
        ]
    }


    generateExplanation = (stepNum) => {
        if(!this.props.algorithm.started)
            return "";

        var highlightedLine = this.props.algorithm.steps[stepNum].highlightedLines;
        if(highlightedLine === 0)
            return "Goal: Sort all of the elements in ascending order.";
        if(highlightedLine === 1 && this.props.algorithm.steps[stepNum].i === 0)
            return "With each outer loop iteration, one number will be moved to the correct postition. i keeps count of how many numbers have moved into the correct position at the end of the array.";
        if(highlightedLine === 1 && this.props.algorithm.steps[stepNum].loopBox === false)
            return "i is now equal to the numElements - 1, so the outer loop will end. ";
        if(highlightedLine === 1)
            return "Increment the number of elements in the correct position and get ready to move another element into the correct position.";
        if(highlightedLine === 2 && this.props.algorithm.steps[stepNum].loopBox === false)
                return "j has reached the end of the unsorted elements so this for loop ends and elements[j] is now in the correct position.";
        if(highlightedLine === 2 && this.props.algorithm.steps[stepNum].j !== 0)
                return "Continue shifting one element towards the correct position.";
        if(highlightedLine === 2)
            return "Loop through all of the elements at the beginning of the array that are not in their correct positions yet.";
        if(highlightedLine === 3)
            return "Check to see if elements[j] is greater than the element after it, which would mean it is in the wrong position.";
        if(highlightedLine === 4)
            return "elements[j] was in the wrong position, so it gets shifted to the right.";
        if(highlightedLine === 8)
            return "All but one element have been manually moved to the correct position, which means that the last remaining element must be in the correct position already and the array is sorted.";
        return "Nothing to show.";
    }


    getVisuals = () => {
        var state = this.props.algorithm;
        var piecesToShow = [];
        if(this.props.algorithm.started)
        {
            var drawHandler = new BubbleSortDraw(state.areaWidth, state.areaHeight);
            piecesToShow = drawHandler.visualizeAlgorithm(state.steps[state.stepNum]);
        }
        return piecesToShow;
    }


    getInputModel = () => {
        var urlParams = queryString.parse(this.props.location.search);
        return new BubbleSortInput(urlParams).buildModel();
    }
}


const mapStateToProps = (state) => {
  return {
      algorithm: state.Algorithm,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
		setAlgorithmName: (newName) => {
            dispatch(setAlgorithmName(newName));
		},
		resetAlgorithmState: () => {
            dispatch(resetAlgorithmState());
		}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BubbleSort);
