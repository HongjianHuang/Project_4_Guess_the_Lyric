import { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";

const Home = () => {
  const [questionInput, setQuestionInput] = useState("");
  const [pollID, setPollID] = useState("");
  //const [questionArray, setQuestionArray] = useState([]);
  const [ buttonShow, setButtonShow ] = useState(true);
  const [ questionShow, setQuestionShow] = useState(true);
  const [ completeQuestion, setCompleteQuestion ] = useState(true);
  const poll = { yes: 0, no: 0 };

  const handleInputChange = (e) => {
    const { value } = e.target;
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
      setQuestionShow(!questionShow);
      setCompleteQuestion(questionInput);
      setButtonShow(!buttonShow);
    }
    else {
      alert("Enter a valid response");
    }
  
    
    // console.log(buttonShow)
  };

  const handleBackButton = (keyToDelete) => {
    const dbRef = firebase.database().ref();
    dbRef.child(keyToDelete).remove();
    setQuestionInput("");
    setButtonShow(!buttonShow);
    setQuestionShow(!questionShow);
  }

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
          {
            questionShow ?
            null
            :
            <p>Question Preview: {completeQuestion}</p>
          }
          {(() => {
            if (buttonShow) {
              return (
                <div className="homeForm">
                  <label htmlFor="userquestionInput"></label>
                  <input
                    type="text"
                    name="userquestionInput"
                    id="userquestionInput"
                    onChange={handleInputChange}
                    value={questionInput}
                  />
                  <button type="submit">Create Poll</button>
                </div>
              )
            } else {
              return (
                <div>
                  <Link to={`${pollID}`}>
                    <button>Start Poll</button>
                  </Link>
                  <button type="button" onClick={() => handleBackButton(pollID)}>Go Back</button>
                </div>
                
              )
            }
          })()}

        </form>

        

        

      </main>
    </div>
  );
};

export default Home;
