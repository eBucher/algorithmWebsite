import React from 'react';
import 'components/codeBox/CodeBox.css';
import CodeIcon from 'assets/CodeIcon.svg';

class CodeBox extends React.Component{

	constructor(){
		super();
		this.linesOfCode = null;
	}


	static getDefaultProps = {
		linesOfCode: [],
		highlightedLines: null,
	}


	/*
	Replaces four consecutive space characters with 4 characters that will
	be rendered as spaces in the HTML.
	*/
	cleanLine = (line) => {
		if(line === ""){
			return "\u00A0";
		}
		return line.replace(/    /g, "\u00A0\u00A0\u00A0\u00A0")
	}


	/*	Returns an array of all of the elements for each line of code.
	*/
	generateLinesOfCode = () => {
		var linesOfCode = [];
		for(var i = 0; i < this.props.linesOfCode.length; i++){
			linesOfCode.push(this.buildLine(i));
		}
		return linesOfCode;
	}


	/*	Given an index of a line of code in this.props.linesOfCode, the function
		will return an element with that line of code in it. If the index
		matches the highlightedLines index, its background will be gold.
	*/
	buildLine = (index) => {
		if(this.props.highlightedLines === index){
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
					<img src={CodeIcon} className="subtitleIcon" alt=""/>
					<h2 className="subtitle darkText">Algorithm</h2>
				</div>
				<div className="code">
					{this.generateLinesOfCode()}
				</div>
			</div>
		)
	}

}

export default CodeBox;
