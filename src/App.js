import "./App.css";
import { 
  BrowserRouter as Router, 
  Route, 
  Link } 
  from 'react-router-dom';
import Home from './Home';
import Poll from './Poll';



  function App() {
    
  

  return (
    <Router>
    <div className="App">

      <Route exact path="/" component={ Home }/>

      <Route exact path="/:pollID" component={Poll}/>

      <footer>
          <p>Created at <a href="http://junocollege.com" target="_blank">Juno College</a> by Hongjian Huang, Richard Gayle, and Sherry Truong</p>
      </footer>

    </div>

    </Router>
  );
}

export default App;

{/* <Router>

<div className="App">
  
<nav>
  <ul>
    <li>
      <Link to="/">Go Home!</Link>
    </li>
    <li>
      <Link to="/contact">Get in touch</Link>
    </li>
    <li>
      <Link to="/about">What is this ?</Link>
    </li>
  </ul>
</nav>
<Route exact path="/" component={ Home } />


  <Route path="/contact" component={ Contact } />
  <Route path="/about" 
  render={ () => <About who="Paul" what="super lovely"/>}/>


</div>

</Router> */}

// PSEUDO CODE
// === MVP === 
// Set up connection to firebase that runs once on component mount; get object that references configured database
// Create form to allow users to enter a question into an text input
// When user hits submit, user input will be stored in firebase and pushed to array
  // User will automatically move to the new route which will display the question and contain the yes or no options 
  // New route / component will be created based on unique id which is generated in a for loop
// When users vote either yes or no, the vote is stored as a parameter inside an object
// Total votes, including the new vote, is displayed on the page / as a modal. Shows how many people have completed the pole. 
// Ensure error handling is in place to ensure users can only choose one option 



