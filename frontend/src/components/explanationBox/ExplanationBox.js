import React, { Component } from 'react';
import 'components/explanationBox/ExplanationBox.css';
import 'pages/styles.css';
import {toHex} from 'utils/Colors.js';
import CommentIcon from 'assets/CommentIcon.svg';

class ExplanationBox extends React.Component{

	generateRows = () => {
		var rows = [];
		if(this.props.text[0] != null){
			rows.push(
				<div class="lineIconContainer">
					<font color="#52c7b8"> > </font>
				</div>
			)
			rows.push(
				<div class="explanationContainer">
					<font color="#000000">{this.props.text[0]}</font>
				</div>
			)
		}
		for(var i = 1; i < this.props.text.length; i++){
			if(this.props.text[i] != null){
				rows.push(
						<div class="lineIconContainer">
							>
						</div>
				)
				rows.push(
					<div class="explanationContainer">
						{this.props.text[i]}
					</div>
				)
			}

		}
		return rows;
	}

	render(){

		return (
			<div id="explanationBox">
				<div className="BoxTitle">
					<img src={CommentIcon} class="subtitleIcon"/>
					<h2 class="subtitle white">What is happening</h2>
				</div>
				<div id="explanations">
					{this.generateRows()}
				</div>
			</div>
		)
	}

}

export default ExplanationBox;
