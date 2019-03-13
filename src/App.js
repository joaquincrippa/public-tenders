import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.scss';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch className="container">
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
