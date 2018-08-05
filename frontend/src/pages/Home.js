import React from 'react';
import "./styles.css";
import {Card} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
class Test extends React.Component{

	render(){
		return(
			<div>
    			<h2>Searching Algorithms</h2>
    			<Card.Group>
    			<Card as={Link} to="/algorithms/binarySearch" color="orange">
    			    <Card.Content>
    			      <Card.Header>Binary Search</Card.Header>
    			      <Card.Description>A fast searching algorithm that runs in O(log n) time.</Card.Description>
    			    </Card.Content>
    			</Card>
    			<Card as={Link} to="/algorithms/linearSearch" color="orange">
    			    <Card.Content>
    			      <Card.Header>Linear Search</Card.Header>
    			      <Card.Description>The most basic searching algorithm which runs in O(n) time.</Card.Description>
    			    </Card.Content>
    			</Card>
    			</Card.Group>

    			<h2>Sorting Algorithms</h2>
    			<Card.Group>
    			<Card as={Link} to="/algorithms/bubbleSort" color="orange">
    			    <Card.Content>
    			      <Card.Header>Bubble Sort</Card.Header>
    			      <Card.Description>A simple sorting algorithm that runs in O(n<sup>2</sup>) time.</Card.Description>
    			    </Card.Content>
    			</Card>
    			<Card as={Link} to="/algorithms/insertionSort" color="orange">
    			    <Card.Content>
    			      <Card.Header>Insertion Sort</Card.Header>
    			      <Card.Description>A simple sorting algorithm that runs in O(n<sup>2</sup>) time.</Card.Description>
    			    </Card.Content>
    			</Card>
    			</Card.Group>
			</div>
		)
	}
}



export default Test;
