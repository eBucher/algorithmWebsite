import React, { Component } from 'react';
import 'App.css';
import 'reset.css';
import HeaderBar from 'components/headerBar/HeaderBar.js';
import Test from 'pages/Test.js';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Loader, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function Loading() {
    return (
        <div>
            <Header as='h3' textAlign='center'>Loading...</Header>
            <Loader active inline='centered' />
        </div>
    );
}

const Home = Loadable({
  loader: () => import('pages/Home.js'),
  loading: Loading
});

const LinearSearch = Loadable({
  loader: () => import('pages/linearSearch/LinearSearch.js'),
  loading: Loading
});

const BinarySearch = Loadable({
  loader: () => import('pages/binarySearch/BinarySearch.js'),
  loading: Loading
});

const BubbleSort = Loadable({
  loader: () => import('pages/bubbleSort/BubbleSort.js'),
  loading: Loading
});

const InsertionSort = Loadable({
  loader: () => import('pages/insertionSort/InsertionSort.js'),
  loading: Loading
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderBar/>
        <div className="content">
            <Switch>
                <Route exact path="/" component={Home}/>
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
