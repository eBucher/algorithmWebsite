import React from 'react';
import "./styles.css";
import BackwardIcon from "assets/BackwardIcon.svg";
import ForwardIcon from "assets/WarningIcon.svg";
import CommentIcon from "assets/CommentIcon.svg";
import {Button} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
class Test extends React.Component{

	render(){
		return(
			<Button circular icon="settings"/>
		)
	}

}

export default Test;
