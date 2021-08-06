import React from 'react';
import "./App.css";
import { 
  BrowserRouter as Router, 
  Route} 
  from 'react-router-dom';
import Home from './Home';
import Poll from './Poll';

function App() {
  return (
    <Router>
    <div className="App">
      
      {/* Paths to different routes */}
          <Route path="/:pollID" component={Poll}/>
          <Route exact path="/" component={Home}/>
  
      <footer>
          <p>Created at <a href="http://junocollege.com" target="_blank" rel="noreferrer">Juno College</a> by Hongjian Huang, Richard Gayle, and Sherry Truong</p>
      </footer>
      
    </div>

    </Router>
  );
}

export default App;




