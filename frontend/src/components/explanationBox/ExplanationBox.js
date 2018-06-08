import React, { Component } from 'react';
import 'components/explanationBox/ExplanationBox.css';
import {toHex} from 'utils/Colors.js';

class ExplanationBox extends React.Component{

	render(){

		return (
			<div id="explanationBox">{this.props.text}</div>
		)
	}

}

export default ExplanationBox;
