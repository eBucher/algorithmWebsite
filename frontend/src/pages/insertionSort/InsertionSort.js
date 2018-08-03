import Algorithm from "pages/Algorithm.js";
import InsertionSortInput from './InsertionSortInput.js';
import InsertionSortDraw from './InsertionSortDraw.js';
import queryString from 'query-string';
import {connect} from "react-redux";

class InsertionSort extends Algorithm{

    getAlgorithmName = () => {
        return "Insertion Sort";
    }

    getAlgorithmLines = () => {
        return [
            "function insertionSort(elements, numElements){",
            "    for(int i = 1; i < numElements; i++){",
            "        key = elements[i];",
            "        int j = i - 1;",
            "",
            "        while(j >= 0 && elements[j] > key){",
            "            elements[j + 1] = elements[j];",
            "            j = j - 1;",
            "        }",
            "        elements[j + 1] = key;",
            "    }",
            "}"
        ];
    }

    generateExplanation = (stepNum) => {
        if(!this.props.algorithm.started)
            return "";
        var highlightedLines = this.props.algorithm.steps[stepNum].highlightedLines;
        var loopBox = this.props.algorithm.steps[stepNum].loopBox;
        var i =  this.props.algorithm.steps[stepNum].i;
        if(highlightedLines === 0)
            return "Goal: Sort all of the elements in ascending order.";
        if(highlightedLines === 1 && i === 1)
            return "i will keep track of how many elements are sorted at the beginning" +
                " of the array (although they may not necessarily be in the correct " +
                " position yet).";
        if(highlightedLines === 1 && loopBox === true)
            return "Increment i and continue sorting the array.";
        if(highlightedLines === 1 && loopBox === false)
            return "All but one element have been manually moved to the correct position.";
        if(highlightedLines === 2)
            return "Get the next element to sort and store it in the key variable.";
        if(highlightedLines === 3)
            return "Set j to be the element before the one that is going to be moved to" +
                " become sorted";
        if(highlightedLines === 5)
            return "Elements will be shifted to the right to make room for the key to" +
                " be put in the correct position.";
        if(highlightedLines === 6)
            return "Shift elements[j] to the right";
        if(highlightedLines === 7)
            return "Decrement j.";
        if(highlightedLines === 9)
            return "Insert the key into the leftover position.";
        if(highlightedLines === 11)
            return "Since everything else has been sorted, then the last remaining" +
                " element must already be in the correct position too and the array" +
                " is sorted.";

        return "Nothing to show.";
    }


    getVisuals = () => {
        var state = this.props.algorithm;
        var piecesToShow = [];
        if(this.props.algorithm.started)
        {
            var drawHandler = new InsertionSortDraw(state.areaWidth, state.areaHeight);
            piecesToShow = drawHandler.visualizeAlgorithm(state.steps[state.stepNum]);
        }
        return piecesToShow;
    }


    getInputModel = () => {
        var urlParams = queryString.parse(this.props.location.search);
        return new InsertionSortInput(urlParams).buildModel();
    }
}

const mapStateToProps = (state) => {
  return {
      algorithm: state.Algorithm,
  };
};

export default connect(mapStateToProps)(InsertionSort);
