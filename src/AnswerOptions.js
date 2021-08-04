import React from 'react';
import "./FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnswerOption = (props) => {
    
    const {questionShow, handleRemoveClick, completeQuestion, poll} = props;

    return(
        <React.Fragment>
        {
            questionShow ? null : (
                <div className="questionPreview">
                    <p>Question Preview:</p>
                    <p>{completeQuestion}</p>
                    <ul>
                        {Object.keys(poll).map((item, i) => (
                            <li key={i}>
                                <span className="input-label">{item}</span>
                                {<button aria-label="Remove list item" onClick={handleRemoveClick}
                                >
                                    <FontAwesomeIcon icon="times" aria-hidden="true" />
                                </button>}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
        </React.Fragment>
    )
}

export default AnswerOption;