import React from 'react';
import 'components/explanationBox/ExplanationBox.css';
import 'pages/styles.css';
import CommentIcon from 'assets/CommentIcon.svg';
import PropTypes from 'prop-types';

const propTypes = {
	/** The most recent descriptions of each step to display. Newest
		descriptions should be at the beginning of the array. */
	text: PropTypes.arrayOf(PropTypes.string).isRequired,
}

/** Displays explanations line by line and highlights the newest one. */
class ExplanationBox extends React.Component{

	/** @return an array of elements where every even element is an icon to be
		displayed to the left of the description and every odd element is a
		description. The first icon and description will be uniquely displayed
		from the rest. */
	generateRows = () => {
		var rows = [];
		if(this.props.text[0] != null){
			rows.push(
				<div key={"explanationBoxIcon0"} className="lineIconContainer">
					<font color="#e9711c"> > </font>
				</div>
			)
			rows.push(
				<div key={"explanationBoxDescription0"} className="explanationContainer">
					<font color="#000000">{this.props.text[0]}</font>
				</div>
			)
		}
		for(var i = 1; i < this.props.text.length; i++){
			if(this.props.text[i] != null){
				rows.push(
					<div key={"explanationBoxIcon" + i} className="lineIconContainer">
						>
					</div>
				)
				rows.push(
					<div key={"explanationBoxDescription" + i}className="explanationContainer">
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

ExplanationBox.propTypes = propTypes;

export default ExplanationBox;
