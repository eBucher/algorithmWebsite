import React, {Component} from 'react';
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import ExplanationBox from 'components/explanationBox/ExplanationBox.js';
import Display from 'components/display/Display.js';
import AlgorithmSideBar from 'components/algorithmSideBar/AlgorithmSideBar.js';

class AlgorithmPage extends React.Component {

    render(){
        return(
            <div id="AlgorithmContainer">
				<div class="algorithmVisualization">
                    <AlgorithmSideBar
                        algorithmName = {this.props.algorithmName}
                        inputModel = {this.props.inputModel}
                        currentStepNum = {this.props.currentStepNum}
                        numSteps = {this.props.numSteps}
                        started = {this.props.started}
                        parent = {this.props.parent}
                    />
					<Display started={this.props.started}>
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
