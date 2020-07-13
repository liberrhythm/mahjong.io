import React from 'react';
import './App.css';
// import io from "socket.io-client";
import Home from './Home.js';
import Room from './Room.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={withRouter(Home)} />
        <Route path="/room/:id" component={withRouter(Room)} />
      </Switch>
    </Router>
  );
}

export default App;