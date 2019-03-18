import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/layout/Navbar';
import ListTenders from './components/tenders/ListTenders';
import SignIn from './components/auth/SignIn';
import CreateTender from './components/tenders/CreateTender';
import ViewTender from './components/tenders/ViewTender';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="container-fluid">
            <Switch>
              <Route exact path="/tenders" component={ListTenders}/>
              <Route exact path="/" component={ListTenders}/>
              <Route path="/signin" component={SignIn}/>
              <Route path="/create" component={CreateTender}/>
              <Route path="/tenders/:id" component={ViewTender}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
