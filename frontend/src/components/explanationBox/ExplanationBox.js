import React from 'react';
import 'components/explanationBox/ExplanationBox.css';
import 'pages/styles.css';
import CommentIcon from 'assets/CommentIcon.svg';

class ExplanationBox extends React.Component{

	generateRows = () => {
		var rows = [];
		if(this.props.text[0] != null){
			rows.push(
				<div class="lineIconContainer">
					<font color="#e9711c"> > </font>
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
			<div class="explanationBox">
				<div className="BoxTitle">
					<img src={CommentIcon} class="subtitleIcon" alt=""/>
					<h2 class="subtitle darkText">What is happening</h2>
				</div>
				<div id="explanations">
					{this.generateRows()}
				</div>
			</div>
		)
	}

}

export default ExplanationBox;
