import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/layout/Navbar';
import ListTenders from './components/tenders/ListTenders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="container-fluid">
            <Switch>
              <Route exact path="/tenders" component={ListTenders}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
