import { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";

const Home = () => {
  const [questionInput, setQuestionInput] = useState("");
  const [pollID, setPollID] = useState("");
  //const [questionArray, setQuestionArray] = useState([]);
  //const [ buttonShow, setButtonShow ] = useState(false);
  const poll = { yes: 0, no: 0 };

  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setQuestionInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setQuestionInput(e.target[0].value);
    console.log(questionInput);
    if (questionInput !== "") {
      const dbRef = firebase.database().ref();
      const pollID = dbRef.push([questionInput, poll]).key;
      setQuestionInput("");
      setPollID(pollID);
    }
    else {
      alert("Enter a valid response");
    }
    // setButtonShow(true);
    // console.log(buttonShow)

  };

  // Function that handles changes in input elements on form

  return (
    <div className="wrapper">
      <header>
        <h1>Voting App</h1>
      </header>
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          libero expedita tenetur commodi voluptates repellat facilis provident
          odio ea necessitatibus!
        </p>
        <form action="submit" onSubmit={handleSubmit}>
          <label htmlFor="userquestionInput"></label>
          <input
            type="text"
            name="userquestionInput"
            id="userquestionInput"
            onChange={handleInputChange}
          />
          <button type="submit">Create Poll</button>
        </form>
        <Link to={`${pollID}`}>
          <button>Start Poll</button>
        </Link>
      </main>
    </div>
  );
};

export default Home;
