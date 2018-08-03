import React from 'react';
import "./styles.css";
import BackwardIcon from "assets/BackwardIcon.svg";
import ForwardIcon from "assets/WarningIcon.svg";
import CommentIcon from "assets/CommentIcon.svg";
import {Dropdown, Menu} from "semantic-ui-react";
import {Link} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
class Test extends React.Component{

	render(){

		return(
		    <Dropdown item text='Other Algorithms'>
		      <Dropdown.Menu direction="left">
		        <Dropdown.Item as={Link} to="algorithms/binarySearch">Binary Search</Dropdown.Item>
		        <Dropdown.Item as={Link} to="algorithms/bubbleSort">Bubble Sort</Dropdown.Item>
				<Dropdown.Item as={Link} to="algorithms/LinearSearch">Linear Search</Dropdown.Item>
		      </Dropdown.Menu>
		    </Dropdown>

		)
	}
}



export default Test;
