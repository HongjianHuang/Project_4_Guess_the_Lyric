import React from 'react';
import { Link } from "react-router-dom";

const AddOptionsForm = (props) => {

    const { handleAnswerSubmit, handleAnswerChange, answerInput, handleStartOver, pollID } = props;

    return (
        <React.Fragment>
            <form action="submit" onSubmit={handleAnswerSubmit}>
                <div>
                    <label htmlFor="userAnswerOptionInput"></label>
                    <input
                        type="text"
                        name="userAnswerOptionInput"
                        id="userAnswerOptionInput"
                        onChange={handleAnswerChange}
                        value={answerInput}
                    />
                    <button type="submit">Add Option</button>
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