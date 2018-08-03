import "../styles.css";
import Algorithm from "pages/Algorithm.js";
import LinearSearchInput from 'pages/linearSearch/LinearSearchInput.js';
import LinearSearchDraw from 'pages/linearSearch/LinearSearchDraw.js';
import queryString from 'query-string';
import {connect} from "react-redux";

class LinearSearch extends Algorithm{

	getAlgorithmName = () => {
		return "Linear Search";
	}


	getAlgorithmLines = () => {
		return [
			"function linearSearch(elements, target){",
			"    for(int i = 0; i < elements.length; i++){",
			"        if(elements[i] == target){",
			"            return i;",
			"        }",
			"    }",
			"    return -1",
			"}"
		];
	}


	generateExplanation = (stepNum) => {
		if(!this.props.algorithm.started)
			return "";

		var highlightedLine = this.props.algorithm.steps[stepNum].highlightedLines;
		if(highlightedLine === 0)
			return "Goal: Determine whether the target is in the given elements.";
		if(highlightedLine === 1 && this.props.algorithm.steps[stepNum].loopBox === false)
			return "There are no more elements to check.";
		if(highlightedLine === 1 || highlightedLine === 2)
			return "Loop through each element and see if it matches the target."
		if(highlightedLine === 3)
			return "The target was found and its index was returned.";
		if(highlightedLine === 6)
			return "Since all of the elements have been checked and the target was" +
					" not found, the algorithm returns a -1."
		return "Nothing to show.";
	}


	getVisuals = () => {
		var state = this.props.algorithm;
		var piecesToShow = [];
		if(this.props.algorithm.started)
		{
			var drawHandler = new LinearSearchDraw(state.algParams.target, state.algParams.elements, state.areaWidth, state.areaHeight);
			piecesToShow = drawHandler.visualizeAlgorithm(state.steps[state.stepNum]);
		}
		return piecesToShow;
	}


	getInputModel = () => {
		var urlParams = queryString.parse(this.props.location.search);
		return new LinearSearchInput(urlParams).buildModel();
	}



}

const mapStateToProps = (state) => {
  return {
      algorithm: state.Algorithm,
  };
};

export default connect(mapStateToProps)(LinearSearch);
