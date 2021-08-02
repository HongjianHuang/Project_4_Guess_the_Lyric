import { useEffect, useState } from "react";
import {Route, Link} from "react-router-dom";
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
  }

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
    //Variable that holds reference to database
    const dbRef = firebase.database().ref();
    // Event listener to variable dbRef; fires each time there is a change in value in database. Takes a callback function which will get data (response) from the database
    dbRef.on("value", (response) => {
      // Store response from query to firebase inside responseData variable
      const responseData = response.val();
      // Variable that stores the new state
      //const newStateArray = [];
      // Local variable propertyName represents each of the properties or keys in responseData object

      for (let questionKey in responseData) {
        // New object is declared and is pushed into newStateArray

        const Object = {
          key: questionKey,
          value: responseData[questionKey],
        };
        if (Object.key === pollID) {
          setObjectArray(Object.value);
          setPollObject(Object);
        }
      }
      // Set new potluck list to state
      // console.log(newStateArray[0].key);
      // console.log(newStateArray);
      //setQuestionArray(newStateArray[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
              <input type="radio" value="Yes" name="vote"/> Yes
            </label>
            <label>
              <input type="radio" value="No" name="vote" /> No
            </label>
            
            {
              showResult ?
                null
              : 
              <Link to={`${pollID}/result`} onClick ={handleClick}>
                <button>Vote</button>
              </Link>
            }
             <Link to="/">
                <button >Go back Home</button>
            </Link>
          </form>
          Share poll URL: 
          <input className="urlDisplay"
            readOnly value={
              `${window.location.href}`.includes("result") ? `${window.location.href}`.replace("result", "") : `${window.location.href}`}
          />
          <button 
            onClick={handleCopyURL}
          >
            Copy URL
          </button>
         
          <Route path="/:pollID/result" component={()=><Result result={pollObject.value[1]}/>} />
         
        </div>
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
