const CreatePollForm = (props) => 
{

    const { handleQuestionSubmit, handleQuestionChange, questionInput } = props;

    return(
        <div>
            <div className="instructionsWrapper">
                <p>A fast and simple way to create polls and get answers.</p>
                <ol>
                    <li>Type your poll question</li>
                    <li>Determine the options to vote on</li>
                    <li> Share URL link with your friends and family</li>
                </ol>
            </div>
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
                    <button className="importantButton" type="submit">Create Poll</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePollForm;