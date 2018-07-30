import React, { Component } from 'react';
import 'App.css';
import 'reset.css';
import HeaderBar from 'components/headerBar/HeaderBar.js';
import LinearSearch from 'pages/linearSearch/LinearSearch.js';
import BinarySearch from 'pages/binarySearch/BinarySearch.js';
import BubbleSort from 'pages/bubbleSort/BubbleSort.js';
import InsertionSort from 'pages/insertionSort/InsertionSort.js';
import Test from 'pages/Test.js';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <div className="content">
            <Switch>
                <Route path="/algorithms/binarySearch" component={BinarySearch}/>
                <Route path="/algorithms/bubbleSort" component={BubbleSort}/>
                <Route path="/algorithms/insertionSort" component={InsertionSort}/>
                <Route path="/algorithms/linearSearch" component={LinearSearch}/>
                <Route path="/test" component={Test}/>
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
