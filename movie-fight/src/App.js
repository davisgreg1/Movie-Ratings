import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import './index.css';


class App extends Component {
  render() {
  return(
    <div id="navDiv">
      <nav className="navBar">
        <Link to="/">Home</Link>
      </nav>

      <Switch>
        <Route exact path="/" component= { Home } />
        <Route path="/play" component={ Game }/>
      </Switch>
    </div>
  )
  }
}

export default App;
