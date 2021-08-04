import { useState } from "react";
import firebase from "./firebase";
import Modal from "./Modal";
import CreatePollForm from "./CreatePollForm";
import AddOptionsForm from "./AddOptionsForm";
import AnswerOption from "./AnswerOptions";

const Home = () => {
  const [questionInput, setQuestionInput] = useState("");
  const [pollID, setPollID] = useState("");
  const [buttonShow, setButtonShow] = useState(true);
  const [questionShow, setQuestionShow] = useState(true);
  const [completeQuestion, setCompleteQuestion] = useState(true);
  const [answerInput, setAnswerInput] = useState("");
  const [poll, setPoll] = useState({ Yes: 0, No: 0 });
  const [active, setActive] = useState(false);

  // Function to capture user's created question
  const handleQuestionChange = (e) => {
    const { value } = e.target;
    setQuestionInput(value);
  };

  // Function to capture user's added options
  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswerInput(value);
  };

  // Function to handle user's submission of question
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setQuestionInput(e.target[0].value);
    if (questionInput !== "") {
      const dbRef = firebase.database().ref();
      setPoll({ Yes: 0, No: 0 });
      const pollID = dbRef.push([questionInput, poll]).key;
      setQuestionInput("");
      setPollID(pollID);
      setQuestionShow(!questionShow);
      setCompleteQuestion(questionInput);
      setButtonShow(!buttonShow);
    } else {
      setActive(!active);
    }
  };

  // Function to handle user's submission of options
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (answerInput !== "") {
      const dbRef = firebase.database().ref(pollID);
      let pollObjCopy = Object.assign({}, poll);
      pollObjCopy = Object.assign(pollObjCopy, { [e.target[0].value]: 0 });
      const value = [completeQuestion, pollObjCopy];
      setPoll(pollObjCopy);
      dbRef.set(value);
      setAnswerInput("");
    } else {
      setActive(true);
    }
  };

  // Function to remove option upon user click
  const handleRemoveClick = (e) => {
    let key = "";
    if (e.target.parentElement.previousSibling === null) {
      key = e.target.parentElement.parentElement.previousSibling.innerHTML;
    }
    else {
      key = e.target.parentElement.previousSibling.innerHTML;
    }
    const dbRef = firebase.database().ref(pollID);
    const pollObjCopy = Object.assign({}, poll);
    delete pollObjCopy[key];
    const value = [completeQuestion, pollObjCopy];
    setPoll(pollObjCopy);
    dbRef.set(value);
  };

  // Function to restart the poll creation
  const handleStartOver = (keyToDelete) => {
    const dbRef = firebase.database().ref();
    dbRef.child(keyToDelete).remove();
    setQuestionInput("");
    setButtonShow(!buttonShow);
    setQuestionShow(!questionShow);
  };

  // Function to close modal when user clicks outside modal
  const clickOffToCloseModal = (e) => {
    if (e.target.closest(".modalContainer") === null && active === true) {
      setActive(false);
    }
  };

  return (
    <div className="wrapper" onClick={clickOffToCloseModal}>
      <header>
        <h1>EasyPoll</h1>
      </header>
      <main>
        <AnswerOption poll={poll} questionShow={questionShow} handleRemoveClick={handleRemoveClick} completeQuestion={completeQuestion}/>

        { buttonShow ? 
          <CreatePollForm handleQuestionSubmit={handleQuestionSubmit} handleQuestionChange={handleQuestionChange} questionInput={questionInput} /> 
          :
          <AddOptionsForm handleAnswerSubmit={handleAnswerSubmit} handleAnswerChange={handleAnswerChange} answerInput={answerInput} handleStartOver={handleStartOver} pollID={pollID} />
        }
        <Modal setActive={setActive} active={active} />
      </main>
    </div>
  );
};

export default Home;
