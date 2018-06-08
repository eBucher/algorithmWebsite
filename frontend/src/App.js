import React, { Component } from 'react';
import logo from './logo.svg';
import 'App.css';
import 'reset.css';
import LinearSearch from 'pages/LinearSearch.js';
import Test from 'pages/Test.js';
import HeaderBar from 'components/headerBar/HeaderBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <LinearSearch/>
      </div>
    );
  }
}

export default App;
