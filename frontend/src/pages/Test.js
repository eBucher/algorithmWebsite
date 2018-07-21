import React from 'react';
import "./styles.css";
import Button from "components/button/Button.js";
import BackwardIcon from "assets/BackwardIcon.svg";
import ForwardIcon from "assets/WarningIcon.svg";
import CommentIcon from "assets/CommentIcon.svg";

class Test extends React.Component{

	render(){
		return(
			<div>
				<div>
					<Button color="orange" size="mini">Click here</Button>&nbsp;
					<Button color="blue" size="mini">Click here</Button>&nbsp;
					<Button disabled={true} size="mini">Click here</Button>
					<Button shape="circle" disabled={true} size="mini"><img height="60%" src={BackwardIcon}/></Button>
				</div>
				<br/>
				<div>
					<Button color="orange" size="small">Click here</Button>&nbsp;
					<Button color="blue" size="small">Click here</Button>&nbsp;
					<Button disabled={true} size="small">Click here</Button>
					<Button shape="circle" disabled={true} size="small"><img height="60%" src={BackwardIcon}/></Button>
				</div>
				<br/>
				<div>
					<Button color="orange" size="medium">Click here</Button>&nbsp;
					<Button color="blue" size="medium">Click here</Button>&nbsp;
					<Button disabled={true} size="medium">Click here</Button>
					<Button shape="circle" disabled={true} size="medium"><img height="60%" src={BackwardIcon}/></Button>
				</div>
				<br/>

			</div>
		)
	}

}

export default Test;
