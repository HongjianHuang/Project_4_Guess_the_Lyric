import "./App.css";
import firebase from "./firebase";
import { useEffect } from "react";
function App() {

  useEffect(() => {
    //Variable that holds reference to database
    const dbRef = firebase.database().ref();
    // Event listener to variable dbRef; fires each time there is a change in value in database. Takes a callback function which will get data (response) from the database
    dbRef.on("value", (response) => {
      // Store response from query to firebase inside responseData variable
      const responseData = response.val();
      // Variable that stores the new state
      const newStateArray = [];
      // Local variable propertyName represents each of the properties or keys in responseData object
      for (let propertyName in responseData) {
        // New object is declared and is pushed into newStateArray
        const Object = {
          key: propertyName,
          value: responseData[propertyName],
        };
        newStateArray.unshift(Object);
      }
      // Set new potluck list to state
      console.log(newStateArray);
    });
  }, []);

  return (
    <div className="App">
      <h1>Project 4!!</h1>
    </div>
  );
}

export default App;

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

