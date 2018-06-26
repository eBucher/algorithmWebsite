import React, { Component } from 'react';
import 'components/explanationBox/ExplanationBox.css';
import {toHex} from 'utils/Colors.js';

class ExplanationBox extends React.Component{

	render(){

		return (
			<div id="explanationBox">
				<div className="BoxTitle">
					<h2 class="subtitle white">What is happening</h2>
				</div>
				<div id="explanation">
					{this.props.text}
				</div>
			</div>
		)
	}

}

export default ExplanationBox;
