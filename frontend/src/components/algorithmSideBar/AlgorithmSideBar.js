import React, {Component} from 'react';
import './AlgorithmSideBar.css';
import StepManager from 'components/stepManager/StepManager.js';
import AlgorithmInputForm from 'components/algorithmInputForm/AlgorithmInputForm.js';

class AlgorithmSideBar extends Component{
    render(){
        return(
            <div class="algorithmSidebar">
                <h1 class="pageTitle lightPrimary">{this.props.algorithmName}</h1>
                <div class="inputArea">
                    <AlgorithmInputForm model={this.props.inputModel} />
                </div>
                <div class="stepManagerArea">
                    <StepManager
                        value ={this.props.currentStepNum}
                        numSteps={this.props.numSteps}
                        enabled={this.props.started}
                        parent={this.props.parent}
                    />
                </div>
            </div>
        )
    }
}

export default AlgorithmSideBar;
