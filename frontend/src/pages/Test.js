import React, { Component } from 'react';
import "./styles.css";
import ExpandableContainer from "components/expandableContainer/ExpandableContainer.js";

class Test extends React.Component{

	constructor(){
		super();
		this.state = {open: false};
	}

	interact = () => {
		if(this.state.open === true){
			this.setState({open: false});
		} else {
			this.setState({open: true});
		}
	}

	render(){
		return(
			<div>
			<button onClick={this.interact}>Click me</button>
			<ExpandableContainer open={this.state.open} >Hello<br/>There<br/>This<br/>is<br/>Expanded<br/></ExpandableContainer>
			<hr/>
			</div>
		)
	}

}

export default Test;
