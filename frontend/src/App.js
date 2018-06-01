import React, { Component } from 'react';
import logo from './logo.svg';
import 'App.css';
import 'reset.css';
import LinearSearch from 'pages/LinearSearch.js';
import Test from 'pages/Test.js';

class App extends Component {
  render() {
      var lines = [
        "function linearSearch(elements, target){",
        "    for(int i = 0; i < elements.length; i++){",
        "        if(elements[i] == target){",
        "            return i;",
        "        }",
        "    }",
        "    return -1",
        "}"
      ];
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LinearSearch/>
      </div>
    );
  }
}

export default App;
