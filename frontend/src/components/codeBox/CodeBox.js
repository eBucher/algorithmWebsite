import React, { Component } from 'react';
import 'components/codeBox/CodeBox.css';
import {toHex} from 'utils/Colors.js';
import CodeIcon from 'assets/CodeIcon.svg';

class CodeBox extends React.Component{

	constructor(){
		super();
		this.linesOfCode = null;
	}

	/*
	Replaces four consecutive space characters with 4 characters that will
	be rendered as spaces in the HTML
	*/
	cleanLine = (line) => {
		if(line == ""){
			return "\u00A0";
		}
		return line.replace(/    /g, "\u00A0\u00A0\u00A0\u00A0")
	}

	generateLinesOfCode = () => {
		var t = this.props.highlightedLines;
		var linesOfCode = this.props.linesOfCode.map(this.buildLine(this.props.highlightedLines, this.cleanLine));
		return linesOfCode;
	}

	buildLine = (highlightedLines, cleanLineCallback) => {
		return function(line, index){
			if(highlightedLines == index){
				return <div style={{backgroundColor: "#ffc947", whiteSpace: "pre-line"}}>{cleanLineCallback(line)}</div>
			}
			return <div style={{whiteSpace: "pre-line"}}>{cleanLineCallback(line)}</div>
		}
	}

	render(){

		return (
			<div class="codeBox">
				<div className="BoxTitle">
					<img src={CodeIcon} class="subtitleIcon"/>
					<h2 class="subtitle darkText">Algorithm</h2>
				</div>
				<div className="code">
					{this.generateLinesOfCode()}
				</div>
			</div>
		)
	}

}

export default CodeBox;
