const CreatePollForm = (props) => 
{

    const { handleQuestionSubmit, handleQuestionChange, questionInput } = props;

    return(
        <div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia libero expedita tenetur commodi voluptates repellat
                facilis provident odio ea necessitatibus!
            </p>
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
        </div>
    )
}

export default CreatePollForm;