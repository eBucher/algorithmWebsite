import React, { Component } from 'react';
import logo from './logo.svg';
import 'App.css';
import 'reset.css';
//import LinearSearch from 'pages/LinearSearch.js';
import LinearSearch from 'pages/linearSearch/LinearSearch.js';
import Test from 'pages/Test.js';
import HeaderBar from 'components/headerBar/HeaderBar.js';
//import BinarySearch from 'pages/BinarySearch.js';
import BinarySearch from 'pages/binarySearch/BinarySearch.js';
import Display from 'components/display/Display.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <BinarySearch/>
      </div>
    );
  }
}

export default App;
