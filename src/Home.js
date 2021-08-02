import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";
const Home = (props) => {
  const [questionInput, setQuestionInput] = useState("");
  const [pollID, setPollID] = useState("");
  //const [questionArray, setQuestionArray] = useState([]);
  const [ buttonShow, setButtonShow ] = useState(true);
  const [ questionShow, setQuestionShow] = useState(true);
  const [ completeQuestion, setCompleteQuestion ] = useState(true);
  const [answerInput, setAnswerInput] = useState("");
  const [poll, setPoll] = useState({ yes: 0, no: 0 })

  const handleAnswerChange = (e) =>{
    const {value} = e.target;
    setAnswerInput(value);
  }
  const handleQuestionChange = (e) => {
    const { value } = e.target;
    setQuestionInput(value);
  };

  const handleQuestionSubmit = (e) => {
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
  const handleAnswerSubmit = (e) =>{
    e.preventDefault();
    console.log(e);
  }
  const handleRemoveClick = (e) =>{
    
    const key = e.target.previousSibling.innerHTML;
    const tempPollObj = poll;
    delete tempPollObj[key];
    setPoll(tempPollObj);
    console.log(poll);
  }
  const handleBackButton = (keyToDelete) => {
    const dbRef = firebase.database().ref();
    dbRef.child(keyToDelete).remove();
    setQuestionInput("");
    setButtonShow(!buttonShow);
    setQuestionShow(!questionShow);
  }
const AnswerOption = ()=>{
  
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
        
          {
            questionShow ?
            null
            :
            <div>
            <p>Question Preview: {completeQuestion}</p>
              <ul>
              {poll.__proto__.constructor.keys(poll).map((item,i) => (
              <li className="travelcompany-input" key={i}>
              <span className="input-label">{item}</span>
              {<button onClick = {handleRemoveClick}>Remove</button>}
              </li>
              ))}
              </ul>
            </div>
            
            
          }
          {(() => {
            if (buttonShow) {
              return (
                <form action="submit" onSubmit={handleQuestionSubmit}>
                <div className="homeForm">
                  <label htmlFor="userquestionInput"></label>
                  <input
                    type="text"
                    name="userquestionInput"
                    id="userquestionInput"
                    onChange={handleQuestionChange}
                    value={questionInput}
                  />
                  <button type="submit">Create Poll</button>
                </div>
                 </form>
              )
            } else {
              return (
                <div>
                  <Link to={`${pollID}`}>
                    <button>Start Poll</button>
                  </Link>
                  <button type="button" onClick={() => handleBackButton(pollID)}>Go Back</button>
                  <form action = "submit" onSubmit = {handleAnswerSubmit}>
                  <div>
                    <label htmlFor="userAnswerOptionInput"></label>
                    <input
                      type="text"
                      name="userAnswerOptionInput"
                      id="userAnswerOptionInput"
                      onChange={handleAnswerChange}
                      value={answerInput}
                    />
                    <button type="submit">Add Options</button>
                  </div>
                  </form>
                  
                  
                </div>
                
              )
            }
          })()}

       

        

        

      </main>
    </div>
  );
};

export default Home;
