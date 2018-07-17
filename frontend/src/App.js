import React, { Component } from 'react';
import 'App.css';
import 'reset.css';
import HeaderBar from 'components/headerBar/HeaderBar.js';
import BinarySearch from 'pages/binarySearch/BinarySearch.js';
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
                <Route path="/test" component={Test}/>
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
