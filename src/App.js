import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CricketHome from './components/CricketHome';
import PlayerInfo from './components/PlayerInfo'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={PlayerInfo}/>
        <Route exact path="/home" component={CricketHome}/>
      </Router>
    </div>
  );
}

export default App;
