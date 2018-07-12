import "pages/styles.css";
import Algorithm from "pages/Algorithm.js";
import BinarySearchInput from 'pages/binarySearch/BinarySearchInput.js';
import BinarySearchDraw from 'pages/binarySearch/BinarySearchDraw.js';
import queryString from 'query-string';
import {connect} from "react-redux";
import {setAlgorithmName, resetAlgorithmState} from "actions/AlgorithmActions.js";
import store from 'store.js';
import {batchActions} from 'redux-batched-actions';

class BinarySearch extends Algorithm{

	constructor(props){
		super(props);
		store.dispatch(batchActions([
            resetAlgorithmState(),
			setAlgorithmName("Binary Search"),
        ]));
		this.algorithm = [
			"function binarySearch(elements, left, right, target){",
			"    if (right >= left){",
			"        int mid = left + (right - 1)/2",
			"",
			"        if(elements[mid] == target){",
			"            return mid;",
			"        }",
			"",
			"        if(elements[mid] > target)",
			"            return binarySearch(elements, left, mid-1, target);",
			"",
			"        return binarySearch(elements, mid+1, right, target);",
			"    }",
			"    return -1;",
			"}"
		];
	}


	/*	If the algorithm has not started, an empty string is returned. Otherwise,
		a line for the explanationBox is returned based on which step the user
		is on and what the highlighted line is for that step.
	*/
	generateExplanation = (stepNum) => {
		if(!this.props.algorithm.started)
			return "";

		var highlightedLine = this.props.algorithm.steps[stepNum].highlightedLines;
		if(highlightedLine === 0)
			return "Goal: Determine whether the target is in the given elements.";
		if(highlightedLine === 1)
			return "Make sure the two indices have not passed eachother."
		if(highlightedLine === 2)
			return "Since the left and right indices are not past eachother, find the midpoint between them.";
		if(highlightedLine === 4)
			return "Check to see if the target is found at the midpoint."
		if(highlightedLine === 5)
			return "The target was at the midpoint, so its index is returned."
		if(highlightedLine === 8)
			return "The midpoint was not the target, so now it will check to see if the target is to the left of the midpoint.";
		if(highlightedLine === 9)
			return "If the target exists, it must be to the left of the midpoint. Therefore, the " +
			"function will be run again on the elements from the left index to the element that " +
			"is to the left of the midpoint.";
		if(highlightedLine === 11)
			return "The target is greater than the element at the midpoint. Therefore, the " +
			"function will run again on the elements from the right of the midpoint to the right index.";
		if(highlightedLine === 13)
			return "The left and right indices have passed each other so the target does not exist in " +
			"the list of elements.";
		return "Nothing to show.";
	}


	getVisuals = () => {
		var state = this.props.algorithm;
		var piecesToShow = [];
		if(this.props.algorithm.started)
		{
			var drawHandler = new BinarySearchDraw(state.algParams.target, state.algParams.elements, state.areaWidth, state.areaHeight);
			piecesToShow = drawHandler.visualizeAlgorithm(state.steps[state.stepNum]);
		}
		return piecesToShow;
	}


	getInputModel = () => {
		var urlParams = queryString.parse(this.props.location.search);
		return new BinarySearchInput(urlParams).buildModel();
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

export default connect(mapStateToProps, mapDispatchToProps)(BinarySearch);
