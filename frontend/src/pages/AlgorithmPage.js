import React from 'react';
import ButtonBar from 'components/buttonBar/ButtonBar.js';
import DrawArea from 'components/drawArea/DrawArea.js';
import CodeBox from 'components/codeBox/CodeBox.js';
import ExplanationBox from 'components/explanationBox/ExplanationBox.js';
import AlgDisplay from 'components/algDisplay/AlgDisplay.js';
import AlgorithmInputForm from 'components/algorithmInputForm/AlgorithmInputForm.js';
import StepManager from 'components/stepManager/StepManager.js';
import {connect} from "react-redux";
import './styles.css';

class AlgorithmPage extends React.Component {

    render(){
        var state = this.props.algorithm;
        return(
            <div id="AlgorithmVisualization">
                <div className="pageTitle algorithmTitleBox">
                    {state.name}
                </div>
                <AlgorithmInputForm model={this.props.inputModel} />
                <AlgDisplay started={state.started}>
						<DrawArea width={state.areaWidth} height={state.areaHeight} displayedPieces={this.props.piecesToShow}/>
				</AlgDisplay>
                <div className="stepManagerArea">
                    <StepManager
                        value ={state.stepNum}
                        numSteps={state.steps.length}
                        enabled={state.started}
                    />
                    <ButtonBar/>
                </div>
                <div className="bottomDescriptions">
					<CodeBox linesOfCode={this.props.linesOfCode} highlightedLine={this.props.highlightedLines}/>
					<ExplanationBox text={this.props.explanations} />
				</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      algorithm: state.Algorithm,
  };
};

export default connect(mapStateToProps)(AlgorithmPage);
