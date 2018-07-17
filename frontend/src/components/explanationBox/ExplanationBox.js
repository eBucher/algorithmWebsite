import React from 'react';
import 'components/explanationBox/ExplanationBox.css';
import 'pages/styles.css';
import CommentIcon from 'assets/CommentIcon.svg';

class ExplanationBox extends React.Component{

	generateRows = () => {
		var rows = [];
		if(this.props.text[0] != null){
			rows.push(
				<div className="lineIconContainer">
					<font color="#e9711c"> > </font>
				</div>
			)
			rows.push(
				<div className="explanationContainer">
					<font color="#000000">{this.props.text[0]}</font>
				</div>
			)
		}
		for(var i = 1; i < this.props.text.length; i++){
			if(this.props.text[i] != null){
				rows.push(
						<div className="lineIconContainer">
							>
						</div>
				)
				rows.push(
					<div className="explanationContainer">
						{this.props.text[i]}
					</div>
				)
			}

		}
		return rows;
	}

	render(){

		return (
			<div className="explanationBox">
				<div className="BoxTitle">
					<img src={CommentIcon} className="subtitleIcon" alt=""/>
					<h2 className="subtitle darkText">What is happening</h2>
				</div>
				<div id="explanations">
					{this.generateRows()}
				</div>
			</div>
		)
	}

}

export default ExplanationBox;
