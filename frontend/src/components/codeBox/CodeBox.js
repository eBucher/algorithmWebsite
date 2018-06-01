import React, { Component } from 'react';
import 'components/codeBox/CodeBox.css';

class CodeBox extends React.Component{

	constructor(){
		super();
		this.linesOfCode = null;
	}

	generateLinesOfCode = () => {
		var t = this.props.highlightedLines;
		var linesOfCode = this.props.linesOfCode.map(this.buildLine(this.props.highlightedLines));
		return linesOfCode;
	}

	buildLine = (highlightedLines) => {
		return function(line, index){
			if(highlightedLines.includes(index)){

				return <div style={{backgroundColor: "red"}}><pre>{line}</pre></div>
			}
			return <div><pre>{line}</pre></div>
		}
	}

	render(){
		return (
			<div id="codeBox">{this.generateLinesOfCode()}</div>
		)
	}

}

export default CodeBox;
