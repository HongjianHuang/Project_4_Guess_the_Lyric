import { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import firebase from "./firebase";
import Result from "./Result";
import Modal from "./Modal";
import VotingForm from "./VotingForm";
import Header from './Header'

const Poll = (props) => {
  const pollID = props.match.params.pollID;
  const [objectArray, setObjectArray] = useState([]);
  const [vote, setVote] = useState("");
  const [pollObject, setPollObject] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [active, setActive] = useState(false);
  const [copied, setCopied] = useState(false);

  // Function to capture user's selected vote
  const onChangeValue = (e) => {
    setVote(e.target.value);
  };

  // Function that adds option properties to the question object
  const handleClick = () => {
    props.history.push("/");
    if (Object.keys(pollObject.value[1]).includes(vote)) {
      changeFirebaseValue(vote);
      setShowResult(!showResult);
    } else {
      setActive(!active);
    }
  };

  // Function to copy the unique poll URL upon user click
  const handleCopyURL = (e) => {
    navigator.clipboard.writeText(e.target.previousSibling.value);
    setCopied(true);
  };

  // Function that changes the Firebase value based on selected option
  const changeFirebaseValue = (pollResult) => {
    const dbRef = firebase.database().ref(pollID);
    const pollObjectRef = pollObject;
    for (let i=0; i < Object.keys(pollObject.value[1]).length; i++) {
      if (pollResult === Object.keys(pollObject.value[1])[i]) {
        pollObjectRef.value[1][pollResult] = pollObjectRef.value[1][pollResult] + 1;
      }
    }
    dbRef.set(pollObjectRef.value);
  };
  // Connects to firebase and updates the object and poll array every time the value of firebase changes
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const responseData = response.val();
      for (let questionKey in responseData) {
        const Object = {
          key: questionKey,
          value: responseData[questionKey],
        };
        if (Object.key === pollID) {
          setObjectArray(Object.value);
          setPollObject(Object);
        }
      }
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to close modal when user clicks outside modal
  const clickOffToCloseModal = (e) => {
    if (e.target.closest(".modalContainer") === null && active === true) {
      setActive(false);
    }
  };

  return (
    <div onClick={clickOffToCloseModal}>
      <section>
        <Header />
        <div className="poll wrapper">
          <h3>{objectArray[0]}</h3>
          <p>Options</p>
          <VotingForm onChangeValue={onChangeValue} objectArray={objectArray} showResult={showResult} pollID={pollID} vote={vote} handleClick={handleClick} />
          <label>Share poll URL: </label>
          <input
            className="urlDisplay"
            readOnly
            value={
              `${window.location.href}`.includes("result")
                ? `${window.location.href}`.replace("result", "")
                : `${window.location.href}`
            }
          />
          {/* Shows user that url has been copied */}
          {copied ? <button className="copied" onClick={handleCopyURL}>Copied!</button>
          : <button className="hoverLightBlue" onClick={handleCopyURL}>Copy URL</button>
          }
          {/* If pollObject.value is undefined the page will not show results */}
          {pollObject.value ? (
            <Route
              path="/:pollID/result"
              component={() => <Result result={pollObject.value[1]} />}
            />
          ) : null}
        </div>
        <Link to="/">
          <button className="hoverLightBlue">Create New Poll</button>
        </Link>
      </section>

      <Modal setActive={setActive} active={active} />
    </div>
  );
};

export default Poll;
