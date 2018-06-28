import React, {Component} from 'react';
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import ExplanationBox from 'components/explanationBox/ExplanationBox.js';
import StepManager from 'components/stepManager/StepManager.js';
import BinarySearchInput from 'pages/binarySearch/BinarySearchInput.js';
import Display from 'components/display/Display.js';
import AlgorithmInputForm from 'components/algorithmInputForm/AlgorithmInputForm.js';

class AlgorithmPage extends React.Component {
    render(){
        return(
            <div id="AlgorithmContainer">
				<div class="algorithmVisualization">
					<div class="algorithmSidebar">
						<h1 class="pageTitle lightPrimary">{this.props.algorithmName}</h1>
                        <div class="inputArea">
                            <AlgorithmInputForm model={this.props.inputModel} />
                        </div>
						<StepManager value ={this.props.currentStepNum} numSteps={this.props.numSteps} enabled={this.props.started} parent={this.props.parent}/>
					</div>
					<Display>
						<DrawArea w={this.props.areaWidth} h={this.props.areaHeight} displayedPieces={this.props.piecesToShow}/>
					</Display>
				</div>

				<div class="bottomDescriptions">
					<CodeBox linesOfCode={this.props.algorithm} highlightedLines={this.props.highlightedLines}/>
					<ExplanationBox text={this.props.explanations} />
				</div>
			</div>
        )
    }
}

export default AlgorithmPage;
