import React from 'react';
import 'components/codeBox/CodeBox.css';
import CodeIcon from 'assets/CodeIcon.svg';
import PropTypes from 'prop-types';
import {Icon} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

const propTypes = {
	/** The text for each line of code to be displayed*/
	linesOfCode: PropTypes.array.isRequired,
	/** The index of an element in linesOfCode to highlight. */
	highlightedLine: PropTypes.number,
}

const defaultProps = {
	highlightedLine: -1,
}


/** A series of rows of code. At most, one of the rows can be selected to have a
 	gold background.*/
class CodeBox extends React.Component{

	/** @arg A string to reformat
		@return The passed in string where every substring of four consecutive space
		characters is replaced with four unicode space characters.*/
	cleanLine = (line) => {
		if(line === ""){
			return "\u00A0";
		}
		return line.replace(/    /g, "\u00A0\u00A0\u00A0\u00A0")
	}


	/** @return an array of all of the elements for each line of code. */
	generateLinesOfCode = () => {
		var linesOfCode = [];
		for(var i = 0; i < this.props.linesOfCode.length; i++){
			linesOfCode.push(this.buildLine(i));
		}
		return linesOfCode;
	}


	/** @arg an index for a string in this.props.linesOfCode
		@return an element that contains the string at the given index. If the
		index matches the highlightedLine prop, the element will be gold. */
	buildLine = (index) => {
		if(this.props.highlightedLine === index){
			return (
				<div key={"CodeBoxLine" + index} style={{backgroundColor: "#ffc947", whiteSpace: "pre-line"}}>
				{this.cleanLine(this.props.linesOfCode[index])}
			</div>)
		}
		return <div key={"CodeBoxLine" + index} style={{whiteSpace: "pre-line"}}>
			{this.cleanLine(this.props.linesOfCode[index])}
		</div>
	}


	render(){
		return (
			<div className="codeBox">
				<div className="BoxTitle">
					<div className="subtitleIcon">
						<Icon name="code"/>
					</div>
					<h2 className="subtitle darkText">Algorithm</h2>
				</div>
				<div className="code">
					{this.generateLinesOfCode()}
				</div>
			</div>
		)
	}

}

CodeBox.propTypes = propTypes;
CodeBox.defaultProps = defaultProps;

export default CodeBox;
