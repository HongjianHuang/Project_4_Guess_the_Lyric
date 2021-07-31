import { useEffect, useState } from "react";
import { Link, Router } from "react-router-dom";
import firebase from "./firebase";

const Home = () => {
  const [ questionInput, setQuestionInput ] = useState("")
  const [ questionArray, setQuestionArray ] =useState([])
  const poll = {yes: 0,
                no: 0}

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
      console.log(newStateArray[0].key);
      console.log(newStateArray);
      setQuestionArray(newStateArray[0])
    });
  }, []);


  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setQuestionInput(value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value);
    setQuestionInput(e.target[0].value);
    console.log(questionInput);
    if (questionInput !== "") {
      const dbRef = firebase.database().ref();
      dbRef.push([questionInput, poll]);
      setQuestionInput("");
    }
    // } else {
    //   alert("Enter a valid response");
    // }
    console.log(questionArray);
  }

   // Function that handles changes in input elements on form
   



    return (
      <div>
        <header>
          <h1>Voting App</h1>
        </header>
        <main>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia libero expedita tenetur commodi voluptates repellat facilis provident odio ea necessitatibus!</p>
        </main>
        <form action="submit" onSubmit={handleSubmit}>
          <label htmlFor="userquestionInput"></label>
          <input type="text" name="userquestionInput" id="userquestionInput" onChange={handleInputChange}/>
          <Link to={`${questionArray.key}`}>
          <button type="submit">Create Poll</button>
          </Link>
        </form>
      </div>
    )
}

export default Home;