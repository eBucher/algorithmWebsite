import React, { Component } from 'react';
import 'components/explanationBox/ExplanationBox.css';
import {toHex} from 'utils/Colors.js';

class ExplanationBox extends React.Component{

	render(){

		return (
			<div id="explanationBox">
				<div class="BoxTitle">
					What is happening
				</div>
				<div id="explanation">
					{this.props.text}
				</div>
			</div>
		)
	}

}

export default ExplanationBox;
