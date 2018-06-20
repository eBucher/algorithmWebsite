import React, { Component } from 'react';
import './VisualizationTitle.css';
class VisualizationTitle extends React.Component {
    render(){
        return(
            <div class="visualizationHeading">
                <h1 class="visualizationTitle">{this.props.algorithm}</h1>
            </div>
        )
    }
}

export default VisualizationTitle;
