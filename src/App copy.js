import './App.css';
import Authentication from './pages/authentication/authentication'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Pitches from './pages/pitches/pitches';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return  (
      <div className="App">
        <Router>
          <Route exact path="/pitches">
            <Pitches/>
          </Route>
          <Route exact path="/">
            <Authentication/>
          </Route>
          <Route exact path="/auth">
            <Authentication/>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
