import React, { Component } from 'react';
import './CodeBox.css';

class CodeBox extends React.Component{

	constructor(){
		super();
		this.linesOfCode = null;
	}

	generateLinesOfCode = (lines) => {
		var linesOfCode = lines.map(function(line) {
								return <div><pre>{line}</pre></div>
						});
		return linesOfCode;
	}

	render(){
		return (
			<div id="codeBox">{this.generateLinesOfCode(this.props.linesOfCode)}</div>
		)
	}

}

export default CodeBox;
