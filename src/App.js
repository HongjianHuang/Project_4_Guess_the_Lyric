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
