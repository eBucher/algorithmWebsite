import React from 'react';
import 'components/headerBar/HeaderBar.css';

class HeaderBar extends React.Component {
	render(){
		return (
			<React.Fragment>
				<div className="headerMargin">
				</div>
				<div className="headerBar">
					<p><font className="orangeText">&#8226;</font> SeeTheSteps.com</p>
					<p className="rightLinks"> Home  | About | Feedback</p>
				</div>
				<div className="headerMargin">
				</div>
			</React.Fragment>
		)
	}
}

export default HeaderBar;
