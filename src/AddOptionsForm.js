import React from 'react';
import { Link } from "react-router-dom";
import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddOptionsForm = (props) => {

    const { handleAnswerSubmit, handleAnswerChange, answerInput, handleStartOver, pollID } = props;

    return (
        <React.Fragment>
            <form action="submit" onSubmit={handleAnswerSubmit}>
                <div className="optionContainer">
                    <label htmlFor="userAnswerOptionInput"></label>
                    <input
                        type="text"
                        name="userAnswerOptionInput"
                        id="userAnswerOptionInput"
                        onChange={handleAnswerChange}
                        value={answerInput}
                    />
                    <button className="optionButton" type="submit"> <FontAwesomeIcon icon="plus-square" aria-hidden="true" /><span>Add Option</span></button>
                </div>
            </form>
            <div className="directions">
                <button
                    type="button"
                    onClick={() => handleStartOver(pollID)}
                    className="startOverButton"
                >
                    Start Over
                </button>
                <Link to={`${pollID}`}>
                    <button className="startPollButton">Start Poll</button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default AddOptionsForm;