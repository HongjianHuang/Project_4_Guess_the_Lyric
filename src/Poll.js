import { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import firebase from "./firebase";
import Result from "./Result";
const Poll = (props) => {
  const pollID = props.match.params.pollID;
  const [objectArray, setObjectArray] = useState([]);
  const [vote, setVote] = useState("");
  const [pollObject, setPollObject] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [active, setActive] = useState(false);
  const onChangeValue = (e) => {
    setVote(e.target.value);
  };
  const handleClick = () => {
    if (vote === "Yes" || vote === "No") {
      console.log(vote);
      changeFirebaseValue(vote);
      setShowResult(!showResult);
    } else {
      setActive(!active);
    }
  };

  const handleCopyURL = (e) => {
    navigator.clipboard.writeText(e.target.previousSibling.value);
  };

  const changeFirebaseValue = (pollResult) => {
    const dbRef = firebase.database().ref(pollID);
    console.log(dbRef);
    const pollObjectRef = pollObject;
    console.log(pollObjectRef);
    if (pollResult === "Yes") {
      //change the firebase value
      pollObjectRef.value[1].Yes = pollObjectRef.value[1].Yes + 1;
    } else if (pollResult === "No") {
      pollObjectRef.value[1].No = pollObjectRef.value[1].No + 1;
    }
    dbRef.set(pollObjectRef.value);
    //console.log(dbRef.push(pollObjectRef));
  };
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
  }, []);
  console.log(objectArray[1]);
  return (
    <div>
      <section>
        <div className="questionBanner">
          <h2>Question</h2>
        </div>
        <div className="poll wrapper">
          <h3>{objectArray[0]}</h3>
          <form className="vote" onChange={onChangeValue}>
            <label>
              <input type="radio" value="Yes" name="vote" /> Yes
            </label>
            <label>
              <input type="radio" value="No" name="vote" /> No
            </label>
            {/* {objectArray[1].map(function (object, i) {
              return (
                <label key={i}>
                  <input type="radio" value={object} name="vote" /> {Object}
                </label>
              );
            })} */}
            {/* {poll.__proto__.constructor.keys(poll).map((item, i) => (
                <li key={i}>
                  <span className="input-label">{item}</span>
                  {<button onClick={handleRemoveClick}>x</button>}
                </li>
              ))} */}

            {showResult ? null : (
              <Link to={`${pollID}/result`} onClick={handleClick}>
                <button>Vote</button>
              </Link>
            )}
          </form>
          <label>Share poll URL</label>
          <input
            className="urlDisplay"
            readOnly
            value={
              `${window.location.href}`.includes("result")
                ? `${window.location.href}`.replace("result", "")
                : `${window.location.href}`
            }
          />
          <button onClick={handleCopyURL}>Copy URL</button>
          <Route
            path="/:pollID/result"
            component={() => <Result result={pollObject.value[1]} />}
          />
        </div>
        <Link to="/">
          <button>Create New Poll</button>
        </Link>
      </section>

      <div className={active ? null : "hide"}>
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="closeButton">
              <button onClick={() => setActive(!active)}> X </button>
            </div>
            <div className="errorMessage">
              <p>Error message will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poll;
