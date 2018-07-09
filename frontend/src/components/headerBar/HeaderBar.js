import React, { Component } from 'react';
import 'components/headerBar/HeaderBar.css';

class HeaderBar extends React.Component {
	render(){
		return (
			<React.Fragment>
				<div class="headerMargin">
				</div>
				<div class="headerBar">
					<p><font class="orangeText">&#8226;</font> SeeTheSteps.com</p>
					<p class="rightLinks"> Home  | About | Feedback</p>
				</div>
				<div class="headerMargin">
				</div>
			</React.Fragment>
		)
	}
}

export default HeaderBar;
