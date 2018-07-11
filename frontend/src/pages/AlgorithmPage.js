import React, {Component} from 'react';
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import ExplanationBox from 'components/explanationBox/ExplanationBox.js';
import Display from 'components/display/Display.js';
import AlgorithmInputForm from 'components/algorithmInputForm/AlgorithmInputForm.js';
import StepManager from 'components/stepManager/StepManager.js';
import { withRouter } from 'react-router';
import './styles.css';

class AlgorithmPage extends React.Component {

    render(){
        return(
            <div id="AlgorithmVisualization">
                <div class="pageTitle algorithmTitleBox">
                    {this.props.algorithmName}
                </div>
                <AlgorithmInputForm model={this.props.inputModel} />
                <Display started={this.props.started}>
						<DrawArea w={this.props.areaWidth} h={this.props.areaHeight} displayedPieces={this.props.piecesToShow}/>
				</Display>
                <div class="stepManagerArea">
                    <StepManager
                        value ={this.props.currentStepNum}
                        numSteps={this.props.numSteps}
                        enabled={this.props.started}
                        parent={this.props.parent}
                    />
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
