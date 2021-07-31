import { useEffect, useState } from "react";
import firebase from "./firebase";
import Result from "./Result";
const Poll = (props) => {
  const pollID = props.match.params.pollID;
  const [objectArray, setObjectArray] = useState([]);
  const [vote, setVote] = useState("");
  const [pollObject, setPollObject] = useState({});
  const onChangeValue = (e) => {
    setVote(e.target.value);
  };
  const handleClick = () => {
    console.log(vote);
    changeFirebaseValue(vote);
  };
  const changeFirebaseValue = (pollResult) => {
    const dbRef = firebase.database().ref(pollID);
    console.log(dbRef);
    const pollObjectRef = pollObject;
    console.log(pollObjectRef);
    if (pollResult === "yes") {
      //change the firebase value
      pollObjectRef.value[1].yes = pollObjectRef.value[1].yes + 1;
    } else if (pollResult === "no") {
      pollObjectRef.value[1].no = pollObjectRef.value[1].no + 1;
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
  }, []);
  return (
    <div className="question">
      <h3>{objectArray[0]}</h3>
      <div className="vote" onChange={onChangeValue}>
        <label>
          <input type="radio" value="yes" name="vote" /> Yes
        </label>
        <label>
          <input type="radio" value="no" name="vote" /> No
        </label>
      </div>

      <button onClick={handleClick}>vote</button>
      <Result result={objectArray[1] ? objectArray[1] : { yes: 0, no: 0 }} />
    </div>
  );
};

export default Poll;
